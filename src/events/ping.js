import Event from '../structures/Event.js';

import { InteractionResponseType } from 'discord-interactions';

export default new Event({
  execute: ({ res }) => {
    return res.json({
      type: InteractionResponseType.PONG,
    });
  },
});
