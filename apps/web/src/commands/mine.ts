import Command from '../structures/Command';
import rest from '../utils/rest';

import { SlashCommandBuilder } from '@discordjs/builders';
import {
  ButtonStyle,
  ComponentType,
  InteractionResponseType,
  RESTGetAPIWebhookResult,
  Routes,
} from 'discord-api-types/v10';
import { renderMineScene } from '@/canvas';
import { getUser, findPlayer, setMineActiveMessage } from '@/utils';

import type { ObjectToCamel } from 'ts-case-convert/lib/caseConvert';

export default new Command({
  data: new SlashCommandBuilder()
    .setName('mine')
    .setDescription('Gain resources through clicking buttons'),
  execute: async ({ user, interaction, respond }) => {
    // Fetch player
    const player = await getUser(user.id);
    const { canMove } = findPlayer(player.mineSnapshot);

    // Send the mine map
    await respond({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: `⛏️ ${player.mined}`,
        embeds: [
          {
            author: { name: 'Mine' },
            image: {
              url: 'attachment://image.webp',
            },
          },
        ],
        attachments: [
          {
            name: 'image.webp',
            file: await renderMineScene({
              userId: user.id,
              avatar: user.avatar,
              snapshot: player.mineSnapshot,
            }),
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
                disabled: !canMove.left,
              },
              {
                type: ComponentType.Button,
                style: ButtonStyle.Secondary,
                emoji: { name: '🔼' },
                customId: 'mine:up',
                disabled: !canMove.up,
              },
              {
                type: ComponentType.Button,
                style: ButtonStyle.Secondary,
                emoji: { name: '▶️' },
                customId: 'mine:right',
                disabled: !canMove.right,
              },
            ],
          },
        ],
      },
    });

    // Set the active mine message
    const message = (await rest.get(
      Routes.webhookMessage(interaction.applicationId, interaction.token),
    )) as ObjectToCamel<RESTGetAPIWebhookResult>;

    await setMineActiveMessage(user.id, message.id);
  },
});
