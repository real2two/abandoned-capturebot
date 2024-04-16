export default class Command {
  /**
   * Create a command
   * @param {{
   *   data: import('@discordjs/builders').SlashCommandBuilder;
   *   autocomplete?: import('../types/InteractionRequest').InteractionRequest;
   *   execute?: import('../types/InteractionRequest').InteractionRequest;
   * }} data The command data
   */
  constructor({ data, autocomplete, execute }) {
    this.data = data;
    this.autocomplete = autocomplete;
    this.execute = execute;
  }
}
