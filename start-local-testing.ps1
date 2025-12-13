# Start Local Testing Server for Trendtactics Academy
# This script sets up a local server so you can preview the Academy

Write-Host "🚀 Starting Local Testing Server for Trendtactics Academy..." -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Green

# Check if Python is available (most common option)
$pythonAvailable = $false
try {
    $pythonVersion = python --version 2>$null
    if ($pythonVersion) {
        $pythonAvailable = $true
        Write-Host "✅ Python is available: $pythonVersion" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠️ Python not found in PATH" -ForegroundColor Yellow
}

# Check if Node.js is available
$nodeAvailable = $false
try {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion) {
        $nodeAvailable = $true
        Write-Host "✅ Node.js is available: $nodeVersion" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠️ Node.js not found in PATH" -ForegroundColor Yellow
}

# Check if PHP is available
$phpAvailable = $false
try {
    $phpVersion = php --version 2>$null
    if ($phpVersion) {
        $phpAvailable = $true
        Write-Host "✅ PHP is available: $phpVersion" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠️ PHP not found in PATH" -ForegroundColor Yellow
}

# Start server based on available tools
if ($pythonAvailable) {
    Write-Host "🔧 Starting server with Python..." -ForegroundColor Cyan
    Write-Host "🌍 Open your browser and go to: http://localhost:8000/academy.html" -ForegroundColor Blue
    python -m http.server 8000
} elseif ($nodeAvailable) {
    Write-Host "🔧 Starting server with Node.js..." -ForegroundColor Cyan
    Write-Host "📦 Installing serve globally (might need confirmation)..." -ForegroundColor Yellow
    npm install -g serve
    Write-Host "🌍 Open your browser and go to: http://localhost:3000/academy.html" -ForegroundColor Blue
    npx serve
} elseif ($phpAvailable) {
    Write-Host "🔧 Starting server with PHP..." -ForegroundColor Cyan
    Write-Host "🌍 Open your browser and go to: http://localhost:8000/academy.html" -ForegroundColor Blue
    php -S localhost:8000
} else {
    Write-Host "❌ No suitable server tool found." -ForegroundColor Red
    Write-Host "Please install one of the following:" -ForegroundColor Yellow
    Write-Host "1. Python (https://www.python.org/downloads/)" -ForegroundColor White
    Write-Host "2. Node.js (https://nodejs.org/)" -ForegroundColor White
    Write-Host "3. PHP (https://www.php.net/downloads.php)" -ForegroundColor White
    Write-Host ""
    Write-Host "After installation, restart your terminal/command prompt and run this script again." -ForegroundColor Yellow
    pause
}