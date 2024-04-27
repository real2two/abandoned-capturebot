import { empty, rock, randomRock, wall } from '../utils/tiles';
import { cloneRow, leftTiles, rightTiles, oneTile, fiveTiles } from '../utils/builders';

export function generateCave() {
  const rows = [...cloneRow(oneTile(rock()), 4)];

  const hasTopRocks = Math.round(Math.random());
  const isBottomLeft = Math.round(Math.random());

  if (hasTopRocks) {
    if (isBottomLeft) {
      rows.push(leftTiles([randomRock(), randomRock()]));
    } else {
      rows.push(rightTiles([randomRock(), randomRock()]));
    }
  }

  if (Math.round(Math.random())) {
    rows.push(
      fiveTiles([
        !isBottomLeft ? randomRock() : wall(),
        !isBottomLeft || hasTopRocks ? randomRock() : wall(),
        empty(),
        isBottomLeft || hasTopRocks ? randomRock() : wall(),
        isBottomLeft ? randomRock() : wall(),
      ]),
    );

    rows.push(
      fiveTiles([
        !isBottomLeft ? randomRock() : wall(),
        !isBottomLeft ? randomRock() : wall(),
        empty(),
        isBottomLeft ? randomRock() : wall(),
        isBottomLeft ? randomRock() : wall(),
      ]),
    );
  }

  if (isBottomLeft) {
    rows.push(rightTiles([empty(), randomRock()]));
  } else {
    rows.push(leftTiles([randomRock(), empty()]));
  }

  return rows;
}
