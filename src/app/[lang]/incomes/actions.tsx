"use client";

import {Income} from "@/db/schema";
import {TrashIcon} from "lucide-react";
import {deleteIncomeAction} from "@/app/[lang]/incomes/server-actions";

type ActionsProps = {
    income: Income
}

export function Actions({income}: ActionsProps) {
    const handleDelete = async () => {
        if (confirm(`Are you sure you want to delete ${income.name}?`)) {
            const result = await deleteIncomeAction(income.id);
            if (!result.success) {
                console.log("Failed to delete income", result.error_code);
            }
        }
    }

    return <div>
        <div onClick={handleDelete}><TrashIcon/></div>
    </div>
}
