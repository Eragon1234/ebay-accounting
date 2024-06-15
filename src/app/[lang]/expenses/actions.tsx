"use client";

import DeleteIcon from "@/components/icons/delete-icon";
import {Expense} from "@/db/schema";
import {deleteExpense} from "@/db/expense";
import FileIcon from "@/components/icons/file-icon";
import Link from "next/link";

type ActionProps = {
    expense: Expense
}

export default function Actions({expense}: ActionProps) {
    return <div style={{
        display: "flex",
        justifyContent: "space-between",
    }}>
        {expense.file && <Link href={`/files/${expense.file}`}><FileIcon/></Link>}
        <div onClick={() => deleteExpenseAction(expense)}><DeleteIcon/></div>
    </div>
}

function deleteExpenseAction(expense: Expense) {
    if (confirm(`Do you want to delete '${expense.name}'`)) {
        deleteExpense(expense.id);
    }
}
