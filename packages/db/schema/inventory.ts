import { bigint, varchar, primaryKey, mysqlTable } from 'drizzle-orm/mysql-core';

export const inventory = mysqlTable(
  'inventory',
  {
    userId: bigint('user_id', { mode: 'bigint', unsigned: true }).notNull(),
    itemId: varchar('item_id', { length: 32 }).notNull(),
    quantity: bigint('quantity', { mode: 'bigint', unsigned: true }).notNull(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.userId, table.itemId],
    }),
  }),
);
