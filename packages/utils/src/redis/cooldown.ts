import * as redis from '@/redis';

const subNamespace = 'cooldown';

export async function getCooldown(action: string, user: string) {
  const cooldown = await redis.get(`${subNamespace}:${action}:${user}`);
  if (!cooldown) return null;

  const { expiresIn, value } = JSON.parse(cooldown);
  if (expiresIn - Date.now() <= 0) return null;

  return { expiresIn, value };
}

export function setCooldown({
  action,
  userId,
  expiresIn,
  value,
}: { action: string; userId: string; expiresIn: number; value?: any }) {
  return redis.set(
    `${subNamespace}:${action}:${userId}`,
    JSON.stringify({
      expiresIn: Date.now() + expiresIn,
      value,
    }),
    {
      expiresIn,
    },
  );
}

export async function endCooldown(action: string, user: string) {
  return redis.del(`${subNamespace}:${action}:${user}`);
}
