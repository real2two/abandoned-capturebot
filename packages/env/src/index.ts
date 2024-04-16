export default {
  DiscordClientId: process.env.DISCORD_CLIENT_ID!,
  DiscordPublicKey: process.env.DISCORD_PUBLIC_KEY!,
  DiscordToken: process.env.DISCORD_TOKEN!,

  DatabaseHost: process.env.DATABASE_HOST!,
  DatabasePort: parseInt(process.env.DATABASE_PORT!) ?? 3306,
  DatabaseUser: process.env.DATABASE_USER!,
  DatabasePassword: process.env.DATABASE_PASSWORD!,
  DatabaseName: process.env.DATABASE_NAME!,
};
