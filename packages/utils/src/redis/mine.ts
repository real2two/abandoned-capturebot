import { ONE_DAY } from '../constants';
import * as redis from '@/redis';

const subNamespace = 'mineActiveMessage';

export function getMineActiveMessage(user: string) {
  return redis.get(`${subNamespace}:${user}`);
}

export function setMineActiveMessage(userId: string, messageId: string) {
  return redis.set(`${subNamespace}:${userId}`, messageId, {
    expiresIn: ONE_DAY,
  });
}
