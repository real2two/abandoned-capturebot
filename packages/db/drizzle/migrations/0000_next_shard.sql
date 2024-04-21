CREATE TABLE `users` (
	`user_id` bigint unsigned NOT NULL,
	`mine_steps` int unsigned NOT NULL DEFAULT 0,
	`mine_snapshot` json NOT NULL,
	CONSTRAINT `users_user_id` PRIMARY KEY(`user_id`)
);
