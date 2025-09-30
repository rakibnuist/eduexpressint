// Database Utilities
// Common database operations and helper functions

import mongoose from 'mongoose';
import { dbConnect } from './db';

/**
 * Database utility functions for common operations
 */
export class DatabaseUtils {
  
  /**
   * Initialize database connection
   */
  static async initialize() {
    try {
      await dbConnect();
      console.log('Database initialized successfully');
      return true;
    } catch (error) {
      console.error('Database initialization failed:', error);
      return false;
    }
  }

  /**
   * Check if database is connected
   */
  static isConnected(): boolean {
    return mongoose.connection.readyState === 1;
  }

  /**
   * Get database connection status
   */
  static getConnectionStatus() {
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    
    return {
      state: states[mongoose.connection.readyState as keyof typeof states],
      readyState: mongoose.connection.readyState,
      host: mongoose.connection.host,
      port: mongoose.connection.port,
      name: mongoose.connection.name
    };
  }

  /**
   * Get database statistics
   */
  static async getDatabaseStats() {
    if (!this.isConnected()) {
      throw new Error('Database not connected');
    }

    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection not available');
    }
    const stats = await db.stats();
    
    return {
      collections: stats.collections,
      dataSize: stats.dataSize,
      indexSize: stats.indexSize,
      storageSize: stats.storageSize,
      totalSize: stats.totalSize,
      avgObjSize: stats.avgObjSize,
      objects: stats.objects
    };
  }

  /**
   * Get collection statistics
   */
  static async getCollectionStats(collectionName: string) {
    if (!this.isConnected()) {
      throw new Error('Database not connected');
    }

    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection not available');
    }
    const collection = db.collection(collectionName);
    const count = await collection.countDocuments();
    const indexes = await collection.indexes();
    
    return {
      count: count,
      size: 0, // Not available without stats command
      avgObjSize: 0, // Not available without stats command
      storageSize: 0, // Not available without stats command
      totalIndexSize: 0, // Not available without stats command
      indexSizes: indexes.length
    };
  }

  /**
   * Create indexes for all models
   */
  static async createIndexes() {
    const models = [
      'University',
      'UniversitySimplified', 
      'Lead',
      'B2BLead',
      'User',
      'Update',
      'Destination'
    ];

    const results = [];
    
    for (const modelName of models) {
      try {
        const model = mongoose.models[modelName];
        if (model) {
          await model.createIndexes();
          results.push({ model: modelName, status: 'success' });
        }
      } catch (error) {
        results.push({ 
          model: modelName, 
          status: 'error', 
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return results;
  }

  /**
   * Drop all indexes (use with caution)
   */
  static async dropAllIndexes() {
    if (!this.isConnected()) {
      throw new Error('Database not connected');
    }

    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection not available');
    }
    const collections = await db.listCollections().toArray();
    const results = [];

    for (const collection of collections) {
      try {
        await db.collection(collection.name).dropIndexes();
        results.push({ collection: collection.name, status: 'success' });
      } catch (error) {
        results.push({ 
          collection: collection.name, 
          status: 'error', 
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return results;
  }

  /**
   * Backup database (exports all collections)
   */
  static async backupDatabase() {
    if (!this.isConnected()) {
      throw new Error('Database not connected');
    }

    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection not available');
    }
    const collections = await db.listCollections().toArray();
    const backup: any = {};

    for (const collection of collections) {
      const data = await db.collection(collection.name).find({}).toArray();
      backup[collection.name] = data;
    }

    return backup;
  }

  /**
   * Restore database from backup
   */
  static async restoreDatabase(backup: any) {
    if (!this.isConnected()) {
      throw new Error('Database not connected');
    }

    const results = [];

    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection not available');
    }

    for (const [collectionName, data] of Object.entries(backup)) {
      try {
        const collection = db.collection(collectionName);
        await collection.deleteMany({});
        if (Array.isArray(data) && data.length > 0) {
          await collection.insertMany(data as any[]);
        }
        results.push({ collection: collectionName, status: 'success', count: Array.isArray(data) ? data.length : 0 });
      } catch (error) {
        results.push({ 
          collection: collectionName, 
          status: 'error', 
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return results;
  }

  /**
   * Clean up old data
   */
  static async cleanupOldData() {
    const results = [];
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    try {
      // Clean up old archived updates
      const Update = mongoose.models.Update;
      if (Update) {
        const deletedUpdates = await Update.deleteMany({
          status: 'archived',
          updatedAt: { $lt: thirtyDaysAgo }
        });
        results.push({ 
          operation: 'cleanup_archived_updates', 
          deleted: deletedUpdates.deletedCount 
        });
      }

      // Clean up old inactive leads (older than 1 year)
      const oneYearAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
      const Lead = mongoose.models.Lead;
      if (Lead) {
        const deletedLeads = await Lead.deleteMany({
          status: { $in: ['Rejected', 'Withdrawn'] },
          updatedAt: { $lt: oneYearAgo }
        });
        results.push({ 
          operation: 'cleanup_old_leads', 
          deleted: deletedLeads.deletedCount 
        });
      }

    } catch (error) {
      results.push({ 
        operation: 'cleanup_error', 
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    return results;
  }

  /**
   * Get database health check
   */
  static async healthCheck() {
    const health: any = {
      connected: this.isConnected(),
      status: this.getConnectionStatus(),
      timestamp: new Date().toISOString()
    };

    if (health.connected) {
      try {
        health.stats = await this.getDatabaseStats();
        health.indexes = await this.createIndexes();
      } catch (error) {
        health.error = error instanceof Error ? error.message : 'Unknown error';
      }
    }

    return health;
  }
}

// Export utility functions
export const {
  initialize,
  isConnected,
  getConnectionStatus,
  getDatabaseStats,
  getCollectionStats,
  createIndexes,
  dropAllIndexes,
  backupDatabase,
  restoreDatabase,
  cleanupOldData,
  healthCheck
} = DatabaseUtils;

export default DatabaseUtils;
