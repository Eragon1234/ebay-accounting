"use server";

import prisma from "@/db";
import {redirect} from "next/navigation";

export async function saveIncome(formData: FormData) {
    const name = formData.get("name");
    const amount = formData.get("amount");
    const date = formData.get("date");
    const expenses: { [key: string]: string } = JSON.parse(formData.get("expenses") as string);

    const expensesIds = Object.keys(expenses).map(expenseId => ({id: Number(expenseId)}));

    await prisma.income.create({
        data: {
            name: name as string,
            amount: Number(amount),
            date: new Date(date as string),
            expenses: {
                connect: expensesIds
            }
        }
    });

    redirect("/incomes")
}