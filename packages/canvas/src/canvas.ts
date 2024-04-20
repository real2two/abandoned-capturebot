import { createCanvas } from '@napi-rs/canvas';

export function setupCanvas(width: number, height: number) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  return {
    canvas,
    ctx,
    createImage: () => canvas.encodeSync('webp'),
  };
}
