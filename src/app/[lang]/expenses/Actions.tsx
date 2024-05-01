"use client";

import DeleteIcon from "@/components/icons/delete-icon";
import {Expense} from "@/db/schema";
import {deleteExpense} from "@/db/expense";

type ActionProps = {
    expense: Expense
}

export default function Actions({expense}: ActionProps) {
    return <div>
        <div onClick={() => deleteExpenseAction(expense)}><DeleteIcon/></div>
    </div>
}

function deleteExpenseAction(expense: Expense) {
    if (confirm(`Do you want to delete '${expense.name}'`)) {
        deleteExpense(expense.id);
    }
}
