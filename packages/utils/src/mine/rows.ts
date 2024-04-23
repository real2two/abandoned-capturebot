import { type MineSnapshotRows } from '../types';
import { createEmptyTile, createTileWall, createTileRock } from './utils/mineBuilders';

/**
 * Create a mine row
 * @param data The row you want to get (starts at 0)
 */
export function createMineRows(snapshot: MineSnapshotRows): MineSnapshotRows {
  const rn = Math.random();

  if (rn < 0.3) {
    return [
      [
        createTileWall(),
        createTileWall(),
        createEmptyTile(),
        createEmptyTile(),
        createEmptyTile(),
        createEmptyTile(),
        createEmptyTile(),
        createTileWall(),
        createTileWall(),
      ],
    ];
  } else if (rn < 0.6) {
    return [
      [
        createTileWall(),
        createTileWall(),
        createTileWall(),
        createEmptyTile(),
        createEmptyTile(),
        createEmptyTile(),
        createTileWall(),
        createTileWall(),
        createTileWall(),
      ],
      [
        createTileWall(),
        createTileWall(),
        createTileWall(),
        createTileRock({ reversed: false }),
        createEmptyTile(),
        createTileRock({ reversed: true }),
        createTileWall(),
        createTileWall(),
        createTileWall(),
      ],
    ];
  }

  return [
    [
      createTileWall(),
      createTileWall(),
      createTileWall(),
      createTileWall(),
      createTileRock(),
      createTileWall(),
      createTileWall(),
      createTileWall(),
      createTileWall(),
    ],
  ];
}
