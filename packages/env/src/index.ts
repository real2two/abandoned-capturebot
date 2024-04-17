export default {
  WebsiteClusters: parseInt(process.env.WEBSITE_CLUSTERS!) || 0,

  DiscordClientId: process.env.DISCORD_CLIENT_ID!,
  DiscordPublicKey: process.env.DISCORD_PUBLIC_KEY!,
  DiscordToken: process.env.DISCORD_TOKEN!,

  DatabaseHost: process.env.DATABASE_HOST!,
  DatabasePort: parseInt(process.env.DATABASE_PORT!) ?? 3306,
  DatabaseUser: process.env.DATABASE_USER!,
  DatabasePassword: process.env.DATABASE_PASSWORD!,
  DatabaseName: process.env.DATABASE_NAME!,

  RedisNameSpace: process.env.REDIS_NAMESPACE!,
  RedisPort: parseInt(process.env.REDIS_PORT!) || 6379,
  RedisHost: process.env.REDIS_HOST ?? '127.0.0.1',
  RedisUsername: process.env.REDIS_USERNAME,
  RedisPassword: process.env.REDIS_PASSWORD,
  RedisDatabase: parseInt(process.env.REDIS_DB!) || 0,
};
