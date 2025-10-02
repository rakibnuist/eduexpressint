#!/usr/bin/env node

/**
 * Simple University Sync Script
 * Syncs universities from local to production database
 */

import { config } from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables
config();

// Production database URI
const PRODUCTION_MONGODB_URI = 'mongodb+srv://rakibeduexpress_db_user:78VlTCsLPWCa571b@eduexpressint.9pxupqo.mongodb.net/?retryWrites=true&w=majority&appName=eduexpressint';

// Local database URI
const LOCAL_MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/edu-express';

async function syncUniversities() {
  let localConnection, productionConnection;
  
  try {
    console.log('🚀 Starting university sync...');
    console.log(`⏰ Started at: ${new Date().toLocaleString()}\n`);
    
    // Connect to local database
    console.log('🔌 Connecting to local database...');
    localConnection = await mongoose.createConnection(LOCAL_MONGODB_URI);
    console.log('✅ Connected to local database');
    
    // Connect to production database
    console.log('🔌 Connecting to production database...');
    productionConnection = await mongoose.createConnection(PRODUCTION_MONGODB_URI);
    console.log('✅ Connected to production database');
    
    // Get universities from local database
    console.log('📖 Fetching universities from local database...');
    const localDb = localConnection.db;
    console.log('Local DB object:', !!localDb);
    const localUniversities = await localDb.collection('universities').find({}).toArray();
    console.log(`✅ Found ${localUniversities.length} universities in local database`);
    
    if (localUniversities.length === 0) {
      console.log('⚠️  No universities found in local database');
      return;
    }
    
    // Clear existing universities in production
    console.log('🗑️  Clearing existing universities in production...');
    const productionDb = productionConnection.db;
    await productionDb.collection('universities').deleteMany({});
    console.log('✅ Cleared existing universities');
    
    // Insert universities to production
    console.log('📝 Inserting universities to production...');
    const result = await productionDb.collection('universities').insertMany(localUniversities);
    console.log(`✅ Successfully inserted ${result.insertedCount} universities to production`);
    
    // Verify the sync
    const count = await productionDb.collection('universities').countDocuments();
    console.log(`📊 Production database now has ${count} universities`);
    
    // Show sample universities
    console.log('\n📋 Sample universities in production:');
    const sampleUniversities = await productionDb.collection('universities').find({}).limit(3).toArray();
    sampleUniversities.forEach((uni, index) => {
      console.log(`   ${index + 1}. ${uni.name} - ${uni.country} (Active: ${uni.isActive})`);
    });
    
    console.log('\n🎉 University sync to production completed successfully!');
    console.log('🌐 You can now check https://eduexpressint.com/universities');
    
  } catch (error) {
    console.error('❌ Sync failed:', error.message);
    throw error;
  } finally {
    // Close connections
    if (localConnection) {
      await localConnection.close();
      console.log('🔌 Closed local database connection');
    }
    if (productionConnection) {
      await productionConnection.close();
      console.log('🔌 Closed production database connection');
    }
  }
}

// Run the script
syncUniversities().catch(error => {
  console.error('❌ Script failed:', error);
  process.exit(1);
});
