import "server-only";

import {Expense, expense, NewExpense, TaxType} from "@/db/schema";
import {and, asc, between, desc, eq, sql, sum} from "drizzle-orm";
import {getDbAsync} from "@/db/db";
import Brand from "@/types/brand";
import {deleteFile} from "@/db/files";

export async function countExpenses(): Promise<number> {
    const db = await getDbAsync();

    return db.$count(expense);
}

export async function getExpenses(limit: number, offset: number): Promise<Expense[]> {
    const db = await getDbAsync();

    return db.query.expense.findMany({
        limit,
        offset,
        orderBy: [
            desc(expense.date),
            asc(expense.name)
        ]
    });
}

export async function getExpenseTypes(): Promise<string[]> {
    const db = await getDbAsync();

    const result = await db
        .select({type: expense.type})
        .from(expense)
        .groupBy(expense.type);

    return result.map(r => r.type || "");
}

type ExpenseSum = Brand<'ExpenseSum', {
    total: number;
    netto: number;
    vat: number;
}>;

export async function getExpenseInRange(start: Date, end: Date): Promise<ExpenseSum> {
    const db = await getDbAsync();

    const result = await db.select({
        total: sum(expense.amount).mapWith(Number),
        netto: sql`sum((${expense.amount} / (100 + ${expense.vat}) * 100))`.mapWith(Number),
        vat: sql`sum(${expense.amount} - (${expense.amount} / (100 + ${expense.vat}) * 100))`.mapWith(Number)
    }).from(expense).where(
        between(expense.date, start.toISOString().slice(0, 10), end.toISOString().slice(0, 10))
    );

    return result[0] as ExpenseSum;
}

type ExpenseSumByType = Brand<'ExpenseSumByType', {
    type: string;
    total: number;
    netto: number;
    vat: number;
}>;

export async function getExpenseInRangeByType(start: Date, end: Date): Promise<ExpenseSumByType[]> {
    const db = await getDbAsync();

    const result = await db.select({
        type: expense.type,
        total: sum(expense.amount).mapWith(Number),
        netto: sql`sum((${expense.amount} / (100 + ${expense.vat}) * 100))`.mapWith(Number),
        vat: sql`sum(${expense.amount} - (${expense.amount} / (100 + ${expense.vat}) * 100))`.mapWith(Number)
    }).from(expense).where(
        between(expense.date, start.toISOString().slice(0, 10), end.toISOString().slice(0, 10))
    ).groupBy(expense.type) as ExpenseSumByType[];

    return result;
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

export async function createExpense(newExpense: NewExpense) {
    const db = await getDbAsync();

    await db.insert(expense).values(newExpense);
}

export async function updateExpense(id: number, updatedFields: Partial<NewExpense>) {
    const db = await getDbAsync();

    await db.update(expense).set(updatedFields).where(eq(expense.id, id));
}

/**
 * Deletes an expense from the database based on the provided ID.
 * If the expense has an associated file, it will also be deleted.
 *
 * @param {number} id - The unique identifier of the expense to be deleted.
 * @return {Promise<boolean>} A promise that resolves to `true` if the expense was successfully deleted, or `false` if no matching expense was found.
 */
export async function deleteExpense(id: number): Promise<boolean> {
    const db = await getDbAsync();

    const [deletedExpense] = await db.delete(expense).where(eq(expense.id, id)).returning({file: expense.file});

    if (!deletedExpense) {
        return false;
    }

    if (deletedExpense.file) {
        try {
            await deleteFile(deletedExpense.file);
        } catch (error) {
            console.error(`Failed to delete file '${deletedExpense.file}' for expense with ID ${id}:`, error);
        }
    }

    return true;
}
