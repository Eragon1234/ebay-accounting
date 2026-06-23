"use server";

import {redirect} from "next/navigation";
import {saveFile} from "@/db/files";
import {euroToMicroEuro, Expense, expense, NewExpense} from "@/db/schema";
import {asc, between, count, desc, eq, sql, sum} from "drizzle-orm";
import {createInsertSchema} from "drizzle-zod";
import {revalidatePath} from "next/cache";
import {Locales} from "@/translation/dictionaries";
import {getDbAsync} from "@/db/db";
import Brand from "@/lib/brand";

export async function countExpenses(): Promise<number> {
    const db = await getDbAsync();

    return db.select({count: count(expense.id)}).from(expense).then(a => a[0].count);
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

export async function createExpense(newExpense: NewExpense) {
    const db = await getDbAsync();

    await db.insert(expense).values(newExpense);
}

export async function deleteExpense(id: number) {
    const db = await getDbAsync();

    await db.delete(expense).where(eq(expense.id, id));
    revalidatePath("/[lang]/expenses", "page");
}

const newExpenseSchema = createInsertSchema(expense);

export default async function createExpenseFromForm(lang: Locales, _prevState: any, formData: FormData) {
    const validatedFields = newExpenseSchema.safeParse({
        name: (formData.get("name") as string).trim(),
        date: formData.get("date"),
        type: (formData.get("type") as string).trim(),
        amount: Math.round(parseFloat(formData.get("amount") as string) * euroToMicroEuro),
        taxType: formData.get("taxType"),
        vat: parseInt(formData.get("vat") as string) || 0
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    const file = formData.get("file") as File;
    let path;
    if (file && file.size > 0) {
        path = await saveFile(file);
    }

    await createExpense({
        ...validatedFields.data,
        file: path
    });

    revalidatePath("/[lang]/expenses", "page");
    redirect(`/${lang}/expenses`);
}
