import {getExpenseInRangeByType} from "@/db/expense";
import React from "react";
import DashboardCard from "@/app/[lang]/dashboard-card";

export default async function ExpenseTypeCards({rangeStart, rangeEnd}: { rangeStart: Date, rangeEnd: Date }) {
    return <>
        {(await getExpenseInRangeByType(rangeStart, rangeEnd)).map(card =>
            <DashboardCard key={card.type} title={card.type} getAmount={async () => card.sum}/>
        )}
    </>

}