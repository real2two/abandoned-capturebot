import { setupCanvas } from '../canvas';

export function createMineScene() {
  // Create the canvas
  const { canvas, ctx, createImage } = setupCanvas(576, 576);

  // Black: #000000
  // White: #FFFFFF
  // Light gray: #DEDEDE
  // Dark gray: #C8C8C8

  // Fill the background
  ctx.fillStyle = '#DEDEDE';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the grid
  ctx.strokeStyle = '#C8C8C8';
  for (let x = 0; x <= 576; x += 64) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 576);
  }
  for (let x = 0; x <= 576; x += 64) {
    ctx.moveTo(0, x);
    ctx.lineTo(576, x);
  }
  ctx.stroke();

  // Draw the character
  ctx.fillStyle = 'white';
  ctx.fillRect(256, 384, 64, 64);

  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;
  ctx.strokeRect(256, 384, 64, 64);

  // Create the image
  return createImage();
}
