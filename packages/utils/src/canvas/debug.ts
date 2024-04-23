import { empty, rock } from './utils/tiles';
import { cloneRow, leftTiles, rightTiles, oneTile, fiveTiles } from './utils/builders';
import type { MineSnapshotRows } from '../types';

export function createDebugMineSnapshot(): MineSnapshotRows {
  return [
    ...cloneRow(oneTile(rock()), 4),
    oneTile(empty()),
    rightTiles([empty(), rock()]),
    fiveTiles([rock(), empty(), empty(), empty(), rock()]),
    leftTiles([rock(), empty()]),
  ];
}
