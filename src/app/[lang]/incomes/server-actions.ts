"use server";

import {deleteIncome} from "@/db/income";
import {revalidatePath} from "next/cache";
import {Income} from "@/db/schema";

export async function deleteIncomeAction(incomeId: Income['id']) {
    await deleteIncome(incomeId);
    revalidatePath("/[lang]/incomes", "page");
}
