# Image Conversion Script for WebP and AVIF
# Requires: ImageMagick (install from https://imagemagick.org/script/download.php)

$sourceImage = "public\hero-image.jpg"
$outputWebP = "public\hero-image.webp"
$outputAVIF = "public\hero-image.avif"

Write-Host "Converting $sourceImage to modern formats..." -ForegroundColor Cyan

# Check if ImageMagick is installed
$magickExists = Get-Command magick -ErrorAction SilentlyContinue

if (-not $magickExists) {
    Write-Host "ImageMagick not found!" -ForegroundColor Red
    Write-Host "Please install from: https://imagemagick.org/script/download.php" -ForegroundColor Yellow
    Write-Host "`nAlternative: Use online converter:" -ForegroundColor Yellow
    Write-Host "https://squoosh.app/" -ForegroundColor White
    exit 1
}

# Convert to WebP (quality 85, good balance)
Write-Host "Converting to WebP..." -ForegroundColor Green
magick convert $sourceImage -quality 85 $outputWebP

# Convert to AVIF (quality 80, smaller size)
Write-Host "Converting to AVIF..." -ForegroundColor Green
magick convert $sourceImage -quality 80 $outputAVIF

# Show file sizes
Write-Host "`nFile sizes:" -ForegroundColor Cyan
Write-Host "Original (JPG): $((Get-Item $sourceImage).Length / 1KB) KB" -ForegroundColor White
Write-Host "WebP: $((Get-Item $outputWebP).Length / 1KB) KB" -ForegroundColor Green
Write-Host "AVIF: $((Get-Item $outputAVIF).Length / 1KB) KB" -ForegroundColor Green

Write-Host "`nDone! Images are ready in the public folder." -ForegroundColor Green
