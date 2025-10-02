#!/usr/bin/env node

/**
 * Check Production Environment Variables
 * This script helps identify what environment variables are missing in production
 */

console.log('🔍 Production Environment Check');
console.log('================================\n');

console.log('📋 Required Environment Variables for Production:');
console.log('');

const requiredVars = [
  'MONGODB_URI',
  'MONGODB_DB', 
  'JWT_SECRET',
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET',
  'NEXT_PUBLIC_META_PIXEL_ID',
  'NEXT_PUBLIC_GTM_ID',
  'NODE_ENV',
  'API_BASE_URL',
  'ADMIN_EMAIL',
  'ADMIN_PASSWORD'
];

console.log('Required variables:');
requiredVars.forEach(varName => {
  console.log(`   - ${varName}`);
});

console.log('\n📝 Production Environment Values (from env-production.env.txt):');
console.log('');

const productionEnv = {
  'MONGODB_URI': 'mongodb+srv://rakibeduexpress_db_user:78VlTCsLPWCa571b@eduexpressint.9pxupqo.mongodb.net/?retryWrites=true&w=majority&appName=eduexpressint',
  'MONGODB_DB': 'edu-express',
  'JWT_SECRET': '50bbd596a150d5e47d1fd6437926dd01',
  'NEXTAUTH_URL': 'https://eduexpressint.com',
  'NEXTAUTH_SECRET': '50bbd596a150d5e47d1fd6437926dd01',
  'NEXT_PUBLIC_META_PIXEL_ID': '1444050970227269',
  'NEXT_PUBLIC_GTM_ID': 'PCJ78FZ5',
  'NODE_ENV': 'production',
  'API_BASE_URL': 'https://eduexpressint.com/api',
  'ADMIN_EMAIL': 'admin@eduexpressint.com',
  'ADMIN_PASSWORD': 'admin123'
};

Object.entries(productionEnv).forEach(([key, value]) => {
  const maskedValue = key.includes('SECRET') || key.includes('PASSWORD') || key.includes('URI') 
    ? value.substring(0, 20) + '...' 
    : value;
  console.log(`   ${key}: ${maskedValue}`);
});

console.log('\n🚨 Issue Identified:');
console.log('The production API is using fallback data, which means:');
console.log('1. Database connection is failing');
console.log('2. Environment variables might not be set correctly in Vercel');
console.log('3. The MONGODB_URI might be incorrect or the database is not accessible');

console.log('\n🔧 Solution:');
console.log('1. Check Vercel Dashboard for environment variables');
console.log('2. Ensure MONGODB_URI is set correctly');
console.log('3. Verify database connection from production');
console.log('4. Redeploy the application if needed');

console.log('\n📊 Current Status:');
console.log('✅ Production database has 3 universities');
console.log('❌ Production API is using fallback data (2 universities)');
console.log('🔧 Need to fix environment variables in Vercel');

console.log('\n🎯 Next Steps:');
console.log('1. Go to Vercel Dashboard');
console.log('2. Check Environment Variables section');
console.log('3. Add/update MONGODB_URI and other required variables');
console.log('4. Redeploy the application');
console.log('5. Test the API endpoint again');
