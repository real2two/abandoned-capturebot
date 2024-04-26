import Component from '../structures/Component';

import { InteractionResponseType, MessageFlags } from 'discord-api-types/v10';
import {
  MineSnapshotRows,
  findPlayer,
  getCooldown,
  getMineActiveMessage,
  getUser,
  nextMineStep,
  setCooldown,
  updateUser,
} from '@/utils';
import { createMineMessage } from '../utils/messages';

// This is the mine cooldown
// The mine cooldown should always be above 200ms to prevent rate limit problems
// Also, there's an issue on Discord with embeds being slow at loading images, so keep that in mind
const cooldownName = 'component:mine';
const clickerCooldown = 400; // 0.4 seconds

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
    if (await getCooldown(cooldownName, user.id)) {
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
      action: cooldownName,
      userId: user.id,
      expiresIn: clickerCooldown,
    });

    const customId = interaction.data?.customId;
    const direction = customId.slice('mine:'.length) as 'up' | 'left' | 'right' | 'refresh';

    const player = await getUser(user.id);
    const { canMove } = findPlayer(player.mineSnapshot);

    let snapshot: MineSnapshotRows;
    let currencyRocks: number;
    let updatedCanMove: ReturnType<typeof findPlayer>['canMove'];

    if (direction === 'refresh') {
      // If you're just refreshing the embed, it doesn't need to update anything
      snapshot = player.mineSnapshot;
      currencyRocks = player.currencyRocks;
      updatedCanMove = canMove;
    } else {
      // Update player's mine data
      if (!canMove[direction]) {
        // In theory, this should never happen, but Discord has an issue where embed images sometimes load too slowly.
        // When this happens, a message edit is delayed and an edit you've done later may be replaced an earlier edit.
        return respond({
          type: InteractionResponseType.UpdateMessage,
          data: await createMineMessage({
            user,
            snapshot: player.mineSnapshot,
            currencyRocks: player.currencyRocks,
            canMove,
          }),
        });
      }

      // Simulates a player step
      const step = nextMineStep({
        direction,
        currencyRocks: player.currencyRocks,
        snapshot: player.mineSnapshot,
      });

      // Updates the user
      const updatedPlayer = findPlayer(step.snapshot);
      await updateUser(user.id, {
        currencyRocks: step.currencyRocks,
        mineSnapshot: step.snapshot,

        mineTotalClicks: player.mineTotalClicks + 1,
        mineTotalUpwardClicks: player.mineTotalUpwardClicks + Number(direction === 'up'),
      });

      // Set the variables for responding to the interaction
      snapshot = step.snapshot;
      currencyRocks = step.currencyRocks;
      updatedCanMove = updatedPlayer.canMove;
    }

    // Creates the message
    const message = await createMineMessage({
      user,
      snapshot,
      currencyRocks,
      canMove: updatedCanMove,
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
