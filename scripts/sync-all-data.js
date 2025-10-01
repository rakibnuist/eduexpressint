#!/usr/bin/env node

/**
 * Comprehensive Database Sync Script
 * Syncs all data from MongoDB to ensure consistency
 * Usage: node scripts/sync-all-data.js [--collection=collectionName] [--force]
 */

require('dotenv').config();
const mongoose = require('mongoose');

// Define schemas inline to avoid TypeScript import issues
const UniversitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String },
  ranking: { type: Number },
  programs: [{
    name: { type: String, required: true },
    level: { type: String, enum: ['Bachelor', 'Masters', 'PhD', 'Diploma'] },
    duration: { type: String },
    tuitionFee: { type: Number },
    requirements: { type: String }
  }],
  scholarships: [{
    name: { type: String },
    amount: { type: Number },
    requirements: { type: String }
  }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  country: { type: String },
  program: { type: String },
  status: { type: String, enum: ['new', 'contacted', 'qualified', 'converted', 'rejected'], default: 'new' }
}, { timestamps: true });

const B2BLeadSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  industry: { type: String },
  companySize: { type: String, enum: ['1-10', '11-50', '51-200', '201-500', '500+', '1000+'] },
  status: { type: String, enum: ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Negotiating', 'Closed Won', 'Closed Lost'], default: 'New' },
  priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
  expectedValue: { type: Number }
}, { timestamps: true });

const StudentSuccessStorySchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  studentNationality: { type: String, required: true },
  university: { type: String, required: true },
  universityCountry: { type: String, required: true },
  program: { type: String, required: true },
  programLevel: { type: String, enum: ['Bachelor', 'Masters', 'PhD', 'Diploma', 'Foundation', 'Certificate'], required: true },
  title: { type: String, required: true },
  story: { type: String, required: true },
  shortDescription: { type: String, required: true },
  isPublished: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  priority: { type: Number, default: 0 },
  views: { type: Number, default: 0 }
}, { timestamps: true });

const UpdateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  type: { type: String, enum: ['announcement', 'news', 'maintenance', 'feature', 'general'], default: 'general' },
  priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
  isPinned: { type: Boolean, default: false },
  views: { type: Number, default: 0 }
}, { timestamps: true });

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['superuser', 'operator'], default: 'operator' },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const DestinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

// Model configurations
const MODELS = {
  universities: {
    model: null, // Will be set after connection
    name: 'Universities',
    icon: '🏫',
    description: 'University information and programs',
    schema: UniversitySchema
  },
  leads: {
    model: null,
    name: 'Student Leads',
    icon: '👨‍🎓',
    description: 'Student inquiries and applications',
    schema: LeadSchema
  },
  b2bLeads: {
    model: null,
    name: 'B2B Leads',
    icon: '🤝',
    description: 'Business partnership opportunities',
    schema: B2BLeadSchema
  },
  successStories: {
    model: null,
    name: 'Success Stories',
    icon: '🌟',
    description: 'Student achievement stories',
    schema: StudentSuccessStorySchema
  },
  updates: {
    model: null,
    name: 'Updates',
    icon: '📰',
    description: 'News and announcements',
    schema: UpdateSchema
  },
  users: {
    model: null,
    name: 'Users',
    icon: '👤',
    description: 'Admin users and permissions',
    schema: UserSchema
  },
  destinations: {
    model: null,
    name: 'Destinations',
    icon: '🌍',
    description: 'Study destinations and countries',
    schema: DestinationSchema
  }
};

let db;

async function connectToDatabase() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI environment variable is not set');
    }

    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');
    db = mongoose.connection.db;

    // Initialize models
    for (const [key, config] of Object.entries(MODELS)) {
      const modelName = key.charAt(0).toUpperCase() + key.slice(1);
      config.model = mongoose.models[modelName] || mongoose.model(modelName, config.schema);
    }
  } catch (error) {
    console.error('❌ Failed to connect to database:', error.message);
    process.exit(1);
  }
}

