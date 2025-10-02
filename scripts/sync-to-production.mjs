#!/usr/bin/env node

/**
 * Sync Local University Data to Production Database
 * This script will copy universities from local database to production database
 */

import { config } from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables
config();

// Production database URI (from env-production.env.txt)
const PRODUCTION_MONGODB_URI = 'mongodb+srv://rakibeduexpress_db_user:78VlTCsLPWCa571b@eduexpressint.9pxupqo.mongodb.net/?retryWrites=true&w=majority&appName=eduexpressint';

// Local database URI
const LOCAL_MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/edu-express';

let localDb, productionDb;
let University;

async function connectToDatabases() {
  try {
    console.log('🔌 Connecting to local database...');
    await mongoose.connect(LOCAL_MONGODB_URI);
    localDb = mongoose.connection.db;
    console.log('✅ Connected to local database');

    // Import University model
    const { default: UniversityModel } = await import('../src/models/University.ts');
    University = UniversityModel;

    console.log('🔌 Connecting to production database...');
    await mongoose.disconnect();
    await mongoose.connect(PRODUCTION_MONGODB_URI);
    productionDb = mongoose.connection.db;
    console.log('✅ Connected to production database');

  } catch (error) {
    console.error('❌ Failed to connect to databases:', error.message);
    process.exit(1);
  }
}

async function getLocalUniversities() {
  try {
    console.log('📖 Fetching universities from local database...');
    
    // Connect to local database
    await mongoose.disconnect();
    await mongoose.connect(LOCAL_MONGODB_URI);
    
    const universities = await University.find({}).lean();
    console.log(`✅ Found ${universities.length} universities in local database`);
    
    return universities;
  } catch (error) {
    console.error('❌ Failed to fetch local universities:', error.message);
    return [];
  }
}

async function syncToProduction(universities) {
  try {
    console.log('🔄 Syncing universities to production database...');
    
    // Connect to production database
    await mongoose.disconnect();
    await mongoose.connect(PRODUCTION_MONGODB_URI);
    
    // Clear existing universities in production
    console.log('🗑️  Clearing existing universities in production...');
    await University.deleteMany({});
    console.log('✅ Cleared existing universities');
    
    // Insert universities to production
    console.log('📝 Inserting universities to production...');
    const result = await University.insertMany(universities);
    console.log(`✅ Successfully inserted ${result.length} universities to production`);
    
    // Verify the sync
    const count = await University.countDocuments();
    console.log(`📊 Production database now has ${count} universities`);
    
    return result;
  } catch (error) {
    console.error('❌ Failed to sync to production:', error.message);
    throw error;
  }
}

async function verifySync() {
  try {
    console.log('🔍 Verifying sync...');
    
    const universities = await University.find({}).lean();
    console.log(`✅ Verification: Production database has ${universities.length} universities`);
    
    // Show sample universities
    console.log('\n📋 Sample universities in production:');
    universities.slice(0, 3).forEach((uni, index) => {
      console.log(`   ${index + 1}. ${uni.name} - ${uni.country} (Active: ${uni.isActive})`);
    });
    
    return universities;
  } catch (error) {
    console.error('❌ Failed to verify sync:', error.message);
    return [];
  }
}

async function main() {
  try {
    console.log('🚀 Starting university sync to production...');
    console.log(`⏰ Started at: ${new Date().toLocaleString()}\n`);
    
    // Connect to databases
    await connectToDatabases();
    
    // Get local universities
    const localUniversities = await getLocalUniversities();
    
    if (localUniversities.length === 0) {
      console.log('⚠️  No universities found in local database');
      return;
    }
    
    // Sync to production
    await syncToProduction(localUniversities);
    
    // Verify sync
    await verifySync();
    
    console.log('\n🎉 University sync to production completed successfully!');
    console.log('🌐 You can now check https://eduexpressint.com/universities');
    
  } catch (error) {
    console.error('❌ Sync failed:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from databases');
  }
}

// Run the script
main();
