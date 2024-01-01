"use client";

import {useEffect, useState} from "react";
import {Expense} from "@prisma/client";
import {countExpenses, getExpenses} from "@/db/expense";
import {Paginate, usePaginate} from "@/lib/paginate";
import Table from "@/components/table/table";

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
        <Table columns={[
            {header: "Name", render: a => a.name},
            {header: "Amount", render: a => a.amount},
            {header: "Type", render: a => a.type},
            {header: "Date", render: a => a.date.toLocaleDateString()},
        ]} data={expenses}/>
        <Paginate pageCount={pageCount} currentPage={page}/>
    </>
}