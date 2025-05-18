@echo off
echo Installing dependencies...
npm install

echo Creating .env file...
copy .env.example .env

echo Setup completed! Now edit the .env file with your specific details.
echo Then run "npm start" to start your bot.
pause