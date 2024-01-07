import Link from "next/link";
import IncomeIcon from "@/components/icons/income-icon";
import ExpenseIcon from "@/components/icons/expense-icon";
import {getDictionary, Locales} from "@/translation/dictionaries";

export default async function Add({params}: { params: { lang: Locales } }) {
    const dict = await getDictionary(params.lang);

    return <>
        <h1>{dict.add.createNew}</h1>
        <Link href="/incomes/new" className="card add-option">
            <IncomeIcon/>{dict.add.income}
        </Link>
        <Link href="/expenses/new" className="card add-option">
            <ExpenseIcon/>{dict.add.expense}
        </Link>
    </>
}