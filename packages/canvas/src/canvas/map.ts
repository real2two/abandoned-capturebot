import Images from '../images';
import { canvasSize, gridTileSize, setupCanvas, drawMineBackground, drawMineTile } from '../canvas';
import { loadImage } from '@napi-rs/canvas';
import { MineSnapshotRows, findLongestArray } from '@/utils';
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
  snapshot: MineSnapshotRows;
}) {
  // Create the canvas
  const { canvas, ctx, createImage } = setupCanvas(canvasSize, canvasSize);

  // Load avatar
  const defaultAvatarNumber = ((BigInt(userId) >> 22n) % 6n).toString() as DefaultAvatarNumber;
  const avatarImage = avatar
    ? await loadImage(`https://cdn.discordapp.com/avatars/${userId}/${avatar}`)
    : Images.avatars[defaultAvatarNumber];

  // Draw the background
  drawMineBackground(canvas, ctx);

  // Determine the "visual" snapshot here
  for (let row = 0; row < 9; ++row) {
    for (let column = 0; column < snapshot[row].length; ++column) {
      const tile = snapshot[row + snapshot.length - 9][column];
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

export async function renderMineRows(snapshot: MineSnapshotRows) {
  // Create the canvas
  const { canvas, ctx, createImage } = setupCanvas(
    gridTileSize * findLongestArray(snapshot).length,
    gridTileSize * snapshot.length,
  );

  // Draw the background
  drawMineBackground(canvas, ctx);

  // Determine the "visual" snapshot here
  for (let row = 0; row < snapshot.length; ++row) {
    for (let column = 0; column < snapshot[row].length; ++column) {
      const tile = snapshot[row][column];
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
