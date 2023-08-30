"use client";

import {useSearchParams} from "next/navigation";
import Link from "next/link";
import IncomeCard from "@/components/income";
import {useEffect, useState} from "react";
import {countIncomes, getIncomes} from "@/lib/income";
import {Income} from "@prisma/client";

const PAGE_SIZE = 5;

export default function Incomes() {
    const searchParams = useSearchParams()
    const pageParam = searchParams.get("page") ?? "1"
    const page = parseInt(pageParam)

    const take = PAGE_SIZE
    const skip = (page - 1) * PAGE_SIZE

    const [incomeCount, setIncomeCount] = useState(0)
    const [incomes, setIncomes] = useState<Income[]>([])

    const pageCount = Math.ceil(incomeCount / PAGE_SIZE)

    useEffect(() => {
        countIncomes().then(setIncomeCount)
        getIncomes(take, skip).then(setIncomes)
    }, [skip, take])

    return <>
        <h1>Incomes</h1>
        {
            incomes.map(income => {
                return <IncomeCard key={income.id} income={income} />
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