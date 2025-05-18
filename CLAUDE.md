# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains chat bots for Discord and Revolt platforms that integrate with the Shapes.inc API to provide AI character interactions. The bots allow users to interact with AI characters through Discord or Revolt messaging.

   ──✿─────✿─────✿─────✿────◈COMMON COMMANDS◈────✿─────✿─────✿─────✿──  

## Common Development Commands

### JavaScript (Node.js) Bots

```bash
# Install dependencies
npm install

# Run the bot
npm start

# Install a new package
npm install package-name --save

# Format code with Prettier (if available)
npx prettier --write .
```

### Python Bots

```bash
# Install dependencies
pip install -r requirements.txt

# Run the bot
python app.py

# Install a new package and add to requirements
pip install package-name
pip freeze > requirements.txt
```

   ──✿─────✿─────✿─────✿────◈ENVIRONMENT SETUP◈────✿─────✿─────✿─────✿──  

## Environment Configuration

All bots use `.env` files for configuration. Create a `.env` file in the project root with the following variables:

### Revolt Bots
```
REVOLT_BOT_TOKEN=your_revolt_bot_token
SHAPES_API_KEY=your_shapes_api_key
SHAPES_CHARACTER_USERNAME=your_character_username
```

### Discord Bot
```
DISCORD_TOKEN=your_discord_bot_token
BOT_CHANNEL_ID=your_channel_id  # For specific notifications
```

   ──✿─────✿─────✿─────✿────◈PROJECT ARCHITECTURE◈────✿─────✿─────✿─────✿──  

## Project Architecture

### Revolt Bots Architecture

1. **Client Initialization**:
   - Load environment variables
   - Create and configure bot client
   - Connect to APIs

2. **Event Handling**:
   - Listen for user messages
   - Process commands
   - Manage conversation context

3. **API Integration**:
   - Send requests to Shapes API
   - Process and sanitize responses
   - Handle API errors gracefully

4. **Memory Management**:
   - Track conversation history
   - Support context reset commands
   - Maintain user-specific memories

### Discord Bot Architecture (GiftCrafter)

1. **User Tracking System**:
   - Monitor messages and interactions
   - Track engagement metrics
   - Save data to JSON files

2. **Gift System**:
   - Create personalized virtual gifts
   - Deliver based on milestones, birthdays, and random events
   - Use user preferences for customization

3. **Command System**:
   - Process user commands
   - Provide statistics and information
   - Configure user preferences

4. **Scheduled Tasks**:
   - Run periodic checks for birthdays and events
   - Manage recurring activities
   - Update user milestones

   ──✿─────✿─────✿─────✿────◈API INTEGRATION◈────✿─────✿─────✿─────✿──  

## API Integration

### Shapes API Integration (JavaScript)

```javascript
// Example API call to Shapes
const response = await axios.post(
  'https://api.shapes.inc/v1/chat/completions',
  {
    model: `shapesinc/${config.shapes.character}`,
    messages: [{ role: 'user', content: message }]
  },
  {
    headers: {
      'Authorization': `Bearer ${config.shapes.apiKey}`,
      'Content-Type': 'application/json'
    }
  }
);

// Extract response
const content = response.data.choices[0]?.message?.content;
```

### Shapes API Integration (Python)

```python
# Example API call to Shapes
async with aiohttp.ClientSession() as session:
    headers = {
        "Authorization": f"Bearer {SHAPES_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": SHAPE_MODEL,
        "messages": [
            {"role": "user", "content": content}
        ]
    }
    
    async with session.post(
        "https://api.shapes.inc/v1/chat/completions", 
        headers=headers, 
        json=payload
    ) as resp:
        data = await resp.json()
        reply = data['choices'][0]['message']['content']
```

   ──✿─────✿─────✿─────✿────◈CODE STYLE GUIDELINES◈────✿─────✿─────✿─────✿──  

## Code Style Guidelines

### Core Values
- **Easy to Read**: Write clear, simple code with explanatory comments
- **Reliable**: Handle errors gracefully (API timeouts, invalid commands)
- **Modular**: Break code into reusable functions
- **Maintainable**: Keep code organized and well-structured

### Important Rules
- Always name main Python files "app.py" and include requirements.txt
- Make minimal edits unless necessary
- Do not remove any existing features or commands
- Ensure all logic is complete and error-handled
- Add clear section headers and group related functions
- Always check for typos and syntax errors

   ──✿─────✿─────✿─────✿────◈DEBUGGING TIPS◈────✿─────✿─────✿─────✿──  

## Debugging Tips

1. **Environment Variables**:
   - Check .env file for correct API keys and tokens
   - Verify environment variables are loaded properly

2. **API Issues**:
   - Confirm API endpoints are correct
   - Verify authentication headers
   - Check response formats
   - Handle rate limiting gracefully

3. **Bot Connectivity**:
   - Verify bot tokens are valid
   - Check bot permissions in server settings
   - Ensure proper event listeners are set up

4. **Data Persistence**:
   - Verify file paths for data storage
   - Add error handling for file operations
   - Implement proper data serialization/deserialization

   ──✿─────✿─────✿─────✿────◈HOSTING INFORMATION◈────✿─────✿─────✿─────✿──  

## Hosting Information

The bots can be hosted on FPS.ms:
- Follow the [FPS.ms Discord installation guide](https://docs.fps.ms/discord/installation/)
- For file edits, use [SFTP connections](https://docs.fps.ms/getting-started/connecting-to-sftp/)

   ───✿─────✿─────✿─────✿─────✿─────✿─────✿─────✿─────✿─────✿─────✿───

## Ethical Guidelines

The bots are designed to provide a safe space for users to engage with AI characters. All interactions should be handled responsibly, with clear boundaries between fictional conversations and reality.

Remember that these bots can serve as emotional support tools for users who may not have adequate support in their real lives.

   ───✿─────✿─────✿─────✿─────✿─────✿─────✿─────✿─────✿─────✿─────✿───