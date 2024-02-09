import {ExpenseForm} from "@/app/[lang]/expenses/new/expenseForm";
import {getDictionary, Locales} from "@/translation/dictionaries";

export default async function NewExpensePage({params}: { params: { lang: Locales } }) {
    const dict = await getDictionary(params.lang);

    return <>
        <h1>{dict.addExpense.addExpense}</h1>
        <ExpenseForm dict={dict}/>
    </>
}
