import { renderMineScene } from '@/canvas';
import { BLUE_COLOR, LOADING_EMOJI_ID } from '@/utils';
import { ButtonStyle, ComponentType } from 'discord-api-types/v10';

import type {
  CamelizedCustomAPIInteractionResponseCallbackData,
  CamelizedUser,
  MineSnapshotAreas,
} from '@/utils';

export async function createMineMessage({
  user,
  snapshot,
  currencyRocks,
  canMove,
  setLoadingComponents = false,
}: {
  user: CamelizedUser;
  snapshot: MineSnapshotAreas;
  currencyRocks: bigint;
  canMove: {
    left: boolean;
    up: boolean;
    right: boolean;
  };
  setLoadingComponents?: boolean;
}): Promise<CamelizedCustomAPIInteractionResponseCallbackData> {
  return {
    content: `<@!${user.id}>`,
    embeds: [
      {
        color: BLUE_COLOR,
        title: 'Mining',
        description: `You have **🪨 ${currencyRocks} rock${
          currencyRocks === 1n ? '' : 's'
        }** currently.`,
        image: {
          url: 'attachment://image.webp',
        },
      },
    ],
    attachments: [
      {
        name: 'image.webp',
        data: await renderMineScene({
          userId: user.id,
          avatar: user.avatar,
          snapshot,
        }),
      },
    ],
    components: createMineMessageComponents({
      canMove,
      setLoadingComponents,
    }),
  };
}

export function createMineMessageComponents({
  canMove,
  setLoadingComponents = false,
}: {
  canMove: {
    left: boolean;
    up: boolean;
    right: boolean;
  };
  setLoadingComponents?: boolean;
}): CamelizedCustomAPIInteractionResponseCallbackData['components'] {
  return [
    {
      type: ComponentType.ActionRow,
      components: [
        {
          type: ComponentType.Button,
          style: ButtonStyle.Secondary,
          emoji: setLoadingComponents ? { id: LOADING_EMOJI_ID } : { name: '◀️' },
          customId: 'mine:left',
          disabled: setLoadingComponents || !canMove.left,
        },
        {
          type: ComponentType.Button,
          style: ButtonStyle.Secondary,
          emoji: setLoadingComponents ? { id: LOADING_EMOJI_ID } : { name: '🔼' },
          customId: 'mine:up',
          disabled: setLoadingComponents || !canMove.up,
        },
        {
          type: ComponentType.Button,
          style: ButtonStyle.Secondary,
          emoji: setLoadingComponents ? { id: LOADING_EMOJI_ID } : { name: '▶️' },
          customId: 'mine:right',
          disabled: setLoadingComponents || !canMove.right,
        },
        {
          type: ComponentType.Button,
          style: ButtonStyle.Secondary,
          emoji: setLoadingComponents ? { id: LOADING_EMOJI_ID } : { name: '🔄' },
          customId: 'mine:refresh',
          disabled: setLoadingComponents,
        },
      ],
    },
  ];
}
