import { MineSnapshotBlockId, type MineSnapshotRows } from '@/db';

/**
 * Make the player take a step on the current map
 * (ex. when step = 0, you see the rows 0-9)
 * @param data The amount of steps the player has taken and the current snapshot of the map
 * @returns The new mine data (aka 9 rows of mine data()
 */
export function nextMineStep({
  currentSteps,
  snapshot,
}: { currentSteps: number; snapshot: MineSnapshotRows }) {
  // Create a new snapshot object, so it doesn't replace the older one
  const newSnapshot = [...snapshot];
  // Adds the new block to the top
  newSnapshot.unshift(...createMineRows(newSnapshot));
  // Move the player forward
  for (let row = 0; row < snapshot.length; ++row) {
    for (let column = 0; column < snapshot[row].length; ++column) {
      if (snapshot[row][column].blockId === MineSnapshotBlockId.Player) {
        // Disallows the player from going above the canvas and walking into a wall
        if (row - 1 < 0 || snapshot[row][column].blockId === MineSnapshotBlockId.Wall) {
          throw new Error('The player cannot take a step forward currently');
        }
        snapshot[row][column].blockId = MineSnapshotBlockId.None;
        snapshot[row - 1][column].blockId = MineSnapshotBlockId.Player;
      }
    }
  }
  // Remove the last row
  newSnapshot.pop();
  // Returns the new mine data
  return {
    steps: currentSteps + 1,
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
