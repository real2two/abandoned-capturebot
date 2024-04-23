import Command from '../structures/Command';

import { SlashCommandBuilder } from '@discordjs/builders';
import { InteractionResponseType, MessageFlags } from 'discord-api-types/v10';
import { GREEN_COLOR, fetchUser, getUserAvatar, getUserDisplayName } from '@/utils';

export default new Command({
  data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription("Get a user's balance")
    .addUserOption((opt) => opt.setName('user').setDescription('The user to fetch')),
  execute: async ({ user, interaction, respond }) => {
    const userId = interaction.data?.options?.[0]?.value || user.id;
    const requestedUser = interaction.data?.resolved?.users?.[userId] || user;

    if (requestedUser.bot) {
      return respond({
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          content: `Cannot fetch user information from a bot`,
          flags: MessageFlags.Ephemeral,
        },
      });
    }

    const requestedMember =
      userId === user.id ? interaction.member : interaction.data?.resolved?.members?.[userId];
    const displayName = getUserDisplayName(requestedUser, requestedMember);
    const avatar = getUserAvatar(requestedUser);

    const player = await fetchUser(userId);
    const rocks = player?.currencyRocks || 0;

    return respond({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        embeds: [
          {
            color: GREEN_COLOR,
            title: `${displayName}'s balance`,
            thumbnail: {
              url: avatar,
            },
            description: `🪨 ${rocks} rock${rocks === 1 ? '' : 's'}`,
          },
        ],
      },
    });
  },
});
