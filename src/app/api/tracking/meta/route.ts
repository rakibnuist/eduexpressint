import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const META_PIXEL_ID = process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID;
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const META_API_URL = `https://graph.facebook.com/v18.0/${META_PIXEL_ID}/events`;

interface TrackingEvent {
  event_name: string;
  event_time: number;
  user_data: {
    email?: string;
    phone?: string;
    first_name?: string;
    last_name?: string;
    country?: string;
    external_id?: string;
  };
  custom_data: {
    content_name?: string;
    content_category?: string;
    value?: number;
    currency?: string;
    destination?: string;
    study_level?: string;
    program_type?: string;
    source?: string;
  };
  event_source_url: string;
  action_source: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { events, test_event_code } = body;

    // For testing without Meta Access Token
    if (!META_ACCESS_TOKEN) {
      console.log('Meta Access Token not configured - running in test mode');
      console.log('Events that would be sent to Meta:', events);
      
      return NextResponse.json({
        success: true,
        test_mode: true,
        message: 'Events processed in test mode - configure META_ACCESS_TOKEN for production',
        events_received: events.length,
        events: events,
      });
    }

    if (!META_PIXEL_ID) {
      return NextResponse.json(
        { error: 'Meta Pixel ID missing' },
        { status: 500 }
      );
    }

    // Prepare events for Meta Conversions API
    const metaEvents: TrackingEvent[] = events.map((event: any) => ({
      event_name: event.event_name,
      event_time: Math.floor(Date.now() / 1000),
      user_data: {
        email: event.user_data?.email ? hashEmail(event.user_data.email) : undefined,
        phone: event.user_data?.phone ? hashPhone(event.user_data.phone) : undefined,
        first_name: event.user_data?.first_name ? hashString(event.user_data.first_name) : undefined,
        last_name: event.user_data?.last_name ? hashString(event.user_data.last_name) : undefined,
        country: event.user_data?.country,
        external_id: event.user_data?.external_id,
      },
      custom_data: {
        content_name: event.custom_data?.content_name,
        content_category: event.custom_data?.content_category || 'Education',
        value: event.custom_data?.value || 1,
        currency: event.custom_data?.currency || 'USD',
        destination: event.custom_data?.destination,
        study_level: event.custom_data?.study_level,
        program_type: event.custom_data?.program_type,
        source: event.custom_data?.source,
      },
      event_source_url: event.event_source_url || 'https://www.eduexpressint.com',
      action_source: 'website',
    }));

    // Send to Meta Conversions API
    const metaPayload = {
      data: metaEvents,
      ...(test_event_code && { test_event_code }),
    };

    console.log('Sending to Meta Conversions API:', {
      url: META_API_URL,
      events: metaEvents.length,
      test_event_code,
    });

    const response = await fetch(META_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${META_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metaPayload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Meta API Error:', result);
      return NextResponse.json(
        { error: 'Failed to send events to Meta', details: result },
        { status: response.status }
      );
    }

    console.log('Meta Conversions API Success:', result);

    return NextResponse.json({
      success: true,
      events_received: metaEvents.length,
      meta_response: result,
    });

  } catch (error) {
    console.error('Server-side tracking error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

// Hash functions for PII data (required by Meta)
function hashString(str: string): string {
  return crypto.createHash('sha256').update(str.toLowerCase().trim()).digest('hex');
}

function hashEmail(email: string): string {
  return hashString(email);
}

function hashPhone(phone: string): string {
  // Remove all non-digits and hash
  const cleanPhone = phone.replace(/\D/g, '');
  return hashString(cleanPhone);
}
