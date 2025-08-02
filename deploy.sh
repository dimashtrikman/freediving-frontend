#!/bin/bash

# Deployment script for freediving frontend
# Usage: ./deploy.sh [production|staging]

set -e

ENVIRONMENT=${1:-production}
AWS_REGION="us-east-1"

echo "🚀 Starting deployment for environment: $ENVIRONMENT"

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it first."
    exit 1
fi

# Check if AWS credentials are configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS credentials are not configured. Please run 'aws configure' first."
    exit 1
fi

echo "📦 Installing dependencies..."
npm ci

echo "🔧 Creating environment file..."
if [ "$ENVIRONMENT" = "production" ]; then
    echo "REACT_APP_SERVER_API_URL=http://13.61.24.49:8080" > .env
    echo "REACT_APP_ENVIRONMENT=production" >> .env
    S3_BUCKET="your-freediving-frontend-bucket"
    CLOUDFRONT_ID="your-cloudfront-distribution-id"
else
    echo "REACT_APP_SERVER_API_URL=http://13.61.24.49:8080" > .env
    echo "REACT_APP_ENVIRONMENT=staging" >> .env
    S3_BUCKET="your-freediving-frontend-staging-bucket"
    CLOUDFRONT_ID="your-cloudfront-staging-distribution-id"
fi

echo "🏗️ Building application..."
npm run build

echo "📤 Uploading to S3..."
aws s3 sync build/ s3://$S3_BUCKET --delete

if [ ! -z "$CLOUDFRONT_ID" ]; then
    echo "🔄 Invalidating CloudFront cache..."
    aws cloudfront create-invalidation \
        --distribution-id $CLOUDFRONT_ID \
        --paths "/*"
fi

echo "✅ Deployment completed successfully!"
echo "🌐 Your application should be available at: https://$S3_BUCKET.s3-website-$AWS_REGION.amazonaws.com" 