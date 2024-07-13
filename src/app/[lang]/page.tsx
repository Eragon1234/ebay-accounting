import React from "react";
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

    const dashboardCards = await getDashboardCards(dict, rangeStart, rangeEnd);

    return <>
        <DateRangePicker dict={dict} defaultStart={rangeStart} defaultEnd={rangeEnd}/>
        <div className="dashboard">
            {dashboardCards.map(card =>
                <DashboardCard key={card.title} title={card.title} amount={card.amount}/>
            )}
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
            amount: income / euroToMicroEuro
        },
        {
            title: dict.home.earnings,
            amount: earnings / euroToMicroEuro
        },
        {
            title: dict.home.vatToPay,
            amount: vatToPay / euroToMicroEuro
        },
        {
            title: dict.home.taxableIncome,
            amount: taxableIncome / euroToMicroEuro
        },
        {
            title: dict.home.paidVat,
            amount: paidVat / euroToMicroEuro
        },
        ...expenseByType.map(v => ({title: v.type, amount: v.sum / euroToMicroEuro}))
    ]
}