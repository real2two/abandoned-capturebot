import type { SlashCommandBuilder } from '@discordjs/builders';
import type { InteractionRequestWithUser } from '../types/InteractionRequest';

export default class Command {
  data: SlashCommandBuilder;
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
    data: SlashCommandBuilder;
    autocomplete?: InteractionRequestWithUser;
    execute?: InteractionRequestWithUser;
  }) {
    this.data = data;
    this.autocomplete = autocomplete;
    this.execute = execute;
  }
}
