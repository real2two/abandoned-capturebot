import type HyperExpress from 'hyper-express';
import type { APIUser } from 'discord-api-types/v10';
import type { ObjectToCamel } from 'ts-case-convert/lib/caseConvert';
import type { CustomAPIInteractionResponse, CamelizedInteraction } from './discord';

export type InteractionResponse = ObjectToCamel<CustomAPIInteractionResponse>;

export interface InteractionResponseAttachment {
  name: string;
  file: any;
}

export interface InteractionRequestData {
  interaction: CamelizedInteraction;
  user?: ObjectToCamel<APIUser>;
  respond: (message: InteractionResponse) => Promise<unknown>;
  res: HyperExpress.Response<HyperExpress.DefaultResponseLocals>;
  req: HyperExpress.Request<HyperExpress.DefaultRequestLocals>;
}

export interface InteractionRequestDataWithUser extends InteractionRequestData {
  user: ObjectToCamel<APIUser>;
}

export type InteractionRequest = (data: InteractionRequestData) => unknown;
export type InteractionRequestWithUser = (data: InteractionRequestDataWithUser) => unknown;
