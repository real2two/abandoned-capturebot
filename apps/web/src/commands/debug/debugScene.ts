import Command from '../../structures/Command';

import { SlashCommandBuilder } from '@discordjs/builders';
import { InteractionResponseType } from 'discord-api-types/v10';
import { renderMineDebugScene } from '@/canvas';

export default new Command({
  data: new SlashCommandBuilder().setName('debug_scene').setDescription('Create the debug scene'),
  execute: async ({ respond }) => {
    await respond({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: 'Debug',
        embeds: [
          {
            image: {
              url: 'attachment://image.webp',
            },
          },
          {
            image: {
              url: 'attachment://image2.webp',
            },
          },
          {
            image: {
              url: 'attachment://image3.webp',
            },
          },
          {
            image: {
              url: 'attachment://image4.webp',
            },
          },
          {
            image: {
              url: 'attachment://image5.webp',
            },
          },
        ],
        attachments: [
          {
            name: 'image.webp',
            data: await renderMineDebugScene(),
          },
          {
            name: 'image2.webp',
            data: await renderMineDebugScene(),
          },
          {
            name: 'image3.webp',
            data: await renderMineDebugScene(),
          },
          {
            name: 'image4.webp',
            data: await renderMineDebugScene(),
          },
          {
            name: 'image5.webp',
            data: await renderMineDebugScene(),
          },
        ],
      },
    });
  },
});
