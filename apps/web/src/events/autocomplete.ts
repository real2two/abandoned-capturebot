import commands from '../utils/commands';
import Event from '../structures/Event';

import { SlashCommandBuilder } from '@discordjs/builders';

export default new Event({
  execute: (data) => {
    const command = commands.find(
      (c) =>
        c.data instanceof SlashCommandBuilder &&
        c.data.name === data.interaction.data?.name,
    );
    if (!command) {
      return console.warn(
        `Cannot find autocomplete command with ID: ${data.interaction.data?.name} (Is it in src/utils/commands.ts?)`,
      );
    }
    return command?.autocomplete?.(data);
  },
});
