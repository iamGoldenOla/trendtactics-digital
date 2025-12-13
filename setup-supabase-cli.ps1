# PowerShell script to automatically install Supabase CLI and set up environment
# Usage: .\setup-supabase-cli.ps1

Write-Host "🚀 Setting up Supabase CLI Environment..." -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan

# Check if running on Windows
if ($PSVersionTable.Platform -and $PSVersionTable.Platform -ne "Win32NT") {
    Write-Host "⚠️  This script is designed for Windows PowerShell" -ForegroundColor Yellow
    Write-Host "   For other platforms, please install Supabase CLI manually:" -ForegroundColor Yellow
    Write-Host "   https://supabase.com/docs/guides/cli" -ForegroundColor Yellow
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Host "✅ npm found: v$npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm not found. Please install Node.js first:" -ForegroundColor Red
    Write-Host "   Download from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Check if Supabase CLI is already installed
try {
    $supabaseVersion = supabase --version
    Write-Host "✅ Supabase CLI already installed: $supabaseVersion" -ForegroundColor Green
    $installNeeded = $false
} catch {
    Write-Host "⚠️  Supabase CLI not found. Will install..." -ForegroundColor Yellow
    $installNeeded = $true
}

# Install Supabase CLI if needed
if ($installNeeded) {
    Write-Host "`n📥 Installing Supabase CLI..." -ForegroundColor Cyan
    try {
        npm install -g supabase
        Write-Host "✅ Supabase CLI installed successfully!" -ForegroundColor Green
    } catch {
        Write-Host "❌ Failed to install Supabase CLI: $_" -ForegroundColor Red
        Write-Host "   Try installing manually with: npm install -g supabase" -ForegroundColor Yellow
        exit 1
    }
}

# Verify installation
try {
    $supabaseVersion = supabase --version
    Write-Host "✅ Supabase CLI version: $supabaseVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to verify Supabase CLI installation" -ForegroundColor Red
    exit 1
}

# Check login status
Write-Host "`n🔍 Checking login status..." -ForegroundColor Cyan
try {
    $loginStatus = supabase status 2>$null
    if ($loginStatus -match "Not logged in") {
        Write-Host "⚠️  Not logged in to Supabase" -ForegroundColor Yellow
        Write-Host "   Please run 'supabase login' to authenticate" -ForegroundColor Yellow
    } else {
        Write-Host "✅ Already logged in to Supabase" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠️  Unable to check login status" -ForegroundColor Yellow
}

Write-Host "`n📋 Supabase CLI Setup Summary:" -ForegroundColor Cyan
Write-Host "   • Supabase CLI: Installed and ready" -ForegroundColor Green
Write-Host "   • Next step: Run 'supabase login' to authenticate" -ForegroundColor White
Write-Host "   • Then use deploy-academy-functions.ps1 to deploy functions" -ForegroundColor White

Write-Host "`n🎉 Supabase CLI Setup Complete!" -ForegroundColor Green