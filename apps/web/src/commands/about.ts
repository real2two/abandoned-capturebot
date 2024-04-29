import Command from '../structures/Command';

import { SlashCommandBuilder } from '@discordjs/builders';
import { InteractionResponseType, ButtonStyle, ComponentType } from 'discord-api-types/v10';
import { BLUE_COLOR, version } from '@/utils';

export default new Command({
  data: new SlashCommandBuilder()
    .setName('about')
    .setDescription('Gives you information about CaptureBot'),
  execute: async ({ interaction, respond }) => {
    const supportUrl = 'https://discord.com/vanityurl/dotcom/steakpants/flour/flower/index11.html';
    const inviteUrl = `https://discord.com/oauth2/authorize?client_id=${interaction.applicationId}`;
    const githubUrl = 'https://github.com/real2two/capturebot';
    const image = `https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=`;

    await respond({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        embeds: [
          {
            color: BLUE_COLOR,
            author: {
              name: 'CaptureBot information',
            },
            thumbnail: {
              url: image,
            },
            description:
              `**Support Server**: [\`Click Here\`](${supportUrl})\n` +
              `**Invite Bot**: [\`Click Here\`](${inviteUrl})\n\n` +
              `**Version**: ${version}\n\n`,
          },
        ],
        components: [
          {
            type: ComponentType.ActionRow,
            components: [
              {
                type: ComponentType.Button,
                style: ButtonStyle.Link,
                label: 'Support server',
                url: supportUrl,
              },
              {
                type: ComponentType.Button,
                style: ButtonStyle.Link,
                label: 'Invite bot',
                url: inviteUrl,
              },
              {
                type: ComponentType.Button,
                style: ButtonStyle.Link,
                label: 'GitHub',
                url: githubUrl,
              },
            ],
          },
        ],
      },
    });
  },
});
