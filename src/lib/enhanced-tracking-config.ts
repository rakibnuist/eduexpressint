// Enhanced Meta Conversions API Configuration for Education Consultancy
// Based on Facebook's official documentation and best practices

export interface EducationTrackingConfig {
  // Meta Conversions API Settings
  meta: {
    pixelId: string;
    accessToken: string;
    apiVersion: string;
    testEventCode?: string;
  };
  
  // Education-specific event configurations
  events: {
    lead: EducationEventConfig;
    contact: EducationEventConfig;
    schedule: EducationEventConfig;
    submitApplication: EducationEventConfig;
    purchase: EducationEventConfig;
    viewContent: EducationEventConfig;
    completeRegistration: EducationEventConfig;
    addToCart: EducationEventConfig;
    initiateCheckout: EducationEventConfig;
  };
  
  // Custom audience configurations
  audiences: {
    educationInterest: AudienceConfig;
    leadBehavior: AudienceConfig;
    applicationStatus: AudienceConfig;
    servicePurchase: AudienceConfig;
    lookalike: AudienceConfig;
  };
  
  // GDPR and privacy settings
  privacy: {
    dataProcessingOptions: string[];
    dataProcessingOptionsCountry: number;
    dataProcessingOptionsState: number;
    optOutEnabled: boolean;
  };
}

export interface EducationEventConfig {
  eventName: string;
  value: number;
  currency: string;
  contentCategory: string;
  contentType: string;
  requiredFields: string[];
  optionalFields: string[];
  educationSpecificFields: string[];
}

export interface AudienceConfig {
  enabled: boolean;
  autoCreate: boolean;
  updateFrequency: 'daily' | 'weekly' | 'monthly';
  minSize: number;
  maxSize: number;
}

