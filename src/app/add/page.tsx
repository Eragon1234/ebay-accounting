import Link from "next/link";
import IncomeIcon from "@/components/icons/income-icon";
import ExpenseIcon from "@/components/icons/expense-icon";

export default function Add() {
    return (
        <div style={{
            display: "contents",
            textAlign: "center",
        }}>
            <h1>Create new</h1>
            <Link href="/incomes/new" className="add-option">
                <IncomeIcon />Income
            </Link>
            <Link href="/expenses/new" className="add-option">
                <ExpenseIcon />Expense
            </Link>
        </div>
    )
}