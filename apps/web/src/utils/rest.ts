import env from '@/env';
import { objectToCamel, objectToSnake } from 'ts-case-convert';
import { REST, RequestData, RouteLike } from '@discordjs/rest';

export class CamelizedREST extends REST {
  async get(fullRoute: RouteLike, options?: RequestData) {
    return objectToCamel(
      (await super.get(fullRoute, {
        ...options,
        body: options?.body ? objectToSnake(options.body) : undefined,
      })) as any,
    ) as unknown;
  }

  async delete(fullRoute: RouteLike, options?: RequestData) {
    return objectToCamel(
      (await super.delete(fullRoute, {
        ...options,
        body: options?.body ? objectToSnake(options.body) : undefined,
      })) as any,
    ) as unknown;
  }

  async post(fullRoute: RouteLike, options?: RequestData) {
    return objectToCamel(
      (await super.post(fullRoute, {
        ...options,
        body: options?.body ? objectToSnake(options.body) : undefined,
      })) as any,
    ) as unknown;
  }

  async put(fullRoute: RouteLike, options?: RequestData) {
    return objectToCamel(
      (await super.put(fullRoute, {
        ...options,
        body: options?.body ? objectToSnake(options.body) : undefined,
      })) as any,
    ) as unknown;
  }

  async patch(fullRoute: RouteLike, options?: RequestData) {
    return objectToCamel(
      (await super.patch(fullRoute, {
        ...options,
        body: options?.body ? objectToSnake(options.body) : undefined,
      })) as any,
    ) as unknown;
  }
}

export default new CamelizedREST({ version: '10' }).setToken(env.DiscordToken);
