import { bigint, mysqlTable } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  userId: bigint('user_id', { mode: 'bigint', unsigned: true })
    .notNull()
    .primaryKey(),
});
