"use client";

import React, {Suspense, useState} from "react";
import {Dict, getDictionary, Locales} from "@/translation/dictionaries";
import {euroToMicroEuro} from "@/db/schema";
import {getIncomeInRange} from "@/db/income";
import DashboardCard from "@/app/[lang]/dashboard-card";
import {getExpenseInRange} from "@/db/expense";
import {calculateTaxableIncome, calculateVat, getDifferentialIncome, getPaidVatBetweenDates} from "@/db/tax";
import ExpenseTypeCards from "@/app/[lang]/expense-type-cards";

export const dynamic = "force-dynamic";

export default function Home({params}: { params: { lang: Locales } }) {
    const localization = {
        locale: params.lang,
        dict: getDictionary(params.lang)
    }
    const dict = localization.dict;

    const now = new Date();
    const yearBegin = new Date(Date.UTC(now.getFullYear(), 0));
    const yearEnd = new Date(Date.UTC(now.getFullYear(), 11, 31));

    const [rangeStart, setRangeStart] = useState(yearBegin);
    const [rangeEnd, setRangeEnd] = useState(yearEnd);

    const dashboardCards = getDashboardCards(dict, rangeStart, rangeEnd);

    return <>
        <div className="date-range-picker">
            <div className="date-range-picker__start">
                <label htmlFor="date-range-picker__start">{dict.home.from}</label>
                <input id="date-range-picker__start" type="date"
                       defaultValue={yearBegin.toISOString().slice(0, 10)}
                       onChange={e => setRangeStart(new Date(e.target.value))}/>
            </div>
            <div className="date-range-picker__end">
                <label htmlFor="date-range-picker__end">{dict.home.to}</label>
                <input id="date-range-picker__end" type="date"
                       defaultValue={yearEnd.toISOString().slice(0, 10)}
                       onChange={e => setRangeEnd(new Date(e.target.value))}/>
            </div>
        </div>

        <div className="dashboard">
            {dashboardCards.map(card =>
                <Suspense fallback={<DashboardCard title={card.title} getAmount={async () => 0}/>}>
                    <DashboardCard title={card.title} getAmount={card.getAmount}/>
                </Suspense>
            )}
            <ExpenseTypeCards rangeStart={rangeStart} rangeEnd={rangeEnd}/>
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
