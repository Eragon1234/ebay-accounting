import {ExpenseForm} from "@/app/[lang]/new-expense/expenseForm";
import {getLocalizationContext} from "@/lib/server-context";

export default async function NewExpensePage() {
    const {dict} = getLocalizationContext();

    return <>
        <h1>{dict.addExpense.addExpense}</h1>
        <ExpenseForm/>
    </>
}
