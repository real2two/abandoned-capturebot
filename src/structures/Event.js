export default class Event {
  /**
   * Create a event
   * @param {{
   *  execute: import('../types/InteractionRequest').InteractionRequest
   * }} data The event data
   */
  constructor({ execute }) {
    this.execute = execute;
  }
  /**
   * Execute the event
   * @param {import('../types/InteractionRequest').InteractionRequestData} data The interaction data
   */
  execute(data) {
    this.execute(data);
  }
}
