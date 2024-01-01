import {calculatePagination, parsePageFromSearchParams} from "@/lib/paginate";
import Table from "@/components/table/table";
import SearchParams from "@/types/searchParams";
import {countExpenses, getExpenses} from "@/db/expense";
import {Paginate} from "@/components/paginate/paginate";
import {ExpenseType} from "@prisma/client";

const PAGE_SIZE = 50;

export default async function Expenses({searchParams}: {searchParams: SearchParams}) {
    const page = parsePageFromSearchParams(searchParams);

    const expenseCount = await countExpenses();

    const pagination = calculatePagination(page, expenseCount, PAGE_SIZE);

    const expenses = await getExpenses(PAGE_SIZE, pagination.skip);

    return <>
        <h1>Expenses</h1>
        <Table columns={[
            {header: "Name", render: a => a.name},
            {header: "Amount", render: a => a.amount},
            {header: "Type", render: a => a.type === ExpenseType.VAT ? `VAT ${a.vat}%` : a.type},
            {header: "Date", render: a => a.date.toLocaleDateString()},
        ]} data={expenses}/>
        <Paginate {...pagination}/>
    </>
}