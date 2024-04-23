import { createCanvas } from '@napi-rs/canvas';

export const gridTileSize = 32;
export const halfGridTileSize = gridTileSize / 2;
export const canvasSize = gridTileSize * 9;

export function setupCanvas(width: number, height: number) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  return {
    canvas,
    ctx,
    createImage: () => canvas.encodeSync('webp'),
  };
}
