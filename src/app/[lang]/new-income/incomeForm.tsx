"use client";

import { createIncomeFromForm } from "@/db/income";
import { SubmitButton } from "@/components/submit-button/submitButton";
import { Localization } from "@/translation/dictionaries";
import { useActionState } from "react";

export function IncomeForm({ localization }: { localization: Localization }) {
  const { dict, locale } = localization;

  const today = new Date();
  const isoDateString = today.toISOString().slice(0, 10);

  const action = createIncomeFromForm.bind(null, locale);
  const [state, formAction, pending] = useActionState(action, null);

  return (
    <form action={formAction}>
      <label htmlFor="name">{dict.addIncome.name}</label>
      <input type="text" id="name" name="name" required />
      <label htmlFor="amount">{dict.addIncome.amount}</label>
      <input type="number" id="amount" name="amount" step="0.01" required />
      <label htmlFor="date">{dict.addIncome.date}</label>
      <input type="date" id="date" name="date" defaultValue={isoDateString} required />
      <label htmlFor="file">{dict.addIncome.file}</label>
      <input type="file" name="file" id="file" />
      <SubmitButton text={dict.addIncome.addIncome} />
    </form>
  )
}
