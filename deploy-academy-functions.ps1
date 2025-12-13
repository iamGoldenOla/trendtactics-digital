# PowerShell script to deploy Academy Edge Functions
# Usage: .\deploy-academy-functions.ps1 -ProjectRef "your_academy_project_id"

param(
    [Parameter(Mandatory=$true)]
    [string]$ProjectRef
)

Write-Host "🚀 Deploying Academy Edge Functions..." -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

# Check if Supabase CLI is installed
try {
    $supabaseVersion = supabase --version
    Write-Host "✅ Supabase CLI found: $supabaseVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Supabase CLI not found. Please install it first:" -ForegroundColor Red
    Write-Host "   npm install -g supabase" -ForegroundColor Yellow
    exit 1
}

# Check if logged in
try {
    $status = supabase status 2>$null
    if ($status -match "Not logged in") {
        Write-Host "⚠️  Not logged in to Supabase. Please run 'supabase login' first." -ForegroundColor Yellow
        exit 1
    }
    Write-Host "✅ Logged in to Supabase" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Unable to verify Supabase login status. Continuing..." -ForegroundColor Yellow
}

# Navigate to project directory
$projectRoot = "c:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean"
Set-Location $projectRoot
Write-Host "📂 Working in directory: $projectRoot" -ForegroundColor Blue

# Display project reference
Write-Host "🎯 Target Project: $ProjectRef" -ForegroundColor Blue

# List functions to be deployed
Write-Host "`n📋 Functions to be deployed:" -ForegroundColor Cyan
$functionsDir = "$projectRoot\supabase\functions"
if (Test-Path $functionsDir) {
    Get-ChildItem -Directory $functionsDir | Where-Object { $_.Name -ne "_utils" } | ForEach-Object {
        Write-Host "   • $($_.Name)" -ForegroundColor White
    }
} else {
    Write-Host "❌ Functions directory not found: $functionsDir" -ForegroundColor Red
    exit 1
}

# Confirm deployment
Write-Host "`n⚠️  Ready to deploy functions to project $ProjectRef" -ForegroundColor Yellow
$confirmation = Read-Host "Do you want to continue? (y/N)"
if ($confirmation -ne "y" -and $confirmation -ne "Y") {
    Write-Host "❌ Deployment cancelled." -ForegroundColor Red
    exit 0
}

# Deploy functions
Write-Host "`n🚀 Deploying functions..." -ForegroundColor Cyan

try {
    # Deploy all functions at once
    Write-Host "   Deploying all functions..." -ForegroundColor White
    $result = supabase functions deploy --project-ref $ProjectRef 2>&1
    Write-Host $result -ForegroundColor Gray
    
    Write-Host "`n✅ Deployment completed!" -ForegroundColor Green
} catch {
    Write-Host "❌ Deployment failed: $_" -ForegroundColor Red
    exit 1
}

# Verify deployment
Write-Host "`n🔍 Verifying deployment..." -ForegroundColor Cyan
try {
    $listResult = supabase functions list --project-ref $ProjectRef 2>&1
    Write-Host $listResult -ForegroundColor Gray
    Write-Host "`n✅ Functions verified!" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Unable to verify functions: $_" -ForegroundColor Yellow
}

Write-Host "`n🎉 Academy Edge Functions deployment complete!" -ForegroundColor Green
Write-Host "   Next steps:" -ForegroundColor White
Write-Host "   1. Test your functions in the Supabase Dashboard" -ForegroundColor White
Write-Host "   2. Verify Academy page functionality" -ForegroundColor White
Write-Host "   3. Test enrollment process" -ForegroundColor White