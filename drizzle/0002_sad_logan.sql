ALTER TABLE `sessions` DROP INDEX `sessions_sessionToken_unique`;--> statement-breakpoint
ALTER TABLE `sessions` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `sessions` ADD PRIMARY KEY(`sessionToken`);--> statement-breakpoint
ALTER TABLE `sessions` DROP COLUMN `id`;