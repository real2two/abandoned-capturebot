import Command from '../structures/Command.js';

import { SlashCommandBuilder } from '@discordjs/builders';
import {
  ButtonStyle,
  ComponentType,
  InteractionResponseType,
} from 'discord-api-types/v10';

export default new Command({
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Get the list of commands'),

  execute: ({ respond }) => {
    return respond({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: 'Hello world',
        components: [
          {
            type: ComponentType.ActionRow,
            components: [
              {
                type: ComponentType.Button,
                style: ButtonStyle.Primary,
                label: 'press me',
                customId: 'button',
              },
            ],
          },
        ],
      },
    });
  },
});
