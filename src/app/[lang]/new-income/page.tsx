import {IncomeForm} from "@/app/[lang]/new-income/incomeForm";
import {getLocalizationContext} from "@/lib/server-contexts";

export default async function NewIncomePage() {
    const {dict} = (await getLocalizationContext());

    return <>
        <h1>{dict.addIncome.addIncome}</h1>
        <IncomeForm/>
    </>
}

