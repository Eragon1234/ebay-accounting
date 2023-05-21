import prisma from "@/db";
import ExpenseCard from "@/components/expense";

export default async function Expenses() {
    const expenses = await prisma.expense.findMany();

    return (
        <>
            <h1>Expenses</h1>
            {
                expenses.map(expense => {
                    return <ExpenseCard key={expense.id} expense={expense} />
                })
            }
        </>
    )
}