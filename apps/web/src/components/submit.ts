import Component from '../structures/Component';

import { InteractionResponseType } from 'discord-api-types/v10';

export default new Component({
  customId: /^submit$/,
  execute: ({ respond }) => {
    return respond({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: 'response to button',
      },
    });
  },
});
