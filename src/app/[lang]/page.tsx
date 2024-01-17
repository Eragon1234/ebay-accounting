import {getYearlyIncome} from "@/db/income";
import {getYearlyExpense} from "@/db/expense";
import {getDictionary, Locales} from "@/translation/dictionaries";
import {euroToMicroEuro} from "@/db/schema";

export const dynamic = "force-dynamic";

export default async function Home({params}: { params: { lang: Locales } }) {
    const dict = await getDictionary(params.lang);

    const income = await getYearlyIncome() / euroToMicroEuro;
    const expense = await getYearlyExpense() / euroToMicroEuro;

    const earnings = income - expense;

    return <>
        <div className="card dashboard-card">
            <div className="dashboard-card__title">
                {dict.home.income}
            </div>
            <div className="dashboard-card__amount">
                {income.toFixed(2)} €
            </div>
        </div>
        <div className="card dashboard-card">
            <div className="dashboard-card__title">
                {dict.home.earnings}
            </div>
            <div className="dashboard-card__amount">
                {earnings.toFixed(2)} €
            </div>
        </div>
    </>
}
