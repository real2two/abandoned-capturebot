import Images from '../images';
import { setupCanvas } from '../canvas';
import { loadImage } from '@napi-rs/canvas';
import { MineSnapshotTileId, MineSnapshotRows } from '@/utils';
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
  const gridTileSize = 64;

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
    ctx.moveTo(x * gridTileSize, 0);
    ctx.lineTo(x * gridTileSize, canvas.height);
  }
  for (let y = 0; y < 9; ++y) {
    ctx.moveTo(0, y * gridTileSize);
    ctx.lineTo(canvas.width, y * gridTileSize);
  }
  ctx.stroke();

  // Determine the "visual" snapshot here
  for (let row = 0; row < 9; ++row) {
    for (let column = 0; column < snapshot[row].length; ++column) {
      const tile = snapshot[row + snapshot.length - 9][column];
      switch (tile.tileId) {
        case MineSnapshotTileId.Player: {
          // Draw the character
          const playerX = gridTileSize * (column + 0.075);
          const playerY = gridTileSize * (row + 0.075);
          const playerSize = gridTileSize * 0.85;
          const playerCircleX = gridTileSize * (column + 0.5);
          const playerCircleY = gridTileSize * (row + 0.5);
          const playerCircleSize = gridTileSize * 0.425; // 0.5 * 0.85

          ctx.save();
          ctx.beginPath();
          ctx.arc(playerCircleX, playerCircleY, playerCircleSize, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(avatarImage, playerX, playerY, playerSize, playerSize);
          ctx.restore();

          break;
        }
        case MineSnapshotTileId.Wall: {
          ctx.fillStyle = '#C8C8C8';
          ctx.fillRect(column * gridTileSize, row * gridTileSize, gridTileSize, gridTileSize);

          break;
        }
        case MineSnapshotTileId.Rock: {
          const rockX = gridTileSize * (column + 0.2);
          const rockY = gridTileSize * (row + 0.2);
          const rockWidth = gridTileSize * 0.6;
          const rockHeight = gridTileSize * 0.6;

          ctx.save();
          ctx.translate(rockX + rockWidth / 2, rockY);
          if (tile.reversed) ctx.scale(-1, 1);
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
