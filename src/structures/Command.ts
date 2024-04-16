import type { SlashCommandBuilder } from '@discordjs/builders';
import type { InteractionRequest } from '../types/InteractionRequest';

export default class Command {
  data: SlashCommandBuilder;
  autocomplete?: InteractionRequest;
  execute?: InteractionRequest;
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
    autocomplete?: InteractionRequest;
    execute?: InteractionRequest;
  }) {
    this.data = data;
    this.autocomplete = autocomplete;
    this.execute = execute;
  }
}
