import commands from '../utils/commands.js';
import Event from '../structures/Event.js';

import { SlashCommandBuilder } from '@discordjs/builders';

export default new Event({
  execute: (data) => {
    const command = commands.find(
      (c) =>
        c.data instanceof SlashCommandBuilder && // Only supports slash commands
        c.data.name === data.interaction.data?.name,
    );

    if (!command) {
      return console.warn(
        `Cannot find command with ID: ${data.interaction.data?.name} (Is it in src/utils/commands.js?)`,
      );
    }
    
    return command?.execute?.(data);
  },
});
