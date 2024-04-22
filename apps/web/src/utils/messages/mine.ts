import { renderMineScene } from '@/canvas';
import { ButtonStyle, ComponentType } from 'discord-api-types/v10';

import type { CamelizedCustomAPIInteractionResponseCallbackData, CamelizedUser } from '../../types';
import type { MineSnapshotRows } from '@/utils';

export async function createMineMessage({
  user,
  snapshot,
  mined,
  canMove,
}: {
  user: CamelizedUser;
  snapshot: MineSnapshotRows;
  mined: number;
  canMove: {
    left: boolean;
    up: boolean;
    right: boolean;
  };
}): Promise<CamelizedCustomAPIInteractionResponseCallbackData> {
  return {
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
    components: [
      {
        type: ComponentType.ActionRow,
        components: [
          {
            type: ComponentType.Button,
            style: ButtonStyle.Secondary,
            emoji: { name: '◀️' },
            customId: 'mine:left',
            disabled: !canMove.left,
          },
          {
            type: ComponentType.Button,
            style: ButtonStyle.Secondary,
            emoji: { name: '🔼' },
            customId: 'mine:up',
            disabled: !canMove.up,
          },
          {
            type: ComponentType.Button,
            style: ButtonStyle.Secondary,
            emoji: { name: '▶️' },
            customId: 'mine:right',
            disabled: !canMove.right,
          },
        ],
      },
    ],
  };
}
