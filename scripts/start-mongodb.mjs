#!/usr/bin/env node

import { execSync } from 'child_process';
import { spawn } from 'child_process';

console.log('🚀 Starting MongoDB for EduExpress...\n');

// Check if MongoDB is already running
try {
  execSync('mongosh --eval "db.runCommand({ping: 1})" --quiet', { stdio: 'pipe' });
  console.log('✅ MongoDB is already running!');
  process.exit(0);
} catch (error) {
  console.log('🔍 MongoDB is not running, attempting to start...');
}

// Try different methods to start MongoDB based on the system
const startMethods = [
  // macOS with Homebrew
  {
    name: 'Homebrew (macOS)',
    command: 'brew services start mongodb-community',
    check: 'brew services list | grep mongodb-community'
  },
  // Linux systemd
  {
    name: 'Systemd (Linux)',
    command: 'sudo systemctl start mongod',
    check: 'systemctl is-active mongod'
  },
  // Windows
  {
    name: 'Windows Service',
    command: 'net start MongoDB',
    check: 'sc query MongoDB'
  },
  // Direct mongod command
  {
    name: 'Direct mongod',
    command: 'mongod --dbpath ./data/db',
    check: null
  }
];

let started = false;

for (const method of startMethods) {
  try {
    console.log(`🔄 Trying ${method.name}...`);
    
    if (method.check) {
      // Check if this method is available
      try {
        execSync(method.check, { stdio: 'pipe' });
      } catch (checkError) {
        console.log(`   ⏭️  ${method.name} not available, trying next...`);
        continue;
      }
    }
    
    // Try to start MongoDB
    if (method.name === 'Direct mongod') {
      // For direct mongod, we need to create the data directory first
      try {
        execSync('mkdir -p ./data/db', { stdio: 'pipe' });
      } catch (mkdirError) {
        // Directory might already exist, continue
      }
      
      console.log('   🚀 Starting MongoDB in background...');
      const mongod = spawn('mongod', ['--dbpath', './data/db'], {
        detached: true,
        stdio: 'ignore'
      });
      
      mongod.unref();
      
      // Wait a moment and check if it started
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      try {
        execSync('mongosh --eval "db.runCommand({ping: 1})" --quiet', { stdio: 'pipe' });
        console.log('   ✅ MongoDB started successfully!');
        started = true;
        break;
      } catch (pingError) {
        console.log('   ❌ MongoDB failed to start');
      }
    } else {
      execSync(method.command, { stdio: 'inherit' });
      console.log(`   ✅ ${method.name} started successfully!`);
      started = true;
      break;
    }
  } catch (error) {
    console.log(`   ❌ ${method.name} failed:`, error.message);
  }
}

if (!started) {
  console.log('\n❌ Failed to start MongoDB automatically');
  console.log('\n📋 Manual start options:');
  console.log('   macOS: brew services start mongodb-community');
  console.log('   Ubuntu: sudo systemctl start mongod');
  console.log('   Windows: net start MongoDB');
  console.log('   Or run: mongod --dbpath ./data/db');
  console.log('\n🌐 Alternative: Use MongoDB Atlas (cloud database)');
  console.log('   Visit: https://www.mongodb.com/atlas');
  process.exit(1);
}

// Test the connection
console.log('\n🔍 Testing database connection...');
try {
  execSync('mongosh --eval "db.runCommand({ping: 1})" --quiet', { stdio: 'pipe' });
  console.log('✅ Database connection successful!');
  console.log('\n🎉 MongoDB is ready for EduExpress!');
  console.log('   Database: edu-express');
  console.log('   Connection: mongodb://localhost:27017/edu-express');
} catch (error) {
  console.log('❌ Database connection test failed');
  process.exit(1);
}
