import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { dbConnect } from '@/lib/db';
import Lead from '@/models/Lead';
import B2BLead from '@/models/B2BLead';
import { generateTrackingAnalytics } from '@/lib/trackingUtils';

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
    
    if (!dbConnection) {
      return NextResponse.json({
        success: false,
        error: 'Database connection failed'
      }, { status: 500 });
    }

    // Get date range from query parameters
    const url = new URL(request.url);
    const days = parseInt(url.searchParams.get('days') || '30');
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    // Fetch leads and B2B leads with tracking data
    const [leads, b2bLeads] = await Promise.all([
      Lead.find({
        createdAt: { $gte: startDate }
      }).lean(),
      B2BLead.find({
        createdAt: { $gte: startDate }
      }).lean()
    ]);

    // Generate analytics for both lead types
    const leadAnalytics = generateTrackingAnalytics(leads);
    const b2bAnalytics = generateTrackingAnalytics(b2bLeads);

    // Meta (Facebook) Campaign Performance
    const metaCampaigns = await Lead.aggregate([
      {
        $match: {
          'metaTracking.fbclid': { $exists: true },
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$metaTracking.campaignName',
          count: { $sum: 1 },
          totalValue: { $sum: '$leadScore' },
          avgScore: { $avg: '$leadScore' },
          platforms: { $addToSet: '$metaTracking.platform' },
          placements: { $addToSet: '$metaTracking.placement' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Google Ads Campaign Performance
    const gtmCampaigns = await Lead.aggregate([
      {
        $match: {
          'gtmTracking.gclid': { $exists: true },
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$gtmTracking.campaignName',
          count: { $sum: 1 },
          totalValue: { $sum: '$leadScore' },
          avgScore: { $avg: '$leadScore' },
          networks: { $addToSet: '$gtmTracking.network' },
          keywords: { $addToSet: '$gtmTracking.keyword' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // UTM Source Performance
    const utmSources = await Lead.aggregate([
      {
        $match: {
          'utmParams.utm_source': { $exists: true },
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            source: '$utmParams.utm_source',
            medium: '$utmParams.utm_medium',
            campaign: '$utmParams.utm_campaign'
          },
          count: { $sum: 1 },
          totalValue: { $sum: '$leadScore' },
          avgScore: { $avg: '$leadScore' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // B2B Meta Campaign Performance
    const b2bMetaCampaigns = await B2BLead.aggregate([
      {
        $match: {
          'metaTracking.fbclid': { $exists: true },
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$metaTracking.campaignName',
          count: { $sum: 1 },
          totalValue: { $sum: '$expectedValue' },
          avgValue: { $avg: '$expectedValue' },
          industries: { $addToSet: '$industry' }
        }
      },
      { $sort: { totalValue: -1 } }
    ]);

    // B2B Google Ads Campaign Performance
    const b2bGtmCampaigns = await B2BLead.aggregate([
      {
        $match: {
          'gtmTracking.gclid': { $exists: true },
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$gtmTracking.campaignName',
          count: { $sum: 1 },
          totalValue: { $sum: '$expectedValue' },
          avgValue: { $avg: '$expectedValue' },
          industries: { $addToSet: '$industry' }
        }
      },
      { $sort: { totalValue: -1 } }
    ]);

    // Conversion Funnel Analysis
    const conversionFunnel = await Lead.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            source: {
              $cond: [
                { $ne: ['$metaTracking.fbclid', null] },
                'Meta',
                {
                  $cond: [
                    { $ne: ['$gtmTracking.gclid', null] },
                    'Google Ads',
                    {
                      $cond: [
                        { $ne: ['$utmParams.utm_source', null] },
                        'UTM',
                        'Direct'
                      ]
                    }
                  ]
                }
              ]
            },
            status: '$status'
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: '$_id.source',
          statuses: {
            $push: {
              status: '$_id.status',
              count: '$count'
            }
          },
          totalLeads: { $sum: '$count' }
        }
      },
      { $sort: { totalLeads: -1 } }
    ]);

    // Device and Platform Analysis
    const deviceAnalysis = await Lead.aggregate([
      {
        $match: {
          $or: [
            { 'metaTracking.deviceType': { $exists: true } },
            { 'gtmTracking.deviceType': { $exists: true } }
          ],
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            $cond: [
              { $ne: ['$metaTracking.deviceType', null] },
              '$metaTracking.deviceType',
              '$gtmTracking.deviceType'
            ]
          },
          count: { $sum: 1 },
          avgScore: { $avg: '$leadScore' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    const analyticsData = {
      summary: {
        totalLeads: leads.length,
        totalB2BLeads: b2bLeads.length,
        metaLeads: leads.filter(lead => lead.metaTracking?.fbclid).length,
        gtmLeads: leads.filter(lead => lead.gtmTracking?.gclid).length,
        utmLeads: leads.filter(lead => lead.utmParams?.utm_source).length,
        dateRange: {
          start: startDate,
          end: new Date(),
          days
        }
      },
      metaCampaigns,
      gtmCampaigns,
      utmSources,
      b2bMetaCampaigns,
      b2bGtmCampaigns,
      conversionFunnel,
      deviceAnalysis,
      leadAnalytics,
      b2bAnalytics
    };

    return NextResponse.json({
      success: true,
      data: analyticsData
    });

  } catch (error) {
    console.error('Error fetching tracking analytics:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch tracking analytics',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
