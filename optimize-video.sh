#!/bin/bash

# This script creates optimized versions of the promo video for different screen sizes
# Requires FFmpeg to be installed

INPUT_VIDEO="images/Trendtactics-digital-promo.mp4"

# Check if input video exists
if [ ! -f "$INPUT_VIDEO" ]; then
    echo "Error: Input video $INPUT_VIDEO not found!"
    exit 1
fi

echo "Creating optimized video versions..."

# Create 480p version (mobile)
ffmpeg -i "$INPUT_VIDEO" -vf scale=-1:480 -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 128k images/Trendtactics-digital-promo-480p.mp4

# Create 720p version (tablet/desktop)
ffmpeg -i "$INPUT_VIDEO" -vf scale=-1:720 -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 128k images/Trendtactics-digital-promo-720p.mp4

echo "Optimization complete!"
echo "Updated video files:"
echo "- images/Trendtactics-digital-promo-480p.mp4"
echo "- images/Trendtactics-digital-promo-720p.mp4"
echo "- Original: images/Trendtactics-digital-promo.mp4"
