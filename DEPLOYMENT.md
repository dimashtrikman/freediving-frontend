# AWS Deployment Guide for Freediving Frontend

This guide explains how to deploy the freediving frontend application to AWS using S3 and CloudFront.

## Prerequisites

1. **AWS Account**: You need an AWS account with appropriate permissions
2. **AWS CLI**: Install and configure AWS CLI
3. **GitHub Repository**: Your code should be in a GitHub repository
4. **Node.js**: Version 18 or higher

## AWS Setup

### 1. Create S3 Bucket

```bash
aws s3 mb s3://your-freediving-frontend-bucket --region us-east-1
```

### 2. Configure S3 Bucket for Static Website Hosting

```bash
aws s3 website s3://your-freediving-frontend-bucket \
  --index-document index.html \
  --error-document index.html
```

### 3. Create CloudFront Distribution (Optional but Recommended)

1. Go to AWS CloudFront console
2. Create a new distribution
3. Set origin domain to your S3 bucket
4. Configure caching settings
5. Note down the distribution ID

### 4. Set up IAM User for GitHub Actions

Create an IAM user with the following policy:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
                "s3:DeleteObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::your-freediving-frontend-bucket",
                "arn:aws:s3:::your-freediving-frontend-bucket/*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "cloudfront:CreateInvalidation"
            ],
            "Resource": "arn:aws:cloudfront::*:distribution/*"
        }
    ]
}
```

## GitHub Secrets Setup

Add the following secrets to your GitHub repository:

1. Go to your repository → Settings → Secrets and variables → Actions
2. Add the following secrets:
   - `AWS_ACCESS_KEY_ID`: Your AWS access key
   - `AWS_SECRET_ACCESS_KEY`: Your AWS secret key
   - `S3_BUCKET`: Your S3 bucket name
   - `CLOUDFRONT_DISTRIBUTION_ID`: Your CloudFront distribution ID
   - `REACT_APP_SERVER_API_URL`: Your backend API URL (https://api.freediving-course.com)

## Deployment Methods

### Method 1: GitHub Actions (Recommended)

1. Push your code to the `main` or `master` branch
2. The GitHub Actions workflow will automatically:
   - Build the application
   - Deploy to S3
   - Invalidate CloudFront cache

### Method 2: Manual Deployment (Windows)

```cmd
cd freediving-frontend
deploy.bat production
```

### Method 3: Manual Deployment (Linux/Mac)

```bash
cd freediving-frontend
chmod +x deploy.sh
./deploy.sh production
```

## Environment Configuration

The application uses environment variables for configuration:

- `REACT_APP_SERVER_API_URL`: Backend API URL
- `REACT_APP_ENVIRONMENT`: Environment name (production/staging)

## Customization

### Update Backend URL

Edit `src/utils/global.js` to change the backend URL:

```javascript
export const API_URL = process.env.REACT_APP_SERVER_API_URL || "https://api.freediving-course.com";
```

### Update AWS Configuration

Edit `aws-deployment-config.json` to update your AWS settings:

```json
{
  "s3": {
    "bucketName": "your-actual-bucket-name",
    "region": "us-east-1"
  },
  "cloudfront": {
    "distributionId": "your-actual-distribution-id"
  }
}
```

## Troubleshooting

### Common Issues

1. **Build fails**: Check Node.js version and dependencies
2. **S3 upload fails**: Verify AWS credentials and bucket permissions
3. **CloudFront not updating**: Check distribution ID and invalidation permissions
4. **CORS issues**: Configure CORS on your S3 bucket

### S3 CORS Configuration

Add this CORS configuration to your S3 bucket:

```json
[
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["GET", "HEAD"],
        "AllowedOrigins": ["*"],
        "ExposeHeaders": []
    }
]
```

## Monitoring

- Check GitHub Actions for deployment status
- Monitor CloudFront metrics for performance
- Set up S3 access logs for debugging

## Security Considerations

1. Use HTTPS for all API calls
2. Configure proper CORS settings
3. Use IAM roles with minimal permissions
4. Enable CloudTrail for audit logging
5. Regularly rotate AWS access keys

## Cost Optimization

1. Use S3 Intelligent Tiering
2. Configure CloudFront caching appropriately
3. Monitor and optimize bundle size
4. Use AWS Cost Explorer to track expenses 