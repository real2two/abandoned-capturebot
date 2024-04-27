import env from '@/env';
import { objectToCamel, objectToSnake } from 'ts-case-convert';
import { REST, RequestData, RouteLike } from '@discordjs/rest';
import { RESTAPIAttachment, Routes } from 'discord-api-types/v10';
import type {
  CamelizedInteraction,
  InteractionUpdateResponse,
  CamelizedRESTPatchAPIWebhookResult,
  InteractionResponseAttachment,
} from '@/utils';

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

export const rest = new CamelizedREST({ version: '10' }).setToken(env.DiscordToken);

export function editMessage(interaction: CamelizedInteraction, message: InteractionUpdateResponse) {
  if (message?.attachments) {
    // Create attachments variable
    const attachments = message?.attachments as InteractionResponseAttachment[];
    // Create an updated message attachments object
    const messageAttachments: RESTAPIAttachment[] = [];
    for (let id = 0; id < message.attachments.length; ++id) {
      messageAttachments.push({
        id,
        filename: message.attachments[id].name,
      });
    }
    // Create attachment response
    return rest.patch(Routes.webhookMessage(interaction.applicationId, interaction.token), {
      body: {
        ...objectToSnake(message),
        attachments: messageAttachments,
      },
      files: attachments,
    }) as Promise<CamelizedRESTPatchAPIWebhookResult>;
  } else {
    // Create normal response
    return rest.patch(Routes.webhookMessage(interaction.applicationId, interaction.token), {
      body: message,
    }) as Promise<CamelizedRESTPatchAPIWebhookResult>;
  }
}
