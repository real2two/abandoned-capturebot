import type { InteractionRequest } from '../types/InteractionRequest';

export default class Component {
  customId: RegExp;
  execute: InteractionRequest;
  /**
   * Create a component
   * @param data The component data
   */
  constructor({
    customId,
    execute,
  }: { customId: RegExp; execute: InteractionRequest }) {
    this.customId = customId;
    this.execute = execute;
  }
}
