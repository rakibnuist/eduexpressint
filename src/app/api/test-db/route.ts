import { NextResponse } from 'next/server';
import { dbConnect, isDbConnected } from '@/lib/db';

export async function GET() {
  try {
    // Test database connection
    await dbConnect();
    const connected = isDbConnected();
    
    if (connected) {
      return NextResponse.json({ 
        status: 'success', 
        message: 'Database connected successfully',
        timestamp: new Date().toISOString()
      });
    } else {
      return NextResponse.json({ 
        status: 'offline', 
        message: 'Database not available - running in offline mode',
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Database connection error:', error);
    
    return NextResponse.json({ 
      status: 'error', 
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
