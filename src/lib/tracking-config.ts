// Enhanced Tracking Configuration for EduExpress International
export const TRACKING_CONFIG = {
  // META Conversion API Configuration
  META: {
    PIXEL_ID: process.env.NEXT_PUBLIC_META_PIXEL_ID || '1444050970227269',
    ACCESS_TOKEN: process.env.META_ACCESS_TOKEN,
    TEST_EVENT_CODE: process.env.META_TEST_EVENT_CODE || 'TEST65812',
    API_VERSION: 'v18.0',
    API_URL: `https://graph.facebook.com/v18.0/${process.env.NEXT_PUBLIC_META_PIXEL_ID || '1444050970227269'}/events`,
  },

  // Google Tag Manager Configuration
  GTM: {
    ID: process.env.NEXT_PUBLIC_GTM_ID || 'GTM-PCJ78FZ5',
  },

  // Event Configuration
  EVENTS: {
    // Standard META Events
    PAGE_VIEW: 'PageView',
    LEAD: 'Lead',
    COMPLETE_REGISTRATION: 'CompleteRegistration',
    PURCHASE: 'Purchase',
    ADD_TO_CART: 'AddToCart',
    INITIATE_CHECKOUT: 'InitiateCheckout',
    SEARCH: 'Search',
    VIEW_CONTENT: 'ViewContent',
    CONTACT: 'Contact',
    
    // Custom Events
    CONSULTATION_REQUEST: 'ConsultationRequest',
    UNIVERSITY_INTEREST: 'UniversityInterest',
    SCHOLARSHIP_INQUIRY: 'ScholarshipInquiry',
    VISA_ASSISTANCE_REQUEST: 'VisaAssistanceRequest',
    B2B_LEAD: 'B2BLead',
  },

  // Content Categories
  CONTENT_CATEGORIES: {
    EDUCATION: 'Education',
    UNIVERSITY: 'University',
    SCHOLARSHIP: 'Scholarship',
    VISA: 'Visa',
    COUNSELING: 'Counseling',
    B2B: 'B2B',
  },

  // Currency Configuration
  CURRENCY: 'USD',

  // Test Mode Configuration
  IS_TEST_MODE: process.env.NODE_ENV !== 'production' || !process.env.META_ACCESS_TOKEN,
};

// Enhanced Event Data Interface
export interface EnhancedEventData {
  event_name: string;
  event_time: number;
  event_source_url: string;
  action_source: 'website' | 'app' | 'phone_call' | 'chat' | 'physical_store' | 'system_generated' | 'other';
  user_data?: {
    em?: string; // hashed email
    ph?: string; // hashed phone
    fn?: string; // hashed first name
    ln?: string; // hashed last name
    ct?: string; // hashed city
    st?: string; // hashed state
    country?: string; // country code
    zp?: string; // hashed zip code
    db?: string; // hashed date of birth
    ge?: string; // hashed gender
    external_id?: string;
    client_ip_address?: string;
    client_user_agent?: string;
  };
  custom_data?: {
    content_name?: string;
    content_category?: string;
    content_ids?: string[];
    content_type?: string;
    contents?: Array<{
      id: string;
      quantity: number;
      item_price: number;
    }>;
    currency?: string;
    value?: number;
    num_items?: number;
    search_string?: string;
    status?: string;
    // Custom fields for EduExpress
    country_of_interest?: string;
    program_type?: string;
    major?: string;
    university_name?: string;
    scholarship_amount?: number;
    visa_type?: string;
    lead_source?: string;
    form_type?: string;
    [key: string]: any;
  };
}

// Utility Functions
export const createEventData = (
  eventName: string,
  customData: any = {},
  userData: any = {}
): EnhancedEventData => {
  return {
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_source_url: typeof window !== 'undefined' ? window.location.href : 'https://eduexpressint.com',
    action_source: 'website',
    user_data: userData,
    custom_data: {
      content_category: TRACKING_CONFIG.CONTENT_CATEGORIES.EDUCATION,
      currency: TRACKING_CONFIG.CURRENCY,
      ...customData,
    },
  };
};

// Event Tracking Functions
export const trackEvent = async (
  eventName: string,
  customData: any = {},
  userData: any = {}
) => {
  if (typeof window === 'undefined') return;

  const eventData = createEventData(eventName, customData, userData);
  
  try {
    // Send to META Conversion API
    const response = await fetch('/api/tracking/meta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        events: [eventData],
        test_event_code: TRACKING_CONFIG.META.TEST_EVENT_CODE,
      }),
    });

    if (response.ok) {
      console.log(`✅ Event tracked: ${eventName}`, eventData);
    } else {
      console.error(`❌ Event tracking failed: ${eventName}`, await response.text());
    }
  } catch (error) {
    console.error(`❌ Event tracking error: ${eventName}`, error);
  }
};

// Specific Event Tracking Functions
export const trackPageView = (pageName: string, customData: any = {}) => {
  trackEvent(TRACKING_CONFIG.EVENTS.PAGE_VIEW, {
    content_name: pageName,
    ...customData,
  });
};

export const trackLead = (leadData: any) => {
  trackEvent(TRACKING_CONFIG.EVENTS.LEAD, {
    content_name: 'Lead Generation',
    lead_source: leadData.source || 'Website',
    form_type: leadData.formType || 'Contact Form',
    country_of_interest: leadData.countryOfInterest,
    program_type: leadData.programType,
    major: leadData.major,
    value: 50, // Estimated lead value
    ...leadData,
  }, {
    em: leadData.email,
    ph: leadData.phone,
    fn: leadData.name?.split(' ')[0],
    ln: leadData.name?.split(' ').slice(1).join(' '),
  });
};

export const trackConsultationRequest = (consultationData: any) => {
  trackEvent(TRACKING_CONFIG.EVENTS.CONSULTATION_REQUEST, {
    content_name: 'Free Consultation Request',
    content_category: TRACKING_CONFIG.CONTENT_CATEGORIES.COUNSELING,
    country_of_interest: consultationData.countryOfInterest,
    program_type: consultationData.programType,
    value: 100, // Estimated consultation value
    ...consultationData,
  });
};

export const trackUniversityInterest = (universityData: any) => {
  trackEvent(TRACKING_CONFIG.EVENTS.UNIVERSITY_INTEREST, {
    content_name: 'University Interest',
    content_category: TRACKING_CONFIG.CONTENT_CATEGORIES.UNIVERSITY,
    university_name: universityData.universityName,
    country_of_interest: universityData.country,
    program_type: universityData.program,
    ...universityData,
  });
};

export const trackScholarshipInquiry = (scholarshipData: any) => {
  trackEvent(TRACKING_CONFIG.EVENTS.SCHOLARSHIP_INQUIRY, {
    content_name: 'Scholarship Inquiry',
    content_category: TRACKING_CONFIG.CONTENT_CATEGORIES.SCHOLARSHIP,
    scholarship_amount: scholarshipData.amount,
    country_of_interest: scholarshipData.country,
    ...scholarshipData,
  });
};

export const trackB2BLead = (b2bData: any) => {
  trackEvent(TRACKING_CONFIG.EVENTS.B2B_LEAD, {
    content_name: 'B2B Lead',
    content_category: TRACKING_CONFIG.CONTENT_CATEGORIES.B2B,
    value: 500, // Estimated B2B lead value
    ...b2bData,
  });
};
