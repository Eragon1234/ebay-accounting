import Link from "next/link";
import SearchParams from "@/types/searchParams";

export function parsePageFromSearchParams(searchParams: SearchParams): number {
    const val = searchParams["page"];

    if (!val) {
        return 1;
    }

    if (Array.isArray(val)) {
        return Number(val[0]) || 1;
    }

    return Number(val) || 1;
}

type UsePaginate = {
    currentPage: number
    take: number
    skip: number
    pageCount: number
}

export function calculatePagination(page: number, itemCount: number, pageSize: number): UsePaginate {
    const take = pageSize;
    const skip = (page - 1) * pageSize;

    const pageCount = Math.ceil(itemCount / pageSize)

    return {currentPage: page, take, skip, pageCount}
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
                                 href={`?page=${page}`}
                                 className={"pagination-nav__item " +
                                     (page === currentPage && "pagination-nav__item--active")}>
                        {
                            page
                        }
                    </Link>
                })
            }
        </div>
    )
}