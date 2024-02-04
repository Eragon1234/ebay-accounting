"use server";

import {getIncomeInRange} from "@/db/income";
import db from "@/db/db";
import {expense, TaxType} from "@/db/schema";
import {and, avg, between, eq, sum} from "drizzle-orm";

export async function getVATInRange(start: Date, end: Date): Promise<number> {
    const income = await getIncomeInRange(start, end);

    const differentialSum = (await db.select({
        differentialSum: sum(expense.amount).mapWith(Number),
    }).from(expense).where(
        and(
            between(expense.date, start.toISOString().slice(0, 10), end.toISOString().slice(0, 10)),
            eq(expense.taxType, TaxType.DIFFERENTIAL)
        )
    ))[0].differentialSum;

    const taxableIncome = income - differentialSum;

    const taxToBePaid = taxableIncome - (taxableIncome / 1.19);

    const vat = (await db.select({
        amount: sum(expense.amount).mapWith(Number),
        avg: avg(expense.vat).mapWith(Number),
    }).from(expense).where(
        and(
            between(expense.date, start.toISOString().slice(0, 10), end.toISOString().slice(0, 10)),
            eq(expense.taxType, TaxType.VAT)
        )
    ))[0];

    const paidVat = vat.amount - (vat.amount / (1 + vat.avg / 100));

    return taxToBePaid - paidVat;
}
