import Command from '../../structures/Command';

import { SlashCommandBuilder } from '@discordjs/builders';
import { InteractionResponseType } from 'discord-api-types/v10';
import { renderMineRows } from '@/canvas';
import { getUser } from '@/utils';

export default new Command({
  data: new SlashCommandBuilder().setName('debug_mine').setDescription('Show whole mine scene'),
  execute: async ({ user, respond }) => {
    const player = await getUser(user.id);
    return respond({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: 'Debug mine',
        embeds: [
          {
            image: {
              url: 'attachment://image.webp',
            },
          },
        ],
        attachments: [
          {
            name: 'image.webp',
            data: await renderMineRows(player.mineSnapshot),
          },
        ],
      },
    });
  },
});
