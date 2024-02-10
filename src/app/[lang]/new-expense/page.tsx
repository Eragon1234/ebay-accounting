import {ExpenseForm} from "@/app/[lang]/new-expense/expenseForm";
import {getDictionary, Locales} from "@/translation/dictionaries";

export default async function NewExpensePage({params}: { params: { lang: Locales } }) {
    const dict = await getDictionary(params.lang);

    return <>
        <h1>{dict.addExpense.addExpense}</h1>
        <ExpenseForm lang={params.lang}/>
    </>
}
