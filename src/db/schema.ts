import {integer, sqliteTable, text} from "drizzle-orm/sqlite-core";

export const euroToMicroEuro = 1_000_000;

export enum TaxType {
    VAT = "VAT",
    DIFFERENTIAL = "DIFFERENTIAL"
}

export const income = sqliteTable("Income", {
    id: integer("id", {mode: "number"}).primaryKey().notNull(),
    amount: integer("amount", {mode: "number"}).notNull(), // in µ€, 1€ = 1_000_000µ€
    name: text("name").notNull(),
    date: text("date").notNull(),
    file: text("file"),
});

export const expense = sqliteTable("Expense", {
    id: integer("id", {mode: "number"}).primaryKey().notNull(),
    amount: integer("amount", {mode: "number"}).notNull(), // in µ€, 1€ = 1_000_000µ€
    type: text("type"),
    taxType: text("tax_type", {
        enum: ["VAT", "DIFFERENTIAL"]
    }).notNull(),
    vat: integer("vat", {mode: "number"}),
    name: text("name").notNull(),
    date: text("date").notNull(),
    file: text("file"),
});

export type Expense = typeof expense.$inferSelect;
export type NewExpense = typeof expense.$inferInsert;

export type Income = typeof income.$inferSelect;
export type NewIncome = typeof income.$inferInsert;
