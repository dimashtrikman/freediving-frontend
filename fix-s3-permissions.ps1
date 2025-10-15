# PowerShell script to fix S3 bucket permissions for static website hosting
# Run this script to resolve the 403 Forbidden error

Write-Host "🔧 Fixing S3 bucket permissions for freediving-front..." -ForegroundColor Green

# Check if AWS CLI is installed
try {
    aws --version | Out-Null
    Write-Host "✅ AWS CLI is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ AWS CLI is not installed. Please install it first." -ForegroundColor Red
    exit 1
}

# Check AWS credentials
try {
    aws sts get-caller-identity | Out-Null
    Write-Host "✅ AWS credentials are configured" -ForegroundColor Green
} catch {
    Write-Host "❌ AWS credentials are not configured. Please run 'aws configure' first." -ForegroundColor Red
    exit 1
}

$BUCKET_NAME = "freediving-front"
$REGION = "eu-north-1"

Write-Host "📦 Configuring S3 bucket: $BUCKET_NAME" -ForegroundColor Yellow

# 1. Enable static website hosting
Write-Host "🌐 Enabling static website hosting..." -ForegroundColor Yellow
aws s3 website s3://$BUCKET_NAME --index-document index.html --error-document index.html --region $REGION

# 2. Set bucket policy for public read access
Write-Host "🔓 Setting bucket policy for public read access..." -ForegroundColor Yellow
$BUCKET_POLICY = @"
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
        }
    ]
}
"@

$BUCKET_POLICY | Out-File -FilePath "bucket-policy.json" -Encoding UTF8
aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy file://bucket-policy.json --region $REGION
Remove-Item "bucket-policy.json"

# 3. Set CORS configuration
Write-Host "🌍 Setting CORS configuration..." -ForegroundColor Yellow
$CORS_CONFIG = @"
{
    "CORSRules": [
        {
            "AllowedHeaders": ["*"],
            "AllowedMethods": ["GET", "HEAD"],
            "AllowedOrigins": ["*"],
            "ExposeHeaders": []
        }
    ]
}
"@

$CORS_CONFIG | Out-File -FilePath "cors-config.json" -Encoding UTF8
aws s3api put-bucket-cors --bucket $BUCKET_NAME --cors-configuration file://cors-config.json --region $REGION
Remove-Item "cors-config.json"

# 4. Block public access settings (disable block public access for static website)
Write-Host "🚫 Configuring public access settings..." -ForegroundColor Yellow
aws s3api put-public-access-block --bucket $BUCKET_NAME --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false" --region $REGION

Write-Host "✅ S3 bucket permissions have been configured successfully!" -ForegroundColor Green
Write-Host "🌐 Your website should now be accessible at:" -ForegroundColor Cyan
Write-Host "   https://$BUCKET_NAME.s3-website-$REGION.amazonaws.com" -ForegroundColor White
Write-Host "   https://d2qx2by9g05umu.cloudfront.net" -ForegroundColor White

Write-Host "`n📝 Next steps:" -ForegroundColor Yellow
Write-Host "1. Deploy your application using: .\deploy.bat production" -ForegroundColor White
Write-Host "2. If using CloudFront, wait 5-10 minutes for changes to propagate" -ForegroundColor White
Write-Host "3. Test your website at the URLs above" -ForegroundColor White

