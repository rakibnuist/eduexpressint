'use client';

import React, { useEffect } from 'react';

// Stape Configuration
const STAPE_URL = process.env.NEXT_PUBLIC_STAPE_URL;
const SERVER_GTM_ID = process.env.NEXT_PUBLIC_SERVER_GTM_ID || 'GTM-MCG5MT3K';

// Enhanced Stape tracking functions
export const stapeTracking = {
  // Initialize Stape tracking
  init: () => {
    if (typeof window !== 'undefined' && STAPE_URL) {
      // Initialize server-side GTM through Stape
      const script = document.createElement('script');
      script.async = true;
      script.src = `${STAPE_URL}/gtm.js?id=${SERVER_GTM_ID}`;
      document.head.appendChild(script);
      
      // Initialize dataLayer for server-side events
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
      });
      
      console.log('Stape tracking initialized:', {
        stape_url: STAPE_URL,
        server_gtm_id: SERVER_GTM_ID,
        cost: 'FREE (10,000 requests/month)'
      });
    } else {
      console.log('Stape URL not configured - using fallback tracking');
    }
  },

  // Send enhanced lead to Stape → GTM → Meta
  trackLeadViaStape: async (leadData: any) => {
    if (typeof window === 'undefined') return;

    // 1. Client-side Meta Pixel (fallback)
    if (window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: leadData.content_name || 'Study Abroad Lead',
        content_category: 'Education',
        value: leadData.value || 1,
        currency: 'USD',
        custom_data: {
          destination: leadData.destination,
          study_level: leadData.studyLevel,
          program_type: leadData.programType,
          source: leadData.source,
        }
      });
    }

    // 2. Send to Stape server-side GTM
    window.dataLayer.push({
      event: 'stape_lead',
      event_name: 'Lead',
      user_data: {
        email: leadData.email,
        phone: leadData.phone,
        first_name: leadData.firstName,
        last_name: leadData.lastName,
      },
      custom_data: {
        content_name: leadData.content_name || 'Study Abroad Lead',
        content_category: 'Education',
        value: leadData.value || 1,
        currency: 'USD',
        destination: leadData.destination,
        study_level: leadData.studyLevel,
        program_type: leadData.programType,
        source: leadData.source || 'Website',
      },
      event_source_url: window.location.href,
      timestamp: new Date().toISOString(),
    });

    console.log('Lead sent to Stape → GTM → Meta:', leadData);
  },

  // Send enhanced page view to Stape
  trackPageViewViaStape: (pageData: any = {}) => {
    if (typeof window === 'undefined') return;

    // Client-side Meta Pixel
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }

    // Send to Stape server-side GTM
    window.dataLayer.push({
      event: 'stape_page_view',
      event_name: 'PageView',
      page_data: {
        page_title: document.title,
        page_location: window.location.href,
        page_referrer: document.referrer,
        content_category: 'Education',
        ...pageData,
      },
      timestamp: new Date().toISOString(),
    });

    console.log('PageView sent to Stape → GTM → Meta');
  },

  // Send form submission to Stape
  trackFormSubmissionViaStape: (formData: any) => {
    if (typeof window === 'undefined') return;

    // Client-side Meta Pixel
    if (window.fbq) {
      window.fbq('track', 'CompleteRegistration', {
        content_name: formData.form_name || 'Contact Form',
        value: 1,
        currency: 'USD',
      });
    }

    // Send to Stape server-side GTM
    window.dataLayer.push({
      event: 'stape_form_submission',
      event_name: 'CompleteRegistration',
      user_data: {
        email: formData.email,
        phone: formData.phone,
      },
      custom_data: {
        content_name: formData.form_name || 'Contact Form',
        form_type: formData.form_type || 'Lead Generation',
        value: 1,
        currency: 'USD',
      },
      timestamp: new Date().toISOString(),
    });

    console.log('Form submission sent to Stape → GTM → Meta:', formData);
  },

  // Test Stape connection
  testStapeConnection: () => {
    if (typeof window === 'undefined') return false;

    try {
      // Send test event to Stape
      window.dataLayer.push({
        event: 'stape_test',
        event_name: 'Lead',
        test_event_code: 'TEST65812',
        user_data: {
          email: 'test@eduexpress.com',
          phone: '+1-555-STAPE-TEST',
        },
        custom_data: {
          content_name: 'Stape Connection Test',
          content_category: 'Testing',
          value: 1,
          currency: 'USD',
          source: 'Stape Test',
        },
        timestamp: new Date().toISOString(),
      });

      console.log('Stape test event sent successfully');
      return true;
    } catch (error) {
      console.error('Stape test failed:', error);
      return false;
    }
  },

  // Check if Stape is configured
  isConfigured: () => {
    return !!(STAPE_URL && SERVER_GTM_ID);
  },

  // Get configuration info
  getConfig: () => {
    return {
      stape_url: STAPE_URL || 'Not configured',
      server_gtm_id: SERVER_GTM_ID,
      is_configured: stapeTracking.isConfigured(),
      cost: 'FREE (10,000 requests/month)',
    };
  }
};

// Stape Tracking Provider Component
export default function StapeTrackingProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Stape tracking
    stapeTracking.init();
    
    // Track initial page view
    stapeTracking.trackPageViewViaStape({
      page_type: 'initial_load',
      section: 'website',
    });
  }, []);

  return <>{children}</>;
}

// Hook for using Stape tracking
export const useStapeTracking = () => {
  return stapeTracking;
};

// Declare global dataLayer
declare global {
  interface Window {
    dataLayer: any[];
    fbq: any;
  }
}
