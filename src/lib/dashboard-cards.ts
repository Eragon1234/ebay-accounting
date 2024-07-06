"use server";

import {Dict} from "@/translation/dictionaries";
import {getIncomeInRange} from "@/db/income";
import {euroToMicroEuro} from "@/db/schema";
import {getExpenseInRange, getExpenseInRangeByType} from "@/db/expense";
import {calculateTaxableIncome, calculateVat, getDifferentialIncome, getPaidVatBetweenDates} from "@/db/tax";

type DashboardCard = {
    title: string,
    amount: number
}

export default async function getDashboardCards(start: Date, end: Date, dict: Dict): Promise<DashboardCard[]> {
    const [income, expense, expenseByType, paidVat, differentialIncome] = await Promise.all([
        getIncomeInRange(start, end),
        getExpenseInRange(start, end),
        getExpenseInRangeByType(start, end),
        getPaidVatBetweenDates(start, end),
        getDifferentialIncome(start, end)
    ]);

    const taxableIncome = await calculateTaxableIncome(income, differentialIncome);
    const vatToPay = await calculateVat(taxableIncome, paidVat);

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
        {
            title: dict.home.taxableIncome,
            amount: taxableIncome / euroToMicroEuro
        },
        {
            title: dict.home.paidVat,
            amount: paidVat / euroToMicroEuro
        },
        ...expenseByType.map(v => ({title: v.type, amount: v.sum / euroToMicroEuro}))
    ]
}