import { generateCave } from './generation/cave';
import type { MineSnapshotAreas } from '../types';

export function createDebugMineSnapshot(): MineSnapshotAreas {
  // Add debuging rows here
  return generateCave();
}
