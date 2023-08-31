"use client";

import {useSearchParams} from "next/navigation";
import Link from "next/link";

const PAGE_SIZE = 5

type UsePaginate = {
    page: number
    take: number
    skip: number
    pageCount: number
}

export function usePaginate(itemCount: number, pageSearchParam: string = "page", pageSize: number = PAGE_SIZE): UsePaginate {
    const searchParams = useSearchParams()
    const pageParam = searchParams.get(pageSearchParam) ?? "1"
    const page = parseInt(pageParam)

    const take = PAGE_SIZE
    const skip = (page - 1) * PAGE_SIZE

    const pageCount = Math.ceil(itemCount / pageSize)

    return {page, take, skip, pageCount}
}

type PaginateProps = {
    pageCount: number
    currentPage: number
}

export function Paginate({pageCount, currentPage}: PaginateProps) {
    const pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    if (pageCount <= 1) {
        return null
    }

    return (
        <div className="pagination-nav">
            {
                pages.map((page) => {
                    return <Link key={page}
                                 href={`/incomes?page=${page}`}
                                 className={"pagination-nav__item " +
                                     (page === currentPage ? "pagination-nav__item--active" : "")}>
                        {
                            page
                        }
                    </Link>
                })
            }
        </div>
    )
}