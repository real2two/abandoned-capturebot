import Event from '../structures/Event.js';

import { InteractionResponseType } from 'discord-interactions';

export default new Event({
  execute: ({ respond }) => {
    return respond({
      type: InteractionResponseType.PONG,
    });
  },
});
