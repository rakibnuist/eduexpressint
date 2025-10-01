#!/usr/bin/env node

/**
 * Script to check what collections exist in the database
 * and verify if updates and success stories collections have data
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/edu-express';

async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB successfully');
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    return false;
  }
}

async function checkDatabaseCollections() {
  console.log('🔍 Checking database collections...\n');
  
  try {
    const db = mongoose.connection.db;
    
    // Get all collections
    const collections = await db.listCollections().toArray();
    
    console.log('📋 Available Collections:');
    console.log('========================');
    
    if (collections.length === 0) {
      console.log('❌ No collections found in the database');
      return;
    }
    
    for (const collection of collections) {
      const collectionName = collection.name;
      const count = await db.collection(collectionName).countDocuments();
      
      console.log(`📁 ${collectionName}: ${count} documents`);
      
      // Check for updates and success stories specifically
      if (collectionName.toLowerCase().includes('update')) {
        console.log(`   🔍 Found updates collection: ${collectionName}`);
        const sampleDocs = await db.collection(collectionName).find().limit(3).toArray();
        if (sampleDocs.length > 0) {
          console.log(`   📄 Sample document: ${JSON.stringify(sampleDocs[0], null, 2)}`);
        }
      }
      
      if (collectionName.toLowerCase().includes('success') || collectionName.toLowerCase().includes('story')) {
        console.log(`   🔍 Found success stories collection: ${collectionName}`);
        const sampleDocs = await db.collection(collectionName).find().limit(3).toArray();
        if (sampleDocs.length > 0) {
          console.log(`   📄 Sample document: ${JSON.stringify(sampleDocs[0], null, 2)}`);
        }
      }
    }
    
    // Check specifically for updates and success stories
    console.log('\n🎯 Checking for Updates and Success Stories:');
    console.log('==========================================');
    
    const updatesCollections = collections.filter(c => 
      c.name.toLowerCase().includes('update') || 
      c.name.toLowerCase().includes('announcement') ||
      c.name.toLowerCase().includes('news')
    );
    
    const successStoryCollections = collections.filter(c => 
      c.name.toLowerCase().includes('success') || 
      c.name.toLowerCase().includes('story') ||
      c.name.toLowerCase().includes('testimonial')
    );
    
    if (updatesCollections.length === 0) {
      console.log('❌ No updates collections found');
    } else {
      console.log('✅ Updates collections found:');
      for (const collection of updatesCollections) {
        const count = await db.collection(collection.name).countDocuments();
        console.log(`   📁 ${collection.name}: ${count} documents`);
      }
    }
    
    if (successStoryCollections.length === 0) {
      console.log('❌ No success stories collections found');
    } else {
      console.log('✅ Success stories collections found:');
      for (const collection of successStoryCollections) {
        const count = await db.collection(collection.name).countDocuments();
        console.log(`   📁 ${collection.name}: ${count} documents`);
      }
    }
    
    // Check if we need to create the collections
    console.log('\n🔧 Collection Status:');
    console.log('====================');
    
    const hasUpdates = updatesCollections.length > 0;
    const hasSuccessStories = successStoryCollections.length > 0;
    
    if (!hasUpdates) {
      console.log('⚠️  Updates collection missing - will be created when first update is added');
    } else {
      console.log('✅ Updates collection exists');
    }
    
    if (!hasSuccessStories) {
      console.log('⚠️  Success stories collection missing - will be created when first story is added');
    } else {
      console.log('✅ Success stories collection exists');
    }
    
  } catch (error) {
    console.error('❌ Error checking collections:', error.message);
  }
}

async function createSampleData() {
  console.log('\n🚀 Creating sample data for testing...');
  
  try {
    const db = mongoose.connection.db;
    
    // Create sample update
    const sampleUpdate = {
      title: 'Welcome to EduExpress Platform',
      content: 'We are excited to announce the launch of our new education platform. This platform will help students find the best universities and programs worldwide.',
      type: 'announcement',
      priority: 'high',
      status: 'published',
      targetAudience: 'all',
      tags: ['welcome', 'announcement', 'platform'],
      author: {
        id: 'admin-1',
        name: 'Admin User',
        email: 'admin@eduexpert.com'
      },
      publishedAt: new Date(),
      isPinned: true,
      views: 0,
      likes: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Create sample success story
    const sampleSuccessStory = {
      studentName: 'Ahmed Rahman',
      studentNationality: 'Bangladesh',
      university: 'University of Toronto',
      universityCountry: 'Canada',
      program: 'Computer Science',
      programLevel: 'Masters',
      graduationYear: 2024,
      title: 'From Bangladesh to Canada: A Success Story',
      story: 'Ahmed successfully secured admission to University of Toronto with a full scholarship. His journey from Bangladesh to Canada was challenging but rewarding. He overcame language barriers and cultural differences to achieve his dream of studying abroad.',
      shortDescription: 'Ahmed\'s inspiring journey from Bangladesh to University of Toronto with a full scholarship.',
      keyAchievements: ['Full Scholarship', 'Dean\'s List', 'Research Assistant'],
      challenges: ['Language barrier', 'Cultural adaptation', 'Financial constraints'],
      advice: ['Stay focused on your goals', 'Don\'t be afraid to ask for help', 'Believe in yourself'],
      tags: ['scholarship', 'canada', 'computer-science', 'success'],
      isFeatured: true,
      isPublished: true,
      priority: 10,
      views: 0,
      likes: 0,
      shares: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Insert sample data
    const updateResult = await db.collection('updates').insertOne(sampleUpdate);
    console.log('✅ Sample update created:', updateResult.insertedId);
    
    const successStoryResult = await db.collection('studentsuccessstories').insertOne(sampleSuccessStory);
    console.log('✅ Sample success story created:', successStoryResult.insertedId);
    
    console.log('\n🎉 Sample data created successfully!');
    console.log('You can now test the admin dashboard with this sample data.');
    
  } catch (error) {
    console.error('❌ Error creating sample data:', error.message);
  }
}

async function main() {
  console.log('🚀 Database Collections Checker\n');
  
  const connected = await connectToDatabase();
  if (!connected) {
    console.log('❌ Cannot proceed - database connection failed');
    process.exit(1);
  }
  
  try {
    await checkDatabaseCollections();
    
    // Ask if user wants to create sample data
    console.log('\n❓ Would you like to create sample data for testing?');
    console.log('   This will create one sample update and one sample success story.');
    console.log('   (In a real scenario, you would create this data through the admin dashboard)');
    
    // For now, let's create sample data automatically
    await createSampleData();
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

// Run the script
main().catch(console.error);
