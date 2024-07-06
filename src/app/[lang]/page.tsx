"use client";

import React, {useState} from "react";
import {getDictionary, Locales} from "@/translation/dictionaries";
import Dashboard from "@/app/[lang]/dashboard";

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

        <Dashboard dict={dict} rangeStart={rangeStart} rangeEnd={rangeEnd}/>
    </>
}
