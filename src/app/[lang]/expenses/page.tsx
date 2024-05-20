import {calculatePagination, parsePageFromSearchParams} from "@/lib/paginate";
import Table from "@/components/table/table";
import SearchParams from "@/types/searchParams";
import {countExpenses, getExpenses} from "@/db/expense";
import {Paginate} from "@/components/paginate/paginate";
import {Locales} from "@/translation/dictionaries";
import {euroToMicroEuro, TaxType} from "@/db/schema";
import Actions from "@/app/[lang]/expenses/actions";
import {getLocalizationContext} from "@/lib/server-context";

const PAGE_SIZE = 50;

export default async function Expenses({params, searchParams}: {
    params: { lang: Locales },
    searchParams: SearchParams
}) {
    const {dict} = getLocalizationContext();

    const page = parsePageFromSearchParams(searchParams);

    const expenseCount = await countExpenses();

    const pagination = calculatePagination(page, expenseCount, PAGE_SIZE);

    const expenses = await getExpenses(PAGE_SIZE, pagination.skip);

    const formatType = (type: keyof typeof TaxType, vat: number | null) => {
        if (type === TaxType.VAT) {
            return `${dict.expenses.taxTypeEnum.VAT} ${vat}%`;
        }
        return dict.expenses.taxTypeEnum[type];
    }

    return <>
        <h1>{dict.expenses.expenses}</h1>
        <Table columns={[
            {header: dict.expenses.name, render: a => a.name},
            {header: dict.expenses.type, render: a => a.type},
            {header: dict.expenses.amount, render: a => `${a.amount / euroToMicroEuro} €`},
            {header: dict.expenses.taxType, render: a => formatType(a.taxType, a.vat)},
            {header: dict.expenses.date, render: a => new Date(a.date).toLocaleDateString()},
            {header: "", render: a => <Actions expense={a}/>}
        ]} data={expenses}/>
        <Paginate {...pagination}/>
    </>
}
