"use client";

import Dashboard from "@/app/[lang]/dashboard";
import React, {useState} from "react";
import {Dict} from "@/translation/dictionaries";

export default function DashboardPage({dict}: { dict: Dict }) {
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