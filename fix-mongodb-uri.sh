#!/bin/bash

echo "🔧 Fixing MongoDB URI..."

# The correct MongoDB URI with cluster0
CORRECT_URI="mongodb+srv://eduexpress:EduExpress@123@cluster0.mongodb.net/edu-express"

echo "Current MongoDB URI:"
vercel env ls | grep MONGODB_URI

echo ""
echo "Removing old MONGODB_URI from all environments..."

# Remove from all environments
echo "y" | vercel env rm MONGODB_URI development
echo "y" | vercel env rm MONGODB_URI preview  
echo "y" | vercel env rm MONGODB_URI production

echo ""
echo "Adding correct MONGODB_URI to all environments..."

# Add to all environments
echo "$CORRECT_URI" | vercel env add MONGODB_URI development
echo "$CORRECT_URI" | vercel env add MONGODB_URI preview
echo "$CORRECT_URI" | vercel env add MONGODB_URI production

echo ""
echo "✅ MongoDB URI updated!"
echo "🔄 Redeploying application..."

vercel --prod

echo ""
echo "🧪 Testing database connection..."
sleep 15
curl -s https://www.eduexpressint.com/api/test-db | jq .

echo ""
echo "🎉 Database connection fix complete!"
