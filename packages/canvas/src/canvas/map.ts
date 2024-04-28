import Images from '../images';
import { canvasSize, gridTileSize, setupCanvas, drawMineBackground, drawMineTile } from '../canvas';
import { loadImage } from '@napi-rs/canvas';
import {
  MineSnapshotRows,
  findLongestArray,
  findPlayerRow,
  flattenSnapshot,
  type MineSnapshotAreas,
} from '@/utils';
import type { DefaultAvatarNumber } from '../types';

/*
  Colors:
    Black: #000000
    White: #FFFFFF
    Light gray: #DEDEDE
    Gray: #C8C8C8
    Dark gray: #666666
    Darker gray: #333333
*/

export async function renderMineScene({
  userId,
  avatar,
  snapshot,
}: {
  userId: string;
  avatar: string | null;
  snapshot: MineSnapshotAreas;
}) {
  // Create the canvas
  const { canvas, ctx, createImage } = setupCanvas(canvasSize, canvasSize);

  // Load avatar
  const defaultAvatarNumber = ((BigInt(userId) >> 22n) % 6n).toString() as DefaultAvatarNumber;
  const avatarImage = avatar
    ? await loadImage(`https://cdn.discordapp.com/avatars/${userId}/${avatar}`)
    : Images.avatars[defaultAvatarNumber];

  // Find player
  const playerRow = findPlayerRow(snapshot);

  // Draw the background
  drawMineBackground(canvas, ctx);

  // Determine the "visual" snapshot here
  const rows = flattenSnapshot(snapshot);
  for (let row = 0; row < 9; ++row) {
    const realRow = playerRow - 6 + row;
    if (!rows[realRow]) continue; // Should never happen
    for (let column = 0; column < rows[realRow].length; ++column) {
      const tile = rows[realRow][column];
      drawMineTile({
        ctx,
        tile,
        x: column,
        y: row,
        options: { avatarImage },
      });
    }
  }

  // Create the image
  return createImage();
}

export async function renderMineRows(snapshot: MineSnapshotAreas) {
  // Get rows
  const rows = flattenSnapshot(snapshot);

  // Create the canvas
  const { canvas, ctx, createImage } = setupCanvas(
    gridTileSize * findLongestArray(rows).length,
    gridTileSize * rows.length,
  );

  // Draw the background
  drawMineBackground(canvas, ctx);

  // Determine the "visual" snapshot here
  for (let row = 0; row < rows.length; ++row) {
    for (let column = 0; column < rows[row].length; ++column) {
      const tile = rows[row][column];
      drawMineTile({
        ctx,
        tile,
        x: column,
        y: row,
      });
    }
  }

  // Create the image
  return createImage();
}
