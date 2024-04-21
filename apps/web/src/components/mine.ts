import Component from '../structures/Component';

import { InteractionResponseType, MessageFlags } from 'discord-api-types/v10';
import { getCooldown, setCooldown } from '@/utils';
import { createMineScene } from '@/canvas';

const clickerCooldown = 300; // 0.3 seconds

let count = 0;

export default new Component({
  customId: /^mine:.*$/,
  execute: async ({ interaction, user, respond }) => {
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

    const customId = interaction.data?.customId;

    if (customId === 'mine:forward') {
      // Create the scene before sending the message
      const scene = await createMineScene({
        userId: user.id,
        avatar: user.avatar,
      });

      // Sends the mine forward message
      // The timeout is to prevent interaction failed
      setTimeout(() => {
        return respond({
          type: InteractionResponseType.UpdateMessage,
          data: {
            content: `⛏️ ${++count}`,
            embeds: [
              // You can put this in mine.ts as well with 0 problems
              {
                author: { name: 'test' },
                image: {
                  url: 'attachment://image.webp',
                },
              },
            ],
            attachments: [
              {
                name: 'image.webp',
                file: scene,
              },
            ],
          },
        });
      }, clickerCooldown);
    }
  },
});
