import { generateCave } from './generation/cave';
import type { MineSnapshotRows } from '../types';

export function createDebugMineSnapshot(): MineSnapshotRows {
  // Add debuging rows here
  return generateCave();
}
