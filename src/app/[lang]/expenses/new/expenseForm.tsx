"use client";

import createExpenseFromForm, {getExpenseTypes} from "@/db/expense";
import {getDictionary} from "@/translation/dictionaries";
import {AsyncReturnType} from "@/types/asyncReturnType";
import {TaxTypeInput} from "@/app/[lang]/expenses/new/taxTypeInput";
import {useFormStatus} from "react-dom";

export async function ExpenseForm({dict}: { dict: AsyncReturnType<typeof getDictionary> }) {
    const today = new Date();
    const isoDateString = today.toISOString().slice(0, 10);

    const types = await getExpenseTypes();

    return (
        <form action={createExpenseFromForm}>
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
            <SubmitButton dict={dict}/>
        </form>
    )
}

async function SubmitButton({dict}: { dict: AsyncReturnType<typeof getDictionary> }) {
    const {pending} = useFormStatus();

    return <button type="submit" style={{width: "auto",}} disabled={pending}>{dict.addExpense.addExpense}</button>;
}

