"use server";

import {Income, Prisma} from "@prisma/client";
import prisma from "@/db/db";
import zod, {ZodError} from "zod";
import {redirect} from "next/navigation";

export async function countIncomes() {
    return prisma.income.count();
}

export async function getIncomes(take: number, skip: number): Promise<Income[]> {
    return prisma.income.findMany({
        take,
        skip,
        orderBy: [
            {date: "asc"}
        ]
    });
}

export async function createIncome(income: Prisma.IncomeCreateInput): Promise<Income> {
    return prisma.income.create({
        data: income
    });
}

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

export async function createIncomeFromForm(formData: FormData) {
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

        await createIncome({
            name,
            amount,
            date,
            expenses: {
                connect: expenseIds
            }
        })
    } catch (e) {
        if (e instanceof ZodError) {
            return {
                error: e.message
            }
        } else {
            throw e;
        }
    }

    redirect("/incomes")
}
