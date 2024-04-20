import { setupCanvas } from '../canvas';

export function createMineScene() {
  const { canvas, ctx, createImage } = setupCanvas(512, 512);

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 75, 75);

  return createImage();
}
