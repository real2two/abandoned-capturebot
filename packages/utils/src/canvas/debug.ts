import { generateCave } from './generation/rocks';
import type { MineSnapshotRows } from '../types';

export function createDebugMineSnapshot(): MineSnapshotRows {
  // Add debuging rows here
  return generateCave();
}
