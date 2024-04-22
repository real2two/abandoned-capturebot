import Images from '../images';
import { setupCanvas } from '../canvas';
import { loadImage } from '@napi-rs/canvas';
import { MineSnapshotBlockId, MineSnapshotRows } from '@/utils';
import type { DefaultAvatarNumber } from '../types';

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
  const { canvas, ctx, createImage } = setupCanvas(576, 576);
  const gridBlockSize = 64;

  // Load avatar
  const defaultAvatarNumber = ((BigInt(userId) >> 22n) % 6n).toString() as DefaultAvatarNumber;
  const avatarImage = avatar
    ? await loadImage(`https://cdn.discordapp.com/avatars/${userId}/${avatar}`)
    : Images.avatars[defaultAvatarNumber];

  /*
  Colors:
    Black: #000000
    White: #FFFFFF
    Light gray: #DEDEDE
    Gray: #C8C8C8
    Dark gray: #666666
    Darker gray: #333333
  */

  // Fill the background
  ctx.fillStyle = '#DEDEDE';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the grid
  ctx.strokeStyle = '#C8C8C8';
  for (let x = 0; x < 9; ++x) {
    ctx.moveTo(x * gridBlockSize, 0);
    ctx.lineTo(x * gridBlockSize, canvas.height);
  }
  for (let y = 0; y < 9; ++y) {
    ctx.moveTo(0, y * gridBlockSize);
    ctx.lineTo(canvas.width, y * gridBlockSize);
  }
  ctx.stroke();

  // Determine the "visual" snapshot here
  for (let row = 0; row < snapshot.length; ++row) {
    for (let column = 0; column < snapshot[row].length; ++column) {
      const block = snapshot[row][column];
      switch (block.blockId) {
        case MineSnapshotBlockId.Player: {
          // Draw the character
          const playerX = gridBlockSize * (column + 0.075);
          const playerY = gridBlockSize * (row + 0.075);
          const playerSize = gridBlockSize * 0.85;
          const playerCircleX = gridBlockSize * (column + 0.5);
          const playerCircleY = gridBlockSize * (row + 0.5);
          const playerCircleSize = gridBlockSize * 0.425; // 0.5 * 0.85

          ctx.save();
          ctx.beginPath();
          ctx.arc(playerCircleX, playerCircleY, playerCircleSize, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(avatarImage, playerX, playerY, playerSize, playerSize);
          ctx.restore();

          break;
        }
        case MineSnapshotBlockId.Wall: {
          ctx.fillStyle = '#C8C8C8';
          ctx.fillRect(column * gridBlockSize, row * gridBlockSize, gridBlockSize, gridBlockSize);

          break;
        }
        case MineSnapshotBlockId.Rock: {
          const rockX = gridBlockSize * (column + 0.2);
          const rockY = gridBlockSize * (row + 0.2);
          const rockWidth = gridBlockSize * 0.6;
          const rockHeight = gridBlockSize * 0.6;

          ctx.save();
          ctx.translate(rockX + rockWidth / 2, rockY);
          if (block.reversed) ctx.scale(-1, 1);
          ctx.drawImage(Images.emojis.coloredRock, -rockWidth / 2, 0, rockWidth, rockHeight);
          ctx.restore();

          break;
        }
      }
    }
  }

  // Create the image
  return createImage();
}
