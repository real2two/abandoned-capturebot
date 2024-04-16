import env from './utils/env.js';
import events from './utils/events.js';

import _ from 'lodash';
import HyperExpress from 'hyper-express';
import { verifyKey } from 'discord-interactions';

const app = new HyperExpress.Server();

app.post('/interactions', async (req, res) => {
  // Validates if the interaction is coming from Discord
  const signature = req.header('X-Signature-Ed25519');
  const timestamp = req.header('X-Signature-Timestamp');

  const isValidRequest = verifyKey(
    await req.buffer(),
    signature,
    timestamp,
    env.DiscordPublicKey,
  );
  if (!isValidRequest) return res.status(401).end('Bad request signature');

  // Handles interactions
  const body = await req.json();
  const interaction = _.mapKeys(body, (_value, key) => _.camelCase(key)); // Camelizes body
  return events[interaction.type]?.execute({
    interaction,
    respond: (message) => {
      return res.json(_.mapKeys(message, (_value, key) => _.snakeCase(key))); // Puts response into snake case
    },
    res,
    req,
  });
});

app.listen(3000);
