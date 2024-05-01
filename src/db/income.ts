"use server";

import {redirect} from "next/navigation";
import {saveFile} from "@/db/files";
import {euroToMicroEuro, Income, income, NewIncome} from "@/db/schema";
import db from "@/db/db";
import {between, count, desc, eq, sum} from "drizzle-orm";
import {createInsertSchema} from "drizzle-zod";
import {revalidatePath} from "next/cache";
import {Locales} from "@/translation/dictionaries";

export async function countIncomes() {
    return db.select({count: count(income.id)}).from(income).then(a => a[0].count);
}

export async function getIncomes(limit: number, offset: number): Promise<Income[]> {
    return db.query.income.findMany({
        limit,
        offset,
        orderBy: [
            desc(income.date)
        ]
    });
}

export async function getIncomeInRange(start: Date, end: Date): Promise<number> {
    const result = await db.select({
        sum: sum(income.amount).mapWith(Number)
    }).from(income).where(
        between(income.date, start.toISOString().slice(0, 10), end.toISOString().slice(0, 10))
    );
    return result[0].sum || 0;
}

export async function createIncome(newIncome: NewIncome) {
    await db.insert(income).values(newIncome)
}

export async function deleteIncome(id: number) {
    await db.delete(income).where(eq(income.id, id));
    revalidatePath("/[lang]/incomes", "page");
}

const newIncomeSchema = createInsertSchema(income);

export async function createIncomeFromForm(lang: Locales, formData: FormData) {
    const validatedFields = newIncomeSchema.safeParse({
        name: (formData.get("name") as string).trim(),
        amount: Math.round(parseFloat(formData.get("amount") as string) * euroToMicroEuro),
        date: formData.get("date"),
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

    await createIncome({
        ...validatedFields.data,
        file: path
    });

    revalidatePath("/[lang]/incomes", "page");
    redirect(`/${lang}/incomes`);
}
