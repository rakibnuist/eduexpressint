import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';

export async function GET(request: Request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const lastSync = searchParams.get('lastSync');
    
    // Mock sync status response
    const syncStatus = {
      stats: {
        syncTimestamp: new Date().toISOString(),
        totalUpdates: 1,
        updatesToSync: 0,
        lastModified: new Date().toISOString()
      },
      syncRequired: false
    };
    
    return NextResponse.json({
      success: true,
      data: syncStatus
    });
  } catch (error) {
    console.error('Error checking sync status:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to check sync status',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { forceSync, updateIds } = body;
    
    // Mock sync response
    const mockUpdates = [
      {
        _id: '1',
        title: 'Welcome to EduExpress International',
        content: 'We are excited to help you with your study abroad journey.',
        type: 'announcement',
        priority: 'high',
        status: 'published',
        targetAudience: 'all',
        tags: ['welcome', 'announcement'],
        author: {
          id: 'admin',
          name: 'Admin',
          email: 'admin@eduexpress.info'
        },
        publishedAt: new Date().toISOString(),
        isPinned: true,
        views: 0,
        likes: 0,
        comments: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    
    const syncResult = {
      updates: mockUpdates,
      syncedCount: mockUpdates.length,
      syncTimestamp: new Date().toISOString(),
      message: forceSync ? 'Force sync completed successfully' : 'Sync completed successfully'
    };
    
    return NextResponse.json({
      success: true,
      data: syncResult
    });
  } catch (error) {
    console.error('Error syncing updates:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to sync updates',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
