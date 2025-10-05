'use client';

import { metaConversionsAPI } from './MetaConversionsAPI';

// Enhanced lead tracking for education consultancy
export class EnhancedLeadTracking {
  // Track lead with enhanced education-specific data
  static async trackLead(leadData: {
    // User information
    name: string;
    email: string;
    phone?: string;
    country?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    dateOfBirth?: string;
    gender?: string;
    
    // Education-specific data
    destinationCountry: string;
    studyLevel: string;
    programType: string;
    programField?: string;
    university?: string;
    budget?: string;
    intake?: string;
    
    // Lead source and tracking
    source?: string;
    campaign?: string;
    medium?: string;
    referrer?: string;
    landingPage?: string;
    
    // Facebook tracking parameters
    fbc?: string; // Facebook click ID
    fbp?: string; // Facebook browser ID
    
    // Additional context
    urgency?: 'high' | 'medium' | 'low';
    leadQuality?: 'high' | 'medium' | 'low';
    value?: number;
  }) {
    try {
      // Prepare user data with proper hashing
      const userData = {
        email: leadData.email,
        phone: leadData.phone,
        first_name: leadData.name.split(' ')[0],
        last_name: leadData.name.split(' ').slice(1).join(' ') || '',
        city: leadData.city,
        state: leadData.state,
        country: leadData.country,
        zip_code: leadData.zipCode,
        date_of_birth: leadData.dateOfBirth,
        gender: leadData.gender,
        fbc: leadData.fbc,
        fbp: leadData.fbp,
      };

      // Prepare custom data with education-specific fields
      const customData = {
        content_name: 'Study Abroad Lead',
        content_category: 'Education',
        content_type: 'lead_generation',
        value: leadData.value || 1,
        currency: 'USD',
        
        // Education-specific parameters
        destination_country: leadData.destinationCountry,
        study_level: leadData.studyLevel,
        program_type: leadData.programType,
        program_field: leadData.programField,
        university_name: leadData.university,
        budget: leadData.budget,
        intake: leadData.intake,
        
        // Lead quality and source
        lead_source: leadData.source || 'website',
        lead_quality: leadData.leadQuality || 'high',
        urgency_level: leadData.urgency || 'medium',
        
        // Campaign tracking
        campaign: leadData.campaign,
        medium: leadData.medium,
        referrer: leadData.referrer,
        landing_page: leadData.landingPage,
        
        // Additional context
        user_journey_stage: 'lead_generation',
        engagement_score: this.calculateEngagementScore(leadData),
        timestamp: new Date().toISOString(),
      };

      // Track the lead event
      await metaConversionsAPI.trackLead(userData, customData);
      
      console.log('✅ Enhanced lead tracking completed:', {
        leadId: customData.timestamp,
        destination: leadData.destinationCountry,
        studyLevel: leadData.studyLevel,
        programType: leadData.programType,
        quality: leadData.leadQuality,
      });

      return {
        success: true,
        leadId: customData.timestamp,
        trackingData: customData,
      };
    } catch (error) {
      console.error('❌ Enhanced lead tracking error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Track consultation scheduling
  static async trackConsultationSchedule(scheduleData: {
    // User information
    name: string;
    email: string;
    phone?: string;
    
    // Consultation details
    destinationCountry: string;
    studyLevel: string;
    programType: string;
    consultationType: 'initial' | 'follow_up' | 'application_review' | 'visa_guidance';
    duration: '15_minutes' | '30_minutes' | '45_minutes' | '60_minutes';
    scheduledDate: string;
    timezone: string;
    platform: 'zoom' | 'google_meet' | 'phone' | 'in_person';
    
    // Context
    source?: string;
    value?: number;
  }) {
    try {
      const userData = {
        email: scheduleData.email,
        phone: scheduleData.phone,
        first_name: scheduleData.name.split(' ')[0],
        last_name: scheduleData.name.split(' ').slice(1).join(' ') || '',
      };

      const customData = {
        content_name: 'Consultation Scheduled',
        content_category: 'Education',
        content_type: 'appointment',
        value: scheduleData.value || 15,
        currency: 'USD',
        
        // Consultation-specific parameters
        destination_country: scheduleData.destinationCountry,
        study_level: scheduleData.studyLevel,
        program_type: scheduleData.programType,
        appointment_type: scheduleData.consultationType,
        consultation_duration: scheduleData.duration,
        scheduled_date: scheduleData.scheduledDate,
        timezone: scheduleData.timezone,
        meeting_platform: scheduleData.platform,
        
        // Context
        source: scheduleData.source || 'website',
        user_journey_stage: 'consultation_scheduled',
        timestamp: new Date().toISOString(),
      };

      await metaConversionsAPI.trackSchedule(userData, customData);
      
      console.log('✅ Consultation scheduling tracked:', {
        consultationType: scheduleData.consultationType,
        destination: scheduleData.destinationCountry,
        scheduledDate: scheduleData.scheduledDate,
      });

      return { success: true, trackingData: customData };
    } catch (error) {
      console.error('❌ Consultation scheduling tracking error:', error);
      return { success: false, error: error.message };
    }
  }

  // Track application submission
  static async trackApplicationSubmission(applicationData: {
    // User information
    name: string;
    email: string;
    phone?: string;
    
    // Application details
    destinationCountry: string;
    studyLevel: string;
    programType: string;
    programField: string;
    universities: string[];
    applicationFee?: number;
    applicationStatus: 'submitted' | 'under_review' | 'accepted' | 'rejected';
    
    // Context
    source?: string;
    value?: number;
  }) {
    try {
      const userData = {
        email: applicationData.email,
        phone: applicationData.phone,
        first_name: applicationData.name.split(' ')[0],
        last_name: applicationData.name.split(' ').slice(1).join(' ') || '',
      };

      const customData = {
        content_name: 'Application Submitted',
        content_category: 'Education',
        content_type: 'application',
        value: applicationData.value || 50,
        currency: 'USD',
        
        // Application-specific parameters
        destination_country: applicationData.destinationCountry,
        study_level: applicationData.studyLevel,
        program_type: applicationData.programType,
        program_field: applicationData.programField,
        university_name: applicationData.universities.join(', '),
        universities_count: applicationData.universities.length,
        application_fee: applicationData.applicationFee,
        application_status: applicationData.applicationStatus,
        
        // Context
        source: applicationData.source || 'website',
        user_journey_stage: 'application_submitted',
        timestamp: new Date().toISOString(),
      };

      await metaConversionsAPI.trackSubmitApplication(userData, customData);
      
      console.log('✅ Application submission tracked:', {
        universities: applicationData.universities.length,
        destination: applicationData.destinationCountry,
        status: applicationData.applicationStatus,
      });

      return { success: true, trackingData: customData };
    } catch (error) {
      console.error('❌ Application submission tracking error:', error);
      return { success: false, error: error.message };
    }
  }

  // Track service purchase
  static async trackServicePurchase(purchaseData: {
    // User information
    name: string;
    email: string;
    phone?: string;
    
    // Purchase details
    serviceType: 'consultation' | 'application_assistance' | 'visa_guidance' | 'document_review' | 'package';
    servicePackage?: string;
    destinationCountry: string;
    studyLevel: string;
    programType: string;
    value: number;
    currency: string;
    paymentMethod: string;
    transactionId: string;
    paymentStatus: 'completed' | 'pending' | 'failed';
    
    // Context
    source?: string;
  }) {
    try {
      const userData = {
        email: purchaseData.email,
        phone: purchaseData.phone,
        first_name: purchaseData.name.split(' ')[0],
        last_name: purchaseData.name.split(' ').slice(1).join(' ') || '',
      };

      const customData = {
        content_name: 'Service Purchase',
        content_category: 'Education',
        content_type: 'service',
        value: purchaseData.value,
        currency: purchaseData.currency,
        
        // Purchase-specific parameters
        service_type: purchaseData.serviceType,
        service_package: purchaseData.servicePackage,
        destination_country: purchaseData.destinationCountry,
        study_level: purchaseData.studyLevel,
        program_type: purchaseData.programType,
        payment_method: purchaseData.paymentMethod,
        transaction_id: purchaseData.transactionId,
        payment_status: purchaseData.paymentStatus,
        
        // Context
        source: purchaseData.source || 'website',
        user_journey_stage: 'service_purchased',
        timestamp: new Date().toISOString(),
      };

      await metaConversionsAPI.trackPurchase(userData, customData);
      
      console.log('✅ Service purchase tracked:', {
        serviceType: purchaseData.serviceType,
        value: purchaseData.value,
        currency: purchaseData.currency,
        transactionId: purchaseData.transactionId,
      });

      return { success: true, trackingData: customData };
    } catch (error) {
      console.error('❌ Service purchase tracking error:', error);
      return { success: false, error: error.message };
    }
  }

  // Track content engagement
  static async trackContentEngagement(contentData: {
    // User information (optional for anonymous users)
    name?: string;
    email?: string;
    phone?: string;
    
    // Content details
    contentName: string;
    contentType: 'page' | 'university_profile' | 'destination_guide' | 'blog_post' | 'video' | 'download';
    contentCategory: string;
    destinationCountry?: string;
    studyLevel?: string;
    programType?: string;
    university?: string;
    engagementTime?: number; // in seconds
    engagementScore?: number; // 1-10
    
    // Context
    source?: string;
    value?: number;
  }) {
    try {
      const userData = contentData.name ? {
        email: contentData.email,
        phone: contentData.phone,
        first_name: contentData.name.split(' ')[0],
        last_name: contentData.name.split(' ').slice(1).join(' ') || '',
      } : undefined;

      const customData = {
        content_name: contentData.contentName,
        content_category: contentData.contentCategory,
        content_type: contentData.contentType,
        value: contentData.value || 0,
        currency: 'USD',
        
        // Content-specific parameters
        destination_country: contentData.destinationCountry,
        study_level: contentData.studyLevel,
        program_type: contentData.programType,
        university_name: contentData.university,
        content_topic: contentData.contentCategory,
        engagement_time: contentData.engagementTime,
        engagement_score: contentData.engagementScore || 1,
        
        // Context
        source: contentData.source || 'website',
        user_journey_stage: 'content_engagement',
        timestamp: new Date().toISOString(),
      };

      await metaConversionsAPI.trackViewContent(userData, customData);
      
      console.log('✅ Content engagement tracked:', {
        contentName: contentData.contentName,
        contentType: contentData.contentType,
        engagementTime: contentData.engagementTime,
      });

      return { success: true, trackingData: customData };
    } catch (error) {
      console.error('❌ Content engagement tracking error:', error);
      return { success: false, error: error.message };
    }
  }

  // Calculate engagement score based on lead data
  private static calculateEngagementScore(leadData: any): number {
    let score = 1;
    
    // Higher score for more complete information
    if (leadData.phone) score += 1;
    if (leadData.budget) score += 1;
    if (leadData.university) score += 1;
    if (leadData.programField) score += 1;
    
    // Higher score for specific destinations
    const highValueDestinations = ['UK', 'USA', 'Canada', 'Australia', 'Germany'];
    if (highValueDestinations.includes(leadData.destinationCountry)) {
      score += 2;
    }
    
    // Higher score for advanced study levels
    if (leadData.studyLevel === 'Masters' || leadData.studyLevel === 'PhD') {
      score += 1;
    }
    
    // Higher score for urgency
    if (leadData.urgency === 'high') score += 2;
    else if (leadData.urgency === 'medium') score += 1;
    
    return Math.min(score, 10); // Cap at 10
  }

  // Track custom education event
  static async trackCustomEvent(eventName: string, userData?: any, customData?: any) {
    try {
      await metaConversionsAPI.trackCustomEducationEvent(eventName, userData, {
        content_category: 'Education',
        ...customData,
        timestamp: new Date().toISOString(),
      });
      
      console.log(`✅ Custom education event tracked: ${eventName}`);
      return { success: true };
    } catch (error) {
      console.error(`❌ Custom education event tracking error: ${eventName}`, error);
      return { success: false, error: error.message };
    }
  }
}

export default EnhancedLeadTracking;
