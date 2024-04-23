import { gridTileSize } from './canvas';
import type { SKRSContext2D, Image } from '@napi-rs/canvas';

export function drawImageTile(
  ctx: SKRSContext2D,
  image: Image,
  x: number,
  y: number,
  options?: { reversed: boolean },
) {
  ctx.save();
  ctx.translate(gridTileSize * x + 32, gridTileSize * y);
  if (options?.reversed) ctx.scale(-1, 1);
  ctx.drawImage(image, -32, 0);
  ctx.restore();
}
