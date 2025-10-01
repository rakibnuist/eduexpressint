import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { dbConnect } from '@/lib/db';
import StudentSuccessStory from '@/models/StudentSuccessStory';
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
      console.log('Database not connected, returning fallback success stories data');
      return NextResponse.json({
        success: true,
        data: getFallbackSuccessStoriesData()
      });
    }

    // Get success stories from database
    let successStories: any[] = [];
    let totalCount = 0;
    let publishedCount = 0;
    let featuredCount = 0;

    try {
      successStories = await StudentSuccessStory.find()
        .sort({ createdAt: -1 })
        .limit(100) // Limit to 100 most recent success stories
        .lean();
      
      totalCount = await StudentSuccessStory.countDocuments();
      publishedCount = await StudentSuccessStory.countDocuments({ isPublished: true });
      featuredCount = await StudentSuccessStory.countDocuments({ isFeatured: true });
    } catch (error) {
      console.error('Error fetching success stories:', error);
      // Return fallback data if database query fails
      return NextResponse.json({
        success: true,
        data: getFallbackSuccessStoriesData()
      });
    }

    // Get country distribution
    let countryStats: any[] = [];
    try {
      countryStats = await StudentSuccessStory.aggregate([
        { $group: { _id: '$universityCountry', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);
    } catch (error) {
      console.error('Error fetching country stats:', error);
    }

    // Get university distribution
    let universityStats: any[] = [];
    try {
      universityStats = await StudentSuccessStory.aggregate([
        { $group: { _id: '$university', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);
    } catch (error) {
      console.error('Error fetching university stats:', error);
    }

    // Get program distribution
    let programStats: any[] = [];
    try {
      programStats = await StudentSuccessStory.aggregate([
        { $group: { _id: '$program', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);
    } catch (error) {
      console.error('Error fetching program stats:', error);
    }

    const responseData = {
      successStories,
      totalCount,
      publishedCount,
      featuredCount,
      analytics: {
        countryDistribution: countryStats,
        universityDistribution: universityStats,
        programDistribution: programStats
      },
      lastUpdated: new Date().toISOString(),
      dataSource: 'database'
    };

    return NextResponse.json({
      success: true,
      data: responseData
    });
  } catch (error) {
    console.error('Error in success stories API:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch success stories data',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// POST - Create a new success story
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
    const validation = DatabaseValidator.validateSuccessStoryData(body);
    if (!validation.success) {
      return NextResponse.json({
        success: false,
        error: validation.error,
        message: validation.message
      }, { status: 400 });
    }
    
    // Remove fields that shouldn't be set during creation
    const { _id, createdAt, updatedAt, views, likes, shares, ...createData } = body;
    
    // Set default values
    const successStoryData = {
      ...createData,
      views: 0,
      likes: 0,
      shares: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Use database validation wrapper
    const result = await withDatabaseValidation(
      async () => {
        const successStory = new StudentSuccessStory(successStoryData);
        return await successStory.save();
      },
      'CREATE_SUCCESS_STORY',
      'successstories',
      successStoryData
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
      message: 'Success story created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating success story:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create success story',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Fallback data function for when database is not connected
function getFallbackSuccessStoriesData() {
  return {
    successStories: [
      {
        _id: '1',
        studentName: 'Ahmed Sarker',
        university: 'University of Toronto',
        universityCountry: 'Canada',
        program: 'Computer Science',
        graduationYear: 2023,
        story: 'Ahmed successfully secured admission to University of Toronto with a full scholarship...',
        achievements: ['Full Scholarship', 'Dean\'s List', 'Research Assistant'],
        isPublished: true,
        isFeatured: true,
        views: 1200,
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        _id: '2',
        studentName: 'Fatima Khan',
        university: 'University of Manchester',
        universityCountry: 'UK',
        program: 'Business Administration',
        graduationYear: 2022,
        story: 'Fatima overcame challenges to pursue her MBA at University of Manchester...',
        achievements: ['Merit Scholarship', 'Student Ambassador'],
        isPublished: true,
        isFeatured: false,
        views: 850,
        createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
      }
    ],
    totalCount: 2,
    publishedCount: 2,
    featuredCount: 1,
    analytics: {
      countryDistribution: [
        { _id: 'Canada', count: 1 },
        { _id: 'UK', count: 1 }
      ],
      universityDistribution: [
        { _id: 'University of Toronto', count: 1 },
        { _id: 'University of Manchester', count: 1 }
      ],
      programDistribution: [
        { _id: 'Computer Science', count: 1 },
        { _id: 'Business Administration', count: 1 }
      ]
    },
    lastUpdated: new Date().toISOString(),
    dataSource: 'fallback'
  };
}
