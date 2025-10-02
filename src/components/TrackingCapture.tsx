'use client';

import React, { useEffect } from 'react';

interface TrackingData {
  metaTracking?: {
    fbclid?: string;
    campaignId?: string;
    adsetId?: string;
    adId?: string;
    campaignName?: string;
    adsetName?: string;
    adName?: string;
    placement?: string;
    deviceType?: string;
    platform?: string;
  };
  gtmTracking?: {
    gclid?: string;
    campaignId?: string;
    adgroupId?: string;
    keywordId?: string;
    campaignName?: string;
    adgroupName?: string;
    keyword?: string;
    matchType?: string;
    deviceType?: string;
    network?: string;
    placement?: string;
  };
  utmParams?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
  };
}

export function TrackingCapture() {
  useEffect(() => {
    // Extract tracking parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const trackingData: TrackingData = {};

    // Extract Meta (Facebook) tracking parameters
    const fbclid = urlParams.get('fbclid');
    if (fbclid) {
      trackingData.metaTracking = {
        fbclid,
        campaignId: urlParams.get('fb_campaign_id') || undefined,
        adsetId: urlParams.get('fb_adset_id') || undefined,
        adId: urlParams.get('fb_ad_id') || undefined,
        campaignName: urlParams.get('fb_campaign_name') || undefined,
        adsetName: urlParams.get('fb_adset_name') || undefined,
        adName: urlParams.get('fb_ad_name') || undefined,
        placement: urlParams.get('fb_placement') || undefined,
        deviceType: urlParams.get('fb_device_type') || undefined,
        platform: urlParams.get('fb_platform') || undefined,
      };
    }

    // Extract Google Tag Manager tracking parameters
    const gclid = urlParams.get('gclid');
    if (gclid) {
      trackingData.gtmTracking = {
        gclid,
        campaignId: urlParams.get('gclid_campaign_id') || undefined,
        adgroupId: urlParams.get('gclid_adgroup_id') || undefined,
        keywordId: urlParams.get('gclid_keyword_id') || undefined,
        campaignName: urlParams.get('gclid_campaign_name') || undefined,
        adgroupName: urlParams.get('gclid_adgroup_name') || undefined,
        keyword: urlParams.get('gclid_keyword') || undefined,
        matchType: urlParams.get('gclid_match_type') || undefined,
        deviceType: urlParams.get('gclid_device_type') || undefined,
        network: urlParams.get('gclid_network') || undefined,
        placement: urlParams.get('gclid_placement') || undefined,
      };
    }

    // Extract UTM parameters
    const utmSource = urlParams.get('utm_source');
    if (utmSource) {
      trackingData.utmParams = {
        utm_source: utmSource,
        utm_medium: urlParams.get('utm_medium') || undefined,
        utm_campaign: urlParams.get('utm_campaign') || undefined,
        utm_term: urlParams.get('utm_term') || undefined,
        utm_content: urlParams.get('utm_content') || undefined,
      };
    }

    // Store tracking data in sessionStorage for form submissions
    if (Object.keys(trackingData).length > 0) {
      sessionStorage.setItem('trackingData', JSON.stringify(trackingData));
      console.log('Tracking data captured:', trackingData);
    }

    // Also store in localStorage for persistence across sessions
    if (Object.keys(trackingData).length > 0) {
      localStorage.setItem('trackingData', JSON.stringify(trackingData));
    }

  }, []);

  return null; // This component doesn't render anything
}

// Hook to get tracking data
export function useTrackingData(): TrackingData | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const sessionData = sessionStorage.getItem('trackingData');
    const localData = localStorage.getItem('trackingData');
    
    if (sessionData) {
      return JSON.parse(sessionData);
    }
    
    if (localData) {
      return JSON.parse(localData);
    }
    
    return null;
  } catch (error) {
    console.error('Error parsing tracking data:', error);
    return null;
  }
}

// Function to add tracking data to form data
export function addTrackingToFormData(formData: FormData): FormData {
  if (typeof window === 'undefined') return formData;
  
  try {
    const sessionData = sessionStorage.getItem('trackingData');
    const localData = localStorage.getItem('trackingData');
    
    const trackingData = sessionData ? JSON.parse(sessionData) : (localData ? JSON.parse(localData) : null);
    
    if (trackingData) {
      // Add Meta tracking data
      if (trackingData.metaTracking) {
        Object.entries(trackingData.metaTracking).forEach(([key, value]) => {
          if (value) {
            formData.append(key, value);
          }
        });
      }
      
      // Add GTM tracking data
      if (trackingData.gtmTracking) {
        Object.entries(trackingData.gtmTracking).forEach(([key, value]) => {
          if (value) {
            formData.append(key, value);
          }
        });
      }
      
      // Add UTM parameters
      if (trackingData.utmParams) {
        Object.entries(trackingData.utmParams).forEach(([key, value]) => {
          if (value) {
            formData.append(key, value);
          }
        });
      }
    }
  } catch (error) {
    console.error('Error adding tracking data to form:', error);
  }
  
  return formData;
}

// Function to add tracking data to JSON data
export function addTrackingToJsonData(jsonData: any): any {
  if (typeof window === 'undefined') return jsonData;
  
  try {
    const sessionData = sessionStorage.getItem('trackingData');
    const localData = localStorage.getItem('trackingData');
    
    const trackingData = sessionData ? JSON.parse(sessionData) : (localData ? JSON.parse(localData) : null);
    
    if (trackingData) {
      return {
        ...jsonData,
        ...trackingData
      };
    }
  } catch (error) {
    console.error('Error adding tracking data to JSON:', error);
  }
  
  return jsonData;
}
