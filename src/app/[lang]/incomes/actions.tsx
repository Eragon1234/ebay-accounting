"use client";

import {Income} from "@/db/schema";
import {deleteIncome} from "@/db/income";
import {TrashIcon} from "lucide-react";

type ActionsProps = {
    income: Income
}

export function Actions({income}: ActionsProps) {
    return <div>
        <div onClick={() => deleteIncomeAction(income)}><TrashIcon/></div>
    </div>
}

function deleteIncomeAction(income: Income) {
    if (confirm(`Do you want to delete '${income.name}'`)) {
        deleteIncome(income.id);
    }
}