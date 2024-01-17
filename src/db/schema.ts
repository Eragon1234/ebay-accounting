import {bigint, date, integer, pgEnum, pgTable, serial, text} from "drizzle-orm/pg-core";
import zod from "zod";

export const expenseType = pgEnum("ExpenseType", ['DIFFERENTIAL', 'VAT']);

export const euroToMicroEuro = 1_000_000;

export const income = pgTable("Income", {
    id: serial("id").primaryKey().notNull(),
    amount: bigint("amount", {mode: "number"}).notNull(), // in µ€, 1€ = 1_000_000µ€
    name: text("name").notNull(),
    date: date("date", {mode: "date"}).notNull(),
    files: text("files").array(),
});

export const expense = pgTable("Expense", {
    id: serial("id").primaryKey().notNull(),
    amount: bigint("amount", {mode: "number"}).notNull(), // in µ€, 1€ = 1_000_000µ€
    type: expenseType("type").notNull(),
    vat: integer("vat"),
    name: text("name").notNull(),
    date: date("date", {mode: "date"}).notNull(),
    files: text("files").array(),
});

export type Expense = typeof expense.$inferSelect;
export type NewExpense = typeof expense.$inferInsert;

export type Income = typeof income.$inferSelect;
export type NewIncome = typeof income.$inferInsert;

export const ExpenseType = zod.enum(expenseType.enumValues).enum;
