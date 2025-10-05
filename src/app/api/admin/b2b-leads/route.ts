import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { dbConnect } from '@/lib/db';
import B2BLead from '@/models/B2BLead';
import { extractTrackingFromRequest } from '@/lib/trackingUtils';
import { metaConversionsAPI } from '@/components/MetaConversionsAPI';

// Helper function to check authentication
async function checkAuth(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin-session');
    
    if (!session || session.value !== 'authenticated') {
      return false;
    }
    return true;
  } catch (error) {
    console.error('Auth check error:', error);
    return false;
  }
}

export async function GET(request: Request) {
  try {
    // Check authentication
    const isAuthenticated = await checkAuth(request);
    if (!isAuthenticated) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 });
    }

    // Ensure database connection
    const dbConnection = await dbConnect();
    
    // If database is not connected, return fallback data
    if (!dbConnection) {
      console.log('Database not connected, returning fallback B2B leads data');
      return NextResponse.json({
        success: true,
        data: getFallbackB2BLeadsData()
      });
    }

    // Get B2B leads from database
    let b2bLeads: any[] = [];
    let totalCount = 0;
    let totalValue = 0;

    try {
      b2bLeads = await B2BLead.find()
        .sort({ createdAt: -1 })
        .limit(100) // Limit to 100 most recent B2B leads
        .lean();
      
      totalCount = await B2BLead.countDocuments();
      
      // Calculate total pipeline value
      const valueResult = await B2BLead.aggregate([
        { $group: { _id: null, totalValue: { $sum: '$expectedValue' } } }
      ]);
      totalValue = valueResult.length > 0 ? valueResult[0].totalValue : 0;
    } catch (error) {
      console.error('Error fetching B2B leads:', error);
      // Return fallback data if database query fails
      return NextResponse.json({
        success: true,
        data: getFallbackB2BLeadsData()
      });
    }

    // Get status distribution
    let statusStats: any[] = [];
    try {
      statusStats = await B2BLead.aggregate([
        { 
          $group: { 
            _id: '$status', 
            count: { $sum: 1 },
            totalValue: { $sum: '$expectedValue' }
          } 
        },
        { $sort: { count: -1 } }
      ]);
    } catch (error) {
      console.error('Error fetching status stats:', error);
    }

    // Get industry distribution
    let industryStats: any[] = [];
    try {
      industryStats = await B2BLead.aggregate([
        { $group: { _id: '$industry', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);
    } catch (error) {
      console.error('Error fetching industry stats:', error);
    }

    // Get priority distribution
    let priorityStats: any[] = [];
    try {
      priorityStats = await B2BLead.aggregate([
        { $group: { _id: '$priority', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);
    } catch (error) {
      console.error('Error fetching priority stats:', error);
    }

    const responseData = {
      b2bLeads,
      totalCount,
      totalValue,
      analytics: {
        statusDistribution: statusStats,
        industryDistribution: industryStats,
        priorityDistribution: priorityStats
      },
      lastUpdated: new Date().toISOString(),
      dataSource: 'database'
    };

    return NextResponse.json({
      success: true,
      data: responseData
    });
  } catch (error) {
    console.error('Error in B2B leads API:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch B2B leads data',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Ensure database connection
    const dbConnection = await dbConnect();
    
    if (!dbConnection) {
      return NextResponse.json({
        success: false,
        error: 'Database connection failed'
      }, { status: 500 });
    }

    const body = await request.json();
    const {
      companyName,
      contactPerson,
      email,
      phone,
      industry,
      country,
      website,
      services,
      notes,
      source,
      status,
      priority,
      dealStage
    } = body;

    // Validate required fields
    if (!companyName || !contactPerson || !email) {
      return NextResponse.json({
        success: false,
        error: 'Company name, contact person, and email are required'
      }, { status: 400 });
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid email format'
      }, { status: 400 });
    }

    // Check if lead already exists with this email
    const existingLead = await B2BLead.findOne({ email });
    if (existingLead) {
      return NextResponse.json({
        success: false,
        error: 'A lead with this email already exists'
      }, { status: 409 });
    }

    // Extract tracking data from request
    const trackingData = extractTrackingFromRequest(request);
    
    // Create new B2B lead
    const newLead = new B2BLead({
      companyName,
      contactPerson,
      email,
      phone: phone || undefined,
      industry: industry || undefined,
      country: country || undefined,
      website: website || undefined,
      services: services || [],
      notes: notes || undefined,
      source: source || 'B2B Partnership Page',
      status: status || 'New',
      priority: priority || 'High',
      dealStage: dealStage || 'Lead',
      lastContact: new Date(),
      // Add tracking data
      ...trackingData
    });

    const savedLead = await newLead.save();

    // Track B2B lead creation with Meta Pixel and Conversions API
    try {
      await metaConversionsAPI.sendEvent(
        {
          event_name: 'Lead',
          event_time: Math.floor(Date.now() / 1000),
          event_source_url: request.headers.get('referer') || 'https://www.eduexpressint.com',
          action_source: 'website'
        },
        {
          email: savedLead.email,
          phone: savedLead.phone,
          first_name: savedLead.contactPerson.split(' ')[0],
          last_name: savedLead.contactPerson.split(' ').slice(1).join(' ') || '',
          country: savedLead.country
        },
        {
          content_name: 'B2B Lead Generated',
          content_category: 'Business Partnership',
          content_type: 'b2b_lead',
          value: 5, // Higher value for B2B leads
          currency: 'USD',
          company_name: savedLead.companyName,
          industry: savedLead.industry,
          country: savedLead.country,
          services: savedLead.services?.join(', '),
          source: savedLead.source,
          lead_id: savedLead._id.toString(),
          deal_stage: savedLead.dealStage,
          priority: savedLead.priority
        }
      );
      
      console.log('✅ Meta tracking: B2B Lead creation tracked successfully');
    } catch (trackingError) {
      console.error('❌ Meta tracking error:', trackingError);
      // Don't fail the lead creation if tracking fails
    }

    return NextResponse.json({
      success: true,
      data: savedLead,
      message: 'B2B lead created successfully'
    });

  } catch (error) {
    console.error('Error creating B2B lead:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create B2B lead',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    // Check authentication
    const isAuthenticated = await checkAuth(request);
    if (!isAuthenticated) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 });
    }

    // Ensure database connection
    const dbConnection = await dbConnect();
    
    if (!dbConnection) {
      return NextResponse.json({
        success: false,
        error: 'Database connection failed'
      }, { status: 500 });
    }

    const body = await request.json();
    const { _id, ...updateData } = body;

    if (!_id) {
      return NextResponse.json({
        success: false,
        error: 'Lead ID is required'
      }, { status: 400 });
    }

    // Validate required fields
    const requiredFields = ['companyName', 'contactPerson', 'email', 'phone', 'industry', 'country', 'status', 'priority'];
    for (const field of requiredFields) {
      if (!updateData[field] || (typeof updateData[field] === 'string' && updateData[field].trim() === '')) {
        return NextResponse.json({
          success: false,
          error: `${field} is required`
        }, { status: 400 });
      }
    }

    // Validate email format
    if (updateData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updateData.email)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid email format'
      }, { status: 400 });
    }

    // Check if this is a fallback data ID (string) or real MongoDB ObjectId
    const isFallbackId = typeof _id === 'string' && !_id.match(/^[0-9a-fA-F]{24}$/);
    
    if (isFallbackId) {
      // For fallback data, we can't actually update in database
      // Return the updated data as if it was successful
      const updatedLead = {
        _id,
        ...updateData,
        updatedAt: new Date()
      };
      
      return NextResponse.json({
        success: true,
        data: updatedLead,
        message: 'B2B lead updated successfully (fallback mode)'
      });
    }

    // Update the B2B lead in database
    const updatedLead = await B2BLead.findByIdAndUpdate(
      _id,
      {
        ...updateData,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );

    if (!updatedLead) {
      return NextResponse.json({
        success: false,
        error: 'B2B lead not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: updatedLead,
      message: 'B2B lead updated successfully'
    });

  } catch (error) {
    console.error('Error updating B2B lead:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update B2B lead',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Fallback data function for when database is not connected
function getFallbackB2BLeadsData() {
  return {
    b2bLeads: [
      {
        _id: '1',
        companyName: 'TechCorp Solutions',
        contactPerson: 'Alice Johnson',
        email: 'alice@techcorp.com',
        phone: '+1-555-0123',
        website: 'https://techcorp.com',
        industry: 'Technology',
        companySize: '51-200',
        country: 'USA',
        city: 'San Francisco',
        services: ['University Partnerships', 'Student Recruitment'],
        budget: '$50,000 - $100,000',
        timeline: '3-6 months',
        status: 'New',
        priority: 'High',
        source: 'Website',
        notes: 'Interested in partnership for student recruitment in Asia',
        lastContact: new Date('2024-09-20'),
        assignedTo: 'Admin User',
        expectedValue: 75000,
        dealStage: 'New',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        _id: '2',
        companyName: 'Global Education Group',
        contactPerson: 'Bob Williams',
        email: 'bob@globaledu.com',
        phone: '+1-555-0456',
        website: 'https://globaledu.com',
        industry: 'Education',
        companySize: '201-500',
        country: 'Canada',
        city: 'Toronto',
        services: ['Study Abroad Programs', 'Visa Assistance'],
        budget: '$25,000 - $50,000',
        timeline: '1-3 months',
        status: 'Contacted',
        priority: 'Medium',
        source: 'Referral',
        notes: 'Looking for expansion into South Asian markets',
        lastContact: new Date('2024-09-18'),
        assignedTo: 'Admin User',
        expectedValue: 40000,
        dealStage: 'Contacted',
        createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString()
      }
    ],
    totalCount: 2,
    totalValue: 115000,
    analytics: {
      statusDistribution: [
        { _id: 'New', count: 1, totalValue: 75000 },
        { _id: 'Contacted', count: 1, totalValue: 40000 }
      ],
      industryDistribution: [
        { _id: 'Technology', count: 1 },
        { _id: 'Education', count: 1 }
      ],
      priorityDistribution: [
        { _id: 'High', count: 1 },
        { _id: 'Medium', count: 1 }
      ]
    },
    lastUpdated: new Date().toISOString(),
    dataSource: 'fallback'
  };
}
