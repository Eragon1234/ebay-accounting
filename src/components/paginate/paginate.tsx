import Link from "next/link";
import "./paginate.css";
import clamp from "@/lib/clamp";
import range from "@/lib/range";

type PaginateProps = {
    pageCount: number
    currentPage: number
}

export function Paginate({pageCount, currentPage}: PaginateProps) {
    if (pageCount < 2) {
        return null;
    }

    const start = clamp(currentPage - 2, 2, pageCount);
    const end = clamp(currentPage + 2, 2, pageCount);

    return (
        <div className="pagination-nav">
            <Page page={1} isCurrent={currentPage === 1}/>
            <Ellipsis/>
            {
                range(start, end).map(page =>
                    <Page
                        key={page}
                        page={page}
                        isCurrent={currentPage === page}
                    />
                )
            }
            <Ellipsis/>
            <Page page={pageCount - 1} isCurrent={currentPage === pageCount - 1}/>
        </div>
    )
}

function Page({page, isCurrent}: { page: number, isCurrent: boolean }) {
    return (
        <Link href={`?page=${page}`}
              className={"pagination-nav__item " + (isCurrent && "pagination-nav__item--active")}>
            {page}
        </Link>
    )
}

function Ellipsis() {
    return <span className="pagination-nav__item">...</span>
}