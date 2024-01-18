CREATE TABLE `Expense` (
	`id` integer PRIMARY KEY NOT NULL,
	`amount` integer NOT NULL,
	`type` text NOT NULL,
	`vat` integer,
	`name` text NOT NULL,
	`date` text NOT NULL,
	`file` text
);
--> statement-breakpoint
CREATE TABLE `Income` (
	`id` integer PRIMARY KEY NOT NULL,
	`amount` integer NOT NULL,
	`name` text NOT NULL,
	`date` text NOT NULL,
	`file` text
);
