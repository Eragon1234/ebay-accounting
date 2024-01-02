import {getYearlyIncome} from "@/db/income";
import {getYearlyExpense} from "@/db/expense";

export default async function Home() {
    const income = await getYearlyIncome();
    const expense = await getYearlyExpense();

    const earnings = income - expense;

    return <>
        <div className="card dashboard-card">
            <div className="dashboard-card__title">
                Income
            </div>
            <div className="dashboard-card__amount">
                {income} €
            </div>
        </div>
        <div className="card dashboard-card">
            <div className="dashboard-card__title">
                Earnings
            </div>
            <div className="dashboard-card__amount">
                {earnings.toFixed(2)} €
            </div>
        </div>
    </>
}
