import { renderMineScene } from '@/canvas';
import { loadingEmojiId, type MineSnapshotRows } from '@/utils';
import { ButtonStyle, ComponentType } from 'discord-api-types/v10';

import type { CamelizedCustomAPIInteractionResponseCallbackData, CamelizedUser } from '../../types';

export async function createMineMessage({
  user,
  snapshot,
  mined,
  canMove,
  setLoadingComponents = false,
}: {
  user: CamelizedUser;
  snapshot: MineSnapshotRows;
  mined: number;
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
        title: 'Mining',
        description: `You have **🪨 ${mined} rock${mined === 1 ? '' : 's'}** currently.`,
        image: {
          url: 'attachment://image.webp',
        },
      },
    ],
    attachments: [
      {
        name: 'image.webp',
        file: await renderMineScene({
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
          emoji: setLoadingComponents ? { id: loadingEmojiId } : { name: '◀️' },
          customId: 'mine:left',
          disabled: setLoadingComponents || !canMove.left,
        },
        {
          type: ComponentType.Button,
          style: ButtonStyle.Secondary,
          emoji: setLoadingComponents ? { id: loadingEmojiId } : { name: '🔼' },
          customId: 'mine:up',
          disabled: setLoadingComponents || !canMove.up,
        },
        {
          type: ComponentType.Button,
          style: ButtonStyle.Secondary,
          emoji: setLoadingComponents ? { id: loadingEmojiId } : { name: '▶️' },
          customId: 'mine:right',
          disabled: setLoadingComponents || !canMove.right,
        },
      ],
    },
  ];
}
