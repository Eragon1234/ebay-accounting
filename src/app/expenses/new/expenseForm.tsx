import {ExpenseType} from "@prisma/client";
import saveExpense from "@/app/expenses/new/saveExpense";

export function ExpenseForm() {
    return (
        <form action={saveExpense}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name"/>
            <label htmlFor="type">Type</label>
            <select id="type" name="type">
                {
                    Object.keys(ExpenseType).map((key) => (
                        <option key={key} value={key}>{ExpenseType[key as keyof typeof ExpenseType]}</option>
                    ))
                }
            </select>
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" name="amount"/>
            <label htmlFor="date">Date</label>
            <input type="date" id="date" name="date"/>
            <button type="submit" style={{width: "auto",}}>Add Expense</button>
        </form>
    )
}
