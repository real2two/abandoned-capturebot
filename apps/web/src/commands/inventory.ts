import Command from '../structures/Command';

import { SlashCommandBuilder } from '@discordjs/builders';
import { InteractionResponseType, MessageFlags } from 'discord-api-types/v10';
import {
  BLUE_COLOR,
  getUserAvatar,
  getUserDisplayName,
  getInventory,
  getInventoryCount,
} from '@/utils';

export default new Command({
  data: new SlashCommandBuilder()
    .setName('inventory')
    .setDescription("Get a user's inventory")
    .addUserOption((opt) => opt.setName('user').setDescription('The user to fetch')),
  execute: async ({ user, interaction, respond }) => {
    const userId = interaction.data?.options?.[0]?.value || user.id;
    const requestedUser = interaction.data?.resolved?.users?.[userId] || user;

    if (requestedUser.bot) {
      return respond({
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          content: `Cannot fetch the inventory of a bot`,
          flags: MessageFlags.Ephemeral,
        },
      });
    }

    const requestedMember =
      userId === user.id ? interaction.member : interaction.data?.resolved?.members?.[userId];
    const displayName = getUserDisplayName(requestedUser, requestedMember);
    const avatar = getUserAvatar(requestedUser);

    const count = await getInventoryCount(userId);
    const lastPage = Math.floor(count / 25);

    let page = 0;
    if (page > lastPage) page = lastPage;

    const inventory = await getInventory(userId, { page });
    if (!inventory.length && count) return; // Possible, but shouldn't happen (interaction failed)

    return respond({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        embeds: [
          {
            color: BLUE_COLOR,
            author: {
              name: `${displayName}'s inventory`,
              iconUrl: avatar,
            },
            description:
              count !== 0
                ? inventory.map((i) => `**${i.itemId}**: ${i.quantity}`).join('\n')
                : 'You do not have any items in your inventory.',
            footer:
              count !== 0
                ? {
                    text: `Page ${page + 1} out of ${lastPage + 1}`,
                  }
                : undefined,
          },
        ],
      },
    });
  },
});
