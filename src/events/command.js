import commands from '../utils/commands.js';
import Event from '../structures/Event.js';

import { SlashCommandBuilder } from '@discordjs/builders';

export default new Event({
  execute: (data) => {
    const command = commands.find(
      (c) =>
        c.data instanceof SlashCommandBuilder &&
        c.data.name === data.interaction.data?.name,
    );
    return command?.execute?.(data);
  },
});
