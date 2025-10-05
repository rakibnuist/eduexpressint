'use client';

import React from 'react';
import { useCTA } from '@/context/CTAContext';
import { trackViewContent } from '@/components/TrackLead';
import { useRouter } from 'next/navigation';
import { 
  FaGraduationCap, 
  FaGlobe, 
  FaUsers, 
  FaRocket, 
  FaHeart, 
  FaTrophy, 
  FaHandshake, 
  FaPhone, 
  FaCheckCircle,
  FaUniversity,
  FaPassport,
  FaMoneyBillWave
} from 'react-icons/fa';

export default function AboutPage() {
  const { openCTA } = useCTA();
  const router = useRouter();

  const handleCTAClick = (source: string) => {
    trackViewContent('About Page CTA Click', {
      content_category: 'About Page',
      content_ids: ['about-cta'],
      value: 1
    });
    openCTA(source);
  };

  const handleServicesClick = () => {
    trackViewContent('About Page Services Click', {
      content_category: 'About Page',
      content_ids: ['about-services'],
      value: 1
    });
    router.push('/services');
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ paddingTop: '35px' }}>
      {/* Floating Elements */}
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full text-lg font-bold mb-6 shadow-lg">
              <FaRocket className="h-5 w-5" />
              Your Gateway to Global Education
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              About <span className="text-yellow-400">EduExpress</span>
            </h1>
            
            <p className="text-xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto">
              We are passionate education consultants dedicated to helping students achieve their dreams 
              of studying abroad. With over 15 years of experience, we've successfully placed thousands 
              of students in top universities worldwide.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button
                onClick={() => handleCTAClick('About Hero - Free Consultation')}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
              >
                <FaPhone className="h-5 w-5" />
                Get Free Consultation
              </button>
              <button
                onClick={handleServicesClick}
                className="bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center gap-3"
              >
                <FaHandshake className="h-5 w-5" />
                Explore Our Services
              </button>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">3000+</div>
                <div className="text-sm text-gray-300">Students Placed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">95%</div>
                <div className="text-sm text-gray-300">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">300+</div>
                <div className="text-sm text-gray-300">Partner Universities</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">12+</div>
                <div className="text-sm text-gray-300">Countries Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">€2M+</div>
                <div className="text-sm text-gray-300">Scholarships Secured</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">6+</div>
                <div className="text-sm text-gray-300">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Our Mission */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To democratize access to world-class education by providing comprehensive, 
              personalized guidance that empowers students to achieve their academic and career dreams.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">Why We Exist</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaGlobe className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Global Education Access</h4>
                    <p className="text-gray-600">We believe every student deserves access to world-class education, regardless of their background or location.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaRocket className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Career Transformation</h4>
                    <p className="text-gray-600">Education abroad opens doors to global opportunities and career advancement that can transform lives.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaHeart className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Personal Growth</h4>
                    <p className="text-gray-600">International education fosters personal development, cultural understanding, and global citizenship.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Our Impact</h3>
              <div className="space-y-4">
                {[
                  "3000+ students successfully placed in top universities",
                  "95% visa success rate across all countries",
                  "€2M+ in scholarships secured for our students",
                  "300+ partner universities worldwide",
                  "12+ countries served with local expertise",
                  "6+ years of proven track record"
                ].map((impact, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <FaCheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="font-medium">{impact}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Services */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive support from university selection to post-arrival assistance. 
              We're with you every step of your educational journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "University Selection",
                description: "Personalized university matching based on your academic profile and career goals.",
                icon: FaUniversity
              },
              {
                title: "Visa Support",
                description: "Complete visa processing assistance with high success rates and expert guidance.",
                icon: FaPassport
              },
              {
                title: "Scholarship Assistance",
                description: "Maximize your funding opportunities with our comprehensive scholarship support.",
                icon: FaMoneyBillWave
              },
              {
                title: "Pre-Departure Support",
                description: "Smooth transition to your new country with comprehensive pre-departure assistance.",
                icon: FaRocket
              }
            ].map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6">Why Choose EduExpress?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our comprehensive approach ensures your success at every stage of your educational journey.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaTrophy className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Proven Track Record</h3>
                <p className="text-gray-600">95% success rate with thousands of satisfied students worldwide.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaUsers className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Personalized Support</h3>
                <p className="text-gray-600">Dedicated consultant for each student with 24/7 support.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaHandshake className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">University Partnerships</h3>
                <p className="text-gray-600">Direct partnerships with 300+ top universities worldwide.</p>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Start Your Educational Journey?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Join thousands of successful students who have achieved their dreams with EduExpress. 
            Let us help you unlock your potential and build your future.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => handleCTAClick('About Final CTA - Free Consultation')}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3 shadow-xl"
            >
              <FaPhone className="h-5 w-5" />
              Get Free Consultation
            </button>
            <button
              onClick={() => handleCTAClick('About Final CTA - Start Application')}
              className="bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center gap-3"
            >
              <FaRocket className="h-5 w-5" />
              Start Your Application
            </button>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <FaGraduationCap className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Expert Guidance</h3>
              <p className="text-gray-300">6+ years of experience in international education</p>
            </div>
            <div>
              <FaTrophy className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Proven Success</h3>
              <p className="text-gray-300">95% success rate with 3000+ students placed</p>
            </div>
            <div>
              <FaHandshake className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Personalized Support</h3>
              <p className="text-gray-300">Dedicated consultant for each student</p>
            </div>
            <div>
              <FaGlobe className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Global Reach</h3>
              <p className="text-gray-300">300+ partner universities in 12+ countries</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}