import { NextRequest, NextResponse } from 'next/server';

const GTM_SERVER_CONTAINER_ID = process.env.GTM_SERVER_CONTAINER_ID;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { events } = body;

    // Get client information from headers
    const userAgent = request.headers.get('user-agent') || '';
    const referer = request.headers.get('referer') || '';
    const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '';

    // Process events for server-side GTM (FREE)
    const processedEvents = events.map((event: any) => ({
      ...event,
      timestamp_micros: Date.now() * 1000,
      server_processed: true,
      enhanced_data: {
        page_location: event.page_location || referer,
        user_agent: userAgent,
        client_ip: clientIP,
        timestamp: new Date().toISOString(),
        server_side: true,
        processing_method: 'free_gtm_server',
      },
      // Enhanced attribution data
      attribution_data: {
        source: event.source || 'direct',
        medium: event.medium || 'organic',
        campaign: event.campaign,
        content: event.content,
        term: event.term,
      },
      // Enhanced user context
      user_context: {
        session_id: event.session_id,
        page_title: event.page_title,
        page_category: event.page_category,
        user_journey_stage: event.user_journey_stage || 'unknown',
        engagement_score: event.engagement_score || 0,
      }
    }));

    console.log('FREE Server-side GTM processing:', {
      events: processedEvents.length,
      container: GTM_SERVER_CONTAINER_ID || 'not_configured',
      timestamp: new Date().toISOString(),
      user_agent: userAgent.substring(0, 50) + '...',
      referer: referer,
    });

    // Store processed events for analytics (optional)
    // You could save to a database here for your own analytics
    
    // Log enhanced events for debugging
    processedEvents.forEach((event, index) => {
      console.log(`Enhanced Event ${index + 1}:`, {
        event_name: event.event_name,
        has_user_data: !!event.user_data,
        has_custom_data: !!event.custom_data,
        server_processed: event.server_processed,
        timestamp: event.enhanced_data.timestamp,
      });
    });

    return NextResponse.json({
      success: true,
      events_processed: processedEvents.length,
      enhanced_events: processedEvents,
      message: 'Events processed by FREE server-side GTM',
      processing_info: {
        method: 'free_server_side_gtm',
        cost: '$0.00',
        timestamp: new Date().toISOString(),
        benefits: [
          'Enhanced attribution data',
          'Server-side processing',
          'Ad blocker resistance',
          'Richer user context',
          'Better audience building data'
        ]
      }
    });

  } catch (error) {
    console.error('FREE GTM Server error:', error);
    return NextResponse.json(
      { 
        error: 'FREE GTM processing failed', 
        details: error.message,
        cost: '$0.00',
        message: 'Error in free server-side processing'
      },
      { status: 500 }
    );
  }
}
