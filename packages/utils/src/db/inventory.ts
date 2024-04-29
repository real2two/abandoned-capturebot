import { sql, eq } from 'drizzle-orm';
import { db, schema } from '@/db';

export async function getInventory(userId: string, data?: { page: number }) {
  const inventory = await db
    .select()
    .from(schema.inventory)
    .where(eq(schema.inventory.userId, BigInt(userId)))
    .offset((data?.page || 0) * 10)
    .limit(10);
  return inventory;
}

export async function getInventoryCount(userId: string) {
  return (
    await db
      .select({
        count: sql`count(*)`,
      })
      .from(schema.inventory)
      .where(eq(schema.inventory.userId, BigInt(userId)))
  )[0].count as number;
}
