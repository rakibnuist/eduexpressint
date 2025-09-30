'use client';

import { useEffect } from 'react';
import { metaPixel } from './MetaPixel';
import { gtm } from './GoogleTagManager';

interface LeadData {
  // Basic Information
  name?: string;
  email?: string;
  phone?: string;
  
  // Lead Details
  leadType?: 'consultation' | 'application' | 'scholarship' | 'visa' | 'general';
  leadSource?: 'website' | 'social_media' | 'referral' | 'advertisement' | 'event' | 'other';
  leadMedium?: 'organic' | 'paid' | 'social' | 'email' | 'direct';
  leadCampaign?: string;
  leadContent?: string;
  leadTerm?: string;
  
  // Educational Information
  country?: string;
  university?: string;
  program?: string;
  programLevel?: 'bachelor' | 'master' | 'phd' | 'diploma' | 'certificate' | 'language';
  studyYear?: string;
  budget?: number;
  currency?: string;
  
  // Additional Data
  notes?: string;
  formLocation?: string;
  pageUrl?: string;
  referrer?: string;
  userAgent?: string;
  timestamp?: string;
  
  // Custom Parameters
  customParameters?: Record<string, any>;
}

interface ConversionData {
  conversionType: 'lead' | 'form_submission' | 'consultation_request' | 'application_start' | 'application_complete';
  conversionValue?: number;
  conversionCurrency?: string;
  conversionId?: string;
}

class LeadTracker {
  private static instance: LeadTracker;
  private isInitialized = false;

  private constructor() {}

  public static getInstance(): LeadTracker {
    if (!LeadTracker.instance) {
      LeadTracker.instance = new LeadTracker();
    }
    return LeadTracker.instance;
  }

  public initialize() {
    if (this.isInitialized) return;
    
    // Track page view on initialization
    this.trackPageView();
    this.isInitialized = true;
  }

  // Track page views
  public trackPageView(pageUrl?: string, pageTitle?: string) {
    const url = pageUrl || (typeof window !== 'undefined' ? window.location.href : '');
    const title = pageTitle || (typeof window !== 'undefined' ? document.title : '');
    
    // Track with Meta Pixel
    metaPixel.pageView();
    
    // Track with GTM
    gtm.pageView(url, title);
    
  }

  // Track lead generation
  public trackLead(leadData: LeadData) {
    const enhancedLeadData = this.enhanceLeadData(leadData);
    
    // Track with Meta Pixel
    metaPixel.trackLead({
      content_name: enhancedLeadData.leadType || 'Lead Generated',
      content_category: 'Education',
      value: enhancedLeadData.budget || 1000,
      currency: enhancedLeadData.currency || 'USD',
      email: enhancedLeadData.email,
      phone: enhancedLeadData.phone,
      destination: enhancedLeadData.country,
      university: enhancedLeadData.university,
      program: enhancedLeadData.program,
      source: enhancedLeadData.leadSource || 'Website'
    });
    
    // Track with GTM
    gtm.trackLead({
      lead_id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      lead_type: enhancedLeadData.leadType || 'Study Abroad Inquiry',
      lead_value: enhancedLeadData.budget || 1000,
      lead_currency: enhancedLeadData.currency || 'USD',
      lead_source: enhancedLeadData.leadSource || 'Website',
      lead_medium: enhancedLeadData.leadMedium || 'Organic',
      lead_campaign: enhancedLeadData.leadCampaign || 'Study Abroad',
      lead_content: enhancedLeadData.leadContent || 'Contact Form',
      lead_term: enhancedLeadData.leadTerm || 'Study Abroad',
      email: enhancedLeadData.email,
      phone: enhancedLeadData.phone,
      country: enhancedLeadData.country,
      program: enhancedLeadData.program,
      university: enhancedLeadData.university
    });
    
  }

