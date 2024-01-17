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

export async function getExpenseInRange(start: Date, end: Date): Promise<number> {
    const result = await db.select({
        sum: sum(expense.amount).mapWith(Number)
    }).from(expense).where(
        between(expense.date, start, end)
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
        date: new Date(Date.parse(formData.get("date") as string)),
        amount: Math.round(parseFloat(formData.get("amount") as string) * euroToMicroEuro),
        type: formData.get("type"),
        vat: parseInt(formData.get("vat") as string)
    });

    if (!validatedFields.success) {
        console.log(validatedFields.error.flatten().fieldErrors)
        return {
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    const files = formData.getAll("files") as File[];
    const paths = files.filter(file => file.size !== 0).map(saveFile);

    await createExpense({
        ...validatedFields.data,
        files: await Promise.all(paths)
    });

    redirect("/expenses");
}
