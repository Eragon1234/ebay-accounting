import {ExpenseForm} from "@/app/[lang]/new-expense/expenseForm";
import {getLocalizationContext} from "@/lib/server-contexts";

export default async function NewExpensePage() {
    const {dict} = (await getLocalizationContext());

    return <>
        <h1>{dict.addExpense.addExpense}</h1>
        <ExpenseForm/>
    </>
}
