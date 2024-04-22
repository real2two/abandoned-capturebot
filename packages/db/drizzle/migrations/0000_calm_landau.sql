CREATE TABLE `users` (
	`user_id` bigint unsigned NOT NULL,
	`currency_rocks` int unsigned NOT NULL DEFAULT 0,
	`mine_snapshot` json NOT NULL,
	`mine_totalclicks` int NOT NULL DEFAULT 0,
	`mine_totalupwardclicks` int NOT NULL DEFAULT 0,
	CONSTRAINT `users_user_id` PRIMARY KEY(`user_id`)
);
