const { Client, GatewayIntentBits } = require('discord.js');
const config = require('../config/config.json');

module.exports = async function startDiscordBot() {
    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
        ]
    });

    client.on('ready', () => {
        console.log(`✅ Logged in as ${client.user.tag}`);
    });

    await client.login(process.env.DISCORD_BOT_TOKEN);
    return client;
}; 