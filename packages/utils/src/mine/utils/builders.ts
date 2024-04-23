import { empty, wall, rock } from './tiles';
import type { MineSnapshotRows, MineSnapshotColumns, MineSnapshotTile } from '../../types';

export function emptyRow() {
  return [empty(), empty(), empty(), empty(), empty(), empty(), empty(), empty(), empty()];
}

export function cloneRow(tile: MineSnapshotColumns, amount: number) {
  const column: MineSnapshotRows = [];
  for (let i = 0; i < amount; i++) {
    column.push(tile);
  }
  return column;
}

export function cloneRows(tiles: MineSnapshotColumns[], amount: number) {
  const column: MineSnapshotRows = [];
  for (let i = 0; i < amount; i++) {
    column.push(...tiles);
  }
  return column;
}

export function wallTile() {
  return oneTile(wall());
}

export function oneTile(tile: MineSnapshotTile) {
  return [wall(), wall(), wall(), wall(), tile, wall(), wall(), wall(), wall()];
}

export function threeTiles(tiles: [MineSnapshotTile, MineSnapshotTile, MineSnapshotTile]) {
  return [wall(), wall(), wall(), tiles[0], tiles[1], tiles[2], wall(), wall(), wall()];
}

export function fiveTiles(
  tiles: [MineSnapshotTile, MineSnapshotTile, MineSnapshotTile, MineSnapshotTile, MineSnapshotTile],
) {
  return [wall(), wall(), tiles[0], tiles[1], tiles[2], tiles[3], tiles[4], wall(), wall()];
}

export function sevenTiles(
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

export function nineTiles(
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