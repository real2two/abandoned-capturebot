import { MineSnapshotTileId } from '@/db';
import { createMineRows } from './rows';
import { flattenSnapshot } from './flatten';
import type { MineSnapshotAreas } from '../types';

export function findPlayer(snapshot: MineSnapshotAreas) {
  const rows = flattenSnapshot(snapshot);
  for (let row = 0; row < rows.length; ++row) {
    for (let column = 0; column < rows[row].length; ++column) {
      if (rows[row][column].tileId === MineSnapshotTileId.Player) {
        const leftOfPlayer = rows[row]?.[column - 1];
        const frontOfPlayer = rows[row - 1]?.[column];
        const rightOfPlayer = rows[row]?.[column + 1];

        return {
          row,
          column,
          tile: rows[row][column],
          canMove: {
            left: leftOfPlayer ? leftOfPlayer.tileId !== MineSnapshotTileId.Wall : false,
            up: frontOfPlayer ? frontOfPlayer.tileId !== MineSnapshotTileId.Wall : false,
            right: rightOfPlayer ? rightOfPlayer.tileId !== MineSnapshotTileId.Wall : false,
          },
        };
      }
    }
  }
  throw new Error('Cannot find player in the scene');
}

export function findPlayerRow(snapshot: MineSnapshotAreas) {
  const rows = flattenSnapshot(snapshot);
  for (let row = 0; row < rows.length; ++row) {
    for (let column = 0; column < rows[row].length; ++column) {
      if (rows[row][column].tileId === MineSnapshotTileId.Player) {
        return row;
      }
    }
  }
  throw new Error('Cannot find player in the scene');
}

/**
 * Make the player take a step on the current map
 * (ex. when step = 0, you see the rows 0-9)
 * @param data The amount of steps the player has taken and the current snapshot of the map
 * @returns The new mine data (aka 9 rows of mine data)
 */
export function nextMineStep({
  direction,
  currencyRocks,
  snapshot,
}: {
  direction: 'left' | 'up' | 'right';
  currencyRocks: bigint;
  snapshot: MineSnapshotAreas;
}) {
  // Create a new snapshot object, so it doesn't replace the older one
  const newSnapshot = [...snapshot.map((s) => ({ ...s }))];

  // If player moves forward, adds the new tile to the top
  const oldPlayerRow = findPlayerRow(newSnapshot);
  const oldRows = flattenSnapshot(newSnapshot);
  if (direction === 'up' && !oldRows[oldPlayerRow - 7]) {
    newSnapshot.unshift(...createMineRows(newSnapshot));
  }

  // Move the player forward
  const rows = flattenSnapshot(newSnapshot);
  let finished = false;
  for (let row = 0; row < rows.length; ++row) {
    for (let column = 0; column < rows[row].length; ++column) {
      if (rows[row][column].tileId === MineSnapshotTileId.Player) {
        // Set the variables
        const { newRow, newColumn } = (() => {
          if (direction === 'left') return { newRow: row, newColumn: column - 1 };
          if (direction === 'right') return { newRow: row, newColumn: column + 1 };
          return { newRow: row - 1, newColumn: column };
        })();

        // Disallows the player from going above the canvas and walking into a wall
        if (!rows[row]?.[column] || rows[newRow][newColumn].tileId === MineSnapshotTileId.Wall) {
          throw new Error('The player cannot take a step on the following direction currently');
        }

        finished = true;

        // TODO: Do something with the area object (ex. saving data in it)
        // const area = newSnapshot.find((s) => s.tiles.some((t) => t === rows[newRow]));

        const newTile = rows[newRow][newColumn];
        if (newTile.tileId === MineSnapshotTileId.Rock) {
          currencyRocks += 1n + BigInt(newTile.dual);
        }

        rows[row][column] = { tileId: MineSnapshotTileId.Empty };
        rows[newRow][newColumn] = { tileId: MineSnapshotTileId.Player };

        break;
      }
      if (finished) break;
    }
  }

  // If player moves up and the area is no longer visible, remove the last area
  if (direction === 'up') {
    const newPlayerRow = findPlayerRow(newSnapshot);
    const beforeLast = rows.length - newSnapshot[newSnapshot.length - 1].tiles.length;
    // If I add ever add any "teleport back" object, don't put it on the last 2 rows of an area.
    // Why? Then, the player would be able to see the deleted rows behind it.
    // I'm too lazy to fix this, considering the fact this is working as intended.
    if (beforeLast > newPlayerRow + 2) {
      newSnapshot.pop();
    }
  }

  // Returns the new mine data
  return {
    currencyRocks,
    snapshot: newSnapshot,
  };
}
