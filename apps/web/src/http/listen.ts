import env from '@/env';
import events from '../utils/events';

import crypto from 'crypto';
import HyperExpress from 'hyper-express';
import { verify } from 'discord-verify/node';
import { objectToCamel, objectToSnake } from 'ts-case-convert';
import { CamelizedInteraction } from '../types/InteractionRequest';

const app = new HyperExpress.Server();

app.post('/interactions', async (req, res) => {
  // Validates if the interaction is coming from Discord
  const signature = req.header('X-Signature-Ed25519');
  const timestamp = req.header('X-Signature-Timestamp');

  const body = await req.text();

  const isValid = await verify(
    body,
    signature,
    timestamp,
    env.DiscordPublicKey,
    crypto.webcrypto.subtle,
  );

  if (!isValid) return res.status(401).send('Invalid signature');

  // Handles interactions
  const interaction = objectToCamel(JSON.parse(body)) as CamelizedInteraction; // Camelizes the request body
  try {
    return events[interaction.type]?.execute({
      interaction,
      user: interaction.member?.user || interaction.user,
      respond: (message) => {
        return res.json(objectToSnake(message)); // Puts response into snake case
      },
      res,
      req,
    });
  } catch (err) {
    return console.error(err);
  }
});

app.listen(3000);
