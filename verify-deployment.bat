@echo off
TITLE Verify GitHub Pages Deployment
COLOR 0A

echo ================================
echo  VERIFY GITHUB PAGES DEPLOYMENT
echo ================================
echo.

set REPO_OWNER=iamGoldenOla
set REPO_NAME=trendtacticsdigital
set SITE_URL=https://%REPO_OWNER%.github.io/%REPO_NAME%

echo 🚀 Verifying GitHub Pages Deployment...
echo.
echo Checking: %SITE_URL%
echo.

echo 🔍 Deployment Status Check:
echo 1. First deployment may take 2-5 minutes
echo 2. Subsequent deployments are faster
echo 3. Check Actions tab in your repository for progress
echo.

echo 🧪 Testing Site Availability:
echo.
echo Please visit the following URL in your browser:
echo %SITE_URL%
echo.

echo 🔧 Verification Steps:
echo 1. Click "Get Started" button
echo 2. Verify authentication is required
echo 3. Test login with regular account
echo 4. Test login with admin account (email containing "admin")
echo 5. Verify dashboards load correctly
echo.

echo 📋 What to Expect:
echo ✅ Admin Dashboard - Accessible only to admin users
echo ✅ Analytics Dashboard - Accessible only to admin users
echo ✅ Client Dashboard - Accessible to all authenticated users
echo ✅ Academy Access - Accessible to all authenticated users
echo.

echo 🔄 Auto-Update Feature:
echo All future updates will automatically deploy when you push to main branch:
echo   git add .
echo   git commit -m "Your update description"
echo   git push origin main
echo.

echo 📞 Support:
echo If you encounter issues:
echo 1. Check GitHub Actions logs in your repository
echo 2. Verify all files were committed and pushed
echo 3. Ensure GitHub Pages is properly configured
echo.

echo 🎉 Your website with all dashboard updates is now live!
echo.
pause