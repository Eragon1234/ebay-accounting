import {calculatePagination, parsePageFromSearchParams} from "@/lib/paginate";
import Table from "@/components/table/table";
import SearchParams from "@/types/searchParams";
import {countExpenses, getExpenses} from "@/db/expense";
import {Paginate} from "@/components/paginate/paginate";
import {getDictionary, Locales} from "@/translation/dictionaries";
import {TaxType, euroToMicroEuro} from "@/db/schema";

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

    const formatType = (type: keyof typeof TaxType, vat: number | null) => {
        if (type === TaxType.VAT) {
            return `${dict.expenses.expenseType.VAT} ${vat}%`;
        }
        return dict.expenses.expenseType[type];
    }

    return <>
        <h1>{dict.expenses.expenses}</h1>
        <Table columns={[
            {header: dict.expenses.name, render: a => a.name},
            {header: dict.expenses.amount, render: a => `${a.amount / euroToMicroEuro} €`},
            {header: dict.expenses.type, render: a => formatType(a.taxType, a.vat)},
            {header: dict.expenses.date, render: a => new Date(a.date).toLocaleDateString()},
        ]} data={expenses}/>
        <Paginate {...pagination}/>
    </>
}
