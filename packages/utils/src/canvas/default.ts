import { player, rock, wall } from './utils/tiles';
import { baseArea, oneTile } from './utils/builders';
import type { MineSnapshotAreas } from '../types';

export function createDefaultMineSnapshot(): MineSnapshotAreas {
  return [
    baseArea([oneTile(rock())]),
    baseArea([oneTile(rock())]),
    baseArea([oneTile(rock())]),
    baseArea([oneTile(rock())]),
    baseArea([oneTile(rock())]),
    baseArea([oneTile(rock())]),
    baseArea([oneTile(player())]),
    baseArea([oneTile(wall())]),
    baseArea([oneTile(wall())]),
  ];
}
