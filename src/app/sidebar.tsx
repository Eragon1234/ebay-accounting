import Link from "next/link";

export default function Sidebar() {
    return (
        <div id="sidebar">
            <h1>eBay</h1>
            <nav>
                <Link href="/">Home</Link>
                <Link href="/expenses">Expenses</Link>
                <Link href="/incomes">Incomes</Link>
                <Link style={{
                    fontSize: "3.5rem",
                }} href="/add">+</Link>
            </nav>
        </div>
    )
}