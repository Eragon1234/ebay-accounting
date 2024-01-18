"use client";

import createExpenseFromForm, {getExpenseTypes} from "@/db/expense";
import {useState} from "react";
import {getDictionary} from "@/translation/dictionaries";
import {AsyncReturnType} from "@/types/asyncReturnType";
import {TaxType} from "@/db/schema";

export async function ExpenseForm({dict}: { dict: AsyncReturnType<typeof getDictionary> }) {
    const today = new Date();
    const isoDateString = today.toISOString().slice(0, 10);

    const [taxType, setTaxType] = useState<string>(TaxType.VAT);

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
            <label htmlFor="taxType">{dict.addExpense.taxType}</label>
            <select id="taxType" name="taxType" value={taxType} onChange={e => setTaxType(e.target.value)}>
                {
                    Object.keys(TaxType).map((key) => (
                        <option key={key}
                                value={key}>{dict.addExpense.taxTypeEnum[key as keyof typeof TaxType]}</option>
                    ))
                }
            </select>
            {taxType === TaxType.VAT && <input type="number" id="vat" name="vat" required/>}
            <label htmlFor="amount">{dict.addExpense.amount}</label>
            <input type="number" id="amount" name="amount" step="0.01" required/>
            <label htmlFor="date">{dict.addExpense.date}</label>
            <input type="date" id="date" name="date" defaultValue={isoDateString}/>
            <label htmlFor="file">{dict.addExpense.file}</label>
            <input type="file" name="file" id="file"/>
            <button type="submit" style={{width: "auto",}}>{dict.addExpense.addExpense}</button>
        </form>
    )
}
