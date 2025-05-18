require('dotenv').config();
const { Client } = require('revolt.js');
const { OpenAI } = require('openai');

// Setup Shapes API client
const shapesClient = new OpenAI({
  apiKey: process.env.SHAPES_API_KEY,
  baseURL: 'https://api.shapes.inc/v1'
});

// Initialize Revolt client
const revoltClient = new Client();

// When the bot is ready
revoltClient.on('ready', () => {
  console.log(`Logged in as ${revoltClient.user.username}!`);
  console.log(`Bot is running and connected to Shapes character: ${process.env.SHAPES_CHARACTER_USERNAME}`);
  
  // Set bot status
  try {
    revoltClient.users.edit({
      status: {
        text: "Talking with you!",
        presence: "Online"
      }
    });
  } catch (error) {
    console.error("Failed to set status:", error.message);
  }
});

// Handle messages
revoltClient.on('message', async (message) => {
  // Don't respond to own messages or other bots
  if (message.author.bot) return;
  
  try {
    // Handle special commands
    if (message.content === '!reset') {
      try {
        await shapesClient.chat.completions.create({
          model: `shapesinc/${process.env.SHAPES_CHARACTER_USERNAME}`,
          messages: [
            { role: 'user', content: '!reset' }
          ]
        });
        
        await message.channel.sendMessage("My memory has been reset!");
      } catch (error) {
        console.error("Error resetting memory:", error.message);
        await message.channel.sendMessage("I had trouble resetting my memory.");
      }
      return;
    }
    
    // Get response from Shapes API
    const response = await shapesClient.chat.completions.create({
      model: `shapesinc/${process.env.SHAPES_CHARACTER_USERNAME}`,
      messages: [
        { role: 'user', content: message.content }
      ]
    });
    
    // Send response back to Revolt
    if (response.choices && response.choices[0] && response.choices[0].message) {
      await message.channel.sendMessage(response.choices[0].message.content);
    } else {
      console.error('Invalid response format from Shapes API:', response);
    }
  } catch (error) {
    console.error('Error communicating with Shapes API:', error.message);
    await message.channel.sendMessage("Sorry, I'm having trouble connecting to my brain right now.");
  }
});

// Error handling
revoltClient.on('error', (error) => {
  console.error("Revolt client error:", error.message);
});

// Login to Revolt
console.log("Connecting to Revolt...");
revoltClient.loginBot(process.env.REVOLT_BOT_TOKEN)
  .catch(error => {
    console.error("Failed to login to Revolt:", error.message);
  });
