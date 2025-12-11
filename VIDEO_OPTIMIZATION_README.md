# Video Optimization Instructions

This document provides instructions on how to optimize the hero section video for different screen sizes to improve website performance.

## Prerequisites

You need to install FFmpeg on your system to run the optimization script.

### Installing FFmpeg on Windows

1. Download FFmpeg from the official website: https://ffmpeg.org/download.html
2. Or use a package manager like Chocolatey:
   ```
   choco install ffmpeg
   ```
3. Or use Scoop:
   ```
   scoop install ffmpeg
   ```

### Installing FFmpeg on macOS

Using Homebrew:
```
brew install ffmpeg
```

### Installing FFmpeg on Linux

Ubuntu/Debian:
```
sudo apt update
sudo apt install ffmpeg
```

CentOS/RHEL:
```
sudo yum install epel-release
sudo yum install ffmpeg
```

## Running the Optimization Script

### On Windows (PowerShell)

1. Open PowerShell as Administrator
2. Navigate to your project directory:
   ```
   cd C:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean
   ```
3. Run the PowerShell script:
   ```
   .\optimize-video.ps1
   ```

### On macOS/Linux (Bash)

1. Open Terminal
2. Navigate to your project directory:
   ```
   cd /path/to/TrendtacticsDigitalClean
   ```
3. Make the script executable:
   ```
   chmod +x optimize-video.sh
   ```
4. Run the script:
   ```
   ./optimize-video.sh
   ```

## What the Script Does

The script creates two optimized versions of the main video:

1. **480p version** (`Trendtactics-digital-promo-480p.mp4`) - For mobile devices
2. **720p version** (`Trendtactics-digital-promo-720p.mp4`) - For tablets and smaller desktop screens
3. **Original version** (`Trendtactics-digital-promo.mp4`) - For high-resolution desktop screens

This approach ensures that users on different devices receive appropriately sized videos, reducing bandwidth usage and improving loading times.

## Manual Optimization (If Script Fails)

If the script doesn't work, you can manually create the optimized versions using these FFmpeg commands:

```bash
# Create 480p version
ffmpeg -i images/Trendtactics-digital-promo.mp4 -vf scale=-1:480 -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 128k images/Trendtactics-digital-promo-480p.mp4

# Create 720p version
ffmpeg -i images/Trendtactics-digital-promo.mp4 -vf scale=-1:720 -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 128k images/Trendtactics-digital-promo-720p.mp4
```

## Troubleshooting

1. **"ffmpeg is not recognized"**: FFmpeg is not installed or not in your PATH
2. **Permission denied**: Run the script with appropriate permissions
3. **File not found**: Ensure the original video file exists in the images directory

After running the optimization, the video background on the homepage should work correctly across all device sizes.