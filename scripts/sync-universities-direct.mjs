#!/usr/bin/env node

/**
 * Direct University Sync Script
 * Uses direct MongoDB connection to sync universities
 */

import { config } from 'dotenv';
import { MongoClient } from 'mongodb';

// Load environment variables
config();

// Production database URI
const PRODUCTION_MONGODB_URI = 'mongodb+srv://rakibeduexpress_db_user:78VlTCsLPWCa571b@eduexpressint.9pxupqo.mongodb.net/?retryWrites=true&w=majority&appName=eduexpressint';

// Local database URI
const LOCAL_MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/edu-express';

async function syncUniversities() {
  let localClient, productionClient;
  
  try {
    console.log('🚀 Starting university sync...');
    console.log(`⏰ Started at: ${new Date().toLocaleString()}\n`);
    
    // Connect to local database
    console.log('🔌 Connecting to local database...');
    localClient = new MongoClient(LOCAL_MONGODB_URI);
    await localClient.connect();
    const localDb = localClient.db('edu-express');
    console.log('✅ Connected to local database');
    
    // Connect to production database
    console.log('🔌 Connecting to production database...');
    productionClient = new MongoClient(PRODUCTION_MONGODB_URI);
    await productionClient.connect();
    const productionDb = productionClient.db('edu-express');
    console.log('✅ Connected to production database');
    
    // Get universities from local database
    console.log('📖 Fetching universities from local database...');
    const localUniversities = await localDb.collection('universities').find({}).toArray();
    console.log(`✅ Found ${localUniversities.length} universities in local database`);
    
    if (localUniversities.length === 0) {
      console.log('⚠️  No universities found in local database');
      return;
    }
    
    // Show what we're about to sync
    console.log('\n📋 Universities to sync:');
    localUniversities.forEach((uni, index) => {
      console.log(`   ${index + 1}. ${uni.name} - ${uni.country} (Active: ${uni.isActive})`);
    });
    
    // Clear existing universities in production
    console.log('\n🗑️  Clearing existing universities in production...');
    const deleteResult = await productionDb.collection('universities').deleteMany({});
    console.log(`✅ Cleared ${deleteResult.deletedCount} existing universities`);
    
    // Insert universities to production
    console.log('📝 Inserting universities to production...');
    const insertResult = await productionDb.collection('universities').insertMany(localUniversities);
    console.log(`✅ Successfully inserted ${insertResult.insertedCount} universities to production`);
    
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
    if (localClient) {
      await localClient.close();
      console.log('🔌 Closed local database connection');
    }
    if (productionClient) {
      await productionClient.close();
      console.log('🔌 Closed production database connection');
    }
  }
}

// Run the script
syncUniversities().catch(error => {
  console.error('❌ Script failed:', error);
  process.exit(1);
});
