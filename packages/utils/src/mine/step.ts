import { MineSnapshotTileId, type MineSnapshotRows } from '@/db';
import { createMineRows } from './rows';

export function findPlayer(snapshot: MineSnapshotRows) {
  for (let row = 0; row < snapshot.length; ++row) {
    for (let column = 0; column < snapshot[row].length; ++column) {
      if (snapshot[row][column].tileId === MineSnapshotTileId.Player) {
        const leftOfPlayer = snapshot[row]?.[column - 1];
        const frontOfPlayer = snapshot[row - 1]?.[column];
        const rightOfPlayer = snapshot[row]?.[column + 1];

        return {
          row,
          column,
          tile: snapshot[row][column],
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

/**
 * Make the player take a step on the current map
 * (ex. when step = 0, you see the rows 0-9)
 * @param data The amount of steps the player has taken and the current snapshot of the map
 * @returns The new mine data (aka 9 rows of mine data()
 */
export function nextMineStep({
  direction,
  currencyRocks,
  snapshot,
}: {
  direction: 'left' | 'up' | 'right';
  currencyRocks: number;
  snapshot: MineSnapshotRows;
}) {
  // Create a new snapshot object, so it doesn't replace the older one
  const newSnapshot = [...snapshot];

  // If player moves forward, adds the new tile to the top
  if (direction === 'up' && newSnapshot.length <= 9) {
    newSnapshot.unshift(...createMineRows(newSnapshot));
  }

  // Move the player forward
  let finished = false;
  for (let row = 0; row < snapshot.length; ++row) {
    for (let column = 0; column < snapshot[row].length; ++column) {
      if (snapshot[row][column].tileId === MineSnapshotTileId.Player) {
        // Set the variables
        const { newRow, newColumn } = (() => {
          if (direction === 'left') return { newRow: row, newColumn: column - 1 };
          if (direction === 'right') return { newRow: row, newColumn: column + 1 };
          return { newRow: row - 1, newColumn: column };
        })();

        // Disallows the player from going above the canvas and walking into a wall
        if (!snapshot[row]?.[column] || snapshot[newRow][newColumn].tileId === MineSnapshotTileId.Wall) {
          throw new Error('The player cannot take a step on the following direction currently');
        }

        finished = true;

        if (snapshot[newRow][newColumn].tileId === MineSnapshotTileId.Rock) {
          currencyRocks++;
        }

        snapshot[row][column] = { tileId: MineSnapshotTileId.Empty };
        snapshot[newRow][newColumn] = { tileId: MineSnapshotTileId.Player };

        break;
      }
      if (finished) break;
    }
  }

  // If player moves up, remove the last row
  if (direction === 'up') {
    newSnapshot.pop();
  }

  // Returns the new mine data
  return {
    currencyRocks,
    snapshot: newSnapshot,
  };
}
