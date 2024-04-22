import Component from '../structures/Component';

import { InteractionResponseType, MessageFlags } from 'discord-api-types/v10';
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
import { createMineMessage } from '../utils/messages';

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

    const { currencyRocks, snapshot } = nextMineStep({
      direction,
      currencyRocks: player.currencyRocks,
      snapshot: player.mineSnapshot,
    });

    const { canMove: newCanMove } = findPlayer(snapshot);

    await updateUser(user.id, {
      currencyRocks,
      mineSnapshot: snapshot,

      mineTotalClicks: player.mineTotalClicks + 1,
      mineTotalUpwardClicks: player.mineTotalUpwardClicks + Number(direction === 'up'),
    });

    // Creates the message
    const message = await createMineMessage({
      user,
      snapshot,
      currencyRocks,
      canMove: newCanMove,
    });

    // Sends the mine forward message
    // The timeout is to prevent interaction failed
    setTimeout(async () => {
      return respond({
        type: InteractionResponseType.UpdateMessage,
        data: message,
      });
    }, clickerCooldown);
  },
});
