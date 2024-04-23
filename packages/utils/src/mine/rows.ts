import { empty, rock } from './utils/tiles';
import { cloneRow, oneTile, fiveTiles } from './utils/builders';
import type { MineSnapshotRows } from '../types';

/**
 * Create a mine row
 * @param data The row you want to get (starts at 0)
 */
export function createMineRows(snapshot: MineSnapshotRows): MineSnapshotRows {
  const rn = Math.random();

  if (rn < 0.3) {
    return [
      fiveTiles([empty(), rock(), empty(), empty(), rock()]),
      oneTile(empty()),
      ...cloneRow(oneTile(rock()), 4),
    ];
  }

  return [oneTile(rock())];
}
