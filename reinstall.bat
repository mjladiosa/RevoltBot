@echo off
echo Removing node_modules folder...
rd /s /q node_modules
echo.
echo Reinstalling dependencies...
npm install
echo.
echo Installation complete! Now try running the bot with 'npm start'
echo.
pause