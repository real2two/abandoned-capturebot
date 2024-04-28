export type MineSnapshotAreas = MineSnapshotArea[];
export type MineSnapshotArea = {
  id: MineSnapshotAreaId.Base;
  data?: any; // WIP
  tiles: MineSnapshotRows;
};

export enum MineSnapshotAreaId {
  Base = 0,
}

export type MineSnapshotRows = MineSnapshotColumns[];
export type MineSnapshotColumns = MineSnapshotTile[];

export enum MineSnapshotTileId {
  Empty = 0,
  Player = 1,
  Wall = 2,
  Rock = 3,
}

export type MineSnapshotTile = MineSnapshotTileBase | MineSnapshotTileRock;

export interface MineSnapshotTileBase {
  tileId: MineSnapshotTileId.Empty | MineSnapshotTileId.Player | MineSnapshotTileId.Wall;
}

export interface MineSnapshotTileRock {
  tileId: MineSnapshotTileId.Rock;
  dual: boolean;
  reversed: boolean;
}
