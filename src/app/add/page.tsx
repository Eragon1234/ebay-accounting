import Link from "next/link";

export default function Add() {
    return (
        <div style={{
            display: "contents",
            textAlign: "center",
        }}>
            <h1>Create new</h1>
            <Link href="/incomes/new" className="add-option">Income</Link>
            <Link href="/expenses/new" className="add-option">Expense</Link>
        </div>
    )
}