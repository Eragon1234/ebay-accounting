"use server";

import prisma from "@/db/db";
import {Expense, ExpenseType} from "@prisma/client";
import zod from "zod";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

export async function countExpenses(): Promise<number> {
    return prisma.expense.count()
}

export async function getExpenses(take: number, skip: number): Promise<Expense[]> {
    return prisma.expense.findMany({
        take,
        skip,
    })
}

type CreateExpense = {
    name: string,
    amount: number,
    date: Date,
    type: ExpenseType
}

export async function createExpense(expense: CreateExpense): Promise<Expense> {
    return prisma.expense.create({
        data: expense
    })
}

const newExpenseSchema = zod.object({
    name: zod.string({
        required_error: "missing name",
    }),
    date: zod.date({
        required_error: "missing date",
        coerce: true
    }),
    amount: zod.number({
        required_error: "missing amount",
        coerce: true
    }),
    expenseType: zod.nativeEnum(ExpenseType, {
        required_error: "missing expense type",
    }),
})

export default async function createExpenseFromForm(formData: FormData) {
    try {
        const {
            name,
            date,
            amount,
            expenseType,
        } = newExpenseSchema.parse({
            name: formData.get("name"),
            date: formData.get("date"),
            amount: formData.get("amount"),
            expenseType: formData.get("type"),
        });

        await createExpense({
            name,
            date,
            amount,
            type: expenseType,
        })
    } catch (e) {
        if (e instanceof zod.ZodError) {
            return {
                error: e.message,
            }
        } else {
            throw e;
        }
    }

    revalidatePath("/expenses");
    redirect("/expenses");
}
