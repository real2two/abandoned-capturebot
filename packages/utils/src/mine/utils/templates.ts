import { empty, wall } from './builders';
import type { MineSnapshotTile } from '../../types';

export function createEmptyRow() {
  return [empty(), empty(), empty(), empty(), empty(), empty(), empty(), empty(), empty()];
}

export function createBaseRow(tile?: MineSnapshotTile) {
  return [wall(), wall(), wall(), wall(), tile || empty(), wall(), wall(), wall(), wall()];
}

export function createThreeRow(tiles: [MineSnapshotTile, MineSnapshotTile, MineSnapshotTile]) {
  return [
    wall(),
    wall(),
    wall(),
    tiles[0] || empty(),
    tiles[1] || empty(),
    tiles[2] || empty(),
    wall(),
    wall(),
    wall(),
  ];
}

export function createFiveRow(
  tiles: [MineSnapshotTile, MineSnapshotTile, MineSnapshotTile, MineSnapshotTile, MineSnapshotTile],
) {
  return [
    wall(),
    wall(),
    tiles[0] || empty(),
    tiles[1] || empty(),
    tiles[2] || empty(),
    tiles[3] || empty(),
    tiles[4] || empty(),
    wall(),
    wall(),
  ];
}
