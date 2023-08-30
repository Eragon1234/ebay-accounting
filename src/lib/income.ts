"use server";

import {Income} from "@prisma/client";
import prisma from "@/db";

export async function countIncomes() {
    return prisma.income.count();
}

export async function getIncomes(skip: number, take: number): Promise<Income[]> {
    return prisma.income.findMany({
        skip,
        take,
    });
}