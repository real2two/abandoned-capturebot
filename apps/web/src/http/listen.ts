import env from '@/env';
import events from '../utils/events';

import HyperExpress from 'hyper-express';
import { verifyKey } from 'discord-interactions';
import { objectToCamel, objectToSnake } from 'ts-case-convert';
import { CamelizedInteraction } from '../types/InteractionRequest';

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
  if (!isValidRequest) return res.status(401).send('Bad request signature');

  // Handles interactions
  const interaction = objectToCamel(await req.json()) as CamelizedInteraction; // Camelizes the request body
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
