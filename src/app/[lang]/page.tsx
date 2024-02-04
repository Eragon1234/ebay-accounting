import {getIncomeInRange} from "@/db/income";
import {getExpenseInRange, getExpenseInRangeByType} from "@/db/expense";
import {getDictionary, Locales} from "@/translation/dictionaries";
import {euroToMicroEuro} from "@/db/schema";
import {getVATInRange} from "@/db/tax";

export const dynamic = "force-dynamic";

export default async function Home({params}: { params: { lang: Locales } }) {
    const dict = await getDictionary(params.lang);

    const now = new Date();
    const yearBegin = new Date(Date.UTC(now.getFullYear(), 0));
    const yearEnd = new Date(Date.UTC(now.getFullYear(), 11, 31));

    const income = await getIncomeInRange(yearBegin, yearEnd) / euroToMicroEuro;
    const expense = await getExpenseInRange(yearBegin, yearEnd) / euroToMicroEuro;
    const earnings = income - expense;

    const vatToPay = await getVATInRange(yearBegin, yearEnd) / euroToMicroEuro;

    const expenseByType = await getExpenseInRangeByType(yearBegin, yearEnd);

    return <>
        <div className="dashboard">
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
            <div className="card dashboard-card">
                <div className="dashboard-card__title">
                    {dict.home.vatToPay}
                </div>
                <div className="dashboard-card__amount">
                    {vatToPay.toFixed(2)} €
                </div>
            </div>
            {Object.keys(expenseByType).map(type =>
                <div key={type} className="card dashboard-card">
                    <div className="dashboard-card__title">
                        {type}
                    </div>
                    <div className="dashboard-card__amount">
                        {(expenseByType[type] / euroToMicroEuro).toFixed(2)} €
                    </div>
                </div>
            )}
        </div>
    </>
}
