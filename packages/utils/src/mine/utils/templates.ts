import { empty, wall } from './builders';
import type { MineSnapshotTile } from '../../types';

export function emptyRow() {
  return [empty(), empty(), empty(), empty(), empty(), empty(), empty(), empty(), empty()];
}

export function oneRow(tile?: MineSnapshotTile) {
  return [wall(), wall(), wall(), wall(), tile || empty(), wall(), wall(), wall(), wall()];
}

export function threeRow(tiles: [MineSnapshotTile, MineSnapshotTile, MineSnapshotTile]) {
  return [wall(), wall(), wall(), tiles[0], tiles[1], tiles[2], wall(), wall(), wall()];
}

export function fiveRow(
  tiles: [MineSnapshotTile, MineSnapshotTile, MineSnapshotTile, MineSnapshotTile, MineSnapshotTile],
) {
  return [wall(), wall(), tiles[0], tiles[1], tiles[2], tiles[3], tiles[4], wall(), wall()];
}

export function sevenRow(
  tiles: [
    MineSnapshotTile,
    MineSnapshotTile,
    MineSnapshotTile,
    MineSnapshotTile,
    MineSnapshotTile,
    MineSnapshotTile,
    MineSnapshotTile,
  ],
) {
  return [wall(), tiles[0], tiles[1], tiles[2], tiles[3], tiles[4], tiles[5], tiles[6], wall()];
}

export function nineRow(
  tiles: [
    MineSnapshotTile,
    MineSnapshotTile,
    MineSnapshotTile,
    MineSnapshotTile,
    MineSnapshotTile,
    MineSnapshotTile,
    MineSnapshotTile,
    MineSnapshotTile,
    MineSnapshotTile,
  ],
) {
  return tiles;
}
