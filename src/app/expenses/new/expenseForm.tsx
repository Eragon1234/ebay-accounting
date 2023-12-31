"use client";

import {ExpenseType} from "@prisma/client";
import createExpenseFromForm from "@/db/expense";
import {useState} from "react";

export function ExpenseForm() {
    const today = new Date();
    const isoDateString = today.toISOString().slice(0, 10);

    const [type, setType] = useState(ExpenseType.VAT.toString());

    return (
        <form action={createExpenseFromForm}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required/>
            <label htmlFor="type">Type</label>
            <select id="type" name="type" value={type} onChange={e => setType(e.target.value)}>
                {
                    Object.keys(ExpenseType).map((key) => (
                        <option key={key} value={key}>{ExpenseType[key as keyof typeof ExpenseType]}</option>
                    ))
                }
            </select>
            {type === ExpenseType.VAT && <input type="number" id="vat" name="vat" required/>}
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" name="amount" required/>
            <label htmlFor="date">Date</label>
            <input type="date" id="date" name="date" defaultValue={isoDateString}/>
            <label htmlFor="files">Files</label>
            <input type="file" name="files" id="files" multiple/>
            <button type="submit" style={{width: "auto",}}>Add Expense</button>
        </form>
    )
}
