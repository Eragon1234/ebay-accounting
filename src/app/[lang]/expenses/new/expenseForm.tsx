"use client";

import createExpenseFromForm from "@/db/expense";
import {useState} from "react";
import {getDictionary} from "@/translation/dictionaries";
import {AsyncReturnType} from "@/types/asyncReturnType";
import {ExpenseType, expenseType} from "@/db/schema";

export function ExpenseForm({dict}: { dict: AsyncReturnType<typeof getDictionary> }) {
    const today = new Date();
    const isoDateString = today.toISOString().slice(0, 10);

    const [type, setType] = useState<string>(ExpenseType.VAT);

    return (
        <form action={createExpenseFromForm}>
            <label htmlFor="name">{dict.addExpense.name}</label>
            <input type="text" id="name" name="name" required/>
            <label htmlFor="type">{dict.addExpense.type}</label>
            <select id="type" name="type" value={type} onChange={e => setType(e.target.value)}>
                {
                    expenseType.enumValues.map((key) => (
                        <option key={key}
                                value={key}>{key}</option>
                    ))
                }
            </select>
            {type === ExpenseType.VAT && <input type="number" id="vat" name="vat" required/>}
            <label htmlFor="amount">{dict.addExpense.amount}</label>
            <input type="number" id="amount" name="amount" step="0.01" required/>
            <label htmlFor="date">{dict.addExpense.date}</label>
            <input type="date" id="date" name="date" defaultValue={isoDateString}/>
            <label htmlFor="files">{dict.addExpense.files}</label>
            <input type="file" name="files" id="files" multiple/>
            <button type="submit" style={{width: "auto",}}>{dict.addExpense.addExpense}</button>
        </form>
    )
}
