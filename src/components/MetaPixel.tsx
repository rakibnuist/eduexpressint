'use client';

import React, { useEffect, useState } from 'react';

// Meta Pixel configuration
const PIXEL_ID = '1444050970227269';

// Declare fbq function for TypeScript
declare global {
  interface Window {
    fbq: any;
  }
}

// Initialize Meta Pixel (now handled in layout.tsx, this is for utility functions)
export const initMetaPixel = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    return window.fbq;
  }
  return null;
};

// Meta Pixel Provider Component
export default function MetaPixelProvider({ children }: { children: React.ReactNode }) {
  const [pixelInstance, setPixelInstance] = useState<any>(null);

  useEffect(() => {
    const initializePixel = () => {
      const pixel = initMetaPixel();
      setPixelInstance(pixel);
    };
    
    // Wait for the pixel to be loaded from layout.tsx
    const timer = setTimeout(initializePixel, 100);
    return () => clearTimeout(timer);
  }, []);

  return <>{children}</>;
}

// Meta Pixel tracking functions
export const metaPixel = {
  // Track page views
  pageView: () => {
    if (typeof window !== 'undefined' && window.fbq) {
      try {
        window.fbq('track', 'PageView');
      } catch (error) {
        console.error('Failed to track page view:', error);
      }
    }
  },

  // Track lead generation
  trackLead: (leadData: {
    content_name?: string;
    content_category?: string;
    value?: number;
    currency?: string;
    email?: string;
    phone?: string;
    destination?: string;
    university?: string;
    program?: string;
    source?: string;
  }) => {
    if (typeof window !== 'undefined' && window.fbq) {
      try {
        window.fbq('track', 'Lead', {
          content_name: leadData.content_name || 'Lead Generated',
          content_category: leadData.content_category || 'Education',
          value: leadData.value || 1,
          currency: leadData.currency || 'USD',
          email: leadData.email,
          phone: leadData.phone,
          destination: leadData.destination,
          university: leadData.university,
          program: leadData.program,
          source: leadData.source || 'Website'
        });
        
        console.log('Meta Pixel Lead tracked:', leadData);
      } catch (error) {
        console.error('Failed to track lead:', error);
      }
    }
  },

  // Track form submissions
  trackFormSubmission: (formData: {
    form_name?: string;
    form_type?: string;
    content_name?: string;
    value?: number;
    currency?: string;
  }) => {
    if (typeof window !== 'undefined' && window.fbq) {
      try {
        window.fbq('track', 'CompleteRegistration', {
          content_name: formData.content_name || 'Form Submission',
          form_name: formData.form_name || 'Contact Form',
          form_type: formData.form_type || 'Lead Generation',
          value: formData.value || 1,
          currency: formData.currency || 'USD'
        });
        
        console.log('Meta Pixel Form Submission tracked:', formData);
      } catch (error) {
        console.error('Failed to track form submission:', error);
      }
    }
  },

  // Track custom events
  trackCustomEvent: (eventName: string, eventData: Record<string, any> = {}) => {
    if (typeof window !== 'undefined' && window.fbq) {
      try {
        window.fbq('track', eventName, eventData);
        console.log('Meta Pixel Custom Event tracked:', eventName, eventData);
      } catch (error) {
        console.error('Failed to track custom event:', error);
      }
    }
  },

  // Track view content (for university pages, destination pages, etc.)
  trackViewContent: (contentData: {
    content_name?: string;
    content_category?: string;
    content_ids?: string[];
    value?: number;
    currency?: string;
  }) => {
    if (typeof window !== 'undefined' && window.fbq) {
      try {
        window.fbq('track', 'ViewContent', {
          content_name: contentData.content_name || 'Content Viewed',
          content_category: contentData.content_category || 'Education',
          content_ids: contentData.content_ids || [],
          value: contentData.value || 0,
          currency: contentData.currency || 'USD'
        });
        
        console.log('Meta Pixel ViewContent tracked:', contentData);
      } catch (error) {
        console.error('Failed to track view content:', error);
      }
    }
  },

  // Track search events
  trackSearch: (searchData: {
    search_string?: string;
    content_category?: string;
  }) => {
    if (typeof window !== 'undefined' && window.fbq) {
      try {
        window.fbq('track', 'Search', {
          search_string: searchData.search_string || '',
          content_category: searchData.content_category || 'Education'
        });
        
        console.log('Meta Pixel Search tracked:', searchData);
      } catch (error) {
        console.error('Failed to track search:', error);
      }
    }
  },

  // Track add to cart (for programs/universities)
  trackAddToCart: (cartData: {
    content_name?: string;
    content_category?: string;
    content_ids?: string[];
    value?: number;
    currency?: string;
  }) => {
    if (typeof window !== 'undefined' && window.fbq) {
      try {
        window.fbq('track', 'AddToCart', {
          content_name: cartData.content_name || 'Program Added',
          content_category: cartData.content_category || 'Education',
          content_ids: cartData.content_ids || [],
          value: cartData.value || 0,
          currency: cartData.currency || 'USD'
        });
        
        console.log('Meta Pixel AddToCart tracked:', cartData);
      } catch (error) {
        console.error('Failed to track add to cart:', error);
      }
    }
  },

  // Test event for Facebook Events Manager validation
  trackTestEvent: (testCode: string = 'TEST65812') => {
    if (typeof window !== 'undefined' && window.fbq) {
      try {
        // Send test event with the specific test code
        window.fbq('track', 'Lead', {
          test_event_code: testCode,
          content_name: 'Meta Pixel Test Event',
          content_category: 'Testing',
          value: 1,
          currency: 'USD',
          source: 'Test Button'
        });
        
        // Also track as custom event for additional verification
        window.fbq('trackCustom', 'TestEvent', {
          test_event_code: testCode,
          event_source: 'Website Test',
          timestamp: new Date().toISOString()
        });
        
        console.log('Meta Pixel Test Event tracked with code:', testCode);
        return true;
      } catch (error) {
        console.error('Failed to track test event:', error);
        return false;
      }
    }
    return false;
  },

  // Trigger multiple test events for comprehensive testing
  runTestSuite: (testCode: string = 'TEST65812') => {
    if (typeof window !== 'undefined' && window.fbq) {
      try {
        // Test PageView
        window.fbq('track', 'PageView', { test_event_code: testCode });
        
        // Test Lead
        window.fbq('track', 'Lead', {
          test_event_code: testCode,
          content_name: 'Test Lead Generation',
          value: 1,
          currency: 'USD'
        });
        
        // Test ViewContent
        window.fbq('track', 'ViewContent', {
          test_event_code: testCode,
          content_name: 'Test Content View',
          content_category: 'Education'
        });
        
        // Test CompleteRegistration
        window.fbq('track', 'CompleteRegistration', {
          test_event_code: testCode,
          content_name: 'Test Form Submission'
        });
        
        console.log('Meta Pixel Test Suite completed with code:', testCode);
        return true;
      } catch (error) {
        console.error('Failed to run test suite:', error);
        return false;
      }
    }
    return false;
  }
};

// Hook for using Meta Pixel in components
export const useMetaPixel = () => {
  return metaPixel;
};
