import {countIncomes, getIncomes} from "@/db/income";
import Table from "@/components/table/table";
import {calculatePagination, parsePageFromSearchParams} from "@/lib/paginate";
import SearchParams from "@/types/searchParams";
import {Paginate} from "@/components/paginate/paginate";
import {Locales} from "@/translation/dictionaries";
import {euroToMicroEuro} from "@/db/schema";
import {Actions} from "@/app/[lang]/incomes/actions";
import {getLocalizationContext} from "@/lib/server-context";

const PAGE_SIZE = 50;

export default async function Incomes({params, searchParams}: {
    params: { lang: Locales }
    searchParams: SearchParams
}) {
    const {dict} = getLocalizationContext();

    const page = parsePageFromSearchParams(searchParams);

    const incomeCount = await countIncomes();

    const pagination = calculatePagination(page, incomeCount, PAGE_SIZE);

    const incomes = await getIncomes(PAGE_SIZE, pagination.skip);

    return <>
        <h1>{dict.incomes.incomes}</h1>
        <Table columns={[
            {header: dict.incomes.name, render: a => a.name},
            {header: dict.incomes.amount, render: a => `${a.amount / euroToMicroEuro} €`},
            {header: dict.incomes.date, render: a => new Date(a.date).toLocaleDateString()},
            {header: "", render: a => <Actions income={a}/>},
        ]} data={incomes}/>
        <Paginate {...pagination}/>
    </>
}