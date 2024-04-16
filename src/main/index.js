import env from '../utils/env.js';
import events from '../utils/events.js';

import HyperExpress from 'hyper-express';
import { verifyKey } from 'discord-interactions';
import { camelize, snakelize } from '../utils/convertCase.js';

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
  const interaction = camelize(await req.json()); // Camelizes the request body
  try {
    return events[interaction.type]?.execute({
      interaction,
      respond: (message) => {
        return res.json(snakelize(message)); // Puts response into snake case
      },
      res,
      req,
    });
  } catch (err) {
    return console.error(err);
  }
});

app.listen(3000);
