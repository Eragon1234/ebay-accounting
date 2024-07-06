"use server";

import {Dict} from "@/translation/dictionaries";
import {getIncomeInRange} from "@/db/income";
import {euroToMicroEuro} from "@/db/schema";
import {getExpenseInRange, getExpenseInRangeByType} from "@/db/expense";
import {getVATInRange} from "@/db/tax";

type DashboardCard = {
    title: string,
    amount: number
}

export default async function getDashboardCards(start: Date, end: Date, dict: Dict): Promise<DashboardCard[]> {
    const income = await getIncomeInRange(start, end);
    const expense = await getExpenseInRange(start, end);
    const vatToPay = await getVATInRange(start, end);
    const expenseByType = await getExpenseInRangeByType(start, end);

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
        ...expenseByType.map(v => ({title: v.type, amount: v.sum / euroToMicroEuro}))
    ]
}