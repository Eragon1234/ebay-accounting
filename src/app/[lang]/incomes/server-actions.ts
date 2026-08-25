"use server";

import { deleteIncome } from "@/db/income";
import { revalidatePath } from "next/cache";
import { Income } from "@/db/schema";

type DeleteIncomeActionResult =
  | {
      success: true;
    }
  | {
      success: false;
      error_code: string;
    };

export async function deleteIncomeAction(
  incomeId: Income["id"],
): Promise<DeleteIncomeActionResult> {
  try {
    await deleteIncome(incomeId);
    revalidatePath("/[lang]/incomes", "page");
    return { success: true };
  } catch (error) {
    console.log(`Failed to delete income with id ${incomeId}`, error);
    return { error_code: "unknown_error", success: false };
  }
}
