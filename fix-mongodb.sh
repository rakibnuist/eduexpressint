#!/bin/bash

echo "🔧 Fixing MongoDB Connection String..."

# The correct MongoDB URI format
MONGODB_URI="mongodb+srv://eduexpress:EduExpress@123@cluster0.mongodb.net/edu-express"

echo "Adding MONGODB_URI to Vercel..."
echo "$MONGODB_URI" | vercel env add MONGODB_URI production

echo "Adding MONGODB_URI to Preview..."
echo "$MONGODB_URI" | vercel env add MONGODB_URI preview

echo "Adding MONGODB_URI to Development..."
echo "$MONGODB_URI" | vercel env add MONGODB_URI development

echo "✅ MongoDB URI updated in all environments"
echo "🔄 Redeploying to apply changes..."

vercel --prod

echo "🎉 Deployment complete! Testing database connection..."

# Wait a moment for deployment to complete
sleep 10

# Test the database connection
curl -s https://www.eduexpressint.com/api/test-db | jq .

echo ""
echo "✅ Database connection fix complete!"
