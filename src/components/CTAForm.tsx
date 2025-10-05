'use client';

import React, { useState } from 'react';
import { FaGraduationCap, FaUsers, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBookOpen, FaStar, FaRocket, FaArrowRight, FaTimes, FaCheckCircle } from 'react-icons/fa';
import { useLeadTracker } from '@/components/LeadTracker';
import { useCTA } from '@/context/CTAContext';
import { useFormTracking } from '@/hooks/usePageTracking';
import { useEnhancedTracking } from '@/components/EnhancedTracking';
import { useMetaConversionsAPI } from '@/components/MetaConversionsAPI';

export default function CTAForm() {
  const { isOpen, closeCTA, source } = useCTA();
  const [showCongratulationPopup, setShowCongratulationPopup] = useState(false);
  const { trackLead, trackFormSubmission } = useLeadTracker();
  const { trackFormSubmission: trackMetaPixelForm } = useFormTracking();
  const { trackFormSubmission: trackFormSubmissionEnhanced, trackLeadGeneration } = useEnhancedTracking();
  const metaAPI = useMetaConversionsAPI();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const countryCode = formData.get('countryCode') as string;
    const phoneNumber = formData.get('phone') as string;
    
    const leadData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: `${countryCode}${phoneNumber}`,
      countryOfInterest: formData.get('countryOfInterest') as string,
      programType: formData.get('programType') as string,
      major: formData.get('major') as string,
      message: formData.get('message') as string,
      source: source || 'CTA Form'
    };

    // Add tracking data to lead data
    // const leadDataWithTracking = addTrackingToJsonData(leadData);
    const leadDataWithTracking = leadData;

    // Client-side validation
    const errors: string[] = [];
    
    if (!leadData.name?.trim()) {
      errors.push('Full name is required');
    }
    
    if (!leadData.email?.trim()) {
      errors.push('Email address is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadData.email)) {
      errors.push('Please enter a valid email address (e.g., example@domain.com)');
    }
    
    if (!phoneNumber?.trim()) {
      errors.push('Phone number is required');
    } else if (!/^[0-9\s\-\(\)]{7,15}$/.test(phoneNumber)) {
      errors.push('Please enter a valid phone number');
    }
    
    if (!leadData.countryOfInterest) {
      errors.push('Please select your country of interest');
    }
    
    if (!leadData.programType) {
      errors.push('Please select your program type');
    }
    
    if (errors.length > 0) {
      alert('Please fix the following errors:\n\n' + errors.join('\n'));
      return;
    }

    try {
      // Save lead to database
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadDataWithTracking),
      });

      const result = await response.json();

      if (!result.ok) {
        throw new Error(result.message || result.error || 'Failed to save lead');
      }

      // === META CONVERSIONS API TRACKING ===
      
      // 1. Track LEAD event
      await metaAPI.trackLead(
        {
          email: leadData.email,
          phone: leadData.phone,
          firstName: leadData.name.split(' ')[0],
          lastName: leadData.name.split(' ').slice(1).join(' '),
          country: leadData.countryOfInterest,
        },
        {
          content_name: 'Study Abroad Lead - CTA Form',
          destination: leadData.countryOfInterest,
          studyLevel: leadData.programType,
          programType: leadData.major,
          source: source || 'CTA Form',
          value: 50,
          quality: 'high',
        }
      );

      // 2. Track CONTACT event
      await metaAPI.trackContact(
        {
          email: leadData.email,
          phone: leadData.phone,
          firstName: leadData.name.split(' ')[0],
          lastName: leadData.name.split(' ').slice(1).join(' '),
        },
        {
          content_name: 'Contact Inquiry - CTA Form',
          method: 'form',
          inquiry_type: 'consultation_request',
          destination: leadData.countryOfInterest,
          studyLevel: leadData.programType,
          urgency: 'high',
          source: source || 'CTA Form',
          value: 25,
        }
      );

      // 3. Track COMPLETE REGISTRATION event (if this is considered registration)
      await metaAPI.trackCompleteRegistration(
        {
          email: leadData.email,
          phone: leadData.phone,
          firstName: leadData.name.split(' ')[0],
          lastName: leadData.name.split(' ').slice(1).join(' '),
        },
        {
          content_name: 'Lead Registration - CTA Form',
          type: 'lead_registration',
          method: 'form',
          source: source || 'CTA Form',
          value: 75,
          onboarding_completed: true,
        }
      );

      // Track form submission with enhanced tracking
      trackFormSubmissionEnhanced({
        form_name: 'CTA Consultation Form',
        form_type: 'Lead Generation',
        form_value: 1000,
        email: leadData.email,
        phone: leadData.phone,
        country: leadData.countryOfInterest,
        program: leadData.programType
      });

      // Track lead generation with enhanced tracking
      trackLeadGeneration({
        lead_type: 'Study Abroad Consultation',
        lead_value: 1000,
        email: leadData.email,
        phone: leadData.phone,
        country: leadData.countryOfInterest,
        program: leadData.programType,
        source: 'CTA Form'
      });

      // Meta Pixel tracking
      trackMetaPixelForm({
        form_name: 'CTA Consultation Form',
        form_type: 'Lead Generation',
        content_name: 'CTA Form Submission',
        value: 1000,
        currency: 'USD',
        email: leadData.email,
        phone: leadData.phone,
        destination: leadData.countryOfInterest,
        program: leadData.programType,
        source: source || 'CTA Form'
      });

      // Legacy tracking (keep for backward compatibility)
      trackFormSubmission({
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone,
        country: leadData.countryOfInterest,
        program: leadData.programType,
        leadType: 'consultation',
        leadSource: 'website',
        leadMedium: 'organic',
        leadCampaign: 'CTA Form',
        leadContent: 'Free Consultation',
        formName: 'CTA Consultation Form',
        formType: 'Lead Generation',
        notes: leadData.message,
        budget: 1000,
        currency: 'USD'
      });

      trackLead({
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone,
        country: leadData.countryOfInterest,
        program: leadData.programType,
        leadType: 'consultation',
        leadSource: 'website',
        leadMedium: 'organic',
        leadCampaign: 'CTA Form',
        leadContent: 'Free Consultation',
        notes: leadData.message,
        budget: 1000,
        currency: 'USD'
      });

      // Show congratulation popup first, then close form when popup is dismissed
      setShowCongratulationPopup(true);
    } catch (error) {
      console.error('Form submission error:', error);
      
      // Show more specific error message
      let errorMessage = 'There was an error submitting your form. Please try again or contact us directly.';
      
      if (error instanceof Error) {
        if (error.message.includes('Invalid form data') || error.message.includes('Missing required fields')) {
          errorMessage = 'Please check your form data and try again. Make sure all required fields are filled correctly.';
        } else if (error.message.includes('valid email address')) {
          errorMessage = 'Please enter a valid email address (e.g., example@domain.com)';
        } else if (error.message.includes('valid phone number')) {
          errorMessage = 'Please enter a valid phone number';
        } else if (error.message.includes('Too many requests')) {
          errorMessage = 'Too many requests. Please wait a moment and try again.';
        } else if (error.message.includes('Failed to save lead')) {
          errorMessage = 'Unable to save your information. Please try again or contact us directly.';
        } else if (error.message.includes('duplicate')) {
          errorMessage = 'You have already submitted a form recently. Please wait 24 hours before submitting again.';
        } else {
          errorMessage = error.message || errorMessage;
        }
      }
      
      alert(errorMessage);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* CTA Form Modal */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4">
        
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-sm sm:max-w-lg w-full max-h-[95vh] overflow-y-auto transform animate-bounce-in relative z-10">
          {/* Header with gradient background */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-t-2xl sm:rounded-t-3xl p-4 sm:p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <FaGraduationCap className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-2xl font-bold">Get Free Consultation</h3>
                  <p className="text-white/90 text-xs sm:text-sm">Start your study abroad journey today</p>
                </div>
              </div>
              <button
                onClick={closeCTA}
                className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all duration-300"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FaUsers className="h-4 w-4 text-blue-500" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-3 sm:px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 text-sm sm:text-base"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FaEnvelope className="h-4 w-4 text-blue-500" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-3 sm:px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 text-sm sm:text-base"
                    placeholder="example@domain.com"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    title="Please enter a valid email address (e.g., example@domain.com)"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FaPhone className="h-4 w-4 text-blue-500" />
                  Phone Number *
                </label>
                <div className="flex gap-2">
                  <select
                    name="countryCode"
                    className="px-2 sm:px-3 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 bg-white text-sm sm:text-base min-w-0 flex-shrink-0"
                    defaultValue="+880"
                  >
                    <option value="+880">🇧🇩 +880</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+86">🇨🇳 +86</option>
                    <option value="+49">🇩🇪 +49</option>
                    <option value="+33">🇫🇷 +33</option>
                    <option value="+39">🇮🇹 +39</option>
                    <option value="+34">🇪🇸 +34</option>
                    <option value="+31">🇳🇱 +31</option>
                    <option value="+46">🇸🇪 +46</option>
                    <option value="+47">🇳🇴 +47</option>
                    <option value="+45">🇩🇰 +45</option>
                    <option value="+41">🇨🇭 +41</option>
                    <option value="+43">🇦🇹 +43</option>
                    <option value="+32">🇧🇪 +32</option>
                    <option value="+351">🇵🇹 +351</option>
                    <option value="+30">🇬🇷 +30</option>
                    <option value="+48">🇵🇱 +48</option>
                    <option value="+420">🇨🇿 +420</option>
                    <option value="+421">🇸🇰 +421</option>
                    <option value="+36">🇭🇺 +36</option>
                    <option value="+40">🇷🇴 +40</option>
                    <option value="+359">🇧🇬 +359</option>
                    <option value="+385">🇭🇷 +385</option>
                    <option value="+386">🇸🇮 +386</option>
                    <option value="+372">🇪🇪 +372</option>
                    <option value="+371">🇱🇻 +371</option>
                    <option value="+370">🇱🇹 +370</option>
                    <option value="+358">🇫🇮 +358</option>
                    <option value="+81">🇯🇵 +81</option>
                    <option value="+82">🇰🇷 +82</option>
                    <option value="+65">🇸🇬 +65</option>
                    <option value="+60">🇲🇾 +60</option>
                    <option value="+66">🇹🇭 +66</option>
                    <option value="+84">🇻🇳 +84</option>
                    <option value="+63">🇵🇭 +63</option>
                    <option value="+62">🇮🇩 +62</option>
                    <option value="+61">🇦🇺 +61</option>
                    <option value="+64">🇳🇿 +64</option>
                    <option value="+27">🇿🇦 +27</option>
                    <option value="+20">🇪🇬 +20</option>
                    <option value="+971">🇦🇪 +971</option>
                    <option value="+966">🇸🇦 +966</option>
                    <option value="+974">🇶🇦 +974</option>
                    <option value="+965">🇰🇼 +965</option>
                    <option value="+973">🇧🇭 +973</option>
                    <option value="+968">🇴🇲 +968</option>
                    <option value="+962">🇯🇴 +962</option>
                    <option value="+961">🇱🇧 +961</option>
                    <option value="+963">🇸🇾 +963</option>
                    <option value="+964">🇮🇶 +964</option>
                    <option value="+98">🇮🇷 +98</option>
                    <option value="+90">🇹🇷 +90</option>
                    <option value="+7">🇷🇺 +7</option>
                    <option value="+380">🇺🇦 +380</option>
                    <option value="+375">🇧🇾 +375</option>
                    <option value="+373">🇲🇩 +373</option>
                    <option value="+995">🇬🇪 +995</option>
                    <option value="+374">🇦🇲 +374</option>
                    <option value="+994">🇦🇿 +994</option>
                    <option value="+998">🇺🇿 +998</option>
                    <option value="+996">🇰🇬 +996</option>
                    <option value="+992">🇹🇯 +992</option>
                    <option value="+993">🇹🇲 +993</option>
                    <option value="+7">🇰🇿 +7</option>
                    <option value="+55">🇧🇷 +55</option>
                    <option value="+54">🇦🇷 +54</option>
                    <option value="+56">🇨🇱 +56</option>
                    <option value="+57">🇨🇴 +57</option>
                    <option value="+51">🇵🇪 +51</option>
                    <option value="+58">🇻🇪 +58</option>
                    <option value="+52">🇲🇽 +52</option>
                    <option value="+1">🇨🇦 +1</option>
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="flex-1 px-3 sm:px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 text-sm sm:text-base"
                    placeholder="1234567890"
                    pattern="[0-9\s\-\(\)]{7,15}"
                    title="Please enter your phone number without country code"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FaMapMarkerAlt className="h-4 w-4 text-blue-500" />
                    Country of Interest *
                  </label>
                  <select name="countryOfInterest" required className="w-full px-3 sm:px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 text-sm sm:text-base">
                    <option value="">Select a country</option>
                    <option value="United Kingdom">🇬🇧 United Kingdom</option>
                    <option value="China">🇨🇳 China</option>
                    <option value="South Korea">🇰🇷 South Korea</option>
                    <option value="Hungary">🇭🇺 Hungary</option>
                    <option value="Croatia">🇭🇷 Croatia</option>
                    <option value="Cyprus">🇨🇾 Cyprus</option>
                    <option value="Georgia">🇬🇪 Georgia</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FaGraduationCap className="h-4 w-4 text-blue-500" />
                    Program Type *
                  </label>
                  <select name="programType" required className="w-full px-3 sm:px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 text-sm sm:text-base">
                    <option value="">Select program type</option>
                    <option value="Bachelor">🎓 Bachelor</option>
                    <option value="Masters">🎓 Masters</option>
                    <option value="PhD">🎓 PhD</option>
                    <option value="Language">🌍 Language</option>
                    <option value="Foundation">🏛️ Foundation</option>
                    <option value="Non Degree">📜 Non Degree</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FaBookOpen className="h-4 w-4 text-blue-500" />
                  Major (Optional)
                </label>
                <input
                  type="text"
                  name="major"
                  className="w-full px-3 sm:px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 text-sm sm:text-base"
                  placeholder="e.g., Computer Science, Business Administration, Engineering"
                />
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FaStar className="h-4 w-4 text-blue-500" />
                  Message (Optional)
                </label>
                <textarea
                  name="message"
                  rows={4}
                  className="w-full px-3 sm:px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 resize-none text-sm sm:text-base"
                  placeholder="Tell us about your study goals, preferred universities, or any specific requirements..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
              >
                <FaPhone className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden min-[480px]:inline">Get Free Consultation</span>
                <span className="min-[480px]:hidden">Get Consultation</span>
                <FaArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Congratulation Popup */}
      {showCongratulationPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-sm sm:max-w-md w-full transform animate-bounce-in">
            {/* Success Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-t-2xl sm:rounded-t-3xl p-4 sm:p-6 text-white text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <FaCheckCircle className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <h3 className="text-lg sm:text-2xl font-bold mb-2">Congratulations!</h3>
              <p className="text-white/90 text-sm sm:text-base">Your consultation request has been submitted successfully</p>
            </div>
            
            <div className="p-4 sm:p-6 text-center">
              <div className="mb-4 sm:mb-6">
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">What happens next?</h4>
                <div className="space-y-2 sm:space-y-3 text-left">
                  <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-blue-50 rounded-lg">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold flex-shrink-0">1</div>
                    <span className="text-gray-700 text-sm sm:text-base">Our expert counselor will review your information</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-purple-50 rounded-lg">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold flex-shrink-0">2</div>
                    <span className="text-gray-700 text-sm sm:text-base">We'll contact you within 24 hours</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-pink-50 rounded-lg">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold flex-shrink-0">3</div>
                    <span className="text-gray-700 text-sm sm:text-base">Schedule your free consultation call</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={() => {
                    setShowCongratulationPopup(false);
                    closeCTA();
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-sm sm:text-base"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowCongratulationPopup(false);
                    // Form stays open for editing
                  }}
                  className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 text-sm sm:text-base"
                >
                  Edit Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

