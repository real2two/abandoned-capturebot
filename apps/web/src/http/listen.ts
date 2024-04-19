import env from '@/env';
import events from '../utils/events';

import crypto from 'crypto';
import FormData from 'form-data';
import HyperExpress from 'hyper-express';
import { verify } from 'discord-verify/node';
import { objectToCamel, objectToSnake } from 'ts-case-convert';

import type { RESTAPIAttachment } from 'discord-api-types/v10';
import type { CamelizedInteraction, InteractionResponseAttachment } from '../types';

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
        // @ts-ignore If message.data.attachments is a value, the message has attachments
        if (message?.data?.attachments) {
          // @ts-ignore Create the form data
          const attachments = message?.data?.attachments as InteractionResponseAttachment[];
          const formData = new FormData();

          // Create an updated message attachments object
          const messageAttachments: RESTAPIAttachment[] = [];
          for (let id = 0; id < attachments.length; ++id) {
            messageAttachments.push({
              id,
              filename: attachments[id].name,
            });
          }

          // Append the JSON body
          formData.append(
            'payload_json',
            JSON.stringify({
              type: message.type,
              data: {
                // @ts-ignore
                ...message.data,
                attachments: messageAttachments,
              },
            }),
          );

          // Append the files
          for (let i = 0; i < attachments.length; ++i) {
            formData.append(`files[${i}]`, attachments[i].file);
          }

          // Sets the correct headers
          res.setHeader('Content-Type', `multipart/form-data; boundary=${formData.getBoundary()}`);

          // Responds with attachments (multipart/form-data)
          return formData.pipe(res);
        }

        // Responds normally (application/json)
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
