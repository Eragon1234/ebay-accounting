import {getIncomeInRange} from "@/db/income";
import {euroToMicroEuro} from "@/db/schema";
import {getExpenseInRange, getExpenseInRangeByType} from "@/db/expense";
import {getVATInRange} from "@/db/tax";
import {Dict} from "@/translation/dictionaries";

type DashboardProps = {
    dict: Dict,
    rangeStart: Date,
    rangeEnd: Date
}

export default async function Dashboard({dict, rangeStart, rangeEnd}: DashboardProps) {
    const income = await getIncomeInRange(rangeStart, rangeEnd);
    const expense = await getExpenseInRange(rangeStart, rangeEnd);
    const vatToPay = await getVATInRange(rangeStart, rangeEnd);
    const expenseByType = await getExpenseInRangeByType(rangeStart, rangeEnd);

    const earnings = income - expense;

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