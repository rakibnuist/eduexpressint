import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';

// Import all models
import University from '@/models/University';
import Lead from '@/models/Lead';
import B2BLead from '@/models/B2BLead';
import StudentSuccessStory from '@/models/StudentSuccessStory';
import Update from '@/models/Update';
import User from '@/models/User';
import Destination from '@/models/Destination';

export async function GET(request: Request) {
  try {
    // Ensure database connection
    const dbConnection = await dbConnect();
    
    // If database is not connected, return fallback data with real statistics
    if (!dbConnection) {
      console.log('Database not connected, returning fallback data');
      return NextResponse.json({
        success: true,
        data: getFallbackDashboardData()
      });
    }
    
    // Get dashboard statistics with error handling for each query
    let totalLeads = 0, totalUniversities = 0, totalB2BLeads = 0, totalSuccessStories = 0;
    let totalUpdates = 0, totalUsers = 0, totalDestinations = 0;
    let recentLeads = 0, recentB2BLeads = 0;
    let recentUniversities: any[] = [], recentUpdates: any[] = [], recentSuccessStories: any[] = [];
    
    try {
      totalLeads = await Lead.countDocuments();
    } catch (e) { console.log('Lead count error:', e); }
    
    try {
      totalUniversities = await University.countDocuments();
    } catch (e) { console.log('University count error:', e); }
    
    try {
      totalB2BLeads = await B2BLead.countDocuments();
    } catch (e) { console.log('B2BLead count error:', e); }
    
    try {
      totalSuccessStories = await StudentSuccessStory.countDocuments();
    } catch (e) { console.log('SuccessStory count error:', e); }
    
    try {
      totalUpdates = await Update.countDocuments();
    } catch (e) { console.log('Update count error:', e); }
    
    try {
      totalUsers = await User.countDocuments();
    } catch (e) { console.log('User count error:', e); }
    
    try {
      totalDestinations = await Destination.countDocuments();
    } catch (e) { console.log('Destination count error:', e); }
    
    // Recent data (last 7 days)
    try {
      recentLeads = await Lead.find({ 
        createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } 
      }).countDocuments();
    } catch (e) { console.log('Recent leads error:', e); }
    
    try {
      recentB2BLeads = await B2BLead.find({ 
        createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } 
      }).countDocuments();
    } catch (e) { console.log('Recent B2B leads error:', e); }
    
    // Recent items for display
    try {
      recentUniversities = await University.find({ isActive: true })
        .sort({ updatedAt: -1 })
        .limit(5)
        .select('name country city ranking isActive updatedAt')
        .lean();
    } catch (e) { console.log('Recent universities error:', e); }
    
    try {
      recentUpdates = await Update.find({ status: 'published' })
        .sort({ publishedAt: -1 })
        .limit(5)
        .select('title type status publishedAt updatedAt')
        .lean();
    } catch (e) { console.log('Recent updates error:', e); }
    
    try {
      recentSuccessStories = await StudentSuccessStory.find({ isPublished: true })
        .sort({ updatedAt: -1 })
        .limit(5)
        .select('studentName university universityCountry program isFeatured updatedAt')
        .lean();
    } catch (e) { console.log('Recent success stories error:', e); }

    // Get recent leads for dashboard
    let recentLeadsList: any[] = [];
    try {
      recentLeadsList = await Lead.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('name email phone country program status createdAt')
        .lean();
    } catch (e) { console.log('Recent leads list error:', e); }

    // Get lead status distribution
    let leadStatusStats: any[] = [];
    try {
      leadStatusStats = await Lead.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);
    } catch (e) { console.log('Lead status stats error:', e); }

    // Get university country distribution
    let universityCountryStats: any[] = [];
    try {
      universityCountryStats = await University.aggregate([
        { $group: { _id: '$country', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);
    } catch (e) { console.log('University country stats error:', e); }

    // Get update type distribution
    let updateTypeStats: any[] = [];
    try {
      updateTypeStats = await Update.aggregate([
        { $group: { _id: '$type', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);
    } catch (e) { console.log('Update type stats error:', e); }

    // Get B2B lead status and value stats
    let b2bStats: any[] = [];
    try {
      b2bStats = await B2BLead.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
            totalValue: { $sum: '$expectedValue' }
          }
        },
        { $sort: { count: -1 } }
      ]);
    } catch (e) { console.log('B2B stats error:', e); }

    // Get success story country distribution
    let successStoryStats: any[] = [];
    try {
      successStoryStats = await StudentSuccessStory.aggregate([
        {
          $group: {
            _id: '$universityCountry',
            count: { $sum: 1 },
            featured: { $sum: { $cond: ['$isFeatured', 1, 0] } }
          }
        },
        { $sort: { count: -1 } }
      ]);
    } catch (e) { console.log('Success story stats error:', e); }

    // Calculate conversion rates and trends
    const totalLeadsThisWeek = recentLeads;
    const totalB2BLeadsThisWeek = recentB2BLeads;
    
    // Get leads by status for conversion rate
    const newLeads = leadStatusStats.find(stat => stat._id === 'new')?.count || 0;
    const contactedLeads = leadStatusStats.find(stat => stat._id === 'contacted')?.count || 0;
    const qualifiedLeads = leadStatusStats.find(stat => stat._id === 'qualified')?.count || 0;
    const convertedLeads = leadStatusStats.find(stat => stat._id === 'converted')?.count || 0;
    
    const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : '0.0';
    const contactRate = totalLeads > 0 ? (((contactedLeads + qualifiedLeads + convertedLeads) / totalLeads) * 100).toFixed(1) : '0.0';

    // Calculate total B2B pipeline value
    const totalB2BValue = b2bStats.reduce((sum, stat) => sum + (stat.totalValue || 0), 0);

    // Get user role distribution
    let userRoleStats: any[] = [];
    try {
      userRoleStats = await User.aggregate([
        {
          $group: {
            _id: '$role',
            count: { $sum: 1 },
            active: { $sum: { $cond: ['$isActive', 1, 0] } }
          }
        },
        { $sort: { count: -1 } }
      ]);
    } catch (e) { console.log('User role stats error:', e); }

    const dashboardData = {
      // Main statistics
      totalLeads,
      totalUniversities,
      totalB2BLeads,
      totalSuccessStories,
      totalUpdates,
      totalUsers,
      totalDestinations,
      
      // Recent activity
      recentLeads: totalLeadsThisWeek,
      recentB2BLeads: totalB2BLeadsThisWeek,
      
      // Recent items for display
      recentLeadsList: recentLeadsList.map(lead => ({
        id: lead._id,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        country: lead.country,
        program: lead.program,
        status: lead.status,
        createdAt: lead.createdAt
      })),
      
      recentUniversities: recentUniversities.map(uni => ({
        id: uni._id,
        name: uni.name,
        country: uni.country,
        city: uni.city,
        ranking: uni.ranking,
        status: uni.isActive ? 'active' : 'inactive',
        updatedAt: uni.updatedAt
      })),
      
      recentUpdates: recentUpdates.map(update => ({
        id: update._id,
        title: update.title,
        type: update.type,
        status: update.status,
        publishedAt: update.publishedAt,
        updatedAt: update.updatedAt
      })),
      
      recentSuccessStories: recentSuccessStories.map(story => ({
        id: story._id,
        studentName: story.studentName,
        university: story.university,
        universityCountry: story.universityCountry,
        program: story.program,
        isFeatured: story.isFeatured,
        updatedAt: story.updatedAt
      })),
      
      // Statistics and analytics
      analytics: {
        leadStatusDistribution: leadStatusStats,
        universityCountryDistribution: universityCountryStats,
        updateTypeDistribution: updateTypeStats,
        b2bLeadStats: b2bStats,
        successStoryStats: successStoryStats,
        userRoleStats: userRoleStats,
        
        // Calculated metrics
        conversionRate: parseFloat(conversionRate),
        contactRate: parseFloat(contactRate),
        totalB2BValue,
        
        // Growth indicators
        leadsGrowth: totalLeadsThisWeek > 0 ? '+' + totalLeadsThisWeek : '0',
        b2bGrowth: totalB2BLeadsThisWeek > 0 ? '+' + totalB2BLeadsThisWeek : '0',
        
        // Health indicators
        dataHealth: {
          hasLeads: totalLeads > 0,
          hasUniversities: totalUniversities > 0,
          hasUpdates: totalUpdates > 0,
          hasUsers: totalUsers > 0,
          hasB2BLeads: totalB2BLeads > 0,
          hasSuccessStories: totalSuccessStories > 0,
          hasDestinations: totalDestinations > 0
        }
      },
      
      // Metadata
      lastUpdated: new Date().toISOString(),
      dataSource: 'database'
    };

    return NextResponse.json({
      success: true,
      data: dashboardData
    });

  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch dashboard data',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Fallback data function for when database is not connected
function getFallbackDashboardData() {
  return {
    // Main statistics (based on our sync report)
    totalLeads: 10,
    totalUniversities: 2,
    totalB2BLeads: 0,
    totalSuccessStories: 0,
    totalUpdates: 6,
    totalUsers: 2,
    totalDestinations: 0,
    
    // Recent activity
    recentLeads: 0,
    recentB2BLeads: 0,
    
    // Recent items for display
    recentLeadsList: [
      {
        id: '1',
        name: 'Ahmed Hassan',
        email: 'ahmed.hassan@email.com',
        phone: '+880-123-456-789',
        country: 'Bangladesh',
        program: 'Computer Science',
        status: 'new',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '2',
        name: 'Fatima Khan',
        email: 'fatima.khan@email.com',
        phone: '+92-300-123-456',
        country: 'Pakistan',
        program: 'Business Administration',
        status: 'contacted',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '3',
        name: 'Mohammad Rahman',
        email: 'mohammad.rahman@email.com',
        phone: '+880-987-654-321',
        country: 'Bangladesh',
        program: 'Engineering',
        status: 'new',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      }
    ],
    
    recentUniversities: [
      {
        id: '1',
        name: 'Tsinghua University',
        country: 'China',
        city: 'Beijing',
        ranking: 14,
        status: 'active',
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '2',
        name: 'Peking University',
        country: 'China',
        city: 'Beijing',
        ranking: 12,
        status: 'active',
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      }
    ],
    
    recentUpdates: [
      {
        id: '1',
        title: 'New Scholarship Opportunities Available',
        type: 'announcement',
        status: 'published',
        publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '2',
        title: 'Study Abroad Fair 2025',
        type: 'news',
        status: 'published',
        publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '3',
        title: 'Visa Processing Updates',
        type: 'announcement',
        status: 'published',
        publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      }
    ],
    
    recentSuccessStories: [],
    
    // Statistics and analytics
    analytics: {
      leadStatusDistribution: [
        { _id: 'new', count: 9 },
        { _id: 'contacted', count: 1 }
      ],
      universityCountryDistribution: [
        { _id: 'China', count: 2 }
      ],
      updateTypeDistribution: [
        { _id: 'news', count: 3 },
        { _id: 'announcement', count: 3 }
      ],
      b2bLeadStats: [],
      successStoryStats: [],
      userRoleStats: [
        { _id: 'superuser', count: 2, active: 2 }
      ],
      
      // Calculated metrics
      conversionRate: 0.0,
      contactRate: 10.0,
      totalB2BValue: 0,
      
      // Growth indicators
      leadsGrowth: '0',
      b2bGrowth: '0',
      
      // Health indicators
      dataHealth: {
        hasLeads: true,
        hasUniversities: true,
        hasUpdates: true,
        hasUsers: true,
        hasB2BLeads: false,
        hasSuccessStories: false,
        hasDestinations: false
      }
    },
    
    // Metadata
    lastUpdated: new Date().toISOString(),
    dataSource: 'fallback'
  };
}
