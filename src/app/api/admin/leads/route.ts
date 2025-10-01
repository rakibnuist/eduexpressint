import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import Lead from '@/models/Lead';

export async function GET(request: Request) {
  try {
    // Ensure database connection
    const dbConnection = await dbConnect();
    
    // If database is not connected, return fallback data
    if (!dbConnection) {
      console.log('Database not connected, returning fallback leads data');
      return NextResponse.json({
        success: true,
        data: getFallbackLeadsData()
      });
    }

    // Get leads from database
    let leads: any[] = [];
    let totalCount = 0;
    let recentCount = 0;

    try {
      leads = await Lead.find()
        .sort({ createdAt: -1 })
        .limit(100) // Limit to 100 most recent leads
        .lean();
      
      totalCount = await Lead.countDocuments();
      
      // Count recent leads (last 7 days)
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      recentCount = await Lead.countDocuments({
        createdAt: { $gte: sevenDaysAgo }
      });
    } catch (error) {
      console.error('Error fetching leads:', error);
      // Return fallback data if database query fails
      return NextResponse.json({
        success: true,
        data: getFallbackLeadsData()
      });
    }

    // Get lead status distribution
    let statusStats: any[] = [];
    try {
      statusStats = await Lead.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);
    } catch (error) {
      console.error('Error fetching lead status stats:', error);
    }

    // Get country distribution
    let countryStats: any[] = [];
    try {
      countryStats = await Lead.aggregate([
        { $group: { _id: '$country', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);
    } catch (error) {
      console.error('Error fetching country stats:', error);
    }

    const responseData = {
      leads,
      totalCount,
      recentCount,
      analytics: {
        statusDistribution: statusStats,
        countryDistribution: countryStats
      },
      lastUpdated: new Date().toISOString(),
      dataSource: 'database'
    };

    return NextResponse.json({
      success: true,
      data: responseData
    });
  } catch (error) {
    console.error('Error in leads API:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch leads data',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Fallback data function for when database is not connected
function getFallbackLeadsData() {
  return {
    leads: [
      {
        _id: '1',
        name: 'Ahmed Hassan',
        email: 'ahmed.hassan@email.com',
        phone: '+880-123-456-789',
        country: 'Bangladesh',
        program: 'Computer Science',
        status: 'new',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        _id: '2',
        name: 'Fatima Khan',
        email: 'fatima.khan@email.com',
        phone: '+92-300-123-456',
        country: 'Pakistan',
        program: 'Business Administration',
        status: 'contacted',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        _id: '3',
        name: 'Mohammad Rahman',
        email: 'mohammad.rahman@email.com',
        phone: '+880-987-654-321',
        country: 'Bangladesh',
        program: 'Engineering',
        status: 'new',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        _id: '4',
        name: 'Aisha Ali',
        email: 'aisha.ali@email.com',
        phone: '+92-301-987-654',
        country: 'Pakistan',
        program: 'Medicine',
        status: 'qualified',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        _id: '5',
        name: 'Hassan Ahmed',
        email: 'hassan.ahmed@email.com',
        phone: '+880-191-234-567',
        country: 'Bangladesh',
        program: 'Computer Science',
        status: 'new',
        createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString()
      }
    ],
    totalCount: 10,
    recentCount: 3,
    analytics: {
      statusDistribution: [
        { _id: 'new', count: 7 },
        { _id: 'contacted', count: 2 },
        { _id: 'qualified', count: 1 }
      ],
      countryDistribution: [
        { _id: 'Bangladesh', count: 6 },
        { _id: 'Pakistan', count: 4 }
      ]
    },
    lastUpdated: new Date().toISOString(),
    dataSource: 'fallback'
  };
}
