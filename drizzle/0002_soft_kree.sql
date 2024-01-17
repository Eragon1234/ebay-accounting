UPDATE "Expense" SET amount = (amount * 1000000);
UPDATE "Income" SET amount = (amount * 1000000);

ALTER TABLE "Expense" ALTER COLUMN "amount" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "Income" ALTER COLUMN "amount" SET DATA TYPE bigint;