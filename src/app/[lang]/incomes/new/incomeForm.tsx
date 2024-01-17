import {createIncomeFromForm} from "@/db/income";
import {getDictionary, Locales} from "@/translation/dictionaries";

export async function IncomeForm({lang}: { lang: Locales }) {
    const dict = await getDictionary(lang);

    const today = new Date();
    const isoDateString = today.toISOString().slice(0, 10);

    return (
        <form action={createIncomeFromForm}>
            <label htmlFor="name">{dict.addIncome.name}</label>
            <input type="text" id="name" name="name" required/>
            <label htmlFor="amount">{dict.addIncome.amount}</label>
            <input type="number" id="amount" name="amount" step="0.01" required/>
            <label htmlFor="date">{dict.addIncome.date}</label>
            <input type="date" id="date" name="date" defaultValue={isoDateString} required/>
            <label htmlFor="file">{dict.addIncome.files}</label>
            <input type="file" name="file" id="file"/>
            <button type="submit" style={{width: "auto"}}>{dict.addIncome.addIncome}</button>
        </form>
    )
}
