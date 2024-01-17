"use server";

import zod from "zod";
import {redirect} from "next/navigation";
import {saveFile} from "@/db/files";
import {expense, Income, income, NewIncome} from "@/db/schema";
import db from "@/db/db";
import {between, count, desc, sum} from "drizzle-orm";

export async function countIncomes() {
    return db.select({count: count(income.id)}).from(income).then(a => a[0].count);
}

export async function getIncomes(limit: number, offset: number): Promise<Income[]> {
    return db.query.income.findMany({
        limit,
        offset,
        orderBy: [
            desc(expense.date)
        ]
    });
}

export async function getIncomeInRange(start: Date, end: Date): Promise<number> {
    const result = await db.select({
        sum: sum(income.amount).mapWith(Number)
    }).from(income).where(
        between(income.date, start, end)
    );
    return result[0].sum || 0;
}

export async function createIncome(newIncome: NewIncome) {
    await db.insert(income).values(newIncome)
}

const newIncomeSchema = zod.object({
    name: zod.string({
        required_error: "missing name",
    }).trim().min(5, "name should be at least 5 characters long"),
    amount: zod.number({
        required_error: "missing amount",
        coerce: true
    }).nonnegative().gt(0, "amount should be greater than 0"),
    date: zod.date({
        required_error: "missing date",
        coerce: true
    }),
})

export async function createIncomeFromForm(formData: FormData) {
    const validatedFields = newIncomeSchema.safeParse({
        name: formData.get("name"),
        amount: formData.get("amount"),
        date: formData.get("date"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    const files = formData.getAll("files") as File[];
    const paths = files.filter(file => file.size !== 0).map(saveFile);

    await createIncome({
        ...validatedFields.data,
        files: await Promise.all(paths)
    });

    redirect("/incomes")
}
