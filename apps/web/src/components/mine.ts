import Component from '../structures/Component';

import {
  ButtonStyle,
  ComponentType,
  InteractionResponseType,
  MessageFlags,
} from 'discord-api-types/v10';

import {
  findPlayer,
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
    const direction = customId.slice('mine:'.length) as 'up' | 'left' | 'right';

    const player = await getUser(user.id);
    const { canMove } = findPlayer(player.mineSnapshot);

    // Update player's mine data
    if (!canMove[direction]) {
      return respond({
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          content: `Cannot move ${direction === 'up' ? 'upwards' : direction}`,
          flags: MessageFlags.Ephemeral,
        },
      });
    }

    const { mined, snapshot } = nextMineStep({
      direction,
      snapshot: player.mineSnapshot,
    });

    const { canMove: newCanMove } = findPlayer(snapshot);

    await updateUser(user.id, {
      mined: player.mined + Number(mined),
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
          content: `⛏️ ${player.mined + Number(mined)}`,
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
          components: [
            {
              type: ComponentType.ActionRow,
              components: [
                {
                  type: ComponentType.Button,
                  style: ButtonStyle.Secondary,
                  emoji: { name: '◀️' },
                  customId: 'mine:left',
                  disabled: !newCanMove.left,
                },
                {
                  type: ComponentType.Button,
                  style: ButtonStyle.Secondary,
                  emoji: { name: '🔼' },
                  customId: 'mine:up',
                  disabled: !newCanMove.up,
                },
                {
                  type: ComponentType.Button,
                  style: ButtonStyle.Secondary,
                  emoji: { name: '▶️' },
                  customId: 'mine:right',
                  disabled: !newCanMove.right,
                },
              ],
            },
          ],
        },
      });
    }, clickerCooldown);
  },
});
