"use client";

import {useSearchParams} from "next/navigation";
import Link from "next/link";
import {useEffect, useState} from "react";
import {Expense} from "@prisma/client";
import {countExpenses, getExpenses} from "@/lib/expense";
import ExpenseCard from "@/components/expense";

const PAGE_SIZE = 5;

export default function Expenses() {
    const searchParams = useSearchParams()
    const pageParam = searchParams.get("page") ?? "1"
    const page = parseInt(pageParam)

    const take = PAGE_SIZE
    const skip = (page - 1) * PAGE_SIZE

    const [expenseCount, setExpenseCount] = useState(0)
    const [expenses, setExpenses] = useState<Expense[]>([])

    const pageCount = Math.ceil(expenseCount / PAGE_SIZE)

    useEffect(() => {
        countExpenses().then(setExpenseCount)
        getExpenses(take, skip).then(setExpenses)
    }, [skip, take])

    return <>
        <h1>Expenses</h1>
        {
            expenses.map(expense => {
                return <ExpenseCard key={expense.id} expense={expense} />
            })
        }
        {pageCount > 1 &&
            <div className="pagination-nav">
                {
                    Array.from({length: pageCount}).map((_, i) => {
                        return <Link key={i}
                                     href={`/incomes?page=${i + 1}`}
                                     className={"pagination-nav__item " +
                                         (i + 1 === page ? "pagination-nav__item--active" : "")}
                        >
                            {i + 1}
                        </Link>
                    })
                }
            </div>
        }
    </>
}