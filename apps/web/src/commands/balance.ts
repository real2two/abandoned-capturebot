import Command from '../structures/Command';

import { SlashCommandBuilder } from '@discordjs/builders';
import { InteractionResponseType, MessageFlags } from 'discord-api-types/v10';
import { GREEN_COLOR, fetchUser } from '@/utils';

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

    const requestedMember = interaction.data?.resolved?.members?.[userId] || interaction.member;
    const displayName =
      requestedMember?.nick ||
      requestedUser?.globalName ||
      (requestedUser?.username
        ? `${requestedUser?.username}${
            requestedUser?.discriminator !== '0' ? `#${requestedUser?.discriminator}` : ''
          }`
        : user.id);
    const avatar = requestedUser?.avatar
      ? `https://cdn.discordapp.com/avatars/${userId}/${requestedUser.avatar}`
      : `https://cdn.discordapp.com/embed/avatars/${(BigInt(userId) >> 22n) % 6n}.png`;

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
