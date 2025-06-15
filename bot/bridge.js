const config = require('../config/config.json');

// Store recently processed messages to prevent loops
const recentMessages = new Set();
const MESSAGE_TTL = 5000; // Messages expire after 5 seconds

// Rate limiting configuration
const RATE_LIMIT = {
    maxMessages: 5,
    timeWindow: 3000, // 3 seconds
    cooldown: 10000   // 10 seconds cooldown after rate limit
};

// Store user message counts and cooldowns
const userMessageCounts = new Map();
const userCooldowns = new Map();

// List of Minecraft commands to escape
const MINECRAFT_COMMANDS = [
    '/', '\\', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')',
    'help', 'list', 'me', 'msg', 'tell', 'w', 'whisper', 'teammsg', 'tm',
    'say', 'team', 'gc', 'guild', 'party', 'p', 'reply', 'r'
];

// Helper function to check rate limit
function checkRateLimit(userId) {
    const now = Date.now();
    
    // Check if user is in cooldown
    const cooldownEnd = userCooldowns.get(userId);
    if (cooldownEnd && now < cooldownEnd) {
        return false;
    }
    
    // Get or initialize user's message count
    let userData = userMessageCounts.get(userId) || { count: 0, timestamp: now };
    
    // Reset count if time window has passed
    if (now - userData.timestamp > RATE_LIMIT.timeWindow) {
        userData = { count: 0, timestamp: now };
    }
    
    // Increment message count
    userData.count++;
    userMessageCounts.set(userId, userData);
    
    // Check if rate limit exceeded
    if (userData.count > RATE_LIMIT.maxMessages) {
        // Set cooldown
        userCooldowns.set(userId, now + RATE_LIMIT.cooldown);
        return false;
    }
    
    return true;
}

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
    
    // Check rate limit
    if (!checkRateLimit(sender)) {
        return; // Silently ignore rate-limited messages
    }
    
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
    
    // Check rate limit
    if (!checkRateLimit(message.author.id)) {
        message.reply('You are sending messages too quickly. Please wait a moment before sending more messages.').catch(() => {});
        return;
    }
    
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
