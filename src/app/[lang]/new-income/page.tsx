import {IncomeForm} from "@/app/[lang]/new-income/incomeForm";
import {getLocalizationContext} from "@/lib/server-contexts";
import {getDictionary, Locales} from "@/translation/dictionaries";

export default async function NewIncomePage({params}: { params: { lang: Locales } }) {
    getLocalizationContext().resolve({
        locale: params.lang,
        dict: getDictionary(params.lang)
    });

    const {dict} = await getLocalizationContext();

    return <>
        <h1>{dict.addIncome.addIncome}</h1>
        <IncomeForm/>
    </>
}

