import Command from '../structures/Command';

import { SlashCommandBuilder } from '@discordjs/builders';
import {
  ButtonStyle,
  ComponentType,
  InteractionResponseType,
} from 'discord-api-types/v10';

export default new Command({
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Get the list of commands'),
  execute: ({ respond }) => {
    return respond({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: 'Hello world',
      },
    });
  },
});
