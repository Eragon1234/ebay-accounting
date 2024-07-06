import {ExpenseForm} from "@/app/[lang]/new-expense/expenseForm";
import {getDictionary, Locales} from "@/translation/dictionaries";

export default async function NewExpensePage({params}: { params: { lang: Locales } }) {
    const localization = {
        locale: params.lang,
        dict: getDictionary(params.lang)
    };

    const {dict} = localization;

    return <>
        <h1>{dict.addExpense.addExpense}</h1>
        <ExpenseForm localization={localization}/>
    </>
}
