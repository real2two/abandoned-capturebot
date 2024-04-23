import { MineSnapshotTileId, type MineSnapshotTileBase, type MineSnapshotTileRock } from '../../types';

export function createEmptyTile(): MineSnapshotTileBase {
  return { tileId: MineSnapshotTileId.Empty };
}

export function createTileWall(): MineSnapshotTileBase {
  return { tileId: MineSnapshotTileId.Wall };
}

export function createTileRock(data?: { reversed?: boolean }): MineSnapshotTileRock {
  return {
    tileId: MineSnapshotTileId.Rock,
    reversed: typeof data?.reversed === 'boolean' ? data.reversed : !!Math.round(Math.random()),
  };
}
