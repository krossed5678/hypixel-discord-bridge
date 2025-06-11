require('dotenv').config();
const startDiscordBot = require('./bot/discord');
const startMinecraftBot = require('./bot/minecraft');
const bridge = require('./bot/bridge');

(async () => {
  try {
    const discordClient = await startDiscordBot();
    const mcBot = await startMinecraftBot();
    bridge(discordClient, mcBot);
  } catch (error) {
    console.error('Failed to start the bridge:', error);
    process.exit(1);
  }
})(); 