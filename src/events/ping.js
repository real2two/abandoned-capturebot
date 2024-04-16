import Event from '../structures/Event.js';

import { InteractionResponseType } from 'discord-api-types/v10';

export default new Event({
  execute: ({ respond }) => {
    return respond({
      type: InteractionResponseType.Pong,
    });
  },
});
