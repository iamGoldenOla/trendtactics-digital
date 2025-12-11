@echo off
echo Installing FFmpeg using Chocolatey...
echo This will install Chocolatey if it's not already installed, then install FFmpeg.

REM Check if Chocolatey is installed
where choco >nul 2>&1
if %errorlevel% neq 0 (
    echo Chocolatey not found. Installing Chocolatey first...
    powershell -Command "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))"
) else (
    echo Chocolatey already installed.
)

echo Installing FFmpeg...
choco install ffmpeg -y

echo FFmpeg installation complete!
echo Please restart your command prompt or PowerShell to use FFmpeg.
pause