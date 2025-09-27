// src/lib/db.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) throw new Error('Missing MONGODB_URI');

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const cached = (global as unknown as { _mongoose?: MongooseCache })._mongoose || { 
  conn: null, 
  promise: null 
};

export async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    console.log('Connecting to MongoDB:', MONGODB_URI);
    console.log('Database name:', process.env.MONGODB_DB || 'default');
    cached.promise = mongoose.connect(MONGODB_URI, { dbName: process.env.MONGODB_DB || undefined })
      .then((m) => {
        console.log('MongoDB connected to database:', m.connection.db.databaseName);
        return m;
      });
  }
  cached.conn = await cached.promise;
  (global as unknown as { _mongoose: MongooseCache })._mongoose = cached;
  return cached.conn;
}
