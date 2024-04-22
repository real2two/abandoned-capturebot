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
import { createMineMessage } from '../utils/messages';

import type { ObjectToCamel } from 'ts-case-convert/lib/caseConvert';

export default new Command({
  data: new SlashCommandBuilder()
    .setName('mine')
    .setDescription('Gain resources through clicking buttons'),
  execute: async ({ user, interaction, respond }) => {
    // Fetch player
    const player = await getUser(user.id);
    const { canMove } = findPlayer(player.mineSnapshot);

    // Send the mine message
    await respond({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: await createMineMessage({
        user,
        snapshot: player.mineSnapshot,
        mined: player.mined,
        canMove,
      }),
    });

    // Set the active mine message
    const message = (await rest.get(
      Routes.webhookMessage(interaction.applicationId, interaction.token),
    )) as ObjectToCamel<RESTGetAPIWebhookResult>;

    await setMineActiveMessage(user.id, message.id);
  },
});
