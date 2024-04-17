import Component from '../structures/Component';
import { getCooldown, setCooldown } from '@/utils';

import { InteractionResponseType, MessageFlags } from 'discord-api-types/v10';

let count = 0;
let fake = 0;

const clickerCooldown = 300; // 0.3 seconds

export default new Component({
  customId: /^clicker$/,
  execute: async ({ user, respond }) => {
    // Checks cooldown
    if (await getCooldown('clicker', user.id)) {
      return respond({
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          content: 'You are running this action too fast!',
          flags: MessageFlags.Ephemeral,
        },
      });
    }

    // Sets the cooldown (anti-cheat)
    await setCooldown({
      action: 'clicker',
      userId: user.id,
      expiresIn: clickerCooldown,
    });

    // Sends the message
    // The timeout is to prevent interaction failed
    setTimeout(() => {
      return respond({
        type: InteractionResponseType.UpdateMessage,
        data: {
          content: `🍪 ${fake += Math.floor(Math.random() * 6) + 12} (real count: ${++count})`,
        },
      });
    }, clickerCooldown);
  },
});
