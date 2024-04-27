CREATE TABLE `users` (
	`user_id` bigint unsigned NOT NULL,
	`currency_rocks` bigint unsigned NOT NULL,
	`mine_snapshot` json NOT NULL,
	`mine_totalclicks` int NOT NULL,
	`mine_totalupwardclicks` int NOT NULL,
	CONSTRAINT `users_user_id` PRIMARY KEY(`user_id`)
);
