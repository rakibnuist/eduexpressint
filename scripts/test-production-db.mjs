#!/usr/bin/env node

/**
 * Test Production Database Connection and Data
 */

import { MongoClient } from 'mongodb';

// Production database URI
const PRODUCTION_MONGODB_URI = 'mongodb+srv://rakibeduexpress_db_user:78VlTCsLPWCa571b@eduexpressint.9pxupqo.mongodb.net/?retryWrites=true&w=majority&appName=eduexpressint';

async function testProductionDatabase() {
  let client;
  
  try {
    console.log('🔌 Testing production database connection...');
    
    client = new MongoClient(PRODUCTION_MONGODB_URI);
    await client.connect();
    const db = client.db('edu-express');
    console.log('✅ Connected to production database');
    
    // Test universities collection
    console.log('\n📊 Testing universities collection...');
    const universities = await db.collection('universities').find({}).toArray();
    console.log(`✅ Found ${universities.length} universities in production database`);
    
    if (universities.length > 0) {
      console.log('\n📋 Universities in production:');
      universities.forEach((uni, index) => {
        console.log(`   ${index + 1}. ${uni.name} - ${uni.country} (Active: ${uni.isActive})`);
      });
      
      // Test active universities
      const activeUniversities = await db.collection('universities').find({ isActive: true }).toArray();
      console.log(`\n✅ Found ${activeUniversities.length} active universities`);
      
      // Test featured universities
      const featuredUniversities = await db.collection('universities').find({ isFeatured: true }).toArray();
      console.log(`✅ Found ${featuredUniversities.length} featured universities`);
      
    } else {
      console.log('⚠️  No universities found in production database');
    }
    
    // Test other collections
    console.log('\n📊 Testing other collections...');
    const collections = await db.listCollections().toArray();
    console.log(`✅ Found ${collections.length} collections:`);
    collections.forEach(col => {
      console.log(`   - ${col.name}`);
    });
    
    console.log('\n🎉 Production database test completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    throw error;
  } finally {
    if (client) {
      await client.close();
      console.log('🔌 Closed database connection');
    }
  }
}

// Run the test
testProductionDatabase().catch(error => {
  console.error('❌ Test script failed:', error);
  process.exit(1);
});
