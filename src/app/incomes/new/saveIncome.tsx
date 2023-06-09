"use server";

import prisma from "@/db";
import zod, {ZodError} from "zod";
import {redirect} from "next/navigation";
import {Prisma} from "@prisma/client";

const newIncomeSchema = zod.object({
    name: zod.string({
        required_error: "missing name",
    }),
    amount: zod.number({
        required_error: "missing amount",
        coerce: true
    }),
    date: zod.date({
        required_error: "missing date",
        coerce: true
    }),
    expenseIds: zod.array(zod.object({
        id: zod.number({
            coerce: true
        }),
    }))
})

export async function saveIncome(formData: FormData) {
    try {
        const {
            name,
            amount,
            date,
            expenseIds
        } = newIncomeSchema.parse({
            name: formData.get("name"),
            amount: formData.get("amount"),
            date: formData.get("date"),
            expenseIds:
                Object.keys(JSON.parse(formData.get("expenses") as string))
                    .map((expenseId: string) => ({id: expenseId}))
        });

        await prisma.income.create({
            data: {
                name,
                amount,
                date,
                expenses: {
                    connect: expenseIds
                }
            }
        });
    } catch (e) {
        if (e instanceof ZodError) {
            return {
                error: e.message
            }
        } else if (e instanceof Prisma.PrismaClientKnownRequestError) {
            return {
                error: e.message
            }
        } else {
            throw e;
        }
    }

    redirect("/incomes")
}