  // Track form submissions
  public trackFormSubmission(formData: LeadData & { formName?: string; formType?: string }) {
    const enhancedFormData = this.enhanceLeadData(formData);
    
    // Track with Meta Pixel
    metaPixel.trackFormSubmission({
      form_name: (formData as any).formName || 'Contact Form',
      form_type: (formData as any).formType || 'Lead Generation',
      content_name: enhancedFormData.leadType || 'Form Submission',
      value: enhancedFormData.budget || 500,
      currency: enhancedFormData.currency || 'USD'
    });
    
    // Track with GTM
    gtm.trackFormSubmission({
      form_id: `form_${Date.now()}`,
      form_name: (formData as any).formName || 'Contact Form',
      form_type: (formData as any).formType || 'Lead Generation',
      form_value: enhancedFormData.budget || 500,
      form_currency: enhancedFormData.currency || 'USD',
      email: enhancedFormData.email,
      phone: enhancedFormData.phone,
      country: enhancedFormData.country,
      program: enhancedFormData.program
    });
    
  }

  // Track conversions
  public trackConversion(conversionData: ConversionData, leadData?: LeadData) {
    const enhancedLeadData = leadData ? this.enhanceLeadData(leadData) : null;
    
    // Track with Meta Pixel
    metaPixel.trackCustomEvent(conversionData.conversionType, {
      value: conversionData.conversionValue || 0,
      currency: conversionData.conversionCurrency || 'USD',
      conversion_id: conversionData.conversionId || `conv_${Date.now()}`,
      ...enhancedLeadData
    });
    
    // Track with GTM
    gtm.trackCustomEvent(conversionData.conversionType, {
      conversion_id: conversionData.conversionId || `conv_${Date.now()}`,
      conversion_value: conversionData.conversionValue || 0,
      conversion_currency: conversionData.conversionCurrency || 'USD',
      ...enhancedLeadData
    });
    
  }

  // Track content views
  public trackContentView(contentData: {
    contentId?: string;
    contentName?: string;
    contentCategory?: string;
    contentType?: string;
    university?: string;
    country?: string;
    program?: string;
    value?: number;
    currency?: string;
  }) {
    // Track with Meta Pixel
    metaPixel.trackViewContent({
      content_name: contentData.contentName || 'Content Viewed',
      content_category: contentData.contentCategory || 'Education',
      content_ids: contentData.contentId ? [contentData.contentId] : [],
      value: contentData.value || 0,
      currency: contentData.currency || 'USD'
    });
    
    // Track with GTM
    gtm.trackViewContent({
      content_id: contentData.contentId || `content_${Date.now()}`,
      content_name: contentData.contentName || 'Content Viewed',
      content_category: contentData.contentCategory || 'Education',
      content_type: contentData.contentType || 'University Page',
      content_value: contentData.value || 0,
      content_currency: contentData.currency || 'USD',
      university: contentData.university,
      country: contentData.country,
      program: contentData.program
    });
    
  }

  // Track search events
  public trackSearch(searchData: {
    searchTerm?: string;
    searchCategory?: string;
    searchResults?: number;
    searchType?: string;
  }) {
    // Track with Meta Pixel
    metaPixel.trackSearch({
      search_string: searchData.searchTerm || '',
      content_category: searchData.searchCategory || 'Education'
    });
    
    // Track with GTM
    gtm.trackSearch({
      search_term: searchData.searchTerm || '',
      search_category: searchData.searchCategory || 'Education',
      search_results: searchData.searchResults || 0,
      search_type: searchData.searchType || 'University Search'
    });
    
  }

  // Track user engagement
  public trackEngagement(engagementData: {
    engagementType?: string;
    engagementValue?: number;
    engagementDuration?: number;
    pageSection?: string;
    contentId?: string;
  }) {
    gtm.trackEngagement({
      engagement_type: engagementData.engagementType || 'page_interaction',
      engagement_value: engagementData.engagementValue || 1,
      engagement_duration: engagementData.engagementDuration || 0,
      page_section: engagementData.pageSection || 'main_content',
      content_id: engagementData.contentId || (typeof window !== 'undefined' ? window.location.pathname : '')
    });
    
  }

