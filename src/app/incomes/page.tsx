import {countIncomes, getIncomes} from "@/db/income";
import Table from "@/components/table/table";
import {calculatePagination, parsePageFromSearchParams} from "@/lib/paginate";
import SearchParams from "@/types/searchParams";
import {Paginate} from "@/components/paginate/paginate";

const PAGE_SIZE = 50;

export default async function Incomes({searchParams}: { searchParams: SearchParams }) {
    const page = parsePageFromSearchParams(searchParams);

    const incomeCount = await countIncomes();

    const pagination = calculatePagination(page, incomeCount, PAGE_SIZE);

    const incomes = await getIncomes(PAGE_SIZE, pagination.skip);

    return <>
        <h1>Incomes</h1>
        <Table columns={[
            {header: "Name", render: a => a.name},
            {header: "Amount", render: a => `${a.amount} €`},
            {header: "Date", render: a => a.date.toLocaleDateString()}
        ]} data={incomes}/>
        <Paginate {...pagination}/>
    </>
}