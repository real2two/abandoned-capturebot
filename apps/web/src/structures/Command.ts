import type { SlashCommandBuilder } from '@discordjs/builders';
import type { InteractionRequestWithUser } from '../types/interaction';

export default class Command {
  data: Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
  autocomplete?: InteractionRequestWithUser;
  execute?: InteractionRequestWithUser;
  /**
   * Create a command
   * @param data The command data
   */
  constructor({
    data,
    autocomplete,
    execute,
  }: {
    data: Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
    autocomplete?: InteractionRequestWithUser;
    execute?: InteractionRequestWithUser;
  }) {
    this.data = data;
    this.autocomplete = autocomplete;
    this.execute = execute;
  }
}
