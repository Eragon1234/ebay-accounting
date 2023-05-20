import {Expense} from "@prisma/client";

type ExpenseProps = {
    expense: Expense;
}

export default function ExpenseCard({expense}: ExpenseProps) {
    return (
        <div className="expense-card">
            <h2 className="expense-card__title">{expense.name}</h2>
            <p className="expense-card__amount">{expense.amount}</p>
            <p className="expense-card__date">{expense.date.toLocaleDateString()}</p>
            <p className="expense-card__type">{expense.type}</p>
        </div>
    )
}