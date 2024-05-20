import {ExpenseForm} from "@/app/[lang]/new-expense/expenseForm";
import {getLocalizationContext} from "@/lib/server-contexts";
import {getDictionary, Locales} from "@/translation/dictionaries";

export default async function NewExpensePage({params}: { params: { lang: Locales } }) {
    getLocalizationContext().resolve({
        locale: params.lang,
        dict: getDictionary(params.lang)
    });

    const {dict} = await getLocalizationContext();

    return <>
        <h1>{dict.addExpense.addExpense}</h1>
        <ExpenseForm/>
    </>
}
