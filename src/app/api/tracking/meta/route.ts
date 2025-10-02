import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const META_PIXEL_ID = process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID;
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const META_API_URL = `https://graph.facebook.com/v18.0/${META_PIXEL_ID}/events`;

interface TrackingEvent {
  event_name: string;
  event_time: number;
  user_data: {
    em?: string; // hashed email
    ph?: string; // hashed phone
    fn?: string; // hashed first name
    ln?: string; // hashed last name
    ct?: string; // hashed city
    st?: string; // hashed state
    country?: string;
    zp?: string; // hashed zip code
    db?: string; // hashed date of birth
    ge?: string; // hashed gender
    external_id?: string;
    client_ip_address?: string;
    client_user_agent?: string;
  };
  custom_data: {
    content_name?: string;
    content_category?: string;
    content_type?: string;
    content_ids?: string[];
    contents?: any[];
    value?: number;
    currency?: string;
    num_items?: number;
    search_string?: string;
    status?: string;
    // Education-specific fields
    destination_country?: string;
    study_level?: string;
    program_type?: string;
    program_field?: string;
    source?: string;
    lead_source?: string;
    application_type?: string;
    contact_method?: string;
    registration_type?: string;
    [key: string]: any;
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

    // Get client information from headers
    const userAgent = request.headers.get('user-agent') || '';
    const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '';
    const referer = request.headers.get('referer') || '';

    // Prepare events for Meta Conversions API with proper field mapping
    const metaEvents: TrackingEvent[] = events.map((event: any) => {
      // Process user data with proper Meta field names
      const userData: any = {
        client_ip_address: clientIP,
        client_user_agent: userAgent,
      };

      if (event.user_data) {
        if (event.user_data.email) userData.em = hashEmail(event.user_data.email);
        if (event.user_data.phone) userData.ph = hashPhone(event.user_data.phone);
        if (event.user_data.firstName) userData.fn = hashString(event.user_data.firstName);
        if (event.user_data.lastName) userData.ln = hashString(event.user_data.lastName);
        if (event.user_data.city) userData.ct = hashString(event.user_data.city);
        if (event.user_data.state) userData.st = hashString(event.user_data.state);
        if (event.user_data.country) userData.country = event.user_data.country;
        if (event.user_data.zipCode) userData.zp = hashString(event.user_data.zipCode);
        if (event.user_data.dateOfBirth) userData.db = hashString(event.user_data.dateOfBirth);
        if (event.user_data.gender) userData.ge = hashString(event.user_data.gender);
        if (event.user_data.external_id) userData.external_id = event.user_data.external_id;
      }

      return {
        event_name: event.event_name,
        event_time: event.event_time || Math.floor(Date.now() / 1000),
        user_data: userData,
        custom_data: {
          content_category: 'Education',
          currency: 'USD',
          ...event.custom_data,
          // Add server-side enhancement
          server_enhanced: true,
          processing_timestamp: new Date().toISOString(),
        },
        event_source_url: event.event_source_url || referer || 'https://www.eduexpressint.com',
        action_source: 'website',
      };
    });

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
