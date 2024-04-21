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

  delete(fullRoute: RouteLike, options?: RequestData) {
    return super.delete(fullRoute, {
      ...options,
      body: options?.body ? objectToSnake(options.body) : undefined,
    });
  }

  post(fullRoute: RouteLike, options?: RequestData) {
    return super.post(fullRoute, {
      ...options,
      body: options?.body ? objectToSnake(options.body) : undefined,
    });
  }

  put(fullRoute: RouteLike, options?: RequestData) {
    return super.put(fullRoute, {
      ...options,
      body: options?.body ? objectToSnake(options.body) : undefined,
    });
  }

  patch(fullRoute: RouteLike, options?: RequestData) {
    return super.patch(fullRoute, {
      ...options,
      body: options?.body ? objectToSnake(options.body) : undefined,
    });
  }
}

export default new CamelizedREST({ version: '10' }).setToken(env.DiscordToken);
