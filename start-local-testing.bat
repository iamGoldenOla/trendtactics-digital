@echo off
TITLE Local Testing Server for Trendtactics Academy
COLOR 0A

echo 🚀 Starting Local Testing Server for Trendtactics Academy...
echo ========================================================
echo.

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Python is available
    echo.
    echo 🔧 Starting server with Python...
    echo 🌍 Open your browser and go to: http://localhost:8000/academy.html
    echo.
    python -m http.server 8000
    goto :eof
)

REM Check if Node.js is available
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Node.js is available
    echo.
    echo 🔧 Starting server with Node.js...
    echo 📦 Installing serve globally...
    npm install -g serve
    echo.
    echo 🌍 Open your browser and go to: http://localhost:3000/academy.html
    echo.
    npx serve
    goto :eof
)

REM Check if PHP is available
php --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ PHP is available
    echo.
    echo 🔧 Starting server with PHP...
    echo 🌍 Open your browser and go to: http://localhost:8000/academy.html
    echo.
    php -S localhost:8000
    goto :eof
)

echo ❌ No suitable server tool found.
echo.
echo Please install one of the following:
echo 1. Python (https://www.python.org/downloads/)
echo 2. Node.js (https://nodejs.org/)
echo 3. PHP (https://www.php.net/downloads.php)
echo.
echo After installation, restart your command prompt and run this script again.
pause