async function getCollectionStats(collectionName) {
  try {
    const collection = db.collection(collectionName);
    const count = await collection.countDocuments();
    const indexes = await collection.indexes();
    
    // Get sample of recent documents
    const recent = await collection
      .find({})
      .sort({ createdAt: -1 })
      .limit(3)
      .toArray();

    return {
      count,
      indexes: indexes.length,
      recent: recent.map(doc => ({
        id: doc._id,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt
      }))
    };
  } catch (error) {
    console.error(`Error getting stats for ${collectionName}:`, error.message);
    return { count: 0, indexes: 0, recent: [] };
  }
}

async function syncCollection(collectionName, force = false) {
  const modelConfig = MODELS[collectionName];
  if (!modelConfig) {
    console.log(`⚠️  Unknown collection: ${collectionName}`);
    return null;
  }

  try {
    console.log(`\n${modelConfig.icon} Syncing ${modelConfig.name}...`);
    console.log(`   ${modelConfig.description}`);

    const Model = modelConfig.model;
    const stats = await getCollectionStats(collectionName);
    
    console.log(`   📊 Total documents: ${stats.count}`);
    console.log(`   🔍 Indexes: ${stats.indexes}`);

    if (stats.count === 0) {
      console.log(`   ⚠️  No documents found in ${collectionName}`);
      return {
        collection: collectionName,
        name: modelConfig.name,
        count: 0,
        status: 'empty',
        message: 'No documents found'
      };
    }

    // Get collection-specific statistics
    let collectionStats = {};
    
    switch (collectionName) {
      case 'universities':
        const universityStats = await Model.aggregate([
          { $group: { _id: '$country', count: { $sum: 1 } } },
          { $sort: { count: -1 } }
        ]);
        collectionStats.countries = universityStats;
        break;

      case 'leads':
        const leadStats = await Model.aggregate([
          { $group: { _id: '$status', count: { $sum: 1 } } },
          { $sort: { count: -1 } }
        ]);
        collectionStats.statuses = leadStats;
        break;

      case 'b2bLeads':
        const b2bStats = await Model.aggregate([
          {
            $group: {
              _id: '$status',
              count: { $sum: 1 },
              totalValue: { $sum: '$expectedValue' }
            }
          },
          { $sort: { count: -1 } }
        ]);
        collectionStats.statuses = b2bStats;
        break;

      case 'successStories':
        const storyStats = await Model.aggregate([
          {
            $group: {
              _id: '$universityCountry',
              count: { $sum: 1 },
              featured: { $sum: { $cond: ['$isFeatured', 1, 0] } }
            }
          },
          { $sort: { count: -1 } }
        ]);
        collectionStats.countries = storyStats;
        break;

      case 'updates':
        const updateStats = await Model.aggregate([
          {
            $group: {
              _id: '$type',
              count: { $sum: 1 },
              published: { $sum: { $cond: [{ $eq: ['$status', 'published'] }, 1, 0] } }
            }
          },
          { $sort: { count: -1 } }
        ]);
        collectionStats.types = updateStats;
        break;

      case 'users':
        const userStats = await Model.aggregate([
          {
            $group: {
              _id: '$role',
              count: { $sum: 1 },
              active: { $sum: { $cond: ['$isActive', 1, 0] } }
            }
          },
          { $sort: { count: -1 } }
        ]);
        collectionStats.roles = userStats;
        break;
    }

    // Display collection-specific stats
    if (Object.keys(collectionStats).length > 0) {
      console.log(`   📈 Collection Statistics:`);
      Object.entries(collectionStats).forEach(([key, values]) => {
        if (Array.isArray(values)) {
          values.slice(0, 5).forEach(item => {
            const label = item._id || 'Unknown';
            const count = item.count || 0;
            const extra = item.totalValue ? ` ($${item.totalValue.toLocaleString()})` : 
                         item.featured ? ` (${item.featured} featured)` :
                         item.published ? ` (${item.published} published)` :
                         item.active ? ` (${item.active} active)` : '';
            console.log(`      ${label}: ${count}${extra}`);
          });
        }
      });
    }

    // Show recent documents
    if (stats.recent.length > 0) {
      console.log(`   📅 Recent documents:`);
      stats.recent.forEach((doc, index) => {
        const date = new Date(doc.createdAt).toLocaleDateString();
        console.log(`      ${index + 1}. ${doc.id} (${date})`);
      });
    }

    console.log(`   ✅ ${modelConfig.name} sync completed`);

    return {
      collection: collectionName,
      name: modelConfig.name,
      count: stats.count,
      indexes: stats.indexes,
      status: 'success',
      stats: collectionStats,
      message: `Successfully synced ${stats.count} documents`
    };

  } catch (error) {
    console.error(`   ❌ Error syncing ${collectionName}:`, error.message);
    return {
      collection: collectionName,
      name: modelConfig.name,
      count: 0,
      status: 'error',
      message: error.message
    };
  }
}

