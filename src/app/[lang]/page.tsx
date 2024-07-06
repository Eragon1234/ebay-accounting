"use client";

import React, {useEffect, useState} from "react";
import {getDictionary, Locales} from "@/translation/dictionaries";
import getDashboardCards from "@/lib/dashboard-cards";

export const dynamic = "force-dynamic";

interface DashboardCard {
    title: string,
    amount: number
}

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

    const [dashboardCards, setDashboardCards] = useState<DashboardCard[]>([]);

    useEffect(() => {
        getDashboardCards(rangeStart, rangeEnd, dict).then(v => setDashboardCards(v));
    }, [rangeEnd, rangeEnd, dict]);

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
                <div key={card.title} className="card dashboard-card">
                    <div className="dashboard-card__title">
                        {card.title}
                    </div>
                    <div className="dashboard-card__amount">
                        {card.amount.toFixed(2)} €
                    </div>
                </div>
            )}
        </div>
    </>
}
