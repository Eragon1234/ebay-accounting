import {saveIncome} from "@/app/incomes/new/saveIncome";
import MultiSelect from "@/components/multi-select";
import prisma from "@/db";

export function IncomeForm() {
    const searchExpenses = async (search: string): Promise<{ [key: string]: string }> => {
        "use server";
        const expenses = await prisma.expense.findMany({
            where: {
                name: {
                    contains: search
                }
            }
        });

        return expenses.reduce((map, expense) => {
            map[expense.id] = expense.name;
            return map;
        }, {} as { [key: string]: string });
    }
    return (
        <form action={saveIncome}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name"/>
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" name="amount"/>
            <label htmlFor="date">Date</label>
            <input type="date" id="date" name="date"/>
            <label htmlFor="expenses">Expenses</label>
            <MultiSelect name={"expenses"} updateOptions={searchExpenses}/>
            <button type="submit" style={{width: "auto"}}>Add Income</button>
        </form>
    )
}
