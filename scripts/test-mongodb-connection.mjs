#!/usr/bin/env node

import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

console.log('🔍 MongoDB Connection Diagnostic Tool');
console.log('=====================================');
console.log('');

console.log('📋 Configuration:');
console.log(`MONGODB_URI: ${MONGODB_URI ? '✅ Set' : '❌ Not set'}`);
console.log(`MONGODB_DB: ${MONGODB_DB || 'Not set'}`);
console.log('');

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not set in environment variables');
  process.exit(1);
}

console.log('🔗 Testing MongoDB Connection...');
console.log('');

// Test connection with detailed error handling
async function testConnection() {
  try {
    console.log('⏳ Attempting to connect...');
    
    const connectionOptions = {
      serverSelectionTimeoutMS: 10000, // 10 seconds timeout
      socketTimeoutMS: 45000,
      bufferCommands: false,
      dbName: MONGODB_DB || undefined,
    };

    const startTime = Date.now();
    await mongoose.connect(MONGODB_URI, connectionOptions);
    const endTime = Date.now();
    
    console.log('✅ MongoDB connected successfully!');
    console.log(`⏱️  Connection time: ${endTime - startTime}ms`);
    console.log(`🗄️  Database: ${mongoose.connection.db.databaseName}`);
    console.log(`🌐 Host: ${mongoose.connection.host}`);
    console.log(`🔌 Port: ${mongoose.connection.port}`);
    console.log('');

    // Test basic operations
    console.log('🧪 Testing basic operations...');
    
    // List collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`📁 Collections found: ${collections.length}`);
    if (collections.length > 0) {
      console.log('   Collections:');
      collections.forEach(col => {
        console.log(`   - ${col.name}`);
      });
    }
    console.log('');

    // Test a simple query
    const testCollection = mongoose.connection.db.collection('test');
    const count = await testCollection.countDocuments();
    console.log(`📊 Test collection documents: ${count}`);
    console.log('');

    console.log('🎉 All tests passed! Database is working correctly.');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed!');
    console.error('');
    console.error('🔍 Error Details:');
    console.error(`   Type: ${error.name}`);
    console.error(`   Message: ${error.message}`);
    console.error('');
    
    // Provide specific troubleshooting based on error type
    if (error.name === 'MongoServerSelectionError') {
      console.error('🚨 Network/Connection Issues:');
      console.error('   1. Check if MongoDB Atlas cluster is running');
      console.error('   2. Verify network access settings in MongoDB Atlas');
      console.error('   3. Ensure IP address 0.0.0.0/0 is whitelisted');
      console.error('   4. Check if your IP is blocked by firewall');
    } else if (error.name === 'MongoAuthenticationError') {
      console.error('🔐 Authentication Issues:');
      console.error('   1. Verify username and password in connection string');
      console.error('   2. Check if database user exists in MongoDB Atlas');
      console.error('   3. Ensure user has proper permissions');
      console.error('   4. Verify database name is correct');
    } else if (error.name === 'MongoParseError') {
      console.error('📝 Connection String Issues:');
      console.error('   1. Check if connection string format is correct');
      console.error('   2. Verify special characters are URL encoded');
      console.error('   3. Ensure no extra spaces or characters');
    }
    
    console.error('');
    console.error('🛠️  Troubleshooting Steps:');
    console.error('   1. Go to MongoDB Atlas Dashboard');
    console.error('   2. Check "Network Access" - add 0.0.0.0/0 for global access');
    console.error('   3. Check "Database Access" - verify user credentials');
    console.error('   4. Check "Clusters" - ensure cluster is running');
    console.error('   5. Test connection from MongoDB Atlas web interface');
    
    process.exit(1);
  } finally {
    // Close connection
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log('🔌 Connection closed.');
    }
  }
}

// Run the test
testConnection().catch(console.error);
