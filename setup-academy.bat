@echo off
cls
echo ======================================================
echo 🎓 Trendtactics Academy Setup
echo ======================================================
echo.
echo This script will:
echo 1. Install Supabase CLI (if needed)
echo 2. Update Edge Functions for new schema
echo 3. Deploy functions to your Academy project
echo.
echo Press any key to continue...
pause >nul

echo.
echo 🚀 Starting Academy Setup...
echo ========================
echo.

REM Run the PowerShell setup script
powershell -ExecutionPolicy Bypass -File "%~dp0full-academy-setup-fixed.ps1"

echo.
echo ======================================================
echo 🎉 Setup Complete!
echo ======================================================
echo.
echo Next steps:
echo 1. Test your functions in the Supabase Dashboard
echo 2. Verify Academy page functionality
echo 3. Test enrollment process
echo.
echo Press any key to exit...
pause >nul