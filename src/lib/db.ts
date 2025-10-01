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
      dbName: MONGODB_DB || undefined,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    };

    console.log('Attempting to connect to MongoDB...');

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('MongoDB connected successfully');
        return mongoose;
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error.message);
        console.log('Make sure MongoDB is running locally or provide a valid MONGODB_URI');
        console.log('Application will continue in offline mode');
        cached.promise = null;
        // Don't throw error, return a mock connection for offline mode
        return null;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    cached.conn = null; // Set to null for offline mode
  }

  global._mongoose = cached;
  return cached.conn;
}

// Check if database is connected
export function isDbConnected(): boolean {
  return cached.conn !== null && mongoose.connection.readyState === 1;
}

// Export default for backward compatibility
export default dbConnect;
