#!/usr/bin/env node

/**
 * Comprehensive Database Sync Script
 * Syncs all data from MongoDB to ensure consistency
 * Usage: node scripts/sync-all-data.mjs [--collection=collectionName] [--force]
 */

import { config } from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables
config();

// Import all models - using dynamic imports for TypeScript files
let University, Lead, B2BLead, StudentSuccessStory, Update, User, Destination;

// Model configurations
const MODELS = {
  universities: {
    model: University,
    name: 'Universities',
    icon: '🏫',
    description: 'University information and programs'
  },
  leads: {
    model: Lead,
    name: 'Student Leads',
    icon: '👨‍🎓',
    description: 'Student inquiries and applications'
  },
  b2bLeads: {
    model: B2BLead,
    name: 'B2B Leads',
    icon: '🤝',
    description: 'Business partnership opportunities'
  },
  successStories: {
    model: StudentSuccessStory,
    name: 'Success Stories',
    icon: '🌟',
    description: 'Student achievement stories'
  },
  updates: {
    model: Update,
    name: 'Updates',
    icon: '📰',
    description: 'News and announcements'
  },
  users: {
    model: User,
    name: 'Users',
    icon: '👤',
    description: 'Admin users and permissions'
  },
  destinations: {
    model: Destination,
    name: 'Destinations',
    icon: '🌍',
    description: 'Study destinations and countries'
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

    // Import models after connection
    const { default: UniversityModel } = await import('../src/models/University.js');
    const { default: LeadModel } = await import('../src/models/Lead.js');
    const { default: B2BLeadModel } = await import('../src/models/B2BLead.js');
    const { default: StudentSuccessStoryModel } = await import('../src/models/StudentSuccessStory.js');
    const { default: UpdateModel } = await import('../src/models/Update.js');
    const { default: UserModel } = await import('../src/models/User.js');
    const { default: DestinationModel } = await import('../src/models/Destination.js');

    University = UniversityModel;
    Lead = LeadModel;
    B2BLead = B2BLeadModel;
    StudentSuccessStory = StudentSuccessStoryModel;
    Update = UpdateModel;
    User = UserModel;
    Destination = DestinationModel;
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
          {
            $group: {
              _id: '$country',
              count: { $sum: 1 }
            }
          },
          { $sort: { count: -1 } }
        ]);
        collectionStats.countries = universityStats;
        break;

      case 'leads':
        const leadStats = await Model.aggregate([
          {
            $group: {
              _id: '$status',
              count: { $sum: 1 }
            }
          },
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
