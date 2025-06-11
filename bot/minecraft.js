const mineflayer = require('mineflayer');
const config = require('../config/config.json');

module.exports = async function startMinecraftBot() {
    const bot = mineflayer.createBot({
        host: 'mc.hypixel.net',
        username: process.env.MINECRAFT_EMAIL || config.minecraft.email,
        password: process.env.MINECRAFT_PASSWORD, // Optional: can be set in .env
        auth: 'microsoft',
        version: '1.8.9' // Hypixel works best with 1.8.9
    });

    let isInGuild = false;
    let isInGuildChat = false;

    bot.on('spawn', async () => {
        console.log('✅ Minecraft bot connected');
        
        // Wait a bit before sending commands
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        try {
            // Check if we're in a guild
            bot.chat('/g');
            // The response will be handled by the chat event
        } catch (error) {
            console.error('Failed to check guild status:', error);
        }
    });

    bot.on('chat', (username, message) => {
        // Handle guild command response
        if (message.includes('You are not in a guild!')) {
            console.error('❌ Bot is not in a guild! Please add the bot to a guild first.');
            isInGuild = false;
        } else if (message.includes('Guild >')) {
            isInGuild = true;
            console.log('✅ Bot is in a guild');
            // Switch to guild chat
            bot.chat('/chat g');
        }

        // Check if we're in guild chat
        if (message.includes('You are now talking in Guild Chat')) {
            isInGuildChat = true;
            console.log('✅ Bot is now in guild chat');
        }
    });

    bot.on('kicked', (reason) => {
        console.warn('Minecraft bot was kicked:', reason);
        if (reason.includes('banned')) {
            console.error('❌ Bot is banned from Hypixel!');
        }
    });

    bot.on('error', (error) => {
        console.error('Minecraft bot error:', error);
    });

    return bot;
}; 