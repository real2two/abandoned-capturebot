import { empty, wall } from './utils/tiles';
import { baseArea, fiveTiles } from './utils/builders';

import { generateRock } from './generation/rock';
import { generateCave } from './generation/cave';

import type { MineSnapshotAreas } from '../types';

/**
 * Create a mine row
 * @param data The row you want to get (starts at 0)
 */
export function createMineRows(snapshot: MineSnapshotAreas): MineSnapshotAreas {
  if (Math.random() < 0.15) {
    const rn = Math.random();
    if (rn < 0.5) {
      return generateCave();
    } else {
      // WIP
      return [baseArea([fiveTiles([empty(), wall(), empty(), wall(), empty()])])];
    }
  }

  return generateRock();
}
