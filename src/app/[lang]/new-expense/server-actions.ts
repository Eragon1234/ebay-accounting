"use server";

import { createInsertSchema } from "drizzle-zod";
import { euroToMicroEuro, expense } from "@/db/schema";
import { Locales } from "@/translation/dictionaries";
import { saveFile } from "@/db/files";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createExpense } from "@/db/expense";

const newExpenseSchema = createInsertSchema(expense);

export default async function createExpenseFromForm(
  lang: Locales,
  _prevState: any,
  formData: FormData,
) {
  const validatedFields = newExpenseSchema.safeParse({
    name: (formData.get("name") as string).trim(),
    date: formData.get("date"),
    type: (formData.get("type") as string).trim(),
    amount: Math.round(
      parseFloat(formData.get("amount") as string) * euroToMicroEuro,
    ),
    taxType: formData.get("taxType"),
    vat: parseInt(formData.get("vat") as string) || 0,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const file = formData.get("file") as File;
  let path;
  if (file && file.size > 0) {
    path = await saveFile(file);
  }

  await createExpense({
    ...validatedFields.data,
    file: path,
  });

  revalidatePath("/[lang]/expenses", "page");
  redirect(`/${lang}/expenses`);
}
