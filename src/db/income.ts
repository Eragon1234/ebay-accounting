import "server-only";

import {Income, income, NewIncome} from "@/db/schema";
import {between, desc, eq, sum} from "drizzle-orm";
import {getDbAsync} from "@/db/db";
import {deleteFile} from "@/db/files";

export async function countIncomes() {
    const db = await getDbAsync();
    return db.$count(income);
}

export async function getIncomes(limit: number, offset: number): Promise<Income[]> {
    const db = await getDbAsync();
    return db.query.income.findMany({
        limit,
        offset,
        orderBy: [
            desc(income.date)
        ]
    });
}

export async function getIncomeInRange(start: Date, end: Date): Promise<number> {
    const db = await getDbAsync();
    const result = await db.select({
        sum: sum(income.amount).mapWith(Number)
    }).from(income).where(
        between(income.date, start.toISOString().slice(0, 10), end.toISOString().slice(0, 10))
    );
    return result[0].sum || 0;
}

export async function createIncome(newIncome: NewIncome) {
    const db = await getDbAsync();
    await db.insert(income).values(newIncome)
}

export async function deleteIncome(id: number) {
    const db = await getDbAsync();

    const [deletedIncome] = await db.delete(income).where(eq(income.id, id)).returning({file: income.file});

    if (deletedIncome.file) {
        try {
            await deleteFile(deletedIncome.file);
        } catch (error) {
            console.error(`Failed to delete file '${deletedIncome.file}' for income with ID ${id}:`, error);
        }
    }
}
