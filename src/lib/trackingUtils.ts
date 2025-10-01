// src/lib/trackingUtils.ts

export interface TrackingData {
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

/**
 * Extract tracking parameters from URL search params
 */
export function extractTrackingFromUrl(url: string | URL): TrackingData {
  const urlObj = typeof url === 'string' ? new URL(url) : url;
  const params = urlObj.searchParams;
  
  const trackingData: TrackingData = {};

  // Extract Meta (Facebook) tracking parameters
  const fbclid = params.get('fbclid');
  if (fbclid) {
    trackingData.metaTracking = {
      fbclid,
      campaignId: params.get('fb_campaign_id') || undefined,
      adsetId: params.get('fb_adset_id') || undefined,
      adId: params.get('fb_ad_id') || undefined,
      campaignName: params.get('fb_campaign_name') || undefined,
      adsetName: params.get('fb_adset_name') || undefined,
      adName: params.get('fb_ad_name') || undefined,
      placement: params.get('fb_placement') || undefined,
      deviceType: params.get('fb_device_type') || undefined,
      platform: params.get('fb_platform') || undefined,
    };
  }

  // Extract Google Tag Manager tracking parameters
  const gclid = params.get('gclid');
  if (gclid) {
    trackingData.gtmTracking = {
      gclid,
      campaignId: params.get('gclid_campaign_id') || undefined,
      adgroupId: params.get('gclid_adgroup_id') || undefined,
      keywordId: params.get('gclid_keyword_id') || undefined,
      campaignName: params.get('gclid_campaign_name') || undefined,
      adgroupName: params.get('gclid_adgroup_name') || undefined,
      keyword: params.get('gclid_keyword') || undefined,
      matchType: params.get('gclid_match_type') || undefined,
      deviceType: params.get('gclid_device_type') || undefined,
      network: params.get('gclid_network') || undefined,
      placement: params.get('gclid_placement') || undefined,
    };
  }

  // Extract UTM parameters
  const utmSource = params.get('utm_source');
  if (utmSource) {
    trackingData.utmParams = {
      utm_source: utmSource,
      utm_medium: params.get('utm_medium') || undefined,
      utm_campaign: params.get('utm_campaign') || undefined,
      utm_term: params.get('utm_term') || undefined,
      utm_content: params.get('utm_content') || undefined,
    };
  }

  return trackingData;
}

/**
 * Extract tracking parameters from form data
 */
export function extractTrackingFromForm(formData: FormData): TrackingData {
  const trackingData: TrackingData = {};

  // Extract Meta tracking from form
  const fbclid = formData.get('fbclid') as string;
  if (fbclid) {
    trackingData.metaTracking = {
      fbclid,
      campaignId: formData.get('fb_campaign_id') as string || undefined,
      adsetId: formData.get('fb_adset_id') as string || undefined,
      adId: formData.get('fb_ad_id') as string || undefined,
      campaignName: formData.get('fb_campaign_name') as string || undefined,
      adsetName: formData.get('fb_adset_name') as string || undefined,
      adName: formData.get('fb_ad_name') as string || undefined,
      placement: formData.get('fb_placement') as string || undefined,
      deviceType: formData.get('fb_device_type') as string || undefined,
      platform: formData.get('fb_platform') as string || undefined,
    };
  }

  // Extract GTM tracking from form
  const gclid = formData.get('gclid') as string;
  if (gclid) {
    trackingData.gtmTracking = {
      gclid,
      campaignId: formData.get('gclid_campaign_id') as string || undefined,
      adgroupId: formData.get('gclid_adgroup_id') as string || undefined,
      keywordId: formData.get('gclid_keyword_id') as string || undefined,
      campaignName: formData.get('gclid_campaign_name') as string || undefined,
      adgroupName: formData.get('gclid_adgroup_name') as string || undefined,
      keyword: formData.get('gclid_keyword') as string || undefined,
      matchType: formData.get('gclid_match_type') as string || undefined,
      deviceType: formData.get('gclid_device_type') as string || undefined,
      network: formData.get('gclid_network') as string || undefined,
      placement: formData.get('gclid_placement') as string || undefined,
    };
  }

  // Extract UTM parameters from form
  const utmSource = formData.get('utm_source') as string;
  if (utmSource) {
    trackingData.utmParams = {
      utm_source: utmSource,
      utm_medium: formData.get('utm_medium') as string || undefined,
      utm_campaign: formData.get('utm_campaign') as string || undefined,
      utm_term: formData.get('utm_term') as string || undefined,
      utm_content: formData.get('utm_content') as string || undefined,
    };
  }

  return trackingData;
}

/**
 * Extract tracking parameters from request headers and cookies
 */
export function extractTrackingFromRequest(request: Request): TrackingData {
  const trackingData: TrackingData = {};
  
  // Extract from referer header
  const referer = request.headers.get('referer');
  if (referer) {
    const refererTracking = extractTrackingFromUrl(referer);
    if (refererTracking.metaTracking) trackingData.metaTracking = refererTracking.metaTracking;
    if (refererTracking.gtmTracking) trackingData.gtmTracking = refererTracking.gtmTracking;
    if (refererTracking.utmParams) trackingData.utmParams = refererTracking.utmParams;
  }

  return trackingData;
}

/**
 * Generate tracking analytics data
 */
export function generateTrackingAnalytics(leads: any[]): {
  metaStats: any[];
  gtmStats: any[];
  utmStats: any[];
  sourceStats: any[];
} {
  const metaStats: any[] = [];
  const gtmStats: any[] = [];
  const utmStats: any[] = [];
  const sourceStats: any[] = [];

  // Process leads for analytics
  leads.forEach(lead => {
    // Meta tracking stats
    if (lead.metaTracking?.fbclid) {
      const campaign = lead.metaTracking.campaignName || 'Unknown Campaign';
      const existing = metaStats.find(stat => stat.campaign === campaign);
      if (existing) {
        existing.count++;
        existing.value += lead.expectedValue || 0;
      } else {
        metaStats.push({
          campaign,
          count: 1,
          value: lead.expectedValue || 0,
          platform: lead.metaTracking.platform || 'Unknown'
        });
      }
    }

    // GTM tracking stats
    if (lead.gtmTracking?.gclid) {
      const campaign = lead.gtmTracking.campaignName || 'Unknown Campaign';
      const existing = gtmStats.find(stat => stat.campaign === campaign);
      if (existing) {
        existing.count++;
        existing.value += lead.expectedValue || 0;
      } else {
        gtmStats.push({
          campaign,
          count: 1,
          value: lead.expectedValue || 0,
          network: lead.gtmTracking.network || 'Unknown'
        });
      }
    }

    // UTM tracking stats
    if (lead.utmParams?.utm_source) {
      const source = lead.utmParams.utm_source;
      const existing = utmStats.find(stat => stat.source === source);
      if (existing) {
        existing.count++;
        existing.value += lead.expectedValue || 0;
      } else {
        utmStats.push({
          source,
          medium: lead.utmParams.utm_medium || 'Unknown',
          campaign: lead.utmParams.utm_campaign || 'Unknown',
          count: 1,
          value: lead.expectedValue || 0
        });
      }
    }

    // General source stats
    const source = lead.source || 'Direct';
    const existing = sourceStats.find(stat => stat.source === source);
    if (existing) {
      existing.count++;
      existing.value += lead.expectedValue || 0;
    } else {
      sourceStats.push({
        source,
        count: 1,
        value: lead.expectedValue || 0
      });
    }
  });

  return {
    metaStats: metaStats.sort((a, b) => b.count - a.count),
    gtmStats: gtmStats.sort((a, b) => b.count - a.count),
    utmStats: utmStats.sort((a, b) => b.count - a.count),
    sourceStats: sourceStats.sort((a, b) => b.count - a.count)
  };
}
