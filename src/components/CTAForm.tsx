'use client';

import { useState } from 'react';
import { FaGraduationCap, FaUsers, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBookOpen, FaStar, FaRocket, FaArrowRight, FaTimes, FaCheckCircle } from 'react-icons/fa';
import { trackLead, trackFormSubmission } from '@/components/TrackLead';
import { useCTA } from '@/context/CTAContext';
import FloatingElements from '@/components/FloatingElements';

export default function CTAForm() {
  const { isOpen, openCTA, closeCTA, source } = useCTA();
  const [showCongratulationPopup, setShowCongratulationPopup] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const leadData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      countryOfInterest: formData.get('countryOfInterest') as string,
      programType: formData.get('programType') as string,
      major: formData.get('major') as string,
      message: formData.get('message') as string,
      source: source || 'CTA Form'
    };

    try {
      // Save lead to database
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });

      const result = await response.json();

      if (!result.ok) {
        throw new Error(result.error || 'Failed to save lead');
      }

      console.log('Lead saved successfully:', result);

      // Track form submission
      await trackFormSubmission('CTA Consultation Form', {
        form_type: 'Lead Generation',
        lead_data: leadData
      });

      // Track lead generation with detailed data
      await trackLead('CTA Form Lead Generated', {
        email: leadData.email,
        phone: leadData.phone,
        destination: leadData.countryOfInterest,
        program: leadData.programType,
        source: leadData.source,
        value: 1,
        currency: 'USD'
      });

      // Show congratulation popup first, then close form when popup is dismissed
      setShowCongratulationPopup(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Show more specific error message
      let errorMessage = 'There was an error submitting your form. Please try again or contact us directly.';
      
      if (error instanceof Error) {
        if (error.message.includes('Invalid form data')) {
          errorMessage = 'Please check your form data and try again. Make sure all required fields are filled correctly.';
        } else if (error.message.includes('Too many requests')) {
          errorMessage = 'Too many requests. Please wait a moment and try again.';
        } else if (error.message.includes('Failed to save lead')) {
          errorMessage = 'Unable to save your information. Please try again or contact us directly.';
        }
      }
      
      alert(errorMessage);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* CTA Form Modal */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <FloatingElements variant="cta" intensity="medium" />
        
        <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[95vh] overflow-y-auto transform animate-bounce-in relative z-10">
          {/* Header with gradient background */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-t-3xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <FaGraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Get Free Consultation</h3>
                  <p className="text-white/90 text-sm">Start your study abroad journey today</p>
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
          
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FaUsers className="h-4 w-4 text-blue-500" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-gray-300"
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-gray-300"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FaPhone className="h-4 w-4 text-blue-500" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-gray-300"
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FaMapMarkerAlt className="h-4 w-4 text-blue-500" />
                    Country of Interest *
                  </label>
                  <select name="countryOfInterest" required className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-gray-300">
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
                  <select name="programType" required className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-gray-300">
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-gray-300"
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 resize-none"
                  placeholder="Tell us about your study goals, preferred universities, or any specific requirements..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 px-6 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-3"
              >
                <FaPhone className="h-5 w-5" />
                Get Free Consultation
                <FaArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Congratulation Popup */}
      {showCongratulationPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full transform animate-bounce-in">
            {/* Success Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-t-3xl p-6 text-white text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Congratulations!</h3>
              <p className="text-white/90">Your consultation request has been submitted successfully</p>
            </div>
            
            <div className="p-6 text-center">
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">What happens next?</h4>
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                    <span className="text-gray-700">Our expert counselor will review your information</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                    <span className="text-gray-700">We'll contact you within 24 hours</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg">
                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                    <span className="text-gray-700">Schedule your free consultation call</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowCongratulationPopup(false);
                    closeCTA();
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowCongratulationPopup(false);
                    // Form stays open for editing
                  }}
                  className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold py-3 px-6 rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300"
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

