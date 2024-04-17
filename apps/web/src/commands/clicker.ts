import Command from '../structures/Command';

import { SlashCommandBuilder } from '@discordjs/builders';
import {
  ButtonStyle,
  ComponentType,
  InteractionResponseType,
} from 'discord-api-types/v10';

export default new Command({
  data: new SlashCommandBuilder()
    .setName('clicker')
    .setDescription('Gain resources through clicking a button'),
  execute: ({ respond }) => {
    return respond({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: `🍪 {{count}}`,
        components: [
          {
            type: ComponentType.ActionRow,
            components: [
              {
                type: ComponentType.Button,
                style: ButtonStyle.Primary,
                emoji: { name: '🍪' },
                customId: 'clicker',
              },
            ],
          },
        ],
      },
    });
  },
});
