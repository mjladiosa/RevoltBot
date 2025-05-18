@echo off
echo Removing node_modules folder and package-lock.json...
rd /s /q node_modules
del package-lock.json

echo.
echo Reinstalling dependencies with a clean install...
npm install

echo.
echo Installation complete! Now try running the bot with 'npm start'
echo.
pause