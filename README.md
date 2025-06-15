# Hypixel Discord Bridge

A bridge bot that connects Discord and Minecraft/Hypixel servers, allowing for seamless communication between both platforms. This bot enables real-time communication between your Discord server and Hypixel guild chat.

## 🌟 Features

- **Two-way Communication**: Messages flow seamlessly between Discord and Minecraft
- **Direct Guild Chat Integration**: No API keys needed, works directly with Hypixel's chat system
- **Simple Setup**: Easy to configure and deploy
- **Robust Error Handling**: Automatic reconnection and error recovery
- **Clean Message Formatting**: Messages are properly formatted in both directions
- **Microsoft Authentication**: Secure login using Microsoft accounts
- **Anti-Spam Protection**: Rate limiting to prevent message flooding
- **Message Sanitization**: Prevents command injection and ensures clean messages

## 📋 Prerequisites

### System Requirements
- Node.js 16.x or higher
- npm (comes with Node.js)
- A computer/server that can run 24/7 (for hosting)

### Account Requirements
1. **Discord**:
   - A Discord account
   - A Discord server where you have admin permissions
   - A Discord bot token

2. **Minecraft**:
   - A Microsoft Minecraft account (not Mojang)
   - The account must be a member of a Hypixel guild
   - The account must have permission to use guild chat
   - The account must not be banned from Hypixel

## 🚀 Setup Guide

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/hypixel-discord-bridge.git
cd hypixel-discord-bridge
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create Environment File
Create a new file named `.env` in the root directory:
```env
# Discord Bot Configuration
DISCORD_BOT_TOKEN=your_discord_bot_token_here
DISCORD_CHANNEL_ID=your_discord_channel_id_here

# Minecraft Account Configuration
MINECRAFT_EMAIL=your.minecraft.email@example.com
MINECRAFT_PASSWORD=your_minecraft_password_here  # Optional
```

### 4. Configure the Bot
Edit `config/config.json`:
```json
{
    "minecraft": {
        "chatFormat": "[Discord] %s: %s",
        "maxMessageLength": 256
    }
}
```

### 5. Get Your Discord Bot Token
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name
3. Go to the "Bot" section
4. Click "Add Bot"
5. Under the bot's username, click "Reset Token"
6. Copy the token and paste it in your `.env` file
7. Go to "OAuth2" → "URL Generator"
8. Select "bot" under scopes
9. Select these permissions:
   - Read Messages/View Channels
   - Send Messages
   - Read Message History
10. Copy the generated URL and open it in your browser
11. Add the bot to your server

### 6. Get Your Discord Channel ID
1. Enable Developer Mode in Discord (Settings → Advanced → Developer Mode)
2. Right-click the channel you want to use
3. Click "Copy ID"
4. Paste the ID in your `.env` file as `DISCORD_CHANNEL_ID`

## 🏃‍♂️ Running the Bot

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## 🔧 Features and Configuration

### Rate Limiting
The bot includes built-in rate limiting to prevent spam:
- Maximum 5 messages per user within 3 seconds
- 10-second cooldown after exceeding the limit
- Discord users receive a notification when rate limited
- Minecraft messages are silently dropped when rate limited

### Message Formatting
- Discord to Minecraft: `[DiscordUsername] message`
- Minecraft to Discord: `**[MinecraftUsername]** message`

### Message Length Limits
- Maximum message length: 256 characters
- Longer messages are automatically truncated with "..."

## 🔒 Security Notes

1. **Environment Variables**
   - Never commit your `.env` file
   - Keep your tokens and passwords secure
   - Regularly rotate your Discord bot token

2. **Minecraft Account**
   - Use a dedicated account for the bot
   - Don't use your main Minecraft account
   - Keep the account secure

3. **Discord Bot**
   - Use minimal required permissions
   - Keep the bot token secure
   - Regularly audit bot permissions

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📦 GitHub Repository Setup

### Initial Setup

1. **Create a New Repository**
   - Go to [GitHub](https://github.com)
   - Click the "+" in the top right
   - Select "New repository"
   - Name it "hypixel-discord-bridge"
   - Make it Public or Private
   - Don't initialize with README (we already have one)

2. **Initialize Local Repository**
   ```bash
   # Initialize git in your project folder
   git init

   # Add all files
   git add .

   # Create initial commit
   git commit -m "Initial commit: Hypixel Discord Bridge"
   ```

3. **Link to GitHub**
   ```bash
   # Add the remote repository
   git remote add origin https://github.com/YOUR_USERNAME/hypixel-discord-bridge.git

   # Push your code
   git push -u origin main
   ```

### Important Git Files

1. **Update .gitignore**
   Make sure your `.gitignore` file includes:
   ```gitignore
   # Dependencies
   node_modules/
   package-lock.json

   # Environment variables
   .env
   .env.*

   # Logs
   logs
   *.log
   npm-debug.log*

   # Runtime data
   pids
   *.pid
   *.seed
   *.pid.lock

   # IDE
   .vscode/
   .idea/
   *.swp
   *.swo

   # OS
   .DS_Store
   Thumbs.db
   ```

2. **Create LICENSE File**
   ```bash
   # Create MIT License file
   touch LICENSE
   ```
   Add the following to LICENSE:
   ```text
   MIT License

   Copyright (c) [year] [your name]

   Permission is hereby granted, free of charge, to any person obtaining a copy
   of this software and associated documentation files (the "Software"), to deal
   in the Software without restriction, including without limitation the rights
   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   copies of the Software, and to permit persons to whom the Software is
   furnished to do so, subject to the following conditions:

   The above copyright notice and this permission notice shall be included in all
   copies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   SOFTWARE.
   ```

### Making Changes

1. **Create a New Branch**
   ```bash
   # Create and switch to a new branch
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Edit files
   - Test your changes
   - Commit your changes:
     ```bash
     git add .
     git commit -m "Description of your changes"
     ```

3. **Push Changes**
   ```bash
   # Push to your branch
   git push origin feature/your-feature-name
   ```

4. **Create Pull Request**
   - Go to your GitHub repository
   - Click "Compare & pull request"
   - Fill in the description
   - Submit the pull request

### Best Practices

1. **Branch Naming**
   - `feature/` for new features
   - `fix/` for bug fixes
   - `docs/` for documentation
   - `refactor/` for code refactoring

2. **Commit Messages**
   - Be descriptive
   - Use present tense
   - Start with a verb
   - Example: "Add guild chat message filtering"

3. **Pull Requests**
   - Include a clear description
   - Reference any related issues
   - Request reviews from team members
   - Ensure all tests pass

4. **Security**
   - Never commit `.env` files
   - Don't commit sensitive tokens
   - Use GitHub Secrets for sensitive data
   - Regularly update dependencies 


## 🙏 Acknowledgments

- [Mineflayer](https://github.com/PrismarineJS/mineflayer) for Minecraft bot functionality
- [Discord.js](https://discord.js.org/) for Discord integration
- [Hypixel](https://hypixel.net) for the amazing server
