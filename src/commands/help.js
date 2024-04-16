import Command from '../structures/Command.js';

import { SlashCommandBuilder } from '@discordjs/builders';
import { InteractionResponseType } from 'discord-interactions';

export default new Command({
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Get the list of commands'),

  execute: ({ interaction, res }) => {
    return res.json({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: 'Hello world',
      },
    });
  },
});
