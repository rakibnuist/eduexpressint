// src/lib/db.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/edu-express';
const MONGODB_DB = process.env.MONGODB_DB || 'edu-express';

// For development, use local MongoDB if no URI is provided
if (!process.env.MONGODB_URI) {
  console.warn('MONGODB_URI not found, using default local MongoDB connection');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var _mongoose: MongooseCache | undefined;
}

const cached = global._mongoose || { 
  conn: null, 
  promise: null 
};

export async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      dbName: MONGODB_DB || 'edu-express', // Ensure database name is always set
      serverSelectionTimeoutMS: 15000, // Increased timeout for production
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionRetryDelayMS: 5000, // How long to wait before retrying
    };

    console.log('Attempting to connect to MongoDB...');
    console.log('MONGODB_URI:', MONGODB_URI ? 'Set' : 'Not set');
    console.log('MONGODB_DB:', MONGODB_DB);
    console.log('Connection options:', JSON.stringify(opts, null, 2));

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('MongoDB connected successfully');
        console.log('Database name:', mongoose.connection.db.databaseName);
        return mongoose;
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error.message);
        console.error('Full error:', error);
        console.log('Make sure MongoDB is running locally or provide a valid MONGODB_URI');
        cached.promise = null;
        // Throw error instead of returning null to properly handle connection failures
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    cached.conn = null;
    console.error('Failed to establish database connection:', error);
    throw error;
  } finally {
    global._mongoose = cached;
  }
}

// Check if database is connected
export function isDbConnected(): boolean {
  return cached.conn !== null && mongoose.connection.readyState === 1;
}

// Export default for backward compatibility
export default dbConnect;
