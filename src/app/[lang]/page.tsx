import React from "react";
import {Dict, getLocalization, Locales} from "@/translation/dictionaries";
import {euroToMicroEuro} from "@/db/schema";
import {getIncomeInRange} from "@/db/income";
import DashboardCard from "@/app/[lang]/dashboard-card";
import {getExpenseInRange, getExpenseInRangeByType} from "@/db/expense";
import {calculateTaxableIncome, calculateVat, getDifferentialIncome, getPaidVatBetweenDates} from "@/db/tax";
import DateRangePicker from "@/components/date-range-picker/date-range-picker";
import ExpenseChart from "@/app/[lang]/ExpenseChart";

export const dynamic = "force-dynamic";

export default async function Home(
    props: {
        params: Promise<{ lang: Locales }>,
        searchParams: Promise<{ start: string, end: string }>
    }
) {
    const searchParams = await props.searchParams;
    const params = await props.params;
    const localization = getLocalization(params.lang);
    const dict = localization.dict;

    const now = new Date();
    const yearBegin = new Date(Date.UTC(now.getFullYear(), 0));
    const yearEnd = new Date(Date.UTC(now.getFullYear(), 11, 31));

    const rangeStart = new Date(searchParams.start || yearBegin);
    const rangeEnd = new Date(searchParams.end || yearEnd);

    const dashboardCards = await getDashboardCards(dict, rangeStart, rangeEnd);
    const expenseByType = await getExpenseInRangeByType(rangeStart, rangeEnd);

    return <>
        <DateRangePicker dict={dict} defaultStart={rangeStart} defaultEnd={rangeEnd}/>
        <div className="dashboard">
            {dashboardCards.map(card =>
                <DashboardCard key={card.title} {...card}/>
            )}
            <div className="card dashboard-card" style={{width: "100%"}}>
                <ExpenseChart data={expenseByType.map(v => ({...v, sum: v.total / euroToMicroEuro}))}/>
            </div>
        </div>
    </>
}

async function getDashboardCards(dict: Dict, start: Date, end: Date) {
    const [income, expense, expenseByType, paidVat, differentialIncome] = await Promise.all([
        getIncomeInRange(start, end),
        getExpenseInRange(start, end),
        getExpenseInRangeByType(start, end),
        getPaidVatBetweenDates(start, end),
        getDifferentialIncome(start, end)
    ]);

    const taxableIncome = await calculateTaxableIncome(income, differentialIncome);
    const vatToPay = await calculateVat(taxableIncome, paidVat);

    const earnings = income - expense;

    return [
        {
            title: dict.home.income,
            total: income / euroToMicroEuro,
            netto: (income - (vatToPay + paidVat)) / euroToMicroEuro,
            vat: (vatToPay + paidVat) / euroToMicroEuro
        },
        {
            title: dict.home.earnings,
            total: earnings / euroToMicroEuro
        },
        {
            title: dict.home.vatToPay,
            total: vatToPay / euroToMicroEuro
        },
        {
            title: dict.home.taxableIncome,
            total: taxableIncome / euroToMicroEuro,
            netto: (taxableIncome / 1.19) / euroToMicroEuro,
            vat: (taxableIncome - (taxableIncome / 1.19)) / euroToMicroEuro
        },
        {
            title: dict.home.paidVat,
            total: paidVat / euroToMicroEuro
        },
        ...expenseByType.map(v => ({
            title: v.type,
            total: v.total / euroToMicroEuro,
            netto: v.netto / euroToMicroEuro,
            vat: v.vat / euroToMicroEuro
        }))
    ]
}