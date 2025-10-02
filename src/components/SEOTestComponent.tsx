'use client';

import React, { useEffect, useState } from 'react';
import { useEnhancedTracking } from './EnhancedTracking';

export default function SEOTestComponent() {
  const [trackingStatus, setTrackingStatus] = useState<{
    gtm: boolean;
    metaPixel: boolean;
    dataLayer: boolean;
  }>({
    gtm: false,
    metaPixel: false,
    dataLayer: false
  });

  const { trackEvent, trackFormSubmission, trackLeadGeneration, trackContentView, trackSearch } = useEnhancedTracking();

  useEffect(() => {
    // Check if tracking is properly loaded
    const checkTracking = () => {
      const gtmLoaded = !!(window as any).dataLayer;
      const metaPixelLoaded = !!(window as any).fbq;
      const dataLayerExists = !!(window as any).dataLayer;

      setTrackingStatus({
        gtm: gtmLoaded,
        metaPixel: metaPixelLoaded,
        dataLayer: dataLayerExists
      });

      console.log('Tracking Status:', {
        gtm: gtmLoaded,
        metaPixel: metaPixelLoaded,
        dataLayer: dataLayerExists
      });
    };

    // Check after a short delay to allow scripts to load
    setTimeout(checkTracking, 2000);
  }, []);

  const testTracking = () => {
    // Test form submission tracking
    trackFormSubmission({
      form_name: 'Test Form',
      form_type: 'Test',
      form_value: 100,
      email: 'test@example.com',
      phone: '+1234567890',
      country: 'Test Country',
      program: 'Test Program'
    });

    // Test lead generation tracking
    trackLeadGeneration({
      lead_type: 'Test Lead',
      lead_value: 500,
      email: 'test@example.com',
      phone: '+1234567890',
      country: 'Test Country',
      program: 'Test Program',
      source: 'Test Source'
    });

    // Test content view tracking
    trackContentView({
      content_name: 'Test Content',
      content_category: 'Test Category',
      content_type: 'Test Type',
      university: 'Test University',
      country: 'Test Country',
      program: 'Test Program'
    });

    // Test search tracking
    trackSearch({
      search_term: 'test search',
      search_category: 'Test Category',
      search_results: 10
    });

    // Test custom event tracking
    trackEvent({
      event: 'test_event',
      category: 'Test Category',
      action: 'Test Action',
      label: 'Test Label',
      value: 100,
      custom_parameters: {
        test_param: 'test_value'
      }
    });

    console.log('All tracking tests executed');
  };

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50 max-w-sm">
      <h3 className="font-bold text-sm mb-2">SEO & Tracking Test</h3>
      
      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span>GTM:</span>
          <span className={`px-2 py-1 rounded text-xs ${trackingStatus.gtm ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {trackingStatus.gtm ? '✓ Loaded' : '✗ Not Loaded'}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span>Meta Pixel:</span>
          <span className={`px-2 py-1 rounded text-xs ${trackingStatus.metaPixel ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {trackingStatus.metaPixel ? '✓ Loaded' : '✗ Not Loaded'}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span>DataLayer:</span>
          <span className={`px-2 py-1 rounded text-xs ${trackingStatus.dataLayer ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {trackingStatus.dataLayer ? '✓ Available' : '✗ Not Available'}
          </span>
        </div>
      </div>

      <button
        onClick={testTracking}
        className="mt-3 w-full bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
      >
        Test Tracking
      </button>

      <div className="mt-2 text-xs text-gray-600">
        <p>Check console for tracking logs</p>
      </div>
    </div>
  );
}
