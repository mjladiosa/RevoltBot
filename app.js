require('dotenv').config();
const { Client } = require('revolt.js');
const { OpenAI } = require('openai');

// Setup Shapes API client
const shapesClient = new OpenAI({
  apiKey: process.env.SHAPES_API_KEY,
  baseURL: 'https://api.shapes.inc/v1'
});

// Setup Revolt client
const revoltClient = new Client();

// When the bot is ready
revoltClient.on('ready', async () => {
  console.log(`Logged in as ${revoltClient.user.username}!`);
  console.log(`Bot is running and connected to Shapes character: ${process.env.SHAPES_CHARACTER_USERNAME}`);
  
  // Set bot status
  revoltClient.users.edit({
    status: {
      text: "Talking with you!",
      presence: "Online"
    }
  });
});

// When bot receives a message
revoltClient.on('message', async (message) => {
  // Don't respond to own messages or other bots
  if (message.author.bot) return;
  
  try {
    // Handle special commands
    if (message.content === '!reset') {
      const response = await shapesClient.chat.completions.create({
        model: `shapesinc/${process.env.SHAPES_CHARACTER_USERNAME}`,
        messages: [
          { role: 'user', content: '!reset' }
        ],
        headers: {
          'X-User-Id': message.author.id,
          'X-Channel-Id': message.channel.id
        }
      });
      
      message.channel.sendMessage("My memory has been reset!");
      return;
    }
    
    // Get response from Shapes API
    const response = await shapesClient.chat.completions.create({
      model: `shapesinc/${process.env.SHAPES_CHARACTER_USERNAME}`,
      messages: [
        { role: 'user', content: message.content }
      ],
      // Optional headers for conversation tracking
      headers: {
        'X-User-Id': message.author.id,
        'X-Channel-Id': message.channel.id
      }
    });
    
    // Send response back to Revolt
    if (response.choices && response.choices[0] && response.choices[0].message) {
      message.channel.sendMessage(response.choices[0].message.content);
    } else {
      console.error('Invalid response format from Shapes API:', response);
    }
  } catch (error) {
    console.error('Error communicating with Shapes API:', error);
    message.channel.sendMessage("Sorry, I'm having trouble connecting to my brain right now.");
  }
});

// Login to Revolt
revoltClient.loginBot(process.env.REVOLT_BOT_TOKEN);