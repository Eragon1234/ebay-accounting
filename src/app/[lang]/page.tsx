import React, {Suspense} from "react";
import {Dict, getDictionary, Locales} from "@/translation/dictionaries";
import {euroToMicroEuro} from "@/db/schema";
import {getIncomeInRange} from "@/db/income";
import DashboardCard from "@/app/[lang]/dashboard-card";
import {getExpenseInRange, getExpenseInRangeByType} from "@/db/expense";
import {calculateTaxableIncome, calculateVat, getDifferentialIncome, getPaidVatBetweenDates} from "@/db/tax";
import DateRangePicker from "@/components/date-range-picker/date-range-picker";

export const dynamic = "force-dynamic";

export default async function Home({params, searchParams}: {
    params: { lang: Locales },
    searchParams: { start: string, end: string }
}) {
    const localization = {
        locale: params.lang,
        dict: getDictionary(params.lang)
    }
    const dict = localization.dict;

    const now = new Date();
    const yearBegin = new Date(Date.UTC(now.getFullYear(), 0));
    const yearEnd = new Date(Date.UTC(now.getFullYear(), 11, 31));

    const rangeStart = new Date(searchParams.start || yearBegin);
    const rangeEnd = new Date(searchParams.end || yearEnd);

    const dashboardCards = getDashboardCards(dict, rangeStart, rangeEnd);

    return <>
        <DateRangePicker dict={dict} defaultStart={yearBegin} defaultEnd={yearEnd}/>
        <div className="dashboard">
            {dashboardCards.map(card =>
                <Suspense key={card.title} fallback={<DashboardCard title={card.title} getAmount={async () => 0}/>}>
                    <DashboardCard title={card.title} getAmount={card.getAmount}/>
                </Suspense>
            )}
            {(await getExpenseInRangeByType(rangeStart, rangeEnd)).map(card =>
                <DashboardCard key={card.type} title={card.type} getAmount={async () => card.sum}/>
            )}
        </div>
    </>
}

function getDashboardCards(dict: Dict, rangeStart: Date, rangeEnd: Date) {
    const income = getIncomeInRange(rangeStart, rangeEnd);
    const expense = getExpenseInRange(rangeStart, rangeEnd);
    const paidVat = getPaidVatBetweenDates(rangeStart, rangeEnd);
    const differentialIncome = getDifferentialIncome(rangeStart, rangeEnd);
    const taxableIncome = (async () => {
        return calculateTaxableIncome(await income, await differentialIncome);
    })();

    return [
        {
            title: dict.home.income,
            async getAmount() {
                return await income / euroToMicroEuro;
            },
        },
        {
            title: dict.home.earnings,
            async getAmount() {
                return (await income - await expense) / euroToMicroEuro;
            }
        },
        {
            title: dict.home.vatToPay,
            async getAmount() {
                return await calculateVat(await taxableIncome, await paidVat) / euroToMicroEuro;
            },
        },
        {
            title: dict.home.taxableIncome,
            async getAmount() {
                return await taxableIncome / euroToMicroEuro;
            }
        },
        {
            title: dict.home.paidVat,
            async getAmount() {
                return await paidVat / euroToMicroEuro;
            }
        },
    ]
}
