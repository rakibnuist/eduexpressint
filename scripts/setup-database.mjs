#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Setting up database connection for EduExpress...\n');

// Check if .env file exists
const envPath = path.join(process.cwd(), '.env');
const envExamplePath = path.join(process.cwd(), 'env.example');

if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env file from env.example...');
  
  if (fs.existsSync(envExamplePath)) {
    const envContent = fs.readFileSync(envExamplePath, 'utf8');
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file created successfully!');
  } else {
    console.log('❌ env.example file not found!');
    process.exit(1);
  }
} else {
  console.log('✅ .env file already exists');
}

// Check if MongoDB is installed
console.log('\n🔍 Checking MongoDB installation...');
try {
  execSync('mongod --version', { stdio: 'pipe' });
  console.log('✅ MongoDB is installed');
} catch (error) {
  console.log('❌ MongoDB is not installed or not in PATH');
  console.log('\n📋 To install MongoDB:');
  console.log('   macOS: brew install mongodb-community');
  console.log('   Ubuntu: sudo apt-get install mongodb');
  console.log('   Windows: Download from https://www.mongodb.com/try/download/community');
  console.log('\n   Or use MongoDB Atlas (cloud): https://www.mongodb.com/atlas');
  process.exit(1);
}

// Check if MongoDB is running
console.log('\n🔍 Checking if MongoDB is running...');
try {
  execSync('mongosh --eval "db.runCommand({ping: 1})" --quiet', { stdio: 'pipe' });
  console.log('✅ MongoDB is running');
} catch (error) {
  console.log('❌ MongoDB is not running');
  console.log('\n🚀 Starting MongoDB...');
  try {
    // Try to start MongoDB (this might require sudo on some systems)
    execSync('brew services start mongodb-community', { stdio: 'inherit' });
    console.log('✅ MongoDB started successfully');
  } catch (startError) {
    console.log('❌ Failed to start MongoDB automatically');
    console.log('\n📋 Manual start options:');
    console.log('   macOS: brew services start mongodb-community');
    console.log('   Ubuntu: sudo systemctl start mongod');
    console.log('   Windows: net start MongoDB');
    console.log('   Or run: mongod');
  }
}

// Test database connection
console.log('\n🔍 Testing database connection...');
try {
  const response = await fetch('http://localhost:3000/api/test-db');
  const data = await response.json();
  
  if (data.status === 'success') {
    console.log('✅ Database connection successful!');
    console.log('🎉 Your application is ready to use the database');
  } else {
    console.log('⚠️  Database connection issue:', data.message);
  }
} catch (error) {
  console.log('❌ Cannot test database connection (server might not be running)');
  console.log('   Start your Next.js server with: npm run dev');
}

console.log('\n📋 Next steps:');
console.log('   1. Start your Next.js server: npm run dev');
console.log('   2. Visit: http://localhost:3000/admin/updates');
console.log('   3. Test creating an update to verify database connection');
console.log('\n🎯 Database Configuration:');
console.log('   - Database: edu-express');
console.log('   - Collection: updates');
console.log('   - Connection: mongodb://localhost:27017/edu-express');
