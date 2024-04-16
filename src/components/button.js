import Component from '../structures/Component.js';

import {
  InteractionResponseType,
  ComponentType,
  TextInputStyle,
} from 'discord-api-types/v10';

export default new Component({
  customId: /^button$/,
  execute: ({ respond }) => {
    return respond({
      type: InteractionResponseType.Modal,
      data: {
        customId: 'submit',
        title: 'test form',
        components: [
          {
            type: ComponentType.ActionRow,
            components: [
              {
                type: ComponentType.TextInput,
                style: TextInputStyle.Short,
                customId: 'text',
                label: 'text',
              },
            ],
          },
        ],
      },
    });
  },
});
