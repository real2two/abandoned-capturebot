import Images from '../images';
import { setupCanvas } from '../canvas';
import { loadImage } from '@napi-rs/canvas';
import type { DefaultAvatarNumber } from '../types';

export async function createMineScene({
  userId,
  avatar,
}: {
  userId: string;
  avatar: string | null;
}) {
  // Create the canvas
  const { canvas, ctx, createImage } = setupCanvas(576, 576);
  const gridBlockSize = 64;

  // Black: #000000
  // White: #FFFFFF
  // Light gray: #DEDEDE
  // Gray: #C8C8C8
  // Dark gray: #666666
  // Darker gray: #333333

  // Fill the background
  ctx.fillStyle = '#DEDEDE';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the grid
  ctx.strokeStyle = '#C8C8C8';
  for (let x = 0; x < 9; ++x) {
    ctx.moveTo(x * gridBlockSize, 0);
    ctx.lineTo(x * gridBlockSize, canvas.height);
  }
  for (let x = 0; x < 9; ++x) {
    ctx.moveTo(0, x * gridBlockSize);
    ctx.lineTo(canvas.width, x * gridBlockSize);
  }
  ctx.stroke();

  // Fill in places with rocks
  for (let x = 0; x < 9; ++x) {
    for (let y = 0; y < 9; ++y) {
      if (x === 4) {
        if (y >= 6) break;
        ctx.fillStyle = '#666666';
        ctx.fillRect(x * gridBlockSize, y * gridBlockSize, gridBlockSize, gridBlockSize);

        ctx.strokeStyle = '#333333';
        ctx.strokeRect(x * gridBlockSize, y * gridBlockSize, gridBlockSize, gridBlockSize);
      }
    }
  }

  // Draw the character
  const defaultAvatarNumber = ((BigInt(userId) >> 22n) % 6n).toString() as DefaultAvatarNumber;
  const avatarImage = avatar
    ? await loadImage(`https://cdn.discordapp.com/avatars/${userId}/${avatar}`)
    : Images.avatars[defaultAvatarNumber];

  ctx.fillStyle = 'white';
  ctx.drawImage(avatarImage, gridBlockSize * 4, gridBlockSize * 6, gridBlockSize, gridBlockSize);

  ctx.strokeStyle = 'black';
  ctx.strokeRect(gridBlockSize * 4, gridBlockSize * 6, gridBlockSize, gridBlockSize);

  // Fill in unwalkable areas
  for (let x = 0; x < 9; ++x) {
    for (let y = 0; y < 9; ++y) {
      if (x === 4) break;
      ctx.fillStyle = '#C8C8C8';
      ctx.fillRect(x * gridBlockSize, y * gridBlockSize, gridBlockSize, gridBlockSize);
    }
  }

  // Create the image
  return createImage();
}
