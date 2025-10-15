@echo off
setlocal enabledelayedexpansion

REM Deployment script for freediving frontend (Windows)
REM Usage: deploy.bat [production|staging]

set ENVIRONMENT=%1
if "%ENVIRONMENT%"=="" set ENVIRONMENT=production

echo 🚀 Starting deployment for environment: %ENVIRONMENT%

REM Check if AWS CLI is installed
aws --version >nul 2>&1
if errorlevel 1 (
    echo ❌ AWS CLI is not installed. Please install it first.
    exit /b 1
)

REM Check if AWS credentials are configured
aws sts get-caller-identity >nul 2>&1
if errorlevel 1 (
    echo ❌ AWS credentials are not configured. Please run 'aws configure' first.
    exit /b 1
)

echo 📦 Installing dependencies...
call npm ci

echo 🔧 Creating environment file...
if "%ENVIRONMENT%"=="production" (
    echo REACT_APP_SERVER_API_URL=https://api.freediving-course.com > .env
    echo REACT_APP_ENVIRONMENT=production >> .env
    set S3_BUCKET=freediving-front
    set CLOUDFRONT_ID=E3OJ4ZBFDQY3J1
) else (
    echo REACT_APP_SERVER_API_URL=https://api.freediving-course.com > .env
    echo REACT_APP_ENVIRONMENT=staging >> .env
    set S3_BUCKET=freediving-front-staging
    set CLOUDFRONT_ID=E3OJ4ZBFDQY3J1
)

echo 🏗️ Building application...
call npm run build

echo 📤 Uploading to S3...
aws s3 sync build/ s3://%S3_BUCKET% --delete

if not "%CLOUDFRONT_ID%"=="" (
    echo 🔄 Invalidating CloudFront cache...
    aws cloudfront create-invalidation --distribution-id %CLOUDFRONT_ID% --paths "/*"
)

echo ✅ Deployment completed successfully!
echo 🌐 Your application should be available at: https://%S3_BUCKET%.s3-website-us-east-1.amazonaws.com 