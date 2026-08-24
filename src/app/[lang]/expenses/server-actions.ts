"use server";

import {deleteExpense, updateExpense} from "@/db/expense";
import {revalidatePath} from "next/cache";
import {Expense} from "@/db/schema";
import {saveFile} from "@/db/files";

export async function deleteExpenseAction(expenseId: Expense['id']) {
    await deleteExpense(expenseId);
    revalidatePath("/[lang]/expenses", "page");
}

type AddFileToExpenseResult = { success: true, error_code: undefined } | { success: false, error_code: string };

export async function addFileToExpense(id: number, file: File): Promise<AddFileToExpenseResult> {
    if (!file || file.size === 0) {
        console.log("File is empty or missing")
        return {success: false, error_code: "file_empty"};
    }

    const path = await saveFile(file);

    await updateExpense(id, {file: path});

    revalidatePath("/[lang]/expenses", "page");

    return {success: true, error_code: undefined};
}