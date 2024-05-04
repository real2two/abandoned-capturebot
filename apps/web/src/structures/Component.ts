import type { InteractionRequestWithUser } from '@/utils';

export default class Component {
  customId: RegExp;
  interactionOwnerOnly: boolean;
  execute: InteractionRequestWithUser;
  /**
   * Create a component
   * @param data The component data
   */
  constructor({
    customId,
    interactionOwnerOnly,
    execute,
  }: { customId: RegExp; interactionOwnerOnly?: boolean; execute: InteractionRequestWithUser }) {
    this.customId = customId;
    this.interactionOwnerOnly = interactionOwnerOnly || false;
    this.execute = execute;
  }
}
