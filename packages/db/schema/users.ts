import { int, bigint, json, mysqlTable } from 'drizzle-orm/mysql-core';
import type { MineSnapshotAreas } from '../types';

export const users = mysqlTable('users', {
  userId: bigint('user_id', { mode: 'bigint', unsigned: true }).notNull().primaryKey(),

  currencyRocks: bigint('currency_rocks', { mode: 'bigint', unsigned: true }).notNull(),
  mineSnapshot: json('mine_snapshot').$type<MineSnapshotAreas>().notNull(),

  mineTotalClicks: int('mine_totalclicks').notNull(),
  mineTotalUpwardClicks: int('mine_totalupwardclicks').notNull(),
});
