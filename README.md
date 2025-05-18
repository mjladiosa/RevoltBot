# Shapes Revolt Bot

This is a simple bot for Revolt that uses the Shapes.inc API to provide character responses.

## Setup Instructions

1. Run the `install.bat` file by double-clicking it
2. Edit the `.env` file with your specific details:
   - The API key is already included
   - Add your character username from Shapes.inc
   - Add your Revolt bot token
3. Run the bot with `npm start`

## Getting Your Revolt Bot Token

1. Log into Revolt
2. Go to Settings > My Bots
3. Create a new bot or use an existing one
4. Copy the token

## Getting Your Shapes Character Username

1. Go to your character's page on Shapes.inc
2. Look at the URL or the character's profile for the username

## Features

- Automatic memory management through the Shapes API
- Support for the !reset command to clear memory
- Conversation tracking using channel and user IDs

## Troubleshooting

If you encounter issues:
- Make sure your API key is correct
- Verify your character username is correct
- Ensure your Revolt bot token is valid
- Check that the bot has proper permissions in Revolt