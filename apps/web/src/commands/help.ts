import Command from '../structures/Command';

import { SlashCommandBuilder } from '@discordjs/builders';
import { InteractionResponseType } from 'discord-api-types/v10';

import fs from 'fs';

export default new Command({
  data: new SlashCommandBuilder().setName('help').setDescription('Get the list of commands'),
  execute: async ({ respond }) => {
    return respond({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        attachments: [
          {
            name: 'image.png',
            file: fs.createReadStream('./src/commands/image.png'),
          },
        ],
      },
    });
  },
});
