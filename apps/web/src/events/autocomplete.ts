import commands from '../utils/commands';
import Event from '../structures/Event';

import { SlashCommandBuilder } from '@discordjs/builders';
import type { InteractionRequestDataWithUser } from '@/utils';

export default new Event({
  execute: (data) => {
    const command = commands.find(
      (c) => c.data instanceof SlashCommandBuilder && c.data.name === data.interaction.data?.name,
    );
    if (!command) {
      return console.warn(
        `Cannot find autocomplete command with ID: ${data.interaction.data?.name} (Is it in src/utils/commands.ts?)`,
      );
    }
    if (!data.user) return; // Makes sure 'user' is defined
    return command?.autocomplete?.(data as InteractionRequestDataWithUser);
  },
});
