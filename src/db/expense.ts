"use server";

import db from "@/db/db";
import {redirect} from "next/navigation";
import {saveFile} from "@/db/files";
import {euroToMicroEuro, Expense, expense, NewExpense} from "@/db/schema";
import {between, count, desc, sum} from "drizzle-orm";
import {createInsertSchema} from "drizzle-zod";

export async function countExpenses(): Promise<number> {
    return db.select({count: count(expense.id)}).from(expense).then(a => a[0].count);
}

export async function getExpenses(limit: number, offset: number): Promise<Expense[]> {
    return db.query.expense.findMany({
        limit,
        offset,
        orderBy: [
            desc(expense.date)
        ]
    });
}

export async function getExpenseTypes(): Promise<string[]> {
    const result = await db
        .select({type: expense.type})
        .from(expense)
        .groupBy(expense.type);

    return result.map(r => r.type || "");
}

export async function getExpenseInRange(start: Date, end: Date): Promise<number> {
    const result = await db.select({
        sum: sum(expense.amount).mapWith(Number)
    }).from(expense).where(
        between(expense.date, start.toISOString().slice(0, 10), end.toISOString().slice(0, 10))
    );

    return result[0].sum || 0;
}

export async function createExpense(newExpense: NewExpense) {
    await db.insert(expense).values(newExpense);
}

const newExpenseSchema = createInsertSchema(expense);

export default async function createExpenseFromForm(formData: FormData) {
    const validatedFields = newExpenseSchema.safeParse({
        name: formData.get("name"),
        date: formData.get("date"),
        type: formData.get("type"),
        amount: Math.round(parseFloat(formData.get("amount") as string) * euroToMicroEuro),
        taxType: formData.get("taxType"),
        vat: parseInt(formData.get("vat") as string)
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    const file = formData.get("file") as File;
    let path;
    if (file) {
        path = await saveFile(file);
    }

    await createExpense({
        ...validatedFields.data,
        file: path
    });

    redirect("/expenses");
}
