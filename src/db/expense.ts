"use server";

import db from "@/db/db";
import zod from "zod";
import {redirect} from "next/navigation";
import {saveFile} from "@/db/files";
import {Expense, expense, ExpenseType, expenseType, NewExpense} from "@/db/schema";
import {between, count, desc, sum} from "drizzle-orm";

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

const newExpenseSchema = zod.object({
    name: zod.string({
        required_error: "missing name",
    }).min(5, "name should be at least 5 characters long"),
    date: zod.date({
        required_error: "missing date",
        coerce: true
    }),
    amount: zod.number({
        required_error: "missing amount",
        coerce: true
    }).gt(0, "amount should be greater than zero"),
    type: zod.enum(expenseType.enumValues, {
        required_error: "missing expense type",
    }),
    vat: zod.number({
        coerce: true
    }).nonnegative("VAT should be positive").optional()
}).refine(({vat, type}) => type !== ExpenseType.VAT || vat != undefined);

export default async function createExpenseFromForm(formData: FormData) {
    const validatedFields = newExpenseSchema.safeParse({
        name: formData.get("name"),
        date: formData.get("date"),
        amount: formData.get("amount"),
        type: formData.get("type"),
        vat: formData.get("vat")
    });

    if (!validatedFields.success) {
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
