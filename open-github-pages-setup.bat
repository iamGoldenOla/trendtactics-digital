@echo off
TITLE Opening GitHub Pages Setup
COLOR 0A

echo ================================
echo  OPENING GITHUB PAGES SETUP    
echo ================================
echo.

set REPO_OWNER=iamGoldenOla
set REPO_NAME=trendtacticsdigital
set GITHUB_PAGES_URL=https://github.com/%REPO_OWNER%/%REPO_NAME%/settings/pages

echo 🚀 Opening GitHub Pages configuration page...
echo.
echo URL: %GITHUB_PAGES_URL%
echo.

echo 🔧 Setup Instructions:
echo 1. Under 'Source', select:
echo    - Branch: main
echo    - Folder: / (root)
echo 2. Click 'Save'
echo 3. Wait 2-5 minutes for deployment
echo 4. Visit: https://%REPO_OWNER%.github.io/%REPO_NAME%
echo.

echo 📋 If the browser doesn't open automatically, please visit:
echo %GITHUB_PAGES_URL%
echo.

echo 🕐 After setup completes, your updated website with all dashboard functionality will be live!
echo 🔐 Test the authentication by clicking 'Get Started' on your site
echo.

start "" "%GITHUB_PAGES_URL%"

echo ✅ GitHub Pages setup page opened in your browser!
echo.
pause