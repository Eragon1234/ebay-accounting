import {getIncomeInRange} from "@/db/income";
import {getExpenseInRange} from "@/db/expense";
import {getDictionary, Locales} from "@/translation/dictionaries";
import {euroToMicroEuro} from "@/db/schema";

export const dynamic = "force-dynamic";

export default async function Home({params}: { params: { lang: Locales } }) {
    const dict = await getDictionary(params.lang);

    const now = new Date();
    const yearBegin = new Date(now.getFullYear(), 0);
    const yearEnd = new Date(now.getFullYear(), 11, 31);

    const income = await getIncomeInRange(yearBegin, yearEnd) / euroToMicroEuro;
    const expense = await getExpenseInRange(yearBegin, yearEnd) / euroToMicroEuro;

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
