import Images from '../images';
import { MineSnapshotTile, MineSnapshotTileId } from '@/utils';
import { gridTileSize } from './canvas';

import type { Canvas, Image, SKRSContext2D } from '@napi-rs/canvas';
import { drawImageTile } from './image';

export async function drawMineBackground(canvas: Canvas, ctx: SKRSContext2D) {
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
}

export async function drawMineTile({
  ctx,
  tile,
  x,
  y,
  options,
}: {
  ctx: SKRSContext2D;
  tile: MineSnapshotTile;
  x: number;
  y: number;
  options?: {
    avatarImage?: Image;
  };
}) {
  switch (tile.tileId) {
    case MineSnapshotTileId.Player: {
      // Draw the character
      const playerX = gridTileSize * (x + 0.075);
      const playerY = gridTileSize * (y + 0.075);
      const playerSize = gridTileSize * 0.85;
      const playerCircleX = gridTileSize * (x + 0.5);
      const playerCircleY = gridTileSize * (y + 0.5);
      const playerCircleSize = gridTileSize * 0.425; // 0.5 * 0.85

      ctx.save();
      ctx.beginPath();
      ctx.arc(playerCircleX, playerCircleY, playerCircleSize, 0, Math.PI * 2);
      ctx.clip();
      if (options?.avatarImage) {
        ctx.drawImage(options?.avatarImage, playerX, playerY, playerSize, playerSize);
      } else {
        ctx.fillRect(playerX, playerY, playerSize, playerSize);
      }
      ctx.restore();

      break;
    }
    case MineSnapshotTileId.Wall: {
      ctx.fillStyle = '#C8C8C8';
      ctx.fillRect(x * gridTileSize, y * gridTileSize, gridTileSize, gridTileSize);

      break;
    }
    case MineSnapshotTileId.Rock: {
      if (tile.dual) {
        drawImageTile(ctx, Images.rocks.dualRocks, x, y, { reversed: tile.reversed });
      } else {
        drawImageTile(ctx, Images.rocks.rock, x, y, { reversed: tile.reversed });
      }

      break;
    }
  }
}