// Default configuration for education consultancy
export const defaultEducationTrackingConfig: EducationTrackingConfig = {
  meta: {
    pixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || '1444050970227269',
    accessToken: process.env.META_ACCESS_TOKEN || '',
    apiVersion: 'v18.0',
    testEventCode: process.env.META_TEST_EVENT_CODE,
  },
  
  events: {
    lead: {
      eventName: 'Lead',
      value: 1,
      currency: 'USD',
      contentCategory: 'Education',
      contentType: 'lead_generation',
      requiredFields: ['email', 'destination_country', 'study_level'],
      optionalFields: ['phone', 'program_type', 'university', 'budget'],
      educationSpecificFields: [
        'destination_country',
        'study_level',
        'program_type',
        'program_field',
        'university_name',
        'budget',
        'intake',
        'lead_source',
        'lead_quality',
        'urgency_level',
        'application_type',
        'contact_method',
        'registration_type',
      ],
    },
    
    contact: {
      eventName: 'Contact',
      value: 5,
      currency: 'USD',
      contentCategory: 'Education',
      contentType: 'contact_form',
      requiredFields: ['email', 'contact_method'],
      optionalFields: ['phone', 'inquiry_type', 'urgency_level'],
      educationSpecificFields: [
        'destination_country',
        'study_level',
        'program_type',
        'inquiry_type',
        'urgency_level',
        'contact_method',
        'consultation_topic',
      ],
    },
    
    schedule: {
      eventName: 'Schedule',
      value: 15,
      currency: 'USD',
      contentCategory: 'Education',
      contentType: 'appointment',
      requiredFields: ['email', 'appointment_type', 'scheduled_date'],
      optionalFields: ['phone', 'consultation_duration', 'meeting_platform'],
      educationSpecificFields: [
        'destination_country',
        'study_level',
        'program_type',
        'appointment_type',
        'consultation_duration',
        'consultation_topic',
        'scheduled_date',
        'timezone',
        'meeting_platform',
      ],
    },
    
    submitApplication: {
      eventName: 'SubmitApplication',
      value: 50,
      currency: 'USD',
      contentCategory: 'Education',
      contentType: 'application',
      requiredFields: ['email', 'destination_country', 'study_level'],
      optionalFields: ['phone', 'universities_count', 'application_fee'],
      educationSpecificFields: [
        'destination_country',
        'study_level',
        'program_type',
        'program_field',
        'university_name',
        'universities_count',
        'application_fee',
        'application_status',
        'application_type',
      ],
    },
    
    purchase: {
      eventName: 'Purchase',
      value: 1,
      currency: 'USD',
      contentCategory: 'Education',
      contentType: 'service',
      requiredFields: ['email', 'value', 'currency', 'transaction_id'],
      optionalFields: ['phone', 'payment_method', 'service_package'],
      educationSpecificFields: [
        'destination_country',
        'study_level',
        'program_type',
        'service_type',
        'service_package',
        'payment_method',
        'transaction_id',
        'payment_status',
      ],
    },
    
    viewContent: {
      eventName: 'ViewContent',
      value: 0,
      currency: 'USD',
      contentCategory: 'Education',
      contentType: 'page',
      requiredFields: ['content_name'],
      optionalFields: ['content_type', 'engagement_time'],
      educationSpecificFields: [
        'destination_country',
        'study_level',
        'program_type',
        'university_name',
        'content_topic',
        'engagement_time',
        'engagement_score',
        'page_type',
        'content_category',
      ],
    },
    
    completeRegistration: {
      eventName: 'CompleteRegistration',
      value: 10,
      currency: 'USD',
      contentCategory: 'Education',
      contentType: 'registration',
      requiredFields: ['email', 'registration_type'],
      optionalFields: ['phone', 'user_type', 'onboarding_completed'],
      educationSpecificFields: [
        'destination_country',
        'study_level',
        'program_type',
        'registration_type',
        'registration_method',
        'user_type',
        'account_status',
        'onboarding_completed',
      ],
    },
    
    addToCart: {
      eventName: 'AddToCart',
      value: 1,
      currency: 'USD',
      contentCategory: 'Education',
      contentType: 'service',
      requiredFields: ['email', 'service_type'],
      optionalFields: ['phone', 'cart_value', 'items_count'],
      educationSpecificFields: [
        'destination_country',
        'study_level',
        'program_type',
        'service_type',
        'cart_value',
        'items_count',
      ],
    },
    
    initiateCheckout: {
      eventName: 'InitiateCheckout',
      value: 1,
      currency: 'USD',
      contentCategory: 'Education',
      contentType: 'service',
      requiredFields: ['email', 'checkout_value'],
      optionalFields: ['phone', 'payment_method'],
      educationSpecificFields: [
        'destination_country',
        'study_level',
        'program_type',
        'service_type',
        'checkout_value',
        'payment_method',
      ],
    },
  },
  
  audiences: {
    educationInterest: {
      enabled: true,
      autoCreate: true,
      updateFrequency: 'weekly',
      minSize: 100,
      maxSize: 1000000,
    },
    leadBehavior: {
      enabled: true,
      autoCreate: true,
      updateFrequency: 'daily',
      minSize: 50,
      maxSize: 500000,
    },
    applicationStatus: {
      enabled: true,
      autoCreate: false,
      updateFrequency: 'monthly',
      minSize: 25,
      maxSize: 100000,
    },
    servicePurchase: {
      enabled: true,
      autoCreate: true,
      updateFrequency: 'weekly',
      minSize: 10,
      maxSize: 50000,
    },
    lookalike: {
      enabled: true,
      autoCreate: false,
      updateFrequency: 'monthly',
      minSize: 1000,
      maxSize: 10000000,
    },
  },
  
  privacy: {
    dataProcessingOptions: ['LDU'], // Limited Data Use
    dataProcessingOptionsCountry: 0, // US
    dataProcessingOptionsState: 0, // California
    optOutEnabled: true,
  },
};

