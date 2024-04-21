import { MineSnapshotBlockId, type MineSnapshotRows } from '@/db';

export function createDefaultMineSnapshot(): MineSnapshotRows {
  return [
    [
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Rock, reversed: !!Math.round(Math.random()) },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
    ],
    [
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Rock, reversed: !!Math.round(Math.random()) },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
    ],
    [
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Rock, reversed: !!Math.round(Math.random()) },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
    ],
    [
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Rock, reversed: !!Math.round(Math.random()) },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
    ],
    [
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Rock, reversed: !!Math.round(Math.random()) },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
    ],
    [
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Rock, reversed: !!Math.round(Math.random()) },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
    ],
    [
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Player },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
    ],
    [
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.None },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
    ],
    [
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.None },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
      { blockId: MineSnapshotBlockId.Wall },
    ],
  ];
}
