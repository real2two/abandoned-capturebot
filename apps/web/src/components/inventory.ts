import Component from '../structures/Component';
import {
  ButtonStyle,
  ComponentType,
  InteractionResponseType,
  MessageFlags,
} from 'discord-api-types/v10';
import { getInventory, getInventoryCount } from '@/utils';

export default new Component({
  customId: /^inventory:.*$/,
  execute: async ({ interaction, respond }) => {
    const values = interaction.data?.customId.split(':');

    const userId = values[2];
    let page = parseInt(values[3]);

    const embed = interaction.message?.embeds?.[0];
    if (!embed) {
      return respond({
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          content: 'Missing embed. Please run the command again.',
          flags: MessageFlags.Ephemeral,
        },
      });
    }

    // Inventory
    const count = await getInventoryCount(userId);
    const lastPage = Math.floor(count / 8);

    if (page > lastPage) page = lastPage;

    const inventory = await getInventory(userId, { page });
    if (!inventory.length && count) return; // Possible, but shouldn't happen (interaction failed)

    return respond({
      type: InteractionResponseType.UpdateMessage,
      data: {
        embeds: [
          {
            ...embed,
            description:
              count !== 0
                ? inventory.map((i) => `**${i.itemId}**: ${i.quantity}`).join('\n')
                : 'You do not have any items in your inventory.',
            footer:
              count !== 0
                ? {
                    text: `Page ${page + 1} out of ${lastPage + 1}`,
                  }
                : undefined,
          },
        ],
        components: [
          {
            type: ComponentType.ActionRow,
            components: [
              {
                type: ComponentType.Button,
                style: ButtonStyle.Secondary,
                emoji: { name: '⏪' },
                customId: `inventory:1:${userId}:${page - 10 < 0 ? 0 : page - 10}`,
                disabled: page === 0,
              },
              {
                type: ComponentType.Button,
                style: ButtonStyle.Secondary,
                emoji: { name: '◀️' },
                customId: `inventory:2:${userId}:${page - 1}`,
                disabled: page === 0,
              },
              {
                type: ComponentType.Button,
                style: ButtonStyle.Secondary,
                emoji: { name: '▶️' },
                customId: `inventory:3:${userId}:${page + 1}`,
                disabled: page === lastPage,
              },
              {
                type: ComponentType.Button,
                style: ButtonStyle.Secondary,
                emoji: { name: '⏩' },
                customId: `inventory:4:${userId}:${page + 10 > lastPage ? lastPage : page + 10}`,
                disabled: page === lastPage,
              },
            ],
          },
        ],
      },
    });
  },
});
