import { player, rock } from './utils/tiles';
import { oneTile, wallTile } from './utils/builders';
import type { MineSnapshotRows } from '../types';

export function createDefaultMineSnapshot(): MineSnapshotRows {
  return [
    oneTile(rock()),
    oneTile(rock()),
    oneTile(rock()),
    oneTile(rock()),
    oneTile(rock()),
    oneTile(rock()),
    oneTile(player()),
    wallTile(),
    wallTile(),
  ];
}
