"use client";

import {Expense} from "@/db/schema";
import {deleteExpense} from "@/db/expense";
import Link from "next/link";
import {FileIcon, TrashIcon} from "lucide-react";

type ActionProps = {
    expense: Expense
}

export default function Actions({expense}: ActionProps) {
    return <div style={{
        display: "flex",
        gap: "1em",
        justifyContent: "space-between",
    }}>
        {expense.file && <Link href={`/files/${expense.file}`}><FileIcon/></Link>}
        <div onClick={() => deleteExpenseAction(expense)}><TrashIcon/></div>
    </div>
}

function deleteExpenseAction(expense: Expense) {
    if (confirm(`Do you want to delete '${expense.name}'`)) {
        deleteExpense(expense.id);
    }
}
