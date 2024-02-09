import {IncomeForm} from "@/app/[lang]/incomes/new/incomeForm";
import {getDictionary, Locales} from "@/translation/dictionaries";

export default async function NewIncomePage({params}: { params: { lang: Locales } }) {
    const dict = await getDictionary(params.lang);

    return <>
        <h1>{dict.addIncome.addIncome}</h1>
        <IncomeForm lang={params.lang}/>
    </>
}

