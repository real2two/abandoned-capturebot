import {
  MineSnapshotTileId,
  type MineSnapshotTileBase,
  type MineSnapshotTileRock,
} from '../../types';

export function empty(): MineSnapshotTileBase {
  return { tileId: MineSnapshotTileId.Empty };
}

export function player(): MineSnapshotTileBase {
  return { tileId: MineSnapshotTileId.Player };
}

export function wall(): MineSnapshotTileBase {
  return { tileId: MineSnapshotTileId.Wall };
}

export function rock(data?: { reversed?: boolean }): MineSnapshotTileRock {
  return {
    tileId: MineSnapshotTileId.Rock,
    reversed: typeof data?.reversed === 'boolean' ? data.reversed : !!Math.round(Math.random()),
  };
}
