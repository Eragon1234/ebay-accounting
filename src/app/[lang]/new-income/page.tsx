import {IncomeForm} from "@/app/[lang]/new-income/incomeForm";
import {getLocalization} from "@/translation/dictionaries";

export default async function NewIncomePage(props: PageProps<'/[lang]/new-income'>) {
    const params = await props.params;
    const localization = getLocalization(params.lang);
    const dict = localization.dict;

    return <>
        <h1>{dict.addIncome.addIncome}</h1>
        <IncomeForm localization={localization}/>
    </>
}

