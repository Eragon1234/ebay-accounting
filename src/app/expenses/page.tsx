"use client";

import {useEffect, useState} from "react";
import {Expense} from "@prisma/client";
import {countExpenses, getExpenses} from "@/db/expense";
import ExpenseCard from "@/components/expense";
import {Paginate, usePaginate} from "@/lib/paginate";

const PAGE_SIZE = 5;

export default function Expenses() {
    const [expenseCount, setExpenseCount] = useState(0)

    const {skip, take, page, pageCount} = usePaginate(expenseCount, PAGE_SIZE);

    const [expenses, setExpenses] = useState<Expense[]>([])

    useEffect(() => {
        countExpenses().then(setExpenseCount)
        getExpenses(take, skip).then(setExpenses)
    }, [skip, take])

    return <>
        <h1>Expenses</h1>
        {
            expenses.map(expense => {
                return <ExpenseCard key={expense.id} expense={expense}/>
            })
        }
        <Paginate pageCount={pageCount} currentPage={page}/>
    </>
}