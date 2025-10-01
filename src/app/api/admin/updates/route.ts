import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { dbConnect } from '@/lib/db';
import Update from '@/models/Update';
import User from '@/models/User';
import { DatabaseValidator, withDatabaseValidation } from '@/lib/database-validation';

// Helper function to check authentication and get user info
async function checkAuth(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin-session');
    
    if (!session || session.value !== 'authenticated') {
      return null;
    }
    
    // Get user info from Authorization header if available
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      // For now, we'll use a default admin user since we don't have JWT parsing
      return {
        id: 'admin-1',
        name: 'Admin User',
        email: 'admin@eduexpert.com'
      };
    }
    
    return {
      id: 'admin-1',
      name: 'Admin User', 
      email: 'admin@eduexpert.com'
    };
  } catch (error) {
    console.error('Auth check error:', error);
    return null;
  }
}

export async function GET(request: Request) {
  try {
    // Check authentication
    const user = await checkAuth(request);
    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 });
    }

    // Ensure database connection
    const dbConnection = await dbConnect();
    
    // If database is not connected, return fallback data
    if (!dbConnection) {
      console.log('Database not connected, returning fallback updates data');
      return NextResponse.json({
        success: true,
        data: getFallbackUpdatesData()
      });
    }

    // Get updates from database
    let updates: any[] = [];
    let totalCount = 0;
    let publishedCount = 0;

    try {
      updates = await Update.find()
        .sort({ publishedAt: -1, createdAt: -1 })
        .limit(100) // Limit to 100 most recent updates
        .lean();
      
      totalCount = await Update.countDocuments();
      publishedCount = await Update.countDocuments({ status: 'published' });
    } catch (error) {
      console.error('Error fetching updates:', error);
      // Return fallback data if database query fails
      return NextResponse.json({
        success: true,
        data: getFallbackUpdatesData()
      });
    }

    // Get type distribution
    let typeStats: any[] = [];
    try {
      typeStats = await Update.aggregate([
        { 
          $group: { 
            _id: '$type', 
            count: { $sum: 1 },
            published: { $sum: { $cond: [{ $eq: ['$status', 'published'] }, 1, 0] } }
          } 
        },
        { $sort: { count: -1 } }
      ]);
    } catch (error) {
      console.error('Error fetching type stats:', error);
    }

    // Get status distribution
    let statusStats: any[] = [];
    try {
      statusStats = await Update.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);
    } catch (error) {
      console.error('Error fetching status stats:', error);
    }

    const responseData = {
      updates,
      totalCount,
      publishedCount,
      analytics: {
        typeDistribution: typeStats,
        statusDistribution: statusStats
      },
      lastUpdated: new Date().toISOString(),
      dataSource: 'database'
    };

    return NextResponse.json({
      success: true,
      data: responseData
    });
  } catch (error) {
    console.error('Error in updates API:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch updates data',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// POST - Create a new update
export async function POST(request: Request) {
  try {
    // Check authentication
    const user = await checkAuth(request);
    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 });
    }

    const dbConnection = await dbConnect();
    
    if (!dbConnection) {
      return NextResponse.json({
        success: false,
        error: 'Database connection failed'
      }, { status: 500 });
    }

    const body = await request.json();
    
    // Validate the data before processing
    const validation = DatabaseValidator.validateUpdateData(body);
    if (!validation.success) {
      return NextResponse.json({
        success: false,
        error: validation.error,
        message: validation.message
      }, { status: 400 });
    }
    
    // Remove fields that shouldn't be set during creation
    const { _id, createdAt, updatedAt, views, likes, publishedAt, ...createData } = body;
    
    // Set default values and publishedAt if status is published
    const updateData = {
      ...createData,
      author: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      views: 0,
      likes: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...(createData.status === 'published' && { publishedAt: new Date() })
    };
    
    // Use database validation wrapper
    const result = await withDatabaseValidation(
      async () => {
        const update = new Update(updateData);
        return await update.save();
      },
      'CREATE_UPDATE',
      'updates',
      updateData
    );

    if (!result.success) {
      return NextResponse.json({
        success: false,
        error: result.error,
        message: result.message
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data: result.data,
      message: 'Update created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating update:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create update',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Fallback data function for when database is not connected
function getFallbackUpdatesData() {
  return {
    updates: [
      {
        _id: '1',
        title: 'New Scholarship Opportunities Available',
        content: 'We are excited to announce new scholarship opportunities for international students...',
        type: 'announcement',
        status: 'published',
        publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        _id: '2',
        title: 'Study Abroad Fair 2025',
        content: 'Join us at the upcoming Study Abroad Fair where you can meet representatives from top universities...',
        type: 'news',
        status: 'published',
        publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        _id: '3',
        title: 'Visa Processing Updates',
        content: 'Important updates regarding visa processing times and requirements...',
        type: 'announcement',
        status: 'published',
        publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        _id: '4',
        title: 'University Partnership Announcement',
        content: 'We are pleased to announce our new partnership with leading universities in Europe...',
        type: 'news',
        status: 'published',
        publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        _id: '5',
        title: 'Application Deadline Reminder',
        content: 'Reminder: Application deadlines for Fall 2025 intake are approaching...',
        type: 'announcement',
        status: 'published',
        publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        _id: '6',
        title: 'Student Success Story: From Bangladesh to Canada',
        content: 'Read about how Ahmed successfully secured admission to University of Toronto...',
        type: 'news',
        status: 'published',
        publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
      }
    ],
    totalCount: 6,
    publishedCount: 6,
    analytics: {
      typeDistribution: [
        { _id: 'news', count: 3, published: 3 },
        { _id: 'announcement', count: 3, published: 3 }
      ],
      statusDistribution: [
        { _id: 'published', count: 6 }
      ]
    },
    lastUpdated: new Date().toISOString(),
    dataSource: 'fallback'
  };
}
