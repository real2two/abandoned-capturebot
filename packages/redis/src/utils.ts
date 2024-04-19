import env from '@/env';
import redis from './redis';

export function get(key: string) {
  return redis.get(env.RedisNameSpace + key);
}

export function set(key: string, value: string | number | Buffer, opts?: { expiresIn: number }) {
  if (opts?.expiresIn) {
    // The option 'EX' doesn't support decimals, so it rounds up to the nearest whole
    return redis.set(env.RedisNameSpace + key, value, 'EX', Math.ceil(opts.expiresIn / 1000));
  }
  return redis.set(env.RedisNameSpace + key, value);
}

export function del(key: string) {
  return redis.del(env.RedisNameSpace + key);
}
