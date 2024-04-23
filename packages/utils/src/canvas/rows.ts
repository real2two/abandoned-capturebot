import { empty, rock, wall } from './utils/tiles';
import { cloneRow, leftTiles, rightTiles, oneTile, fiveTiles } from './utils/builders';
import type { MineSnapshotRows } from '../types';

/**
 * Create a mine row
 * @param data The row you want to get (starts at 0)
 */
export function createMineRows(snapshot: MineSnapshotRows): MineSnapshotRows {
  if (Math.random() < 0.3) {
    const rn = Math.random();
    if (rn < 0.5) {
      return [
        ...cloneRow(oneTile(rock()), 4),
        oneTile(empty()),
        rightTiles([empty(), rock()]),
        fiveTiles([rock(), empty(), empty(), empty(), rock()]),
        leftTiles([rock(), empty()]),
      ];
    } else {
      // WIP
      return [fiveTiles([empty(), wall(), empty(), wall(), empty()])];
    }
  }

  return [oneTile(rock())];
}
