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
