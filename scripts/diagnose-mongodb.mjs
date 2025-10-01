#!/usr/bin/env node

import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

console.log('🔍 MongoDB Connection Diagnostic');
console.log('================================');
console.log('');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not set in environment variables');
  process.exit(1);
}

console.log('📋 Current Configuration:');
console.log(`MONGODB_URI: ${MONGODB_URI}`);
console.log('');

// Parse the connection string
try {
  const url = new URL(MONGODB_URI);
  console.log('🔍 Connection String Analysis:');
  console.log(`   Protocol: ${url.protocol}`);
  console.log(`   Username: ${url.username}`);
  console.log(`   Password: ${url.password ? '***' + url.password.slice(-3) : 'Not set'}`);
  console.log(`   Hostname: ${url.hostname}`);
  console.log(`   Database: ${url.pathname.slice(1)}`);
  console.log('');

  // Check if it's a valid MongoDB Atlas connection string
  if (url.protocol === 'mongodb+srv:') {
    console.log('✅ Using MongoDB Atlas (SRV) connection');
    
    // Extract cluster name from hostname
    const clusterMatch = url.hostname.match(/^(.+)\.mongodb\.net$/);
    if (clusterMatch) {
      const clusterName = clusterMatch[1];
      console.log(`   Cluster: ${clusterName}`);
      
      // Common cluster name patterns
      const commonClusters = ['cluster0', 'cluster1', 'cluster2', 'cluster3'];
      if (commonClusters.includes(clusterName)) {
        console.log('✅ Using standard cluster name');
      } else {
        console.log('⚠️  Using custom cluster name - verify this exists in MongoDB Atlas');
      }
    } else {
      console.log('❌ Invalid MongoDB Atlas hostname format');
    }
  } else {
    console.log('⚠️  Not using MongoDB Atlas (SRV) connection');
  }
  
  console.log('');
  console.log('🛠️  Troubleshooting Steps:');
  console.log('   1. Go to MongoDB Atlas Dashboard');
  console.log('   2. Check if cluster exists and is running');
  console.log('   3. Verify network access (0.0.0.0/0)');
  console.log('   4. Check database user credentials');
  console.log('   5. Test connection from MongoDB Atlas web interface');
  console.log('');
  
  // Test DNS resolution
  console.log('🌐 Testing DNS Resolution...');
  const dns = await import('dns');
  const { promisify } = await import('util');
  const lookup = promisify(dns.lookup);
  
  try {
    const hostname = url.hostname;
    const result = await lookup(hostname);
    console.log(`✅ DNS Resolution successful: ${hostname} -> ${result.address}`);
  } catch (error) {
    console.log(`❌ DNS Resolution failed: ${error.message}`);
    console.log('   This indicates the cluster does not exist or is not accessible');
  }
  
} catch (error) {
  console.error('❌ Invalid MongoDB connection string format');
  console.error(`   Error: ${error.message}`);
  console.error('');
  console.error('🛠️  Fix: Get the correct connection string from MongoDB Atlas');
  console.error('   1. Go to MongoDB Atlas Dashboard');
  console.error('   2. Click "Connect" on your cluster');
  console.error('   3. Choose "Connect your application"');
  console.error('   4. Copy the connection string');
}

console.log('');
console.log('📞 Next Steps:');
console.log('   1. Verify your MongoDB Atlas cluster exists');
console.log('   2. Check network access settings');
console.log('   3. Update MONGODB_URI with correct connection string');
console.log('   4. Redeploy the application');
