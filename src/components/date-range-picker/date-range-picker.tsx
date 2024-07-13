"use client";

import React, {useCallback} from "react";
import {Dict} from "@/translation/dictionaries";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

type DateRangePickerProps = {
    dict: Dict,
    defaultStart: Date,
    defaultEnd: Date
}

export default function DateRangePicker({dict, defaultStart, defaultEnd}: DateRangePickerProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    return <div className="date-range-picker">
        <div className="date-range-picker__start">
            <label htmlFor="date-range-picker__start">{dict.home.from}</label>
            <input id="date-range-picker__start" type="date"
                   defaultValue={defaultStart.toISOString().slice(0, 10)}
                   onChange={e => router.replace(`${pathname}?${createQueryString("start", e.target.value)}`)}/>
        </div>
        <div className="date-range-picker__end">
            <label htmlFor="date-range-picker__end">{dict.home.to}</label>
            <input id="date-range-picker__end" type="date"
                   defaultValue={defaultEnd.toISOString().slice(0, 10)}
                   onChange={e => router.replace(`${pathname}?${createQueryString("end", e.target.value)}`)}/>
        </div>
    </div>
}