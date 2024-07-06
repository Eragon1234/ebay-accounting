import {IncomeForm} from "@/app/[lang]/new-income/incomeForm";
import {getDictionary, Locales} from "@/translation/dictionaries";

export default async function NewIncomePage({params}: { params: { lang: Locales } }) {
    const localization = {
        locale: params.lang,
        dict: getDictionary(params.lang)
    }
    const dict = localization.dict;

    return <>
        <h1>{dict.addIncome.addIncome}</h1>
        <IncomeForm localization={localization}/>
    </>
}

