import Command from '../structures/Command';

import { SlashCommandBuilder } from '@discordjs/builders';
import { InteractionResponseType } from 'discord-api-types/v10';
import { renderMineDebugScene } from '@/canvas';

export default new Command({
  data: new SlashCommandBuilder().setName('debug').setDescription('Create the debug scene'),
  execute: async ({ respond }) => {
    await respond({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        attachments: [
          {
            name: 'image.webp',
            file: await renderMineDebugScene(),
          },
        ],
      },
    });
  },
});
