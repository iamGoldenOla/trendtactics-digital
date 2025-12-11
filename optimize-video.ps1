# This script creates optimized versions of the promo video for different screen sizes
# Requires FFmpeg to be installed and accessible from PATH

$InputVideo = "images\Trendtactics-digital-promo.mp4"

# Check if input video exists
if (-not (Test-Path $InputVideo)) {
    Write-Host "Error: Input video $InputVideo not found!" -ForegroundColor Red
    exit 1
}

Write-Host "Creating optimized video versions..." -ForegroundColor Green

# Create 480p version (mobile)
ffmpeg -i $InputVideo -vf scale=-1:480 -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 128k images\Trendtactics-digital-promo-480p.mp4

# Create 720p version (tablet/desktop)
ffmpeg -i $InputVideo -vf scale=-1:720 -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 128k images\Trendtactics-digital-promo-720p.mp4

Write-Host "Optimization complete!" -ForegroundColor Green
Write-Host "Updated video files:" -ForegroundColor Yellow
Write-Host "- images\Trendtactics-digital-promo-480p.mp4" -ForegroundColor Yellow
Write-Host "- images\Trendtactics-digital-promo-720p.mp4" -ForegroundColor Yellow
Write-Host "- Original: images\Trendtactics-digital-promo.mp4" -ForegroundColor Yellow
