import { int, bigint, json, mysqlTable } from 'drizzle-orm/mysql-core';
import type { MineSnapshotRows } from '../types';

export const users = mysqlTable('users', {
  userId: bigint('user_id', { mode: 'bigint', unsigned: true }).notNull().primaryKey(),

  mined: int('mined', { unsigned: true }).notNull().default(0),
  mineSnapshot: json('mine_snapshot').$type<MineSnapshotRows>().notNull(),
});
