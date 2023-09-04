import Link from "next/link";

export default function Header() {
    return (
        <header>
            <h1>eBay</h1>
            <nav>
                <Link href="/">Home</Link>
                <Link href="/expenses">Expenses</Link>
                <Link href="/incomes">Incomes</Link>
                <Link style={{
                    fontSize: "3.5rem",
                    alignSelf: "flex-start",
                }} href="/add">+</Link>
            </nav>
        </header>
    )
}