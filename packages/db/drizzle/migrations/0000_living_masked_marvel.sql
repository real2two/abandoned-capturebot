CREATE TABLE `inventory` (
	`user_id` bigint unsigned NOT NULL,
	`item_id` varchar(32) NOT NULL,
	`quantity` bigint unsigned NOT NULL,
	CONSTRAINT `inventory_user_id_item_id_pk` PRIMARY KEY(`user_id`,`item_id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`user_id` bigint unsigned NOT NULL,
	`currency_rocks` bigint unsigned NOT NULL,
	`mine_snapshot` json NOT NULL,
	`mine_totalclicks` int NOT NULL,
	`mine_totalupwardclicks` int NOT NULL,
	CONSTRAINT `users_user_id` PRIMARY KEY(`user_id`)
);
