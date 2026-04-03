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

    const [start, end] = pageWindow(pageCount, currentPage);

    return (
        <div className="pagination-nav">
            <Page page={1} isCurrent={currentPage === 1}/>
            {start > 2 && <Ellipsis/>}
            {
                range(start, end).map(page =>
                    <Page
                        key={page}
                        page={page}
                        isCurrent={currentPage === page}
                    />
                )
            }
            {end < pageCount - 1 && <Ellipsis/>}
            <Page page={pageCount} isCurrent={currentPage === pageCount}/>
        </div>
    )
}

const PAGES_AROUND_CURRENT = 2;

function pageWindow(pageCount: number, currentPage: number) {
    const twoPagesBefore = currentPage - PAGES_AROUND_CURRENT;
    const twoPagesAfter = currentPage + PAGES_AROUND_CURRENT;

    const startOverflow = Math.max(2 - twoPagesBefore, 0);
    const endOverflow = Math.min(pageCount - 1 - twoPagesAfter, 0);

    const start = clamp(twoPagesBefore + endOverflow, 2, pageCount - 1);
    const end = clamp(twoPagesAfter + startOverflow, 2, pageCount - 1);

    return [start, end]
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