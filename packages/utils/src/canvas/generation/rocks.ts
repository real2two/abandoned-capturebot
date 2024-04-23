import { empty, rock, wall } from '../utils/tiles';
import { cloneRow, leftTiles, rightTiles, oneTile, fiveTiles } from '../utils/builders';

export function generateCave() {
  const rows = [...cloneRow(oneTile(rock()), 4)];

  const hasTopRocks = Math.round(Math.random());
  const isBottomLeft = Math.round(Math.random());

  if (hasTopRocks) {
    if (isBottomLeft) {
      rows.push(leftTiles([rock(), rock()]));
    } else {
      rows.push(rightTiles([rock(), rock()]));
    }
  }

  if (Math.round(Math.random())) {
    rows.push(
      fiveTiles([
        !isBottomLeft ? rock() : wall(),
        !isBottomLeft || hasTopRocks ? rock() : wall(),
        empty(),
        isBottomLeft || hasTopRocks ? rock() : wall(),
        isBottomLeft ? rock() : wall(),
      ]),
    );

    rows.push(
      fiveTiles([
        !isBottomLeft ? rock() : wall(),
        !isBottomLeft ? rock() : wall(),
        empty(),
        isBottomLeft ? rock() : wall(),
        isBottomLeft ? rock() : wall(),
      ]),
    );
  }

  if (isBottomLeft) {
    rows.push(rightTiles([empty(), rock()]));
  } else {
    rows.push(leftTiles([rock(), empty()]));
  }

  return rows;
}
