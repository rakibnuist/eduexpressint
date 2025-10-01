#!/usr/bin/env node

/**
 * Test script to verify CRUD operations for Updates and Success Stories
 * This script tests that all admin dashboard operations properly save to the database
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/edu-express';

// Schemas
const UpdateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  type: { type: String, enum: ['announcement', 'news', 'maintenance', 'feature', 'general'], default: 'general' },
  priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
  targetAudience: { type: String, enum: ['all', 'students', 'partners', 'staff', 'admin'], default: 'all' },
  tags: [{ type: String }],
  author: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true }
  },
  publishedAt: { type: Date },
  expiresAt: { type: Date },
  isPinned: { type: Boolean, default: false },
  attachments: [{
    name: String,
    url: String,
    type: String,
    size: Number
  }],
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  comments: [{
    id: { type: String, required: true },
    author: {
      id: { type: String, required: true },
      name: { type: String, required: true }
    },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    isEdited: { type: Boolean, default: false },
    editedAt: Date
  }]
}, { timestamps: true });

const StudentSuccessStorySchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  studentImage: { type: String },
  studentAge: { type: Number },
  studentNationality: { type: String, required: true },
  studentEmail: { type: String },
  studentLinkedIn: { type: String },
  university: { type: String, required: true },
  universityCountry: { type: String, required: true },
  program: { type: String, required: true },
  programLevel: { type: String, enum: ['Bachelor', 'Masters', 'PhD', 'Diploma', 'Foundation', 'Certificate'], required: true },
  graduationYear: { type: Number, required: true },
  gpa: { type: Number },
  title: { type: String, required: true },
  story: { type: String, required: true },
  shortDescription: { type: String, required: true },
  keyAchievements: [{ type: String }],
  challenges: [{ type: String }],
  advice: [{ type: String }],
  images: [{ type: String }],
  videoUrl: { type: String },
  testimonialQuote: { type: String },
  tags: [{ type: String }],
  isFeatured: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: false },
  priority: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  shares: { type: Number, default: 0 }
}, { timestamps: true });

const Update = mongoose.model('Update', UpdateSchema);
const StudentSuccessStory = mongoose.model('StudentSuccessStory', StudentSuccessStorySchema);

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

async function testUpdatesCRUD() {
  console.log('\n🧪 Testing Updates CRUD Operations...');
  
  try {
    // CREATE - Test creating a new update
    console.log('1. Testing CREATE operation...');
    const newUpdate = new Update({
      title: 'Test Update - Database Persistence',
      content: 'This is a test update to verify database persistence in the admin dashboard.',
      type: 'announcement',
      priority: 'high',
      status: 'published',
      targetAudience: 'all',
      tags: ['test', 'database', 'persistence'],
      author: {
        id: 'admin-1',
        name: 'Admin User',
        email: 'admin@eduexpert.com'
      },
      publishedAt: new Date(),
      isPinned: false
    });

    const savedUpdate = await newUpdate.save();
    console.log('✅ Update created successfully:', savedUpdate._id);

    // READ - Test reading the update
    console.log('2. Testing READ operation...');
    const foundUpdate = await Update.findById(savedUpdate._id);
    if (foundUpdate) {
      console.log('✅ Update read successfully:', foundUpdate.title);
    } else {
      throw new Error('Update not found after creation');
    }

    // UPDATE - Test updating the update
    console.log('3. Testing UPDATE operation...');
    const updatedUpdate = await Update.findByIdAndUpdate(
      savedUpdate._id,
      { 
        title: 'Updated Test Update - Database Persistence',
        content: 'This update has been modified to test the UPDATE operation.',
        priority: 'medium',
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );

    if (updatedUpdate && updatedUpdate.title === 'Updated Test Update - Database Persistence') {
      console.log('✅ Update updated successfully:', updatedUpdate.title);
    } else {
      throw new Error('Update not updated correctly');
    }

    // DELETE - Test deleting the update
    console.log('4. Testing DELETE operation...');
    const deletedUpdate = await Update.findByIdAndDelete(savedUpdate._id);
    if (deletedUpdate) {
      console.log('✅ Update deleted successfully:', deletedUpdate._id);
    } else {
      throw new Error('Update not deleted');
    }

    // Verify deletion
    const verifyDeleted = await Update.findById(savedUpdate._id);
    if (!verifyDeleted) {
      console.log('✅ Update deletion verified - record no longer exists');
    } else {
      throw new Error('Update still exists after deletion');
    }

    console.log('✅ All Updates CRUD operations completed successfully!');
    return true;

  } catch (error) {
    console.error('❌ Updates CRUD test failed:', error.message);
    return false;
  }
}

async function testSuccessStoriesCRUD() {
  console.log('\n🧪 Testing Success Stories CRUD Operations...');
  
  try {
    // CREATE - Test creating a new success story
    console.log('1. Testing CREATE operation...');
    const newSuccessStory = new StudentSuccessStory({
      studentName: 'Test Student',
      studentNationality: 'Bangladesh',
      university: 'Test University',
      universityCountry: 'Canada',
      program: 'Computer Science',
      programLevel: 'Masters',
      graduationYear: 2024,
      title: 'Test Success Story - Database Persistence',
      story: 'This is a test success story to verify database persistence in the admin dashboard. The student successfully completed their studies and achieved their goals.',
      shortDescription: 'A test success story for database persistence verification.',
      keyAchievements: ['Graduated with honors', 'Received scholarship'],
      challenges: ['Language barrier', 'Cultural adaptation'],
      advice: ['Stay focused', 'Ask for help when needed'],
      tags: ['test', 'database', 'persistence'],
      isFeatured: true,
      isPublished: true,
      priority: 5
    });

    const savedSuccessStory = await newSuccessStory.save();
    console.log('✅ Success story created successfully:', savedSuccessStory._id);

    // READ - Test reading the success story
    console.log('2. Testing READ operation...');
    const foundSuccessStory = await StudentSuccessStory.findById(savedSuccessStory._id);
    if (foundSuccessStory) {
      console.log('✅ Success story read successfully:', foundSuccessStory.studentName);
    } else {
      throw new Error('Success story not found after creation');
    }

    // UPDATE - Test updating the success story
    console.log('3. Testing UPDATE operation...');
    const updatedSuccessStory = await StudentSuccessStory.findByIdAndUpdate(
      savedSuccessStory._id,
      { 
        studentName: 'Updated Test Student',
        title: 'Updated Test Success Story - Database Persistence',
        story: 'This success story has been modified to test the UPDATE operation.',
        priority: 10,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );

    if (updatedSuccessStory && updatedSuccessStory.studentName === 'Updated Test Student') {
      console.log('✅ Success story updated successfully:', updatedSuccessStory.studentName);
    } else {
      throw new Error('Success story not updated correctly');
    }

    // DELETE - Test deleting the success story
    console.log('4. Testing DELETE operation...');
    const deletedSuccessStory = await StudentSuccessStory.findByIdAndDelete(savedSuccessStory._id);
    if (deletedSuccessStory) {
      console.log('✅ Success story deleted successfully:', deletedSuccessStory._id);
    } else {
      throw new Error('Success story not deleted');
    }

    // Verify deletion
    const verifyDeleted = await StudentSuccessStory.findById(savedSuccessStory._id);
    if (!verifyDeleted) {
      console.log('✅ Success story deletion verified - record no longer exists');
    } else {
      throw new Error('Success story still exists after deletion');
    }

    console.log('✅ All Success Stories CRUD operations completed successfully!');
    return true;

  } catch (error) {
    console.error('❌ Success Stories CRUD test failed:', error.message);
    return false;
  }
}

async function testDatabasePersistence() {
  console.log('🚀 Starting Database Persistence Tests for Admin Dashboard...\n');
  
  const connected = await connectToDatabase();
  if (!connected) {
    console.log('❌ Cannot proceed with tests - database connection failed');
    process.exit(1);
  }

  try {
    // Test Updates CRUD
    const updatesTestPassed = await testUpdatesCRUD();
    
    // Test Success Stories CRUD
    const successStoriesTestPassed = await testSuccessStoriesCRUD();

    // Summary
    console.log('\n📊 Test Results Summary:');
    console.log('========================');
    console.log(`Updates CRUD Operations: ${updatesTestPassed ? '✅ PASSED' : '❌ FAILED'}`);
    console.log(`Success Stories CRUD Operations: ${successStoriesTestPassed ? '✅ PASSED' : '❌ FAILED'}`);
    
    if (updatesTestPassed && successStoriesTestPassed) {
      console.log('\n🎉 All tests passed! Admin dashboard database persistence is working correctly.');
      console.log('✅ Updates and Success Stories are properly stored in the database.');
    } else {
      console.log('\n⚠️  Some tests failed. Please check the database configuration and API routes.');
    }

  } catch (error) {
    console.error('❌ Test execution failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

// Run the tests
testDatabasePersistence().catch(console.error);
