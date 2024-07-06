"use server";

import db from "@/db/db";
import {expense, TaxType} from "@/db/schema";
import {and, between, eq, sql, sum} from "drizzle-orm";

export async function calculateVat(taxableIncome: number, paidVat: number): Promise<number> {
    const taxToBePaid = taxableIncome - (taxableIncome / 1.19);

    return taxToBePaid - paidVat;
}

export async function calculateTaxableIncome(income: number, differentialIncome: number) {
    return income - differentialIncome;
}

export async function getDifferentialIncome(start: Date, end: Date) {
    return (await db.select({
        differentialSum: sum(expense.amount).mapWith(Number),
    }).from(expense).where(
        and(
            between(expense.date, start.toISOString().slice(0, 10), end.toISOString().slice(0, 10)),
            eq(expense.taxType, TaxType.DIFFERENTIAL)
        )
    ))[0].differentialSum;
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