// Education-specific field mappings for Meta Conversions API
export const educationFieldMappings = {
  // User data fields (PII - must be hashed)
  userData: {
    em: 'email', // hashed email
    ph: 'phone', // hashed phone
    fn: 'first_name', // hashed first name
    ln: 'last_name', // hashed last name
    ct: 'city', // hashed city
    st: 'state', // hashed state
    country: 'country', // hashed country
    zp: 'zip_code', // hashed zip code
    db: 'date_of_birth', // hashed date of birth
    ge: 'gender', // hashed gender
    external_id: 'external_id', // hashed external ID
  },
  
  // Non-hashed user data fields
  nonHashedUserData: {
    client_ip_address: 'client_ip_address',
    client_user_agent: 'client_user_agent',
    fbc: 'fbc', // Facebook click ID
    fbp: 'fbp', // Facebook browser ID
    subscription_id: 'subscription_id',
    fb_login_id: 'fb_login_id',
    lead_id: 'lead_id',
    page_id: 'page_id',
    page_scoped_user_id: 'page_scoped_user_id',
    ctwa_clid: 'ctwa_clid', // Click to WhatsApp ID
    ig_account_id: 'ig_account_id',
    ig_sid: 'ig_sid', // Click to Instagram ID
  },
  
  // Education-specific custom data fields
  educationCustomData: {
    destination_country: 'destination_country',
    study_level: 'study_level',
    program_type: 'program_type',
    program_field: 'program_field',
    university_name: 'university_name',
    budget: 'budget',
    intake: 'intake',
    lead_source: 'lead_source',
    lead_quality: 'lead_quality',
    urgency_level: 'urgency_level',
    application_type: 'application_type',
    contact_method: 'contact_method',
    registration_type: 'registration_type',
    application_status: 'application_status',
    application_fee: 'application_fee',
    service_type: 'service_type',
    service_package: 'service_package',
    payment_method: 'payment_method',
    transaction_id: 'transaction_id',
    payment_status: 'payment_status',
    appointment_type: 'appointment_type',
    consultation_duration: 'consultation_duration',
    consultation_topic: 'consultation_topic',
    scheduled_date: 'scheduled_date',
    timezone: 'timezone',
    meeting_platform: 'meeting_platform',
    cart_value: 'cart_value',
    items_count: 'items_count',
    checkout_value: 'checkout_value',
    inquiry_type: 'inquiry_type',
    user_type: 'user_type',
    account_status: 'account_status',
    onboarding_completed: 'onboarding_completed',
    content_topic: 'content_topic',
    engagement_time: 'engagement_time',
    engagement_score: 'engagement_score',
    page_type: 'page_type',
    user_journey_stage: 'user_journey_stage',
  },
};

// Event value configurations for education consultancy
export const educationEventValues = {
  lead: {
    base: 1,
    highQuality: 5,
    premiumDestination: 10,
    urgent: 15,
  },
  contact: {
    base: 5,
    consultation: 10,
    urgent: 15,
  },
  schedule: {
    base: 15,
    premium: 25,
    urgent: 35,
  },
  submitApplication: {
    base: 50,
    multipleUniversities: 75,
    premiumProgram: 100,
  },
  purchase: {
    consultation: 25,
    applicationAssistance: 50,
    visaGuidance: 75,
    fullPackage: 100,
  },
  viewContent: {
    base: 0,
    universityProfile: 1,
    destinationGuide: 2,
    blogPost: 1,
  },
  completeRegistration: {
    base: 10,
    withOnboarding: 15,
    premium: 20,
  },
};

// Destination country values for targeting
export const destinationCountryValues = {
  premium: ['UK', 'USA', 'Canada', 'Australia'],
  standard: ['Germany', 'Netherlands', 'France', 'Sweden'],
  emerging: ['China', 'South Korea', 'Japan', 'Singapore'],
  budget: ['Malaysia', 'Thailand', 'Philippines', 'India'],
};

// Study level values
export const studyLevelValues = {
  undergraduate: ['Bachelor', 'Foundation', 'Diploma'],
  graduate: ['Masters', 'MBA', 'PhD'],
  language: ['Language Course', 'IELTS', 'TOEFL'],
  professional: ['Certificate', 'Professional Course'],
};

// Program type values
export const programTypeValues = {
  business: ['Business', 'MBA', 'Management', 'Finance', 'Marketing'],
  engineering: ['Engineering', 'Computer Science', 'IT', 'Data Science'],
  medicine: ['Medicine', 'Nursing', 'Pharmacy', 'Dentistry'],
  arts: ['Arts', 'Design', 'Media', 'Communication'],
  sciences: ['Science', 'Mathematics', 'Physics', 'Chemistry'],
  law: ['Law', 'Legal Studies'],
  education: ['Education', 'Teaching'],
};

export default defaultEducationTrackingConfig;
