import prisma from "@/db";
import {ExpenseType} from "@prisma/client";

export default function NewExpensePage() {
    return (
        <div>
            <h1>New Expense</h1>
            <ExpenseForm/>
        </div>
    )
}

function ExpenseForm() {
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

async function saveExpense(formData: FormData) {
    "use server";
    const name = formData.get("name");
    const amount = formData.get("amount");
    const type = formData.get("type");
    const date = formData.get("date");

    await prisma.expense.create({
        data: {
            name: name as string,
            type: ExpenseType[type as keyof typeof ExpenseType],
            amount: Number(amount),
            date: new Date(date as string)
        }
    });
}