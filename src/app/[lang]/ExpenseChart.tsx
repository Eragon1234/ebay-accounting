"use client";

import {Bar, BarChart, Tooltip, XAxis, YAxis} from "recharts";

type ExpensePieProps = {
    data: { sum: number, type: string }[]
}

export default function ExpenseChart({data}: ExpensePieProps) {
    return <BarChart responsive height={300} width={"100%"} data={data}>
        <XAxis dataKey="type"/>
        <YAxis/>
        <Tooltip cursor={false}
                 contentStyle={{color: "var(--foreground-color)", backgroundColor: "var(--background"}}
                 itemStyle={{color: "var(--foreground-color)"}}
                 separator={""} formatter={(value) => ["", value]}/>
        <Bar dataKey="sum" fill="var(--background)" stroke={"var(--foreground-color)"}/>
    </BarChart>
}