import {IncomeForm} from "@/app/[lang]/new-income/incomeForm";
import {useContext} from "react";
import {LocalizationContext} from "@/lib/contexts";

export default async function NewIncomePage() {
    const {dict} = useContext(LocalizationContext);

    return <>
        <h1>{dict.addIncome.addIncome}</h1>
        <IncomeForm/>
    </>
}

