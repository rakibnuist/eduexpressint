'use client';

import { useEffect, useState } from 'react';

// Meta Pixel configuration
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || 'YOUR_PIXEL_ID_HERE';

// Initialize Meta Pixel
export const initMetaPixel = async () => {
  if (typeof window !== 'undefined' && PIXEL_ID && PIXEL_ID !== 'YOUR_PIXEL_ID_HERE') {
    try {
      // Dynamically import react-facebook-pixel only on client side
      const ReactPixel = (await import('react-facebook-pixel')).default;
      
      ReactPixel.init(PIXEL_ID, undefined, {
        autoConfig: true,
        debug: process.env.NODE_ENV === 'development'
      });
      
      // Track page view
      ReactPixel.pageView();
      
      console.log('Meta Pixel initialized with ID:', PIXEL_ID);
      return ReactPixel;
    } catch (error) {
      console.error('Failed to initialize Meta Pixel:', error);
      return null;
    }
  }
  return null;
};

// Meta Pixel Provider Component
export default function MetaPixelProvider({ children }: { children: React.ReactNode }) {
  const [pixelInstance, setPixelInstance] = useState<any>(null);

  useEffect(() => {
    const initializePixel = async () => {
      const pixel = await initMetaPixel();
      setPixelInstance(pixel);
    };
    
    initializePixel();
  }, []);

  return <>{children}</>;
}

// Meta Pixel tracking functions
export const metaPixel = {
  // Track page views
  pageView: async () => {
    if (typeof window !== 'undefined' && PIXEL_ID && PIXEL_ID !== 'YOUR_PIXEL_ID_HERE') {
      try {
        const ReactPixel = (await import('react-facebook-pixel')).default;
        ReactPixel.pageView();
      } catch (error) {
        console.error('Failed to track page view:', error);
      }
    }
  },

  // Track lead generation
  trackLead: async (leadData: {
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
    if (typeof window !== 'undefined' && PIXEL_ID && PIXEL_ID !== 'YOUR_PIXEL_ID_HERE') {
      try {
        const ReactPixel = (await import('react-facebook-pixel')).default;
        ReactPixel.track('Lead', {
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
  trackFormSubmission: async (formData: {
    form_name?: string;
    form_type?: string;
    content_name?: string;
    value?: number;
    currency?: string;
  }) => {
    if (typeof window !== 'undefined' && PIXEL_ID && PIXEL_ID !== 'YOUR_PIXEL_ID_HERE') {
      try {
        const ReactPixel = (await import('react-facebook-pixel')).default;
        ReactPixel.track('CompleteRegistration', {
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
  trackCustomEvent: async (eventName: string, eventData: Record<string, any> = {}) => {
    if (typeof window !== 'undefined' && PIXEL_ID && PIXEL_ID !== 'YOUR_PIXEL_ID_HERE') {
      try {
        const ReactPixel = (await import('react-facebook-pixel')).default;
        ReactPixel.track(eventName, eventData);
        console.log('Meta Pixel Custom Event tracked:', eventName, eventData);
      } catch (error) {
        console.error('Failed to track custom event:', error);
      }
    }
  },

  // Track view content (for university pages, destination pages, etc.)
  trackViewContent: async (contentData: {
    content_name?: string;
    content_category?: string;
    content_ids?: string[];
    value?: number;
    currency?: string;
  }) => {
    if (typeof window !== 'undefined' && PIXEL_ID && PIXEL_ID !== 'YOUR_PIXEL_ID_HERE') {
      try {
        const ReactPixel = (await import('react-facebook-pixel')).default;
        ReactPixel.track('ViewContent', {
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
  trackSearch: async (searchData: {
    search_string?: string;
    content_category?: string;
  }) => {
    if (typeof window !== 'undefined' && PIXEL_ID && PIXEL_ID !== 'YOUR_PIXEL_ID_HERE') {
      try {
        const ReactPixel = (await import('react-facebook-pixel')).default;
        ReactPixel.track('Search', {
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
  trackAddToCart: async (cartData: {
    content_name?: string;
    content_category?: string;
    content_ids?: string[];
    value?: number;
    currency?: string;
  }) => {
    if (typeof window !== 'undefined' && PIXEL_ID && PIXEL_ID !== 'YOUR_PIXEL_ID_HERE') {
      try {
        const ReactPixel = (await import('react-facebook-pixel')).default;
        ReactPixel.track('AddToCart', {
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
  }
};

// Hook for using Meta Pixel in components
export const useMetaPixel = () => {
  return metaPixel;
};
