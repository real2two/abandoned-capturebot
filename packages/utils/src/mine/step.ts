import { MineSnapshotBlockId, type MineSnapshotRows } from '@/db';

export function findPlayer(snapshot: MineSnapshotRows) {
  for (let row = 0; row < snapshot.length; ++row) {
    for (let column = 0; column < snapshot[row].length; ++column) {
      if (snapshot[row][column].blockId === MineSnapshotBlockId.Player) {
        const leftOfPlayer = snapshot[row]?.[column - 1];
        const frontOfPlayer = snapshot[row - 1]?.[column];
        const rightOfPlayer = snapshot[row]?.[column + 1];

        return {
          row,
          column,
          block: snapshot[row][column],
          canMove: {
            left: leftOfPlayer ? leftOfPlayer.blockId !== MineSnapshotBlockId.Wall : false,
            up: frontOfPlayer ? frontOfPlayer.blockId !== MineSnapshotBlockId.Wall : false,
            right: rightOfPlayer ? rightOfPlayer.blockId !== MineSnapshotBlockId.Wall : false,
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

  // If player moves forward, adds the new block to the top
  if (direction === 'up') {
    newSnapshot.unshift(...createMineRows(newSnapshot));
  }

  // Move the player forward
  let finished = false;
  for (let row = 0; row < snapshot.length; ++row) {
    for (let column = 0; column < snapshot[row].length; ++column) {
      if (snapshot[row][column].blockId === MineSnapshotBlockId.Player) {
        // Set the variables
        const { newRow, newColumn } = (() => {
          if (direction === 'left') return { newRow: row, newColumn: column - 1 };
          if (direction === 'right') return { newRow: row, newColumn: column + 1 };
          return { newRow: row - 1, newColumn: column };
        })();

        // Disallows the player from going above the canvas and walking into a wall
        if (
          !snapshot[row]?.[column] ||
          snapshot[newRow][newColumn].blockId === MineSnapshotBlockId.Wall
        ) {
          throw new Error('The player cannot take a step on the following direction currently');
        }

        finished = true;

        if (snapshot[newRow][newColumn].blockId === MineSnapshotBlockId.Rock) {
          currencyRocks++;
        }

        snapshot[row][column] = { blockId: MineSnapshotBlockId.None };
        snapshot[newRow][newColumn] = { blockId: MineSnapshotBlockId.Player };

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

/**
 * Create a mine row
 * @param data The row you want to get (starts at 0)
 */
function createMineRows(snapshot: MineSnapshotRows): MineSnapshotRows {
  const rn = Math.random();

  if (rn < 0.3) {
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
