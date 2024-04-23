import Command from '../structures/Command';
import rest from '../utils/rest';

import { SlashCommandBuilder } from '@discordjs/builders';
import { InteractionResponseType, RESTPatchAPIWebhookResult, Routes } from 'discord-api-types/v10';
import { getUser, findPlayer, setMineActiveMessage } from '@/utils';
import { createMineMessage, createMineMessageComponents } from '../utils/messages';

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
        currencyRocks: player.currencyRocks,
        canMove,
        setLoadingComponents: true,
      }),
    });

    // Set the active mine message ID
    const message = (await rest.patch(
      Routes.webhookMessage(interaction.applicationId, interaction.token),
      {
        body: {
          components: createMineMessageComponents({
            canMove,
          }),
        },
      },
    )) as ObjectToCamel<RESTPatchAPIWebhookResult>;
    await setMineActiveMessage(user.id, message.id);
  },
});
