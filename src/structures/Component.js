export default class Component {
  /**
   * Create a component
   * @param {{
   *   customId: RegExp;
   *   execute: import('../types/InteractionRequest').InteractionRequest;
   * }} data The component data
   */
  constructor({ customId, execute }) {
    this.customId = customId;
    this.execute = execute;
  }
  /**
   * Execute the component
   * @param {import('../types/InteractionRequest').InteractionRequestData} data The interaction data
   */
  execute(data) {
    this.execute(data);
  }
}
