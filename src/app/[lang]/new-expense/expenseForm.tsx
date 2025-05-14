"use client";

import createExpenseFromForm, {getExpenseTypes} from "@/db/expense";
import {TaxTypeInput} from "@/app/[lang]/new-expense/taxTypeInput";
import {SubmitButton} from "@/components/submit-button/submitButton";
import {Localization} from "@/translation/dictionaries";
import { useActionState } from "react";

export function ExpenseForm({localization, types}: { localization: Localization, types: string[] }) {
    const {dict, locale} = localization;

    const today = new Date();
    const isoDateString = today.toISOString().slice(0, 10);

    const action = createExpenseFromForm.bind(null, locale);
    const [state, formAction, pending] = useActionState(action, null);

    return (
        <form action={formAction}>
            <label htmlFor="name">{dict.addExpense.name}</label>
            <input type="text" id="name" name="name" required/>
            <label htmlFor="type">{dict.addExpense.type}</label>
            <input type="text" id="type" name="type" list="types" required/>
            <datalist id="types">
                {
                    types.map(type => <option key={type} value={type}></option>)
                }
            </datalist>
            <TaxTypeInput dict={dict}/>
            <label htmlFor="amount">{dict.addExpense.amount}</label>
            <input type="number" id="amount" name="amount" step="0.01" required/>
            <label htmlFor="date">{dict.addExpense.date}</label>
            <input type="date" id="date" name="date" defaultValue={isoDateString}/>
            <label htmlFor="file">{dict.addExpense.file}</label>
            <input type="file" name="file" id="file"/>
            <SubmitButton text={dict.addExpense.addExpense}/>
        </form>
    )
}
