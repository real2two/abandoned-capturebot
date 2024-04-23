import type { InteractionRequest } from '@/utils';

export default class Event {
  execute: InteractionRequest;
  /**
   * Create a event
   * @param data The event data
   */
  constructor({ execute }: { execute: InteractionRequest }) {
    this.execute = execute;
  }
}
