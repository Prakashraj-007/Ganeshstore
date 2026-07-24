@echo off
echo Closing all running Google Chrome instances...
taskkill /F /IM chrome.exe /T >nul 2>&1

echo Starting Chrome in Kiosk Printing Mode...
start chrome --kiosk-printing

echo.
echo Chrome has been launched! 
echo 1. Make sure your thermal printer is set as your DEFAULT printer in Windows.
echo 2. Go to your Admin Dashboard and try placing a test order.
echo.
pause
