#!/bin/bash

# EduExpress Deployment Script
# This script helps deploy the website with Meta Pixel tracking

echo "🚀 Starting EduExpress Deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Build the project first
echo "🔨 Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi

echo "✅ Build successful!"

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Set up environment variables in Vercel Dashboard"
    echo "2. Test the Meta Pixel tracking"
    echo "3. Verify database connection"
    echo ""
    echo "🔧 Environment variables to set in Vercel:"
    echo "- MONGODB_URI"
    echo "- JWT_SECRET"
    echo "- NEXTAUTH_URL"
    echo "- NEXTAUTH_SECRET"
    echo "- NEXT_PUBLIC_META_PIXEL_ID=1444050970227269"
    echo "- NEXT_PUBLIC_GTM_ID"
    echo "- ADMIN_EMAIL"
    echo "- ADMIN_PASSWORD"
    echo ""
    echo "📊 Test your Meta Pixel tracking:"
    echo "1. Install Facebook Pixel Helper Chrome extension"
    echo "2. Visit your deployed site"
    echo "3. Check for tracking events in the console"
    echo "4. Verify events in Facebook Events Manager"
else
    echo "❌ Deployment failed. Please check the errors above."
    exit 1
fi
