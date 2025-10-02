'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';

// Google Tag Manager configuration
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

// Initialize Google Tag Manager
export const initGTM = () => {
  if (typeof window !== 'undefined' && GTM_ID) {
    // Initialize GTM
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer?.push(args);
    }
    gtag('js', new Date());
    gtag('config', GTM_ID);
    
    return true;
  }
  return false;
};

// GTM Provider Component
export default function GoogleTagManagerProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (GTM_ID) {
      initGTM();
    }
  }, []);

  return (
    <>
      {/* Google Tag Manager */}
      {GTM_ID && (
        <>
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-${GTM_ID}');
              `,
            }}
          />
        </>
      )}
      {children}
    </>
  );
}

// GTM tracking functions
export const gtm = {
  // Track page views
  pageView: (url: string, title?: string) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page_title: title || document.title,
        page_location: url || window.location.href,
        page_path: window.location.pathname,
      });
    }
  },

  // Track lead generation
  trackLead: (leadData: {
    lead_id?: string;
    lead_type?: string;
    lead_value?: number;
    lead_currency?: string;
    lead_source?: string;
    lead_medium?: string;
    lead_campaign?: string;
    lead_content?: string;
    lead_term?: string;
    email?: string;
    phone?: string;
    country?: string;
    program?: string;
    university?: string;
  }) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'generate_lead',
        lead_id: leadData.lead_id || `lead_${Date.now()}`,
        lead_type: leadData.lead_type || 'Study Abroad Inquiry',
        lead_value: leadData.lead_value || 1000,
        lead_currency: leadData.lead_currency || 'USD',
        lead_source: leadData.lead_source || 'Website',
        lead_medium: leadData.lead_medium || 'Organic',
        lead_campaign: leadData.lead_campaign || 'Study Abroad',
        lead_content: leadData.lead_content || 'Contact Form',
        lead_term: leadData.lead_term || 'Study Abroad',
        email: leadData.email,
        phone: leadData.phone,
        country: leadData.country,
        program: leadData.program,
        university: leadData.university,
        custom_parameters: {
          form_type: 'lead_generation',
          page_type: 'landing_page',
          user_type: 'prospect'
        }
      });
      
    }
  },

  // Track form submissions
  trackFormSubmission: (formData: {
    form_id?: string;
    form_name?: string;
    form_type?: string;
    form_value?: number;
    form_currency?: string;
    email?: string;
    phone?: string;
    country?: string;
    program?: string;
  }) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'form_submit',
        form_id: formData.form_id || 'contact_form',
        form_name: formData.form_name || 'Contact Form',
        form_type: formData.form_type || 'Lead Generation',
        form_value: formData.form_value || 500,
        form_currency: formData.form_currency || 'USD',
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        program: formData.program,
        custom_parameters: {
          form_location: window.location.pathname,
          form_timestamp: new Date().toISOString()
        }
      });
      
    }
  },

  // Track custom events
  trackCustomEvent: (eventName: string, eventData: Record<string, any> = {}) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...eventData,
        custom_parameters: {
          event_timestamp: new Date().toISOString(),
          event_page: window.location.pathname,
          event_referrer: document.referrer
        }
      });
    }
  },

  // Track view content (for university pages, destination pages, etc.)
  trackViewContent: (contentData: {
    content_id?: string;
    content_name?: string;
    content_category?: string;
    content_type?: string;
    content_value?: number;
    content_currency?: string;
    university?: string;
    country?: string;
    program?: string;
  }) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'view_content',
        content_id: contentData.content_id || `content_${Date.now()}`,
        content_name: contentData.content_name || 'Content Viewed',
        content_category: contentData.content_category || 'Education',
        content_type: contentData.content_type || 'University Page',
        content_value: contentData.content_value || 0,
        content_currency: contentData.content_currency || 'USD',
        university: contentData.university,
        country: contentData.country,
        program: contentData.program,
        custom_parameters: {
          content_page: window.location.pathname,
          content_timestamp: new Date().toISOString()
        }
      });
      
    }
  },

  // Track search events
  trackSearch: (searchData: {
    search_term?: string;
    search_category?: string;
    search_results?: number;
    search_type?: string;
  }) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'search',
        search_term: searchData.search_term || '',
        search_category: searchData.search_category || 'Education',
        search_results: searchData.search_results || 0,
        search_type: searchData.search_type || 'University Search',
        custom_parameters: {
          search_page: window.location.pathname,
          search_timestamp: new Date().toISOString()
        }
      });
      
    }
  },

  // Track add to cart (for programs/universities)
  trackAddToCart: (cartData: {
    item_id?: string;
    item_name?: string;
    item_category?: string;
    item_variant?: string;
    item_brand?: string;
    price?: number;
    currency?: string;
    quantity?: number;
    university?: string;
    country?: string;
    program?: string;
  }) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'add_to_cart',
        item_id: cartData.item_id || `item_${Date.now()}`,
        item_name: cartData.item_name || 'Program Added',
        item_category: cartData.item_category || 'Education',
        item_variant: cartData.item_variant || 'Study Program',
        item_brand: cartData.item_brand || 'EduExpress',
        price: cartData.price || 0,
        currency: cartData.currency || 'USD',
        quantity: cartData.quantity || 1,
        university: cartData.university,
        country: cartData.country,
        program: cartData.program,
        custom_parameters: {
          cart_page: window.location.pathname,
          cart_timestamp: new Date().toISOString()
        }
      });
      
    }
  },

  // Track purchase events
  trackPurchase: (purchaseData: {
    transaction_id?: string;
    value?: number;
    currency?: string;
    items?: Array<{
      item_id: string;
      item_name: string;
      item_category: string;
      price: number;
      quantity: number;
    }>;
    university?: string;
    country?: string;
    program?: string;
  }) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'purchase',
        transaction_id: purchaseData.transaction_id || `txn_${Date.now()}`,
        value: purchaseData.value || 0,
        currency: purchaseData.currency || 'USD',
        items: purchaseData.items || [],
        university: purchaseData.university,
        country: purchaseData.country,
        program: purchaseData.program,
        custom_parameters: {
          purchase_page: window.location.pathname,
          purchase_timestamp: new Date().toISOString()
        }
      });
      
    }
  },

  // Track user engagement
  trackEngagement: (engagementData: {
    engagement_type?: string;
    engagement_value?: number;
    engagement_duration?: number;
    page_section?: string;
    content_id?: string;
  }) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'user_engagement',
        engagement_type: engagementData.engagement_type || 'page_interaction',
        engagement_value: engagementData.engagement_value || 1,
        engagement_duration: engagementData.engagement_duration || 0,
        page_section: engagementData.page_section || 'main_content',
        content_id: engagementData.content_id || window.location.pathname,
        custom_parameters: {
          engagement_page: window.location.pathname,
          engagement_timestamp: new Date().toISOString()
        }
      });
      
    }
  }
};

// Hook for using GTM in components
export const useGTM = () => {
  return gtm;
};

// dataLayer is already declared in TrackLead.tsx
