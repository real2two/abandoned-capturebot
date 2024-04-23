import { type MineSnapshotRows } from '../types';
import { empty, wall, rock } from './utils/builders';
import { createBaseRow, createThreeRow, createFiveRow } from './utils/templates';

/**
 * Create a mine row
 * @param data The row you want to get (starts at 0)
 */
export function createMineRows(snapshot: MineSnapshotRows): MineSnapshotRows {
  const rn = Math.random();

  if (rn < 0.3) {
    return [createFiveRow([empty(), rock(), empty(), empty(), rock()])];
  } else if (rn < 0.6) {
    return [
      createThreeRow([empty(), empty(), empty()]),
      createThreeRow([rock({ reversed: false }), empty(), rock({ reversed: true })]),
    ];
  }

  return [createBaseRow(rock())];
}
