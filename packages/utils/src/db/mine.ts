import { eq } from 'drizzle-orm';
import { db, schema } from '@/db';
import { createDefaultMineSnapshot } from '../canvas';

export async function getUser(userId: string) {
  return (await fetchUser(userId)) || (await createUser(BigInt(userId)));
}

export async function fetchUser(userId: string) {
  const users = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.userId, BigInt(userId)))
    .limit(1);

  if (!users[0]) return null;

  if (typeof users[0].mineSnapshot === 'string') {
    users[0].mineSnapshot = JSON.parse(users[0].mineSnapshot);
  }

  return users[0];
}

export async function createUser(userId: bigint): Promise<typeof schema.users.$inferSelect> {
  const values = {
    userId,

    currencyRocks: 0n,
    mineSnapshot: createDefaultMineSnapshot(),

    mineTotalClicks: 0,
    mineTotalUpwardClicks: 0,
  };
  await db.insert(schema.users).values(values);
  return values;
}

export function updateUser(userId: string, values: Partial<typeof schema.users.$inferInsert>) {
  return db
    .update(schema.users)
    .set(values)
    .where(eq(schema.users.userId, BigInt(userId)));
}
