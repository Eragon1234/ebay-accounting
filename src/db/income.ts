"use server";

import {Income, Prisma} from "@prisma/client";
import prisma from "@/db/db";
import zod from "zod";
import {redirect} from "next/navigation";
import {saveFile} from "@/db/files";

export async function countIncomes() {
    return prisma.income.count();
}

export async function getIncomes(take: number, skip: number): Promise<Income[]> {
    return prisma.income.findMany({
        take,
        skip,
        orderBy: [
            {date: "desc"}
        ]
    });
}

export async function getYearlyIncome(): Promise<number> {
    const now = new Date();

    const result = await prisma.income.aggregate({
        _sum: {
            amount: true,
        },
        where: {
            date: {
                gte: new Date(Date.UTC(now.getFullYear(), 0)),
                lt: new Date(Date.UTC(now.getFullYear() + 1, 0))
            }
        }
    });

    return result._sum.amount || 0;
}

export async function createIncome(income: Prisma.IncomeCreateInput): Promise<Income> {
    return prisma.income.create({
        data: income
    });
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
