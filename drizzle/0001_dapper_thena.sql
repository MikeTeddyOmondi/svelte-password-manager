CREATE TABLE `passwords` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL,
	`website` text,
	`notes` text,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL
);
--> statement-breakpoint
DROP TABLE `user`;