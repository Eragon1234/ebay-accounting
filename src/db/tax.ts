"use server";

import {getDbAsync} from "@/db/db";
import {expense, TaxType} from "@/db/schema";
import {and, between, eq, sum} from "drizzle-orm";

export async function calculateVat(taxableIncome: number, paidVat: number): Promise<number> {
    const taxToBePaid = taxableIncome - (taxableIncome / 1.19);

    return taxToBePaid - paidVat;
}

export async function calculateTaxableIncome(income: number, differentialIncome: number) {
    return income - differentialIncome;
}

export async function getDifferentialIncome(start: Date, end: Date) {
    const db = await getDbAsync();
    return (await db.select({
        differentialSum: sum(expense.amount).mapWith(Number),
    }).from(expense).where(
        and(
            between(expense.date, start.toISOString().slice(0, 10), end.toISOString().slice(0, 10)),
            eq(expense.taxType, TaxType.DIFFERENTIAL)
        )
    ))[0].differentialSum;
}
