import type HyperExpress from 'hyper-express';
import type {
  APIBaseInteraction,
  APIInteractionResponse,
  InteractionType,
} from 'discord-api-types/v10';
import type { ObjectToCamel } from 'ts-case-convert/lib/caseConvert';

export type CamelizedInteraction = ObjectToCamel<
  APIBaseInteraction<InteractionType, any>
>;

export interface InteractionRequestData {
  interaction: CamelizedInteraction;
  respond: (message: ObjectToCamel<APIInteractionResponse>) => unknown;
  res: HyperExpress.Response<HyperExpress.DefaultResponseLocals>;
  req: HyperExpress.Request<HyperExpress.DefaultRequestLocals>;
}

export type InteractionRequest = (data: InteractionRequestData) => unknown;
