"use client";

import {useContext, useEffect, useState} from "react";
import {getIncomeInRange} from "@/db/income";
import {euroToMicroEuro} from "@/db/schema";
import {getExpenseInRange, getExpenseInRangeByType} from "@/db/expense";
import {getVATInRange} from "@/db/tax";
import {LocalizationContext} from "@/lib/contexts";

export default function Dashboard() {
    const {dict} = useContext(LocalizationContext);

    const now = new Date();
    const yearBegin = new Date(Date.UTC(now.getFullYear(), 0));
    const yearEnd = new Date(Date.UTC(now.getFullYear(), 11, 31));

    const [rangeStart, setRangeStart] = useState(yearBegin);
    const [rangeEnd, setRangeEnd] = useState(yearEnd);

    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [vatToPay, setVatToPay] = useState(0);
    const [expenseByType, setExpenseByType] = useState<Record<string, number>>({});

    const earnings = income - expense;

    useEffect(() => {
        if (isNaN(rangeStart.getTime()) || isNaN(rangeEnd.getTime())) {
            return;
        }
        getIncomeInRange(rangeStart, rangeEnd).then(v => setIncome(v / euroToMicroEuro));
        getExpenseInRange(rangeStart, rangeEnd).then(v => setExpense(v / euroToMicroEuro));
        getVATInRange(rangeStart, rangeEnd).then(v => setVatToPay(v / euroToMicroEuro));
        getExpenseInRangeByType(rangeStart, rangeEnd).then(v => setExpenseByType(v));
    }, [rangeStart, rangeEnd]);

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
            <div className="card dashboard-card">
                <div className="dashboard-card__title">
                    {dict.home.income}
                </div>
                <div className="dashboard-card__amount">
                    {income.toFixed(2)} €
                </div>
            </div>
            <div className="card dashboard-card">
                <div className="dashboard-card__title">
                    {dict.home.earnings}
                </div>
                <div className="dashboard-card__amount">
                    {earnings.toFixed(2)} €
                </div>
            </div>
            <div className="card dashboard-card">
                <div className="dashboard-card__title">
                    {dict.home.vatToPay}
                </div>
                <div className="dashboard-card__amount">
                    {vatToPay.toFixed(2)} €
                </div>
            </div>
            {Object.keys(expenseByType).map(type =>
                <div key={type} className="card dashboard-card">
                    <div className="dashboard-card__title">
                        {type}
                    </div>
                    <div className="dashboard-card__amount">
                        {(expenseByType[type] / euroToMicroEuro).toFixed(2)} €
                    </div>
                </div>
            )}
        </div>
    </>
}