"use server";

import prisma from "@/db";
import {ExpenseType, Prisma} from "@prisma/client";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import zod from "zod";

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

export default async function saveExpense(formData: FormData) {
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

        await prisma.expense.create({
            data: {
                name,
                type: expenseType,
                amount,
                date,
            }
        });
    } catch (e) {
        if (e instanceof zod.ZodError) {
            return {
                error: e.message,
            }
        } else if (e instanceof Prisma.PrismaClientKnownRequestError) {
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
