const config = require('../config/config.json');

module.exports = function bridge(discord, mcBot) {
  // Minecraft → Discord
  mcBot.on('chat', (username, message) => {
    // Ignore our own messages
    if (username === mcBot.username) return;
    
    // Only process guild chat messages
    // Guild chat messages on Hypixel look like: "Guild > PlayerName: message"
    if (!message.startsWith('Guild >')) return;
    
    // Extract the actual message content and sender
    // Format: "Guild > PlayerName: message"
    const match = message.match(/Guild > (.*?): (.*)/);
    if (!match) return;
    
    const [_, sender, content] = match;
    
    const guildChannel = discord.channels.cache.get(process.env.DISCORD_CHANNEL_ID);
    if (guildChannel) {
      guildChannel.send(`**[${sender}]** ${content}`);
    }
  });

  // Discord → Minecraft
  discord.on('messageCreate', (message) => {
    // Ignore bot messages and messages from other channels
    if (message.author.bot || message.channel.id !== process.env.DISCORD_CHANNEL_ID) return;
    
    // Send to guild chat
    mcBot.chat(`/gc [${message.author.username}] ${message.content}`);
  });
}; 