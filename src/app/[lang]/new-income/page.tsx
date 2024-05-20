import {IncomeForm} from "@/app/[lang]/new-income/incomeForm";
import {getLocalizationContext} from "@/lib/server-context";

export default async function NewIncomePage() {
    const {dict} = getLocalizationContext();

    return <>
        <h1>{dict.addIncome.addIncome}</h1>
        <IncomeForm/>
    </>
}

