import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const META_PIXEL_ID = process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID;
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const META_API_URL = `https://graph.facebook.com/v18.0/${META_PIXEL_ID}/events`;

interface TrackingEvent {
  event_name: string;
  event_time: number;
  event_id?: string; // For deduplication
  user_data: {
    em?: string; // hashed email
    ph?: string; // hashed phone
    fn?: string; // hashed first name
    ln?: string; // hashed last name
    ct?: string; // hashed city
    st?: string; // hashed state
    country?: string; // hashed country
    zp?: string; // hashed zip code
    db?: string; // hashed date of birth
    ge?: string; // hashed gender
    external_id?: string; // hashed external ID
    client_ip_address?: string; // Don't hash
    client_user_agent?: string; // Don't hash
    fbc?: string; // Facebook click ID - Don't hash
    fbp?: string; // Facebook browser ID - Don't hash
    subscription_id?: string; // Don't hash
    fb_login_id?: string; // Don't hash
    lead_id?: string; // Don't hash
    page_id?: string; // Don't hash
    page_scoped_user_id?: string; // Don't hash
    ctwa_clid?: string; // Click to WhatsApp ID - Don't hash
    ig_account_id?: string; // Don't hash
    ig_sid?: string; // Click to Instagram ID - Don't hash
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
    // Additional education fields
    university_name?: string;
    application_status?: string;
    application_fee?: number;
    service_type?: string;
    payment_method?: string;
    transaction_id?: string;
    appointment_type?: string;
    consultation_duration?: string;
    consultation_topic?: string;
    scheduled_date?: string;
    timezone?: string;
    meeting_platform?: string;
    service_package?: string;
    payment_status?: string;
    cart_value?: number;
    items_count?: number;
    checkout_value?: number;
    inquiry_type?: string;
    urgency_level?: string;
    user_type?: string;
    account_status?: string;
    onboarding_completed?: boolean;
    [key: string]: any;
  };
  event_source_url: string;
  action_source: string;
  opt_out?: boolean;
  data_processing_options?: string[];
  data_processing_options_country?: number;
  data_processing_options_state?: number;
  referrer_url?: string;
  customer_segmentation?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { events, test_event_code } = body;

    // Get client IP address for better attribution
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     request.ip || 
                     '127.0.0.1';
    
    // Get user agent
    const userAgent = request.headers.get('user-agent') || '';
    
    // Get referrer
    const referrer = request.headers.get('referer') || '';

    // For testing without Meta Access Token
    if (!META_ACCESS_TOKEN) {
      console.log('⚠️ Meta Access Token not configured - running in test mode');
      console.log('📊 Events that would be sent to Meta:', {
        count: events.length,
        events: events.map(e => ({
          event_name: e.event_name,
          event_time: e.event_time,
          has_user_data: !!e.user_data,
          has_custom_data: !!e.custom_data
        }))
      });
      
      return NextResponse.json({
        success: true,
        test_mode: true,
        message: 'Events processed in test mode - configure META_ACCESS_TOKEN for production',
        events_received: events.length,
        events: events,
        timestamp: new Date().toISOString(),
      });
    }

    if (!META_PIXEL_ID) {
      return NextResponse.json(
        { error: 'Meta Pixel ID missing' },
        { status: 500 }
      );
    }

    // Prepare events for Meta Conversions API with enhanced field mapping
    const metaEvents: TrackingEvent[] = events.map((event: any) => {
      // Process user data with proper Meta field names and enhanced structure
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
        event_id: event.event_id, // For deduplication
        user_data: userData,
        custom_data: {
          content_category: 'Education',
          currency: 'USD',
          ...event.custom_data,
          // Add server-side enhancement
          server_enhanced: true,
          processing_timestamp: new Date().toISOString(),
        },
        event_source_url: event.event_source_url || referrer || 'https://www.eduexpressint.com',
        action_source: 'website',
        // Add GDPR compliance fields
        data_processing_options: ['LDU'], // Limited Data Use
        data_processing_options_country: 0, // US
        data_processing_options_state: 0, // California
        referrer_url: referer,
      };
    });

    // Send to Meta Conversions API
    const metaPayload = {
      data: metaEvents,
      ...(test_event_code && { test_event_code }),
    };

    console.log('🚀 Sending to Meta Conversions API:', {
      url: META_API_URL,
      events_count: metaEvents.length,
      test_event_code: test_event_code || 'none',
      pixel_id: META_PIXEL_ID,
      timestamp: new Date().toISOString(),
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
      console.error('❌ Meta API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: result,
        events_sent: metaEvents.length,
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json(
        { 
          error: 'Failed to send events to Meta', 
          details: result,
          events_count: metaEvents.length,
          timestamp: new Date().toISOString(),
        },
        { status: response.status }
      );
    }

    console.log('✅ Meta Conversions API Success:', {
      events_received: result.events_received || metaEvents.length,
      fbtrace_id: result.fbtrace_id,
      messages: result.messages || [],
      timestamp: new Date().toISOString(),
    });

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
