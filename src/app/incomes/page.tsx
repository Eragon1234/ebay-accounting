"use client";

import IncomeCard from "@/components/income";
import {useEffect, useState} from "react";
import {countIncomes, getIncomes} from "@/lib/income";
import {Income} from "@prisma/client";
import {Paginate, usePaginate} from "@/lib/paginate";


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
        {
            incomes.map(income => {
                return <IncomeCard key={income.id} income={income}/>
            })
        }
        <Paginate pageCount={pageCount} currentPage={page}/>
    </>
}