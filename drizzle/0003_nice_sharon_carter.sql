CREATE TABLE `Expense_new` (
	`id` integer PRIMARY KEY NOT NULL,
	`amount` integer NOT NULL,
	`type` text NOT NULL,
	`tax_type` text NOT NULL,
	`vat` integer,
	`name` text NOT NULL,
	`date` text NOT NULL,
	`file` text
);

INSERT INTO `Expense_new` (
    `id`,
    `amount`,
    `type`,
    `tax_type`,
    `vat`,
	`name`,
	`date`,
	`file`
) SELECT `id`, `amount`, `type`, `tax_type`, `vat`, `name`, `date`, `file` FROM `Expense`;

DROP TABLE `Expense`;
ALTER TABLE `Expense_new` RENAME TO `Expense`;
