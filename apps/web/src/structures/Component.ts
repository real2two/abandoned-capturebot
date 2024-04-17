import type { InteractionRequestWithUser } from '../types/InteractionRequest';

export default class Component {
  customId: RegExp;
  execute: InteractionRequestWithUser;
  /**
   * Create a component
   * @param data The component data
   */
  constructor({
    customId,
    execute,
  }: { customId: RegExp; execute: InteractionRequestWithUser }) {
    this.customId = customId;
    this.execute = execute;
  }
}
