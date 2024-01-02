"use server";

import prisma from "@/db/db";
import {Expense, ExpenseType, Prisma} from "@prisma/client";
import zod from "zod";
import {redirect} from "next/navigation";
import {saveFile} from "@/db/files";

export async function countExpenses(): Promise<number> {
    return prisma.expense.count()
}

export async function getExpenses(take: number, skip: number): Promise<Expense[]> {
    return prisma.expense.findMany({
        take,
        skip,
        orderBy: [
            {date: "desc"}
        ]
    })
}

export async function createExpense(expense: Prisma.ExpenseCreateInput): Promise<Expense> {
    return prisma.expense.create({
        data: expense
    })
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
    type: zod.nativeEnum(ExpenseType, {
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
