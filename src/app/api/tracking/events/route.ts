import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { events, platforms = ['meta'] } = body;

    console.log('Processing tracking events:', {
      events: events.length,
      platforms,
      timestamp: new Date().toISOString(),
    });

    const results = [];

    // Send to Meta Conversions API
    if (platforms.includes('meta')) {
      try {
        const metaResponse = await fetch(`${request.nextUrl.origin}/api/tracking/meta`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            events,
            test_event_code: process.env.META_TEST_EVENT_CODE || 'SERVER_TEST'
          }),
        });

        const metaResult = await metaResponse.json();
        results.push({
          platform: 'meta',
          success: metaResponse.ok,
          result: metaResult,
        });

        console.log('Meta tracking result:', {
          success: metaResponse.ok,
          events: events.length,
          result: metaResult,
        });
      } catch (error) {
        console.error('Meta tracking error:', error);
        results.push({
          platform: 'meta',
          success: false,
          error: error.message,
        });
      }
    }

    // Add Google Analytics 4 support (future)
    if (platforms.includes('google')) {
      results.push({
        platform: 'google',
        success: false,
        message: 'Google Analytics 4 integration coming soon',
      });
    }

    // Add other platforms here as needed
    // if (platforms.includes('tiktok')) { ... }
    // if (platforms.includes('snapchat')) { ... }

    const successCount = results.filter(r => r.success).length;
    const totalPlatforms = results.length;

    return NextResponse.json({
      success: successCount > 0,
      events_processed: events.length,
      platforms_processed: totalPlatforms,
      platforms_successful: successCount,
      results,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Tracking API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process tracking events',
        details: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
