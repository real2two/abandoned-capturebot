import { setupCanvas } from '../canvas';

export function createMineScene() {
  const { canvas, ctx, createImage } = setupCanvas(325, 450);

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 50, 50);

  return createImage();
}
