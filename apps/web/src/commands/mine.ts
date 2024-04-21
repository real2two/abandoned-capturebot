import Command from '../structures/Command';

import { SlashCommandBuilder } from '@discordjs/builders';
import { ButtonStyle, ComponentType, InteractionResponseType } from 'discord-api-types/v10';
import { createMineScene } from '@/canvas';

export default new Command({
  data: new SlashCommandBuilder()
    .setName('mine')
    .setDescription('Gain resources through clicking buttons'),
  execute: ({ respond }) => {
    return respond({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: `⛏️ {{count}}`,
        embeds: [
          {
            author: { name: 'test' },
            image: {
              url: 'attachment://image.webp',
            },
          },
        ],
        attachments: [
          {
            name: 'image.webp',
            file: createMineScene(),
          },
        ],
        components: [
          {
            type: ComponentType.ActionRow,
            components: [
              {
                type: ComponentType.Button,
                style: ButtonStyle.Secondary,
                emoji: { name: '◀️' },
                customId: 'mine:left',
                disabled: true,
              },
              {
                type: ComponentType.Button,
                style: ButtonStyle.Secondary,
                emoji: { name: '🔼' },
                customId: 'mine:forward',
              },
              {
                type: ComponentType.Button,
                style: ButtonStyle.Secondary,
                emoji: { name: '▶️' },
                customId: 'mine:right',
                disabled: true,
              },
            ],
          },
        ],
      },
    });
  },
});
