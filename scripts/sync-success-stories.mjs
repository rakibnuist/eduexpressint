#!/usr/bin/env node

/**
 * Script to sync success stories from database
 * Usage: node scripts/sync-success-stories.mjs
 */

import { config } from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables
config();

// Define the schema inline
const StudentSuccessStorySchema = new mongoose.Schema({
  studentName: { type: String, required: true, trim: true, maxlength: 100 },
  studentImage: { type: String, trim: true },
  studentAge: { type: Number, min: 16, max: 50 },
  studentNationality: { type: String, required: true, trim: true, maxlength: 50 },
  studentEmail: { type: String, trim: true, lowercase: true },
  studentLinkedIn: { type: String, trim: true },
  university: { type: String, required: true, trim: true, maxlength: 200 },
  universityCountry: { type: String, required: true, trim: true, maxlength: 50 },
  program: { type: String, required: true, trim: true, maxlength: 200 },
  programLevel: { 
    type: String, 
    enum: ['Bachelor', 'Masters', 'PhD', 'Diploma', 'Foundation', 'Certificate'],
    required: true
  },
  graduationYear: { type: Number, required: true, min: 2000, max: 2030 },
  gpa: { type: Number, min: 0, max: 4.0 },
  title: { type: String, required: true, trim: true, maxlength: 200 },
  story: { type: String, required: true, minlength: 100 },
  shortDescription: { type: String, required: true, trim: true, maxlength: 500 },
  keyAchievements: [{ type: String, trim: true, maxlength: 200 }],
  challenges: [{ type: String, trim: true, maxlength: 200 }],
  advice: [{ type: String, trim: true, maxlength: 200 }],
  images: [{ type: String, trim: true }],
  videoUrl: { type: String, trim: true },
  testimonialQuote: { type: String, trim: true, maxlength: 500 },
  tags: [{ type: String, trim: true, lowercase: true }],
  isFeatured: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: false },
  priority: { type: Number, default: 0, min: 0, max: 100 },
  views: { type: Number, default: 0, min: 0 },
  likes: { type: Number, default: 0, min: 0 },
  shares: { type: Number, default: 0, min: 0 }
}, { timestamps: true });

let StudentSuccessStory;

async function connectToDatabase() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI environment variable is not set');
    }

    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    StudentSuccessStory = mongoose.models.StudentSuccessStory || mongoose.model('StudentSuccessStory', StudentSuccessStorySchema);
  } catch (error) {
    console.error('❌ Failed to connect to database:', error.message);
    process.exit(1);
  }
}

async function syncSuccessStories() {
  try {
    console.log('🔄 Syncing success stories...');

    // Get all published success stories
    const stories = await StudentSuccessStory.find({ isPublished: true })
      .sort({ priority: -1, createdAt: -1 })
      .lean();

    const total = stories.length;
    const featured = stories.filter(s => s.isFeatured).length;
    const published = stories.filter(s => s.isPublished).length;

    // Get statistics by country
    const countryStats = stories.reduce((acc, story) => {
      const country = story.universityCountry;
      acc[country] = (acc[country] || 0) + 1;
      return acc;
    }, {});

    // Get statistics by program level
    const programLevelStats = stories.reduce((acc, story) => {
      const level = story.programLevel;
      acc[level] = (acc[level] || 0) + 1;
      return acc;
    }, {});

    console.log('\n📊 Success Stories Sync Summary:');
    console.log('================================');
    console.log(`Total Stories: ${total}`);
    console.log(`Published: ${published}`);
    console.log(`Featured: ${featured}`);

    console.log('\n🌍 By Country:');
    Object.entries(countryStats)
      .sort(([,a], [,b]) => b - a)
      .forEach(([country, count]) => {
        console.log(`  ${country}: ${count}`);
      });

    console.log('\n🎓 By Program Level:');
    Object.entries(programLevelStats)
      .sort(([,a], [,b]) => b - a)
      .forEach(([level, count]) => {
        console.log(`  ${level}: ${count}`);
      });

    console.log('\n📝 Featured Stories:');
    stories.filter(s => s.isFeatured).slice(0, 3).forEach((story, index) => {
      console.log(`${index + 1}. ${story.studentName} - ${story.title}`);
      console.log(`   University: ${story.university} (${story.universityCountry})`);
      console.log(`   Program: ${story.program} (${story.programLevel})`);
      console.log(`   Priority: ${story.priority}`);
      console.log('');
    });

    console.log('✅ Sync completed successfully!');
    console.log('The homepage will now display these success stories.');
    
    return {
      total,
      published,
      featured,
      countryStats,
      programLevelStats,
      stories: stories.slice(0, 5) // Return first 5 for preview
    };

  } catch (error) {
    console.error('❌ Sync failed:', error.message);
    throw error;
  }
}

async function main() {
  try {
    await connectToDatabase();
    await syncSuccessStories();
  } catch (error) {
    console.error('❌ Script failed:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the script
main();