  // Enhance lead data with additional information
  private enhanceLeadData(leadData: LeadData): LeadData {
    const enhanced = { ...leadData };
    
    // Add timestamp if not provided
    if (!enhanced.timestamp) {
      enhanced.timestamp = new Date().toISOString();
    }
    
    // Add page URL if not provided
    if (!enhanced.pageUrl && typeof window !== 'undefined') {
      enhanced.pageUrl = window.location.href;
    }
    
    // Add referrer if not provided
    if (!enhanced.referrer && typeof document !== 'undefined') {
      enhanced.referrer = document.referrer;
    }
    
    // Add user agent if not provided
    if (!enhanced.userAgent && typeof navigator !== 'undefined') {
      enhanced.userAgent = navigator.userAgent;
    }
    
    // Add form location if not provided
    if (!enhanced.formLocation && typeof window !== 'undefined') {
      enhanced.formLocation = window.location.pathname;
    }
    
    // Set default currency
    if (!enhanced.currency) {
      enhanced.currency = 'USD';
    }
    
    return enhanced;
  }

  // Get lead data from form
  public getLeadDataFromForm(formElement: HTMLFormElement): LeadData {
    const formData = new FormData(formElement);
    const leadData: LeadData = {};
    
    // Extract basic information
    if (formData.get('name')) leadData.name = formData.get('name') as string;
    if (formData.get('email')) leadData.email = formData.get('email') as string;
    if (formData.get('phone')) leadData.phone = formData.get('phone') as string;
    
    // Extract educational information
    if (formData.get('country')) leadData.country = formData.get('country') as string;
    if (formData.get('university')) leadData.university = formData.get('university') as string;
    if (formData.get('program')) leadData.program = formData.get('program') as string;
    if (formData.get('programLevel')) leadData.programLevel = formData.get('programLevel') as any;
    if (formData.get('studyYear')) leadData.studyYear = formData.get('studyYear') as string;
    if (formData.get('budget')) leadData.budget = parseFloat(formData.get('budget') as string);
    if (formData.get('currency')) leadData.currency = formData.get('currency') as string;
    
    // Extract lead details
    if (formData.get('leadType')) leadData.leadType = formData.get('leadType') as any;
    if (formData.get('leadSource')) leadData.leadSource = formData.get('leadSource') as any;
    if (formData.get('leadMedium')) leadData.leadMedium = formData.get('leadMedium') as any;
    if (formData.get('leadCampaign')) leadData.leadCampaign = formData.get('leadCampaign') as string;
    if (formData.get('leadContent')) leadData.leadContent = formData.get('leadContent') as string;
    if (formData.get('leadTerm')) leadData.leadTerm = formData.get('leadTerm') as string;
    
    // Extract additional data
    if (formData.get('notes')) leadData.notes = formData.get('notes') as string;
    
    return leadData;
  }
}

// Create singleton instance
const leadTracker = LeadTracker.getInstance();

// Hook for using lead tracker in components
export const useLeadTracker = () => {
  useEffect(() => {
    leadTracker.initialize();
  }, []);

  return {
    trackPageView: leadTracker.trackPageView.bind(leadTracker),
    trackLead: leadTracker.trackLead.bind(leadTracker),
    trackFormSubmission: leadTracker.trackFormSubmission.bind(leadTracker),
    trackConversion: leadTracker.trackConversion.bind(leadTracker),
    trackContentView: leadTracker.trackContentView.bind(leadTracker),
    trackSearch: leadTracker.trackSearch.bind(leadTracker),
    trackEngagement: leadTracker.trackEngagement.bind(leadTracker),
    getLeadDataFromForm: leadTracker.getLeadDataFromForm.bind(leadTracker)
  };
};

// Export the singleton instance
export default leadTracker;
