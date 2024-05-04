import Component from '../structures/Component';
import { editMessage } from '../utils/rest';

import { InteractionResponseType, MessageFlags } from 'discord-api-types/v10';
import {
  MineSnapshotAreas,
  findPlayer,
  getCooldown,
  getMineActiveMessage,
  getUser,
  nextMineStep,
  setCooldown,
  updateUser,
} from '@/utils';
import { createMineMessage, createMineMessageComponents } from '../utils/messages';

// This is the mine cooldown
// The mine cooldown should always be above 200ms to prevent rate limit problems
// Also, there's an issue on Discord with embeds being slow at loading images, so keep that in mind
const cooldownName = 'component:mine';
const clickerMaxClicksAtOnce = 5;
const clickerSingleCooldown = 400;
const clickerCooldown = clickerMaxClicksAtOnce * 510;
const clickerRetainValue = clickerCooldown;

export default new Component({
  customId: /^mine:.*$/,
  interactionOwnerOnly: true,
  execute: async ({ interaction, user, respond }) => {
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

    // Gets the button information
    const customId = interaction.data?.customId;
    const direction = customId.slice('mine:'.length) as 'up' | 'left' | 'right' | 'refresh';

    // Checks cooldown
    const cooldown = (await getCooldown(cooldownName, user.id)) as
      | {
          expiresIn: number;
          value: {
            normal?: number;
            up: number[];
          };
        }
      | undefined;

    if (cooldown) {
      // Met cooldown
      if (
        (cooldown.value.normal && direction !== 'up' && cooldown.value.normal - Date.now() > 0) ||
        cooldown.value.up.length >= clickerMaxClicksAtOnce
      ) {
        // return respond({
        //   type: InteractionResponseType.ChannelMessageWithSource,
        //   data: {
        //     content: 'You are running this action too fast!',
        //     flags: MessageFlags.Ephemeral,
        //   },
        // });
        return respond({
          type: InteractionResponseType.DeferredMessageUpdate,
        });
      }
      // Update existing cooldown data
      if (direction === 'up') cooldown.value.up.push(Date.now() + clickerRetainValue);
      await setCooldown({
        action: cooldownName,
        userId: user.id,
        expiresIn: clickerCooldown,
        value: {
          normal: Date.now() + clickerSingleCooldown,
          up: cooldown.value.up.filter((e) => e - Date.now() > 0),
        },
      });
    } else {
      // Create initial cooldown data
      await setCooldown({
        action: cooldownName,
        userId: user.id,
        expiresIn: clickerCooldown,
        value: {
          normal: Date.now() + clickerSingleCooldown,
          up: direction === 'up' ? [Date.now() + clickerCooldown] : [],
        },
      });
    }

    const reachedCooldown =
      (cooldown?.value.up.length || 0) + Number(direction === 'up') >= clickerMaxClicksAtOnce;

    // Gets the player
    const player = await getUser(user.id);
    const { canMove } = findPlayer(player.mineSnapshot);

    let snapshot: MineSnapshotAreas;
    let currencyRocks: bigint;
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
      setDisabledComponents: direction === 'up' && reachedCooldown,
    });

    if (direction === 'up') {
      // Sends the mine forward message
      if (!reachedCooldown) {
        return respond({
          type: InteractionResponseType.UpdateMessage,
          data: message,
        });
      }
      // Respond message in a timeout if reachedCooldown === true
      await respond({
        type: InteractionResponseType.UpdateMessage,
        data: message,
      });
      // If you reached your cooldown, edit the message after the cooldown is over
      // The timeout is to prevent interaction failed
      return setTimeout(() => {
        editMessage(interaction, {
          components: createMineMessageComponents({
            canMove: updatedCanMove,
          }),
        });
      }, clickerCooldown);
    } else {
      // If you aren't going up, use setTimeout to delay movement
      setTimeout(() => {
        return respond({
          type: InteractionResponseType.UpdateMessage,
          data: message,
        });
      }, clickerSingleCooldown);
    }
  },
});
