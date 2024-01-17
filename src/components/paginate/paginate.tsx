import Link from "next/link";
import "./paginate.css";

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