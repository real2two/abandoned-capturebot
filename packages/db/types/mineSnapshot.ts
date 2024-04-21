export type MineSnapshotRows = MineSnapshotColumns[];
export type MineSnapshotColumns = MineSnapshotBlockData[];

export enum MineSnapshotBlockId {
  None = 0,
  Player = 1,
  Wall = 2,
  Rock = 3,
}

export type MineSnapshotBlockData = MineSnapshotBlockDataBase | MineSnapshotBlockDataRock;

export interface MineSnapshotBlockDataBase {
  blockId: MineSnapshotBlockId.None | MineSnapshotBlockId.Player | MineSnapshotBlockId.Wall;
}

export interface MineSnapshotBlockDataRock {
  blockId: MineSnapshotBlockId.Rock;
  reversed: boolean;
}
