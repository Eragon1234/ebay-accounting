import {ExpenseForm} from "@/app/[lang]/new-expense/expenseForm";
import { getExpenseTypes } from "@/db/expense";
import {getDictionary, Locales} from "@/translation/dictionaries";

export default async function NewExpensePage(props: { params: Promise<{ lang: Locales }> }) {
    const params = await props.params;
    const localization = {
        locale: params.lang,
        dict: getDictionary(params.lang)
    };

    const {dict} = localization;

    const types = await getExpenseTypes();

    return <>
        <h1>{dict.addExpense.addExpense}</h1>
        <ExpenseForm localization={localization} types={types}/>
    </>
}
