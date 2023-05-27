import prisma from "@/db";
import {ExpenseType} from "@prisma/client";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

export default async function saveExpense(formData: FormData) {
    const name = formData.get("name");
    const amount = formData.get("amount");
    const type = formData.get("type");
    const date = formData.get("date");

    await prisma.expense.create({
        data: {
            name: name as string,
            type: ExpenseType[type as keyof typeof ExpenseType],
            amount: Number(amount),
            date: new Date(date as string),
        }
    });

    revalidatePath("/expenses");
    redirect("/expenses");
}
