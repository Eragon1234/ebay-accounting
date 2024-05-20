import {createIncomeFromForm} from "@/db/income";
import {SubmitButton} from "@/components/submit-button/submitButton";
import {getLocalizationContext} from "@/lib/server-contexts";

export async function IncomeForm() {
    const {dict, locale} = (await getLocalizationContext());

    const today = new Date();
    const isoDateString = today.toISOString().slice(0, 10);

    const action = createIncomeFromForm.bind(null, locale);

    return (
        <form action={action}>
            <label htmlFor="name">{dict.addIncome.name}</label>
            <input type="text" id="name" name="name" required/>
            <label htmlFor="amount">{dict.addIncome.amount}</label>
            <input type="number" id="amount" name="amount" step="0.01" required/>
            <label htmlFor="date">{dict.addIncome.date}</label>
            <input type="date" id="date" name="date" defaultValue={isoDateString} required/>
            <label htmlFor="file">{dict.addIncome.file}</label>
            <input type="file" name="file" id="file"/>
            <SubmitButton text={dict.addIncome.addIncome}/>
        </form>
    )
}
