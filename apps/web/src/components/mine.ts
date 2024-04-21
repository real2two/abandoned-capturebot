import Component from '../structures/Component';

import { InteractionResponseType, MessageFlags } from 'discord-api-types/v10';
import {
  getCooldown,
  getMineActiveMessage,
  getUser,
  nextMineStep,
  setCooldown,
  updateUser,
} from '@/utils';
import { renderMineScene } from '@/canvas';

const clickerCooldown = 300; // 0.3 seconds

export default new Component({
  customId: /^mine:.*$/,
  execute: async ({ interaction, user, respond }) => {
    // Disallows other people from using somebody else's interaction
    if (interaction.message?.interaction?.user.id !== user.id) {
      return respond({
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          content: 'This is not your interaction',
          flags: MessageFlags.Ephemeral,
        },
      });
    }

    // Only allow executing the active mine message
    if ((await getMineActiveMessage(user.id)) !== interaction.message?.id) {
      return respond({
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          content: 'This interaction has expired',
          flags: MessageFlags.Ephemeral,
        },
      });
    }

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
      // Update player's mine data
      const player = await getUser(user.id);
      const { steps, snapshot } = nextMineStep({
        currentSteps: player.mineSteps,
        snapshot: player.mineSnapshot,
      });

      await updateUser(user.id, {
        mineSteps: steps,
        mineSnapshot: snapshot,
      });

      // Create the scene before sending the message
      const scene = await renderMineScene({
        userId: user.id,
        avatar: user.avatar,
        snapshot,
      });

      // Sends the mine forward message
      // The timeout is to prevent interaction failed
      setTimeout(() => {
        return respond({
          type: InteractionResponseType.UpdateMessage,
          data: {
            content: `⛏️ ${steps}`,
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
