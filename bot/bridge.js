const config = require('../config/config.json');

// Store recently processed messages to prevent loops
const recentMessages = new Set();
const MESSAGE_TTL = 5000; // Messages expire after 5 seconds

// List of Minecraft commands to escape
const MINECRAFT_COMMANDS = [
    '/', '\\', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')',
    'help', 'list', 'me', 'msg', 'tell', 'w', 'whisper', 'teammsg', 'tm',
    'say', 'team', 'gc', 'guild', 'party', 'p', 'reply', 'r'
];

// Helper function to sanitize and validate messages
function sanitizeMessage(message) {
    // Remove any control characters
    message = message.replace(/[\x00-\x1F\x7F-\x9F]/g, '');
    
    // Trim whitespace
    message = message.trim();
    
    // Check message length
    if (message.length > config.minecraft.maxMessageLength) {
        message = message.substring(0, config.minecraft.maxMessageLength - 3) + '...';
    }
    
    return message;
}

// Helper function to escape potential commands in usernames
function escapeUsername(username) {
    // Remove any command-like prefixes
    username = username.replace(/^[\/\\!@#$%^&*()]/g, '');
    
    // Escape any remaining command-like characters
    username = username.replace(/[\/\\!@#$%^&*()]/g, '');
    
    // Remove any command-like words
    MINECRAFT_COMMANDS.forEach(cmd => {
        const regex = new RegExp(`\\b${cmd}\\b`, 'gi');
        username = username.replace(regex, '');
    });
    
    // Ensure username isn't empty after sanitization
    if (!username.trim()) {
        username = 'DiscordUser';
    }
    
    return username;
}

// Helper function to generate a unique message ID
function generateMessageId(platform, sender, content) {
    return `${platform}:${sender}:${content}`;
}

// Helper function to check if message was recently processed
function isRecentMessage(messageId) {
    if (recentMessages.has(messageId)) {
        return true;
    }
    recentMessages.add(messageId);
    setTimeout(() => recentMessages.delete(messageId), MESSAGE_TTL);
    return false;
}

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
    
    // Sanitize the message
    const sanitizedContent = sanitizeMessage(content);
    const sanitizedSender = sanitizeMessage(sender);
    
    // Check if this message was recently processed
    const messageId = generateMessageId('minecraft', sanitizedSender, sanitizedContent);
    if (isRecentMessage(messageId)) return;
    
    const guildChannel = discord.channels.cache.get(process.env.DISCORD_CHANNEL_ID);
    if (guildChannel) {
      guildChannel.send(`**[${sanitizedSender}]** ${sanitizedContent}`);
    }
  });

  // Discord → Minecraft
  discord.on('messageCreate', (message) => {
    // Ignore bot messages and messages from other channels
    if (message.author.bot || message.channel.id !== process.env.DISCORD_CHANNEL_ID) return;
    
    // Sanitize the message
    const sanitizedContent = sanitizeMessage(message.content);
    const sanitizedUsername = escapeUsername(message.author.username);
    
    // Check if this message was recently processed
    const messageId = generateMessageId('discord', sanitizedUsername, sanitizedContent);
    if (isRecentMessage(messageId)) return;
    
    // Send to guild chat
    mcBot.chat(`/gc [${sanitizedUsername}] ${sanitizedContent}`);
  });
}; 