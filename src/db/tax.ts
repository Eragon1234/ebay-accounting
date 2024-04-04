"use server";

import {getIncomeInRange} from "@/db/income";
import db from "@/db/db";
import {expense, TaxType} from "@/db/schema";
import {and, between, eq, sql, sum} from "drizzle-orm";

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

    const paidVat = (await db.select({
        paidVat: sql`sum(amount - (amount / (100 + vat) * 100))`
    }).from(expense).where(
        and(
            between(expense.date, start.toISOString().slice(0, 10), end.toISOString().slice(0, 10)),
            eq(expense.taxType, TaxType.DIFFERENTIAL)
        )
    ))[0].paidVat;

    return taxToBePaid - paidVat;
}
