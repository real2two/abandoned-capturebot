import type { MineSnapshotAreas } from '../types';

export function flattenSnapshot(snapshot: MineSnapshotAreas) {
  return snapshot.flatMap((c) => c.tiles);
}
