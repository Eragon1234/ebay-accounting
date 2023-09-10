"use server";

import prisma from "@/db/db";
import {Expense} from "@prisma/client";

export async function countExpenses(): Promise<number> {
    return prisma.expense.count()
}

export async function getExpenses(take: number, skip: number): Promise<Expense[]> {
    return prisma.expense.findMany({
        take,
        skip,
    })
}