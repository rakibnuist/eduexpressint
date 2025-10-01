#!/usr/bin/env node

import mongoose from 'mongoose';

// Import the Update model
const UpdateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true
  },
  type: {
    type: String,
    enum: ['announcement', 'news', 'maintenance', 'feature', 'general'],
    default: 'general',
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft',
    required: true
  },
  targetAudience: {
    type: String,
    enum: ['all', 'students', 'partners', 'staff', 'admin'],
    default: 'all',
    required: true
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  author: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  publishedAt: {
    type: Date
  },
  expiresAt: {
    type: Date
  },
  isPinned: {
    type: Boolean,
    default: false
  },
  attachments: [{
    name: String,
    url: String,
    type: String,
    size: Number
  }],
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: [{
    id: {
      type: String,
      required: true
    },
    author: {
      id: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    isEdited: {
      type: Boolean,
      default: false
    },
    editedAt: Date
  }]
}, {
  timestamps: true
});

const Update = mongoose.models.Update || mongoose.model('Update', UpdateSchema);

async function testDatabaseConnection() {
  console.log('🔍 Testing database connection for Updates...\n');

  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/edu-express';
    console.log(`📡 Connecting to: ${MONGODB_URI}`);
    
    await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    });
    
    console.log('✅ Connected to MongoDB successfully!');

    // Test creating a sample update
    console.log('\n📝 Creating sample update...');
    
    const sampleUpdate = new Update({
      title: 'Welcome to EduExpress Updates System',
      content: '<h2>Welcome!</h2><p>This is a sample update created to test the database connection. The system is now ready to manage updates with HTML support.</p><ul><li>HTML content support</li><li>Rich text editing</li><li>Status management</li></ul>',
      type: 'announcement',
      priority: 'high',
      status: 'published',
      targetAudience: 'all',
      tags: ['welcome', 'system', 'test'],
      author: {
        id: 'admin-1',
        name: 'Admin User',
        email: 'admin@eduexpress.com'
      },
      isPinned: true,
      publishedAt: new Date()
    });

    const savedUpdate = await sampleUpdate.save();
    console.log('✅ Sample update created successfully!');
    console.log(`   ID: ${savedUpdate._id}`);
    console.log(`   Title: ${savedUpdate.title}`);
    console.log(`   Status: ${savedUpdate.status}`);

    // Test reading updates
    console.log('\n📖 Reading all updates...');
    const allUpdates = await Update.find().sort({ createdAt: -1 });
    console.log(`✅ Found ${allUpdates.length} updates in database`);

    // Test updating an update
    console.log('\n✏️  Testing update functionality...');
    const updatedUpdate = await Update.findByIdAndUpdate(
      savedUpdate._id,
      { 
        views: 1,
        updatedAt: new Date()
      },
      { new: true }
    );
    console.log('✅ Update modified successfully!');
    console.log(`   Views: ${updatedUpdate.views}`);

    // Test deleting the sample update
    console.log('\n🗑️  Cleaning up sample update...');
    await Update.findByIdAndDelete(savedUpdate._id);
    console.log('✅ Sample update deleted successfully!');

    console.log('\n🎉 Database connection test completed successfully!');
    console.log('   ✅ Create operations work');
    console.log('   ✅ Read operations work');
    console.log('   ✅ Update operations work');
    console.log('   ✅ Delete operations work');
    console.log('\n🚀 Your Updates Management system is ready to use!');

  } catch (error) {
    console.error('❌ Database connection test failed:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 MongoDB is not running. Please start MongoDB:');
      console.log('   macOS: brew services start mongodb-community');
      console.log('   Ubuntu: sudo systemctl start mongod');
      console.log('   Or run: node scripts/start-mongodb.mjs');
    } else if (error.message.includes('ENOTFOUND')) {
      console.log('\n💡 MongoDB connection string is incorrect or MongoDB is not installed');
    }
    
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\n📡 Disconnected from database');
  }
}

// Run the test
testDatabaseConnection();
