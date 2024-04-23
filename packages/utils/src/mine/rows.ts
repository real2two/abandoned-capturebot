import { MineSnapshotBlockId, type MineSnapshotRows } from '@/db';

/**
 * Create a mine row
 * @param data The row you want to get (starts at 0)
 */
export function createMineRows(snapshot: MineSnapshotRows): MineSnapshotRows {
  const rn = Math.random();

  if (rn < 0.6) {
    return [
      [
        { blockId: MineSnapshotBlockId.Wall },
        { blockId: MineSnapshotBlockId.Wall },
        { blockId: MineSnapshotBlockId.None },
        { blockId: MineSnapshotBlockId.None },
        { blockId: MineSnapshotBlockId.None },
        { blockId: MineSnapshotBlockId.None },
        { blockId: MineSnapshotBlockId.None },
        { blockId: MineSnapshotBlockId.Wall },
        { blockId: MineSnapshotBlockId.Wall },
      ],
    ];
  } else if (rn < 0.3) {
    return [
      [
        { blockId: MineSnapshotBlockId.Wall },
        { blockId: MineSnapshotBlockId.Wall },
        { blockId: MineSnapshotBlockId.Wall },
        { blockId: MineSnapshotBlockId.None },
        { blockId: MineSnapshotBlockId.None },
        { blockId: MineSnapshotBlockId.None },
        { blockId: MineSnapshotBlockId.Wall },
        { blockId: MineSnapshotBlockId.Wall },
        { blockId: MineSnapshotBlockId.Wall },
      ],
      [
        { blockId: MineSnapshotBlockId.Wall },
        { blockId: MineSnapshotBlockId.Wall },
        { blockId: MineSnapshotBlockId.Wall },
        { blockId: MineSnapshotBlockId.Rock, reversed: false },
        { blockId: MineSnapshotBlockId.None },
        { blockId: MineSnapshotBlockId.Rock, reversed: true },
        { blockId: MineSnapshotBlockId.Wall },
        { blockId: MineSnapshotBlockId.Wall },
        { blockId: MineSnapshotBlockId.Wall },
      ],
    ];
  }

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
  ];
}
