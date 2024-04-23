import { gridTileSize, halfGridTileSize } from './canvas';
import type { SKRSContext2D, Image } from '@napi-rs/canvas';

export function drawImageTile(
  ctx: SKRSContext2D,
  image: Image,
  x: number,
  y: number,
  options?: { reversed: boolean },
) {
  ctx.save();
  ctx.translate(gridTileSize * x + halfGridTileSize, gridTileSize * y);
  if (options?.reversed) ctx.scale(-1, 1);
  ctx.drawImage(image, -halfGridTileSize, 0, gridTileSize, gridTileSize);
  ctx.restore();
}
