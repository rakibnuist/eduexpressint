#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

console.log('🚀 EduExpress International Setup Script');
console.log('=====================================\n');

// Check if .env.local exists
const envLocalPath = path.join(projectRoot, '.env.local');
const envExamplePath = path.join(projectRoot, 'env.example');

if (!fs.existsSync(envLocalPath)) {
  console.log('📝 Creating .env.local file...');
  
  if (fs.existsSync(envExamplePath)) {
    const envExample = fs.readFileSync(envExamplePath, 'utf8');
    fs.writeFileSync(envLocalPath, envExample);
    console.log('✅ .env.local created from env.example');
  } else {
    console.log('❌ env.example not found');
    process.exit(1);
  }
} else {
  console.log('✅ .env.local already exists');
}

// Check if node_modules exists
const nodeModulesPath = path.join(projectRoot, 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('📦 Installing dependencies...');
  console.log('Please run: npm install');
} else {
  console.log('✅ Dependencies already installed');
}

// Check MongoDB connection
console.log('\n🔍 Environment Check:');
console.log('===================');

// Read .env.local to check configuration
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, 'utf8');
  const lines = envContent.split('\n');
  
  const checks = [
    { key: 'MONGODB_URI', name: 'MongoDB URI' },
    { key: 'JWT_SECRET', name: 'JWT Secret' },
    { key: 'NEXTAUTH_SECRET', name: 'NextAuth Secret' },
    { key: 'NEXT_PUBLIC_META_PIXEL_ID', name: 'Meta Pixel ID' },
    { key: 'NEXT_PUBLIC_GTM_ID', name: 'Google Tag Manager ID' },
    { key: 'ADMIN_EMAIL', name: 'Admin Email' },
    { key: 'ADMIN_PASSWORD', name: 'Admin Password' }
  ];
  
  checks.forEach(check => {
    const line = lines.find(l => l.startsWith(`${check.key}=`));
    if (line && !line.includes('your-') && !line.includes('GTM-XXXXXXX') && !line.includes('YOUR_')) {
      console.log(`✅ ${check.name}: Configured`);
    } else {
      console.log(`⚠️  ${check.name}: Needs configuration`);
    }
  });
}

console.log('\n📋 Next Steps:');
console.log('==============');
console.log('1. Update .env.local with your actual configuration values');
console.log('2. Make sure MongoDB is running (local or Atlas)');
console.log('3. Run: npm install (if not already done)');
console.log('4. Run: npm run create-admin (to create admin user)');
console.log('5. Run: npm run dev (to start development server)');
console.log('6. Open: http://localhost:3000');

console.log('\n🎉 Setup complete! Happy coding!');
