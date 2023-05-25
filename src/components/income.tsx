import {Income} from "@prisma/client";

type IncomeProps = {
    income: Income;
}

export default function IncomeCard({income}: IncomeProps) {
    return (
        <div className="income-card">
            <h2 className="income-card__title">{income.name}</h2>
            <p className="income-card__amount">{income.amount}</p>
            <p className="income-card__date">{income.date.toLocaleDateString()}</p>
        </div>
    )
}