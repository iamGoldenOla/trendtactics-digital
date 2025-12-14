# Open GitHub Pages Setup in Browser
# This script opens the GitHub Pages configuration page for your repository

Write-Host "🚀 Opening GitHub Pages Setup..." -ForegroundColor Green
Write-Host ""

# Repository information
$repoOwner = "iamGoldenOla"
$repoName = "trendtacticsdigital"

# Construct the URL for GitHub Pages settings
$githubPagesUrl = "https://github.com/$repoOwner/$repoName/settings/pages"

Write-Host "Opening GitHub Pages configuration page:" -ForegroundColor Cyan
Write-Host $githubPagesUrl -ForegroundColor Yellow
Write-Host ""

# Try to open in default browser
try {
    Start-Process $githubPagesUrl
    Write-Host "✅ GitHub Pages setup page opened in your browser!" -ForegroundColor Green
} catch {
    Write-Host "❌ Could not automatically open browser" -ForegroundColor Red
    Write-Host "📋 Please manually visit: $githubPagesUrl" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🔧 Setup Instructions:" -ForegroundColor Cyan
Write-Host "1. Under 'Source', select:" -ForegroundColor White
Write-Host "   - Branch: main" -ForegroundColor White
Write-Host "   - Folder: / (root)" -ForegroundColor White
Write-Host "2. Click 'Save'" -ForegroundColor White
Write-Host "3. Wait 2-5 minutes for deployment" -ForegroundColor White
Write-Host "4. Visit: https://$repoOwner.github.io/$repoName" -ForegroundColor Yellow
Write-Host ""

Write-Host "⏳ After setup completes, your updated website with all dashboard functionality will be live!" -ForegroundColor Green
Write-Host "🔐 Test the authentication by clicking 'Get Started' on your site" -ForegroundColor Cyan