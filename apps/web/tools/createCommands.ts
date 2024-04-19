import env from '@/env';
import commands from '../src/utils/commands';

const res = await fetch(`https://discord.com/api/applications/${env.DiscordClientId}/commands`, {
  method: 'put',
  headers: {
    authorization: `Bot ${env.DiscordToken}`,
    'content-type': 'application/json',
  },
  body: JSON.stringify(
    commands.map((c) => ({
      ...c.data.toJSON(), // Command data
      integration_types: [0, 1], // Supports both guilds and user apps
      contexts: [0, 1, 2], // Supports guilds, bot dms and private channels
    })),
  ),
});

console.log(await res.json());
