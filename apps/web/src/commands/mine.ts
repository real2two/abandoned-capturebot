import Command from '../structures/Command';
import { editMessage } from '../utils/rest';

import { SlashCommandBuilder } from '@discordjs/builders';
import { InteractionResponseType } from 'discord-api-types/v10';
import { getUser, findPlayer, setMineActiveMessage } from '@/utils';
import { createMineMessage, createMineMessageComponents } from '../utils/messages';

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
    const message = await editMessage(interaction, {
      components: createMineMessageComponents({
        canMove,
      }),
    });
    await setMineActiveMessage(user.id, message.id);
  },
});
