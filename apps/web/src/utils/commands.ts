import aboutCommand from '../commands/about';
import balanceCommand from '../commands/balance';
import clickerCommand from '../commands/mine';
import inventoryCommand from '../commands/inventory';

import debugCommand from '../commands/debug/debugScene';
import debugMineCommand from '../commands/debug/debugMine';

export default [
  // Normal commands
  balanceCommand,
  aboutCommand,
  clickerCommand,
  inventoryCommand,
  // Debug commands
  debugCommand,
  debugMineCommand,
];
