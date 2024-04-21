import env from '@/env';
import { objectToSnake } from 'ts-case-convert';
import { REST, RequestData, RouteLike } from '@discordjs/rest';

export class CamelizedREST extends REST {
  get(fullRoute: RouteLike, options?: RequestData) {
    return super.get(fullRoute, {
      ...options,
      body: options?.body ? objectToSnake(options.body) : undefined,
    });
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
