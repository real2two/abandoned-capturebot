import type HyperExpress from 'hyper-express';
import type {
  APIBaseInteraction,
  InteractionType,
} from 'discord-api-types/v10';
import type { Camelize } from './Camelize';

export interface InteractionRequestData {
  interaction: Camelize<APIBaseInteraction<InteractionType, any>>;
  res: HyperExpress.Response<HyperExpress.DefaultResponseLocals>;
  req: HyperExpress.Request<HyperExpress.DefaultRequestLocals>;
}

export type InteractionRequest = (data: InteractionRequestData) => unknown;
