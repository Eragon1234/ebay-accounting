import {calculatePagination, parsePageFromSearchParams} from "@/lib/paginate";
import Table from "@/components/table/table";
import SearchParams from "@/types/searchParams";
import {countExpenses, getExpenses} from "@/db/expense";
import {Paginate} from "@/components/paginate/paginate";
import {ExpenseType} from "@prisma/client";
import {getDictionary, Locales} from "@/translation/dictionaries";

const PAGE_SIZE = 50;

export default async function Expenses({params, searchParams}: {
    params: { lang: Locales },
    searchParams: SearchParams
}) {
    const dict = await getDictionary(params.lang);

    const page = parsePageFromSearchParams(searchParams);

    const expenseCount = await countExpenses();

    const pagination = calculatePagination(page, expenseCount, PAGE_SIZE);

    const expenses = await getExpenses(PAGE_SIZE, pagination.skip);

    const formatType = (type: ExpenseType, vat: number | null) => {
        if (type === ExpenseType.VAT) {
            return `${dict.expenses.expenseType.VAT} ${vat}%`;
        }
        return dict.expenses.expenseType[type];
    }

    return <>
        <h1>{dict.expenses.expenses}</h1>
        <Table columns={[
            {header: dict.expenses.name, render: a => a.name},
            {header: dict.expenses.amount, render: a => `${a.amount} €`},
            {header: dict.expenses.type, render: a => formatType(a.type, a.vat)},
            {header: dict.expenses.date, render: a => a.date.toLocaleDateString()},
        ]} data={expenses}/>
        <Paginate {...pagination}/>
    </>
}