async function syncAllData(collectionName = null, force = false) {
  const startTime = Date.now();
  console.log('🚀 Starting comprehensive database sync...');
  console.log(`⏰ Started at: ${new Date().toLocaleString()}`);
  
  if (force) {
    console.log('🔄 Force sync enabled - will refresh all data');
  }

  const results = [];
  
  if (collectionName) {
    // Sync specific collection
    const result = await syncCollection(collectionName, force);
    if (result) results.push(result);
  } else {
    // Sync all collections
    for (const [key, modelConfig] of Object.entries(MODELS)) {
      const result = await syncCollection(key, force);
      if (result) results.push(result);
    }
  }

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  // Summary
  console.log('\n📊 SYNC SUMMARY');
  console.log('================');
  console.log(`⏱️  Duration: ${duration}s`);
  console.log(`📁 Collections processed: ${results.length}`);
  
  const successful = results.filter(r => r.status === 'success').length;
  const failed = results.filter(r => r.status === 'error').length;
  const empty = results.filter(r => r.status === 'empty').length;
  
  console.log(`✅ Successful: ${successful}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`⚠️  Empty: ${empty}`);

  const totalDocuments = results.reduce((sum, r) => sum + (r.count || 0), 0);
  console.log(`📄 Total documents: ${totalDocuments.toLocaleString()}`);

  // Detailed results
  console.log('\n📋 DETAILED RESULTS');
  console.log('===================');
  results.forEach(result => {
    const statusIcon = result.status === 'success' ? '✅' : 
                      result.status === 'error' ? '❌' : '⚠️';
    console.log(`${statusIcon} ${result.name}: ${result.count} documents`);
    if (result.status === 'error') {
      console.log(`   Error: ${result.message}`);
    }
  });

  console.log('\n🎉 Database sync completed!');
  return {
    duration: parseFloat(duration),
    results,
    summary: {
      total: results.length,
      successful,
      failed,
      empty,
      totalDocuments
    }
  };
}

async function main() {
  try {
    // Parse command line arguments
    const args = process.argv.slice(2);
    let collectionName = null;
    let force = false;

    args.forEach(arg => {
      if (arg.startsWith('--collection=')) {
        collectionName = arg.split('=')[1];
      } else if (arg === '--force') {
        force = true;
      } else if (arg === '--help') {
        console.log(`
Database Sync Script
===================

Usage: node scripts/sync-all-data.js [options]

Options:
  --collection=<name>  Sync specific collection only
  --force             Force refresh all data
  --help              Show this help message

Available collections:
  ${Object.keys(MODELS).join(', ')}

Examples:
  node scripts/sync-all-data.js                    # Sync all collections
  node scripts/sync-all-data.js --collection=leads # Sync only leads
  node scripts/sync-all-data.js --force            # Force sync all
        `);
        process.exit(0);
      }
    });

    await connectToDatabase();
    const result = await syncAllData(collectionName, force);
    
    // Exit with appropriate code
    const hasErrors = result.summary.failed > 0;
    process.exit(hasErrors ? 1 : 0);
    
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
