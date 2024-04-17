import type HyperExpress from 'hyper-express';
import type {
  APIBaseInteraction,
  APIInteractionResponse,
  InteractionType,
  APIUser,
} from 'discord-api-types/v10';
import type { ObjectToCamel } from 'ts-case-convert/lib/caseConvert';

export type CamelizedInteraction = ObjectToCamel<
  APIBaseInteraction<InteractionType, any>
>;

export interface InteractionRequestData {
  interaction: CamelizedInteraction;
  user?: ObjectToCamel<APIUser>;
  respond: (message: ObjectToCamel<APIInteractionResponse>) => unknown;
  res: HyperExpress.Response<HyperExpress.DefaultResponseLocals>;
  req: HyperExpress.Request<HyperExpress.DefaultRequestLocals>;
}

export interface InteractionRequestDataWithUser {
  interaction: CamelizedInteraction;
  user: ObjectToCamel<APIUser>;
  respond: (message: ObjectToCamel<APIInteractionResponse>) => unknown;
  res: HyperExpress.Response<HyperExpress.DefaultResponseLocals>;
  req: HyperExpress.Request<HyperExpress.DefaultRequestLocals>;
}

export type InteractionRequest = (data: InteractionRequestData) => unknown;
export type InteractionRequestWithUser = (
  data: InteractionRequestDataWithUser,
) => unknown;
