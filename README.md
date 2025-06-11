# Hypixel Discord Bridge

A bridge bot that connects Discord and Minecraft/Hypixel servers, allowing for seamless communication between both platforms. This bot enables real-time communication between your Discord server and Hypixel guild chat.

## 🌟 Features

- **Two-way Communication**: Messages flow seamlessly between Discord and Minecraft
- **Direct Guild Chat Integration**: No API keys needed, works directly with Hypixel's chat system
- **Simple Setup**: Easy to configure and deploy
- **Robust Error Handling**: Automatic reconnection and error recovery
- **Clean Message Formatting**: Messages are properly formatted in both directions
- **Microsoft Authentication**: Secure login using Microsoft accounts

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

# Minecraft Account Configuration
MINECRAFT_EMAIL=your.minecraft.email@example.com
MINECRAFT_PASSWORD=your_minecraft_password_here  # Optional
```

### 4. Configure the Bot
Edit `config/config.json`:
```json
{
  "discord": {
    "channelId": "YOUR_GUILD_CHAT_CHANNEL_ID"
  },
  "minecraft": {
    "email": "your.minecraft.email@example.com"
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
4. Paste the ID in `config.json` as `channelId`

## 🏃‍♂️ Running the Bot

### Discord Deployment Steps

1. **Prepare Your Bot**
   ```bash
   # Make sure all dependencies are installed
   npm install
   
   # Test the bot locally first
   npm start
   ```

2. **Choose a Hosting Solution**

   #### Option A: Free Hosting (for testing)
   - [Replit](https://replit.com)
     1. Create a new Repl
     2. Upload your code
     3. Add your `.env` file in the Secrets tab
     4. Run `npm install`
     5. Start the bot with `npm start`

   #### Option B: Paid Hosting (recommended for production)
   - [DigitalOcean](https://www.digitalocean.com)
     1. Create a Droplet (Ubuntu recommended)
     2. Connect via SSH
     3. Install Node.js:
        ```bash
        curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
        sudo apt-get install -y nodejs
        ```
     4. Clone your repository:
        ```bash
        git clone https://github.com/yourusername/hypixel-discord-bridge.git
        cd hypixel-discord-bridge
        ```
     5. Install PM2:
        ```bash
        sudo npm install -g pm2
        ```
     6. Create your `.env` file:
        ```bash
        nano .env
        # Paste your environment variables
        ```
     7. Start the bot:
        ```bash
        pm2 start index.js --name "hypixel-bridge"
        ```

3. **Keep Your Bot Online**

   #### Using PM2 (Recommended)
   ```bash
   # Start the bot
   pm2 start index.js --name "hypixel-bridge"
   
   # Make it start on system boot
   pm2 startup
   pm2 save
   
   # Monitor your bot
   pm2 monit
   
   # View logs
   pm2 logs hypixel-bridge
   ```

   #### Using Screen (Alternative)
   ```bash
   # Install screen
   sudo apt-get install screen
   
   # Create a new screen session
   screen -S hypixel-bridge
   
   # Start your bot
   npm start
   
   # Detach from screen (Ctrl+A, then D)
   # To reattach later:
   screen -r hypixel-bridge
   ```

4. **Verify Deployment**
   - Check if the bot is online in your Discord server
   - Try sending a test message in the configured channel
   - Check the logs for any errors:
     ```bash
     pm2 logs hypixel-bridge
     # or
     npm run dev
     ```

5. **Troubleshooting Deployment**

   #### Common Issues
   - **Bot goes offline**
     - Check your hosting provider's status
     - Verify your `.env` file is correct
     - Check PM2 logs for errors
   
   - **Can't connect to Discord**
     - Verify your bot token is correct
     - Check if Discord's API is having issues
     - Ensure your bot has proper permissions
   
   - **Memory Issues**
     - Monitor memory usage: `pm2 monit`
     - Restart if memory usage is high: `pm2 restart hypixel-bridge`
     - Consider upgrading your hosting plan if issues persist

   #### Monitoring Tools
   ```bash
   # View real-time logs
   pm2 logs hypixel-bridge --lines 100
   
   # Monitor system resources
   pm2 monit
   
   # Check bot status
   pm2 status
   ```

6. **Maintenance**

   #### Regular Updates
   ```bash
   # Pull latest changes
   git pull
   
   # Install new dependencies
   npm install
   
   # Restart the bot
   pm2 restart hypixel-bridge
   ```

   #### Backup
   ```bash
   # Backup your .env file
   cp .env .env.backup
   
   # Backup your config
   cp config/config.json config/config.json.backup
   ```

## 🔧 Troubleshooting

### Common Issues

1. **Bot can't connect to Hypixel**
   - Check if your Minecraft account is banned
   - Verify your Microsoft account credentials
   - Make sure you're using a Microsoft account (not Mojang)

2. **Bot isn't in a guild**
   - Add the Minecraft account to a guild first
   - Make sure the account has permission to use guild chat

3. **Messages aren't being relayed**
   - Check if the bot is in the correct Discord channel
   - Verify the channel ID in config.json
   - Make sure the bot has proper permissions in Discord

4. **Authentication Errors**
   - Check your Microsoft account credentials
   - Make sure 2FA is properly set up if enabled
   - Try logging in to Minecraft manually first

### Logs
- Check the console output for error messages
- Look for specific error codes or messages
- Check both Discord and Minecraft connection status

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

## 📝 Message Format

### Discord to Minecraft
```
/gc [DiscordUsername] message
```

### Minecraft to Discord
```
**[MinecraftUsername]** message
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Mineflayer](https://github.com/PrismarineJS/mineflayer) for Minecraft bot functionality
- [Discord.js](https://discord.js.org/) for Discord integration
- [Hypixel](https://hypixel.net) for the amazing server

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