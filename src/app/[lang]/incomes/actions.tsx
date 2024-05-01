"use client";

import {Income} from "@/db/schema";
import DeleteIcon from "@/components/icons/delete-icon";
import {deleteIncome} from "@/db/income";

type ActionsProps = {
    income: Income
}

export function Actions({income}: ActionsProps) {
    return <div>
        <div onClick={() => deleteIncomeAction(income)}><DeleteIcon/></div>
    </div>
}

function deleteIncomeAction(income: Income) {
    if (confirm(`Do you want to delete '${income.name}'`)) {
        deleteIncome(income.id);
    }
}