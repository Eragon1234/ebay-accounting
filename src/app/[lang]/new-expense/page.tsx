import {ExpenseForm} from "@/app/[lang]/new-expense/expenseForm";
import {useContext} from "react";
import {LocalizationContext} from "@/lib/contexts";

export default async function NewExpensePage() {
    const {dict} = useContext(LocalizationContext);

    return <>
        <h1>{dict.addExpense.addExpense}</h1>
        <ExpenseForm/>
    </>
}
