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
  for (let y = 0; y < 9; ++y) {
    ctx.moveTo(0, y * gridBlockSize);
    ctx.lineTo(canvas.width, y * gridBlockSize);
  }
  ctx.stroke();

  // Fill in places with rocks
  for (let x = 0; x < 9; ++x) {
    for (let y = 0; y < 9; ++y) {
      if (x === 4) {
        if (y >= 6) break;

        // ((1 - .6) / 2) = 0.2
        const rockX = gridBlockSize * (x + 0.2);
        const rockY = gridBlockSize * (y + 0.2);
        const rockWidth = gridBlockSize * 0.6;
        const rockHeight = gridBlockSize * 0.6;

        ctx.drawImage(Images.emojis.rock, rockX, rockY, rockWidth, rockHeight);
      }
    }
  }

  // Draw the character
  const playerX = gridBlockSize * 4.075;
  const playerY = gridBlockSize * 6.075;
  const playerSize = gridBlockSize * 0.85;
  const playerCircleX = gridBlockSize * 4.5;
  const playerCircleY = gridBlockSize * 6.5;
  const playerCircleSize = gridBlockSize * 0.425; // 0.5 * 0.85

  const defaultAvatarNumber = ((BigInt(userId) >> 22n) % 6n).toString() as DefaultAvatarNumber;
  const avatarImage = avatar
    ? await loadImage(`https://cdn.discordapp.com/avatars/${userId}/${avatar}`)
    : Images.avatars[defaultAvatarNumber];

  ctx.save();

  ctx.beginPath();
  ctx.arc(playerCircleX, playerCircleY, playerCircleSize, 0, Math.PI * 2);
  ctx.clip();

  ctx.drawImage(avatarImage, playerX, playerY, playerSize, playerSize);

  ctx.strokeStyle = 'black';
  ctx.beginPath();
  ctx.arc(playerCircleX, playerCircleY, playerCircleSize, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();

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
