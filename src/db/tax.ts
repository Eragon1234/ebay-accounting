"use server";

import {getIncomeInRange} from "@/db/income";
import db from "@/db/db";
import {expense, TaxType} from "@/db/schema";
import {and, between, eq, sql, sum} from "drizzle-orm";

export async function getVATInRange(start: Date, end: Date): Promise<number> {
    const income = await getIncomeInRange(start, end);
    const taxableIncome = await getTaxableIncome(start, end, income);

    const taxToBePaid = taxableIncome - (taxableIncome / 1.19);
    const paidVat = await getPaidVatBetweenDates(start, end);

    return taxToBePaid - paidVat;
}

export async function getTaxableIncome(start: Date, end: Date, income: number) {
    const differentialSum = (await db.select({
        differentialSum: sum(expense.amount).mapWith(Number),
    }).from(expense).where(
        and(
            between(expense.date, start.toISOString().slice(0, 10), end.toISOString().slice(0, 10)),
            eq(expense.taxType, TaxType.DIFFERENTIAL)
        )
    ))[0].differentialSum;

    return income - differentialSum;
}

export async function getPaidVatBetweenDates(start: Date, end: Date) {
    const result = await db.select({
        paidVat: sql`sum(${expense.amount} - (${expense.amount} / (100 + ${expense.vat}) * 100))`.mapWith(Number)
    }).from(expense).where(
        and(
            between(expense.date, start.toISOString().slice(0, 10), end.toISOString().slice(0, 10)),
            eq(expense.taxType, TaxType.VAT)
        )
    );
    return result[0].paidVat;
}
