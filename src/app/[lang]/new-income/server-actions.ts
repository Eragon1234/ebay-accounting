"use server";

import { createInsertSchema } from "drizzle-zod";
import { euroToMicroEuro, income } from "@/db/schema";
import { Locales } from "@/translation/dictionaries";
import { saveFile } from "@/db/files";
import { createIncome } from "@/db/income";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const newIncomeSchema = createInsertSchema(income);

export async function createIncomeFromForm(
  lang: Locales,
  _prevState: unknown,
  formData: FormData,
) {
  const validatedFields = newIncomeSchema.safeParse({
    name: (formData.get("name") as string).trim(),
    amount: Math.round(
      parseFloat(formData.get("amount") as string) * euroToMicroEuro,
    ),
    date: formData.get("date"),
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

  await createIncome({
    ...validatedFields.data,
    file: path,
  });

  revalidatePath("/[lang]/incomes", "page");
  redirect(`/${lang}/incomes`);
}
