"use client";

import {Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

type ExpensePieProps = {
    data: { sum: number, type: string }[]
}

export default function ExpenseChart({data}: ExpensePieProps) {
    return <ResponsiveContainer width={"100%"} minWidth={500} height={300}>
        <BarChart height={300} data={data}>
            <XAxis dataKey="type"/>
            <YAxis/>
            <Tooltip cursor={false}
                     contentStyle={{color: "var(--foreground-color)", backgroundColor: "var(--background"}}
                     itemStyle={{color: "var(--foreground-color)"}}
                     separator={""} formatter={(value) => ["", value]}/>
            <Bar dataKey="sum" fill="var(--background)" stroke={"var(--foreground-color)"}/>
        </BarChart>
    </ResponsiveContainer>
}