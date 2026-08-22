"use client";

import {Expense} from "@/db/schema";
import {addFileToExpense, deleteExpense} from "@/db/expense";
import Link from "next/link";
import {FileIcon, FilePlusCornerIcon, TrashIcon} from "lucide-react";
import FileUpload from "@/components/file-upload/fileUpload";
import {useTransition} from "react";
import {Dict} from "@/translation/dictionaries";

type ActionProps = {
    expense: Expense
    dict: Dict
}

export default function Actions({expense, dict}: ActionProps) {
    return <div style={{
        display: "flex",
        gap: "1em",
        justifyContent: "space-between",
    }}>
        {
            expense.file ?
                <Link href={`/files/${expense.file}`}><FileIcon/></Link> :
                <AddFileButton expenseId={expense.id} dict={dict}/>
        }
        <div onClick={() => deleteExpenseAction(expense)}><TrashIcon/></div>
    </div>
}

function deleteExpenseAction(expense: Expense) {
    if (confirm(`Do you want to delete '${expense.name}'`)) {
        deleteExpense(expense.id);
    }
}

type AddFileFormProps = {
    expenseId: number;
    dict: Dict;
}

function AddFileButton({expenseId, dict}: AddFileFormProps) {
    const [isPending, startTransition] = useTransition();

    const action = (file: File) => {
        startTransition(async () => {
            const result = await addFileToExpense(expenseId, file);
            if (!result.success) {
                console.error("Failed to add file to expense", result.error_code);
            }
        })
    }

    return <FileUpload accept={"application/pdf"} onFile={action} label={dict.expenses.addFile} pending={isPending}>
        <FilePlusCornerIcon/>
    </FileUpload>
}
