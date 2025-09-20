# Quick deployment script for freediving frontend
# This script will build and deploy your application

Write-Host "🚀 Starting quick deployment..." -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Please run this script from the freediving-frontend directory" -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm ci

# Create environment file
Write-Host "🔧 Creating environment file..." -ForegroundColor Yellow
@"
REACT_APP_SERVER_API_URL=https://api.freediving-course.com
REACT_APP_ENVIRONMENT=production
"@ | Out-File -FilePath ".env" -Encoding UTF8

# Build application
Write-Host "🏗️ Building application..." -ForegroundColor Yellow
npm run build

# Deploy to S3
Write-Host "📤 Deploying to S3..." -ForegroundColor Yellow
aws s3 sync build/ s3://freediving-front --delete --region eu-north-1

# Invalidate CloudFront cache
Write-Host "🔄 Invalidating CloudFront cache..." -ForegroundColor Yellow
aws cloudfront create-invalidation --distribution-id E3OJ4ZBFDQY3J1 --paths "/*"

Write-Host "✅ Deployment completed successfully!" -ForegroundColor Green
Write-Host "🌐 Your application should be available at:" -ForegroundColor Cyan
Write-Host "   https://freediving-front.s3-website-eu-north-1.amazonaws.com" -ForegroundColor White
Write-Host "   https://d2qx2by9g05umu.cloudfront.net" -ForegroundColor White

