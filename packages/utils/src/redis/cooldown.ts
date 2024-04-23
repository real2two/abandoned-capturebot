import * as redis from '@/redis';

const subNamespace = 'cooldown';

export async function getCooldown(action: string, user: string) {
  const cooldown = await redis.get(`${subNamespace}:${action}:${user}`);
  if (!cooldown) return null;

  const expiresIn = parseInt(cooldown) - Date.now();
  if (expiresIn <= 0) return null;

  return { expiresIn };
}

export function setCooldown({ action, userId, expiresIn }: { action: string; userId: string; expiresIn: number }) {
  return redis.set(`${subNamespace}:${action}:${userId}`, Date.now() + expiresIn, {
    expiresIn,
  });
}

export async function endCooldown(action: string, user: string) {
  return redis.del(`${subNamespace}:${action}:${user}`);
}
