import Link from "next/link";
import IncomeIcon from "@/components/icons/income-icon";
import ExpenseIcon from "@/components/icons/expense-icon";
import {getLocalizationContext} from "@/lib/server-context";

export default async function Add() {
    const {dict} = getLocalizationContext();

    return <>
        <h1>{dict.add.createNew}</h1>
        <Link href="/new-income" className="card add-option">
            <IncomeIcon/>{dict.add.income}
        </Link>
        <Link href="/new-expense" className="card add-option">
            <ExpenseIcon/>{dict.add.expense}
        </Link>
    </>
}