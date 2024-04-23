import { empty, rock } from './utils/builders';
import { oneRow, threeRow, fiveRow } from './utils/templates';
import type { MineSnapshotRows } from '../types';

/**
 * Create a mine row
 * @param data The row you want to get (starts at 0)
 */
export function createMineRows(snapshot: MineSnapshotRows): MineSnapshotRows {
  const rn = Math.random();

  if (rn < 0.3) {
    return [fiveRow([empty(), rock(), empty(), empty(), rock()])];
  } else if (rn < 0.6) {
    return [
      threeRow([empty(), empty(), empty()]),
      threeRow([rock({ reversed: false }), empty(), rock({ reversed: true })]),
    ];
  }

  return [oneRow(rock())];
}
