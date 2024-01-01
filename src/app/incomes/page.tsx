"use client";

import {useEffect, useState} from "react";
import {countIncomes, getIncomes} from "@/db/income";
import {Income} from "@prisma/client";
import {Paginate, usePaginate} from "@/lib/paginate";
import Table from "@/components/table/table";

const PAGE_SIZE = 5;

export default function Incomes() {
    const [incomeCount, setIncomeCount] = useState(0)

    const {skip, take, page, pageCount} = usePaginate(incomeCount, PAGE_SIZE);

    const [incomes, setIncomes] = useState<Income[]>([])

    useEffect(() => {
        countIncomes().then(setIncomeCount)
        getIncomes(take, skip).then(setIncomes)
    }, [skip, take])

    return <>
        <h1>Incomes</h1>
        <Table columns={[
            {header: "Name", render: a => a.name},
            {header: "Amount", render: a => a.amount},
            {header: "Date", render: a => a.date.toLocaleDateString()}
        ]} data={incomes}/>
        <Paginate pageCount={pageCount} currentPage={page}/>
    </>
}