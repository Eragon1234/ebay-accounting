DO $$ BEGIN
 CREATE TYPE "ExpenseType" AS ENUM('DIFFERENTIAL', 'VAT');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Expense" (
	"id" serial PRIMARY KEY NOT NULL,
	"amount" double precision NOT NULL,
	"type" "ExpenseType" NOT NULL,
	"vat" integer,
	"name" text NOT NULL,
	"date" timestamp(3) NOT NULL,
	"files" text[]
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Income" (
	"id" serial PRIMARY KEY NOT NULL,
	"amount" double precision NOT NULL,
	"name" text NOT NULL,
	"date" timestamp(3) NOT NULL,
	"files" text[]
);
