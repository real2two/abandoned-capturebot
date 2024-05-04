import components from '../utils/components';
import Event from '../structures/Event';
import { InteractionResponseType, MessageFlags } from 'discord-api-types/v10';

import type { InteractionRequestDataWithUser } from '@/utils';

export default new Event({
  execute: (data) => {
    const component = components.find((c) => c.customId.test(data.interaction.data.customId));
    if (!component) {
      return console.warn(
        `Cannot find component with ID: ${data.interaction.data.customId} (Is it in src/utils/components.ts?)`,
      );
    }
    if (!data.user) return; // Makes sure 'user' is defined

    // Disallows other people from using somebody else's interaction
    if (
      component.interactionOwnerOnly &&
      data.interaction.message?.interaction?.user.id !== data.user.id
    ) {
      return data.respond({
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          content: 'This is not your interaction',
          flags: MessageFlags.Ephemeral,
        },
      });
    }

    // Execute the component
    return component?.execute(data as InteractionRequestDataWithUser);
  },
});
