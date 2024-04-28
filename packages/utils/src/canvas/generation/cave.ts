import { empty, rock, randomRock, wall, dualRock } from '../utils/tiles';
import {
  baseArea,
  baseSplitAreas,
  cloneRow,
  leftTiles,
  rightTiles,
  oneTile,
  fiveTiles,
} from '../utils/builders';

export function generateCave() {
  const rows = [];

  const hasTopRocks = Math.round(Math.random());
  const isBottomLeft = Math.round(Math.random());
  const fiveTileChance = Math.round(Math.random());

  if (hasTopRocks) {
    if (isBottomLeft) {
      rows.push(leftTiles([fiveTileChance ? randomRock() : dualRock(), randomRock()]));
    } else {
      rows.push(rightTiles([randomRock(), fiveTileChance ? randomRock() : dualRock()]));
    }
  }

  if (fiveTileChance) {
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
    rows.push(rightTiles([empty(), fiveTileChance ? randomRock() : dualRock()]));
  } else {
    rows.push(leftTiles([fiveTileChance ? randomRock() : dualRock(), empty()]));
  }

  return [...baseSplitAreas(cloneRow(oneTile(rock()), 4)), baseArea(rows)];
}
