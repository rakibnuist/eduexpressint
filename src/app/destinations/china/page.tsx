'use client';

import React, { useState } from 'react';
import { findDestination } from '@/lib/data/destinations';
import { useCTA } from '@/context/CTAContext';
import { trackViewContent } from '@/components/TrackLead';
import { usePageTracking } from '@/hooks/usePageTracking';
import { 
  FaGraduationCap, 
  FaDollarSign, 
  FaBriefcase, 
  FaGlobe, 
  FaHome, 
  FaCheckCircle,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaFileAlt,
  FaUniversity,
  FaCertificate,
  FaClipboardList,
  FaStar,
  FaRocket,
  FaShieldAlt,
  FaTrophy,
  FaAward,
  FaBuilding,
  FaMicroscope,
  FaHandshake,
  FaPassport
} from 'react-icons/fa';

export default function ChinaPage() {
  const { openCTA } = useCTA();
  const [activeTab, setActiveTab] = useState('overview');
  usePageTracking(); // Track page view

  const destination = findDestination('china');
  
  if (!destination) {
    return <div>Destination not found</div>;
  }

  const handleCTAClick = (source: string) => {
    trackViewContent('China Page CTA Click', {
      content_category: 'Destination Page',
      content_ids: ['china-cta'],
      value: 1
    });
    openCTA(source);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FaGlobe },
    { id: 'scholarships', label: 'Scholarships', icon: FaTrophy },
    { id: 'programs', label: 'Programs', icon: FaGraduationCap },
    { id: 'universities', label: 'Universities', icon: FaUniversity },
    { id: 'requirements', label: 'Requirements', icon: FaFileAlt },
    { id: 'process', label: 'Process', icon: FaClipboardList }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      {/* Floating Elements */}
      
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 text-white overflow-hidden min-h-screen flex items-center">
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-96 h-96 bg-yellow-400/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-red-400/15 rounded-full blur-3xl animate-pulse delay-500"></div>
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute bottom-1/4 left-1/4 w-56 h-56 bg-orange-400/10 rounded-full blur-3xl animate-pulse delay-300"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 animate-float-slow opacity-20">
            <FaTrophy className="h-12 w-12 text-yellow-400" />
          </div>
          <div className="absolute top-40 right-32 animate-float-slow delay-1000 opacity-20">
            <FaGraduationCap className="h-10 w-10 text-orange-400" />
          </div>
          <div className="absolute bottom-32 left-40 animate-float-slow delay-500 opacity-20">
            <FaUniversity className="h-14 w-14 text-red-400" />
          </div>
          <div className="absolute bottom-20 right-20 animate-float-slow delay-700 opacity-20">
            <FaCertificate className="h-8 w-8 text-yellow-400" />
          </div>
        </div>
        
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-20 w-full">
          <div className="text-center">
            {/* Enhanced Intake Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-2xl animate-bounce hover:animate-none transition-all duration-300 transform hover:scale-105">
                <FaCalendarAlt className="h-6 w-6" />
                Multiple Intakes Available
                <FaStar className="h-5 w-5 animate-spin" />
              </div>
            </div>

            {/* Enhanced Main Heading */}
            <h1 className="text-6xl lg:text-8xl font-bold mb-8 leading-tight">
              Study in <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 animate-pulse">China</span>
            </h1>
            
            {/* Enhanced Subheading */}
            <div className="mb-8">
              <p className="text-3xl lg:text-4xl text-yellow-100 mb-4 font-bold">
                🎓 Full Scholarship Programs
              </p>
              <p className="text-2xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 font-bold">
                Diploma, Bachelor, Masters, PhD & Language Programs
              </p>
            </div>
            
            {/* Enhanced Description */}
            <p className="text-xl lg:text-2xl text-yellow-200 mb-12 leading-relaxed max-w-5xl mx-auto">
              Experience <span className="font-bold text-yellow-400">world-class education</span> with 
              <span className="font-bold text-orange-400"> full scholarship opportunities</span> and 
              <span className="font-bold text-red-400"> English-medium programs</span> in the world's fastest-growing economy.
            </p>
            
            {/* Enhanced Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
              <div className="text-center bg-white/15 backdrop-blur-sm rounded-3xl p-8 border border-white/30 hover:bg-white/25 transition-all duration-300 transform hover:scale-105 group">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FaDollarSign className="h-10 w-10 text-white" />
                </div>
                <div className="text-5xl font-bold text-yellow-400 mb-2">100% Free</div>
                <div className="text-lg text-yellow-200 font-medium">Tuition Fee</div>
                <div className="text-sm text-yellow-300 mt-2">Full Scholarship</div>
                </div>
              
              <div className="text-center bg-white/15 backdrop-blur-sm rounded-3xl p-8 border border-white/30 hover:bg-white/25 transition-all duration-300 transform hover:scale-105 group">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FaTrophy className="h-10 w-10 text-white" />
                </div>
                <div className="text-5xl font-bold text-green-400 mb-2">100% Free</div>
                <div className="text-lg text-yellow-200 font-medium">Accommodation Fee</div>
                <div className="text-sm text-yellow-300 mt-2">Full Scholarship</div>
              </div>

              <div className="text-center bg-white/15 backdrop-blur-sm rounded-3xl p-8 border border-white/30 hover:bg-white/25 transition-all duration-300 transform hover:scale-105 group">
                <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FaHome className="h-10 w-10 text-white" />
                </div>
                <div className="text-5xl font-bold text-red-400 mb-2">¥500-¥3,500</div>
                <div className="text-lg text-yellow-200 font-medium">Monthly Stipend</div>
                <div className="text-sm text-yellow-300 mt-2">Scholarship Support</div>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                <button 
                  onClick={() => handleCTAClick('china-hero')}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-6 px-12 rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-4 shadow-2xl text-xl group"
                >
                <FaRocket className="h-6 w-6 group-hover:animate-bounce" />
                Apply Now - Start Your Journey!
                <FaStar className="h-5 w-5 animate-pulse" />
                </button>
                <button 
                  onClick={() => handleCTAClick('china-hero-consultation')}
                className="bg-white/15 backdrop-blur-sm border-2 border-white/40 hover:bg-white/25 text-white font-bold py-6 px-12 rounded-2xl transition-all duration-300 flex items-center justify-center gap-4 text-xl group"
                >
                <FaPhone className="h-6 w-6 group-hover:animate-pulse" />
                  Free Consultation
                <FaHandshake className="h-5 w-5" />
                </button>
            </div>
            
            {/* Additional Benefits */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <FaTrophy className="h-8 w-8 text-white" />
                </div>
                <div className="text-lg font-bold text-yellow-200">Full Scholarships</div>
                <div className="text-sm text-yellow-300">CSC & University Programs</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <FaGlobe className="h-8 w-8 text-white" />
                </div>
                <div className="text-lg font-bold text-yellow-200">English Programs</div>
                <div className="text-sm text-yellow-300">1000+ Universities</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <FaRocket className="h-8 w-8 text-white" />
                </div>
                <div className="text-lg font-bold text-yellow-200">Growing Economy</div>
                <div className="text-sm text-yellow-300">Career Opportunities</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <FaPassport className="h-8 w-8 text-white" />
                </div>
                <div className="text-lg font-bold text-yellow-200">Easy Visa Process</div>
                <div className="text-sm text-yellow-300">High Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intake Highlight Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full text-lg font-bold mb-6 shadow-lg">
              <FaCalendarAlt className="h-5 w-5" />
              Multiple Intakes Available
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Study in China with <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Full Scholarships</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join 9 prestigious universities offering Foundation + Bachelor programs with comprehensive scholarship opportunities. 
              Start your academic journey with full financial support.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Scholarship Statistics */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-center text-yellow-400">
                Scholarship Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-yellow-500/20 rounded-lg">
                  <span className="font-semibold">100% Tuition Free</span>
                  <span className="text-2xl font-bold text-yellow-400">8</span>
                  <span className="text-sm">Universities</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-green-500/20 rounded-lg">
                  <span className="font-semibold">Monthly Stipend</span>
                  <span className="text-2xl font-bold text-green-400">500-3,500</span>
                  <span className="text-sm">CNY/month</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-blue-500/20 rounded-lg">
                  <span className="font-semibold">Apply Early</span>
                  <span className="text-2xl font-bold text-blue-400">Early</span>
                  <span className="text-sm">Application</span>
                </div>
              </div>
            </div>

            {/* Top Programs */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-center text-green-400">
                Popular Programs
              </h3>
              <div className="space-y-3">
                <div className="bg-green-500/20 rounded-lg p-4">
                  <div className="font-bold text-green-200">Engineering & Technology</div>
                  <div className="text-sm text-green-100">Aeronautical, Computer Science, AI, Mechanical</div>
                </div>
                <div className="bg-green-500/20 rounded-lg p-4">
                  <div className="font-bold text-green-200">Business & Economics</div>
                  <div className="text-sm text-green-100">International Business, Economics, Trade</div>
                </div>
                <div className="bg-green-500/20 rounded-lg p-4">
                  <div className="font-bold text-green-200">Medicine & Pharmacy</div>
                  <div className="text-sm text-green-100">MBBS, Pharmacy, Clinical Pharmacy</div>
                </div>
                <div className="bg-green-500/20 rounded-lg p-4">
                  <div className="font-bold text-green-200">Specialized Fields</div>
                  <div className="text-sm text-green-100">Petroleum, Geology, Nuclear Engineering</div>
                </div>
              </div>
            </div>

            {/* Why Choose Our Programs */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-center text-blue-400">
                Why Choose Our Programs?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Higher Success Rate</div>
                    <div className="text-sm text-gray-300">Less competition for admission</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Foundation Preparation</div>
                    <div className="text-sm text-gray-300">5-month academic preparation program</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Comprehensive Support</div>
                    <div className="text-sm text-gray-300">We handle all applications and documentation</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">English Medium</div>
                    <div className="text-sm text-gray-300">No Chinese language requirement</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => handleCTAClick('China Intake - Apply Now')}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 px-12 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3 mx-auto shadow-xl text-lg"
            >
              <FaRocket className="h-6 w-6" />
              Apply for China Programs
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Navigation Tabs */}
      <section className="bg-white shadow-sm sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex justify-center overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-6 py-4 font-semibold whitespace-nowrap transition-all duration-300 border-b-2 hover:bg-gray-50 ${
                  activeTab === tab.id
                      ? 'text-red-600 border-red-600 bg-red-50 shadow-sm'
                      : 'text-gray-600 border-transparent hover:text-red-600 hover:border-red-300'
                }`}
              >
                  <Icon className="h-5 w-5" />
                {tab.label}
              </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          {/* Enhanced Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-16">
              <div className="text-center">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">Why Study in China?</h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  🌟 China offers the perfect combination of <span className="font-bold text-red-600">world-class education</span>, 
                  <span className="font-bold text-orange-600"> full scholarship opportunities</span>, and 
                  <span className="font-bold text-yellow-600"> English-medium programs</span> in the world's fastest-growing economy.
                </p>
              </div>

              {/* Enhanced Feature Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-red-500 group">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FaTrophy className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Full Scholarship Programs</h3>
                  <p className="text-gray-600 mb-4">CSC & provincial scholarships covering tuition, living expenses, and monthly stipends.</p>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-red-800 font-semibold text-sm">🎓 100% Tuition Coverage Available</p>
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-orange-500 group">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FaDollarSign className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Affordable Education</h3>
                  <p className="text-gray-600 mb-4">Low tuition fees with generous scholarship opportunities and very affordable living costs.</p>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-orange-800 font-semibold text-sm">💰 From ¥15,000 per year</p>
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-yellow-500 group">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FaGlobe className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">English Programs</h3>
                  <p className="text-gray-600 mb-4">1000+ universities offer English-taught programs with no Chinese language requirement.</p>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-yellow-800 font-semibold text-sm">🌍 No Language Barrier</p>
                  </div>
                </div>
              </div>

              {/* Enhanced Special Features Section */}
              <div className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-12 rounded-3xl border border-red-100">
                <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">🌟 Special Features & Benefits</h3>
                <div className="grid lg:grid-cols-2 gap-12">
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <FaStar className="h-6 w-6 text-red-500" />
                      Key Benefits
                    </h4>
                    <div className="space-y-4">
                      {[
                        "CSC & provincial full scholarships",
                        "1000+ English-taught programs", 
                        "No entrance exams for most programs",
                        "Direct admission process",
                        "Affordable living costs (¥600-1200/month)",
                        "World-class universities",
                        "Modern facilities and technology",
                        "Strong international community"
                      ].map((feature, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm">
                          <FaCheckCircle className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <FaCalendarAlt className="h-6 w-6 text-red-500" />
                      Intake Information
                    </h4>
                    <div className="space-y-6">
                      <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h5 className="font-bold text-gray-900 mb-3">Available Intakes</h5>
                        <div className="space-y-2">
                          {["Multiple Intakes Available"].map((intake, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                              <span className="text-gray-700 font-medium">{intake}</span>
                  </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-red-500 to-orange-600 p-6 rounded-xl text-white">
                        <h5 className="font-bold mb-2">Visa Success Rate</h5>
                        <p className="text-red-100">95%+ success rate with our expert guidance and proven application process</p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-orange-500 to-yellow-600 p-6 rounded-xl text-white">
                        <h5 className="font-bold mb-2">Processing Time</h5>
                        <p className="text-orange-100">Quick 2-3 week visa processing with streamlined documentation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        {/* Scholarships Tab */}
        {activeTab === 'scholarships' && (
          <div className="space-y-12">
            <h2 className="text-4xl font-bold text-center mb-12">Scholarship Opportunities</h2>
            
            {/* CSC Scholarship */}
            <section>
              <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 text-white mb-8">
                <h3 className="text-3xl font-bold mb-4 flex items-center gap-3">
                  <FaTrophy className="h-8 w-8" />
                  CSC (Chinese Government Scholarship)
                </h3>
                <p className="text-xl text-red-100">The most prestigious scholarship program in China - Administered by China Scholarship Council</p>
                <div className="mt-4 p-4 bg-yellow-500/20 rounded-xl border border-yellow-500/30">
                  <div className="text-center">
                    <div className="text-sm text-yellow-200 mb-1">CSC Scholarship Available Only For</div>
                    <div className="text-lg font-bold text-yellow-400">Multiple Intakes Available - Apply Early</div>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="text-2xl font-bold mb-4 text-red-600">Coverage & Benefits</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-red-600" />
                      <span className="font-medium">Full tuition fee waiver</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-red-600" />
                      <span className="font-medium">Monthly stipend: 500-3,500 CNY</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-red-600" />
                      <span className="font-medium">Free on-campus accommodation</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-red-600" />
                      <span className="font-medium">Comprehensive medical insurance</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-red-600" />
                      <span className="font-medium">One-time settlement allowance: 1,500 CNY</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="text-2xl font-bold mb-4 text-orange-600">Eligibility & Requirements</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <span className="font-medium">Non-Chinese citizens in good health</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <span className="font-medium">Excellent academic performance (GPA 3.0+)</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <span className="font-medium">Age: Under 25 (Bachelor's), Under 35 (Master's), Under 40 (PhD)</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <span className="font-medium">HSK level 3+ or English proficiency (IELTS 6.0+)</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <span className="font-medium">No other Chinese government scholarship recipient</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Provincial Scholarships */}
            <section>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
                <h3 className="text-3xl font-bold mb-4 flex items-center gap-3">
                  <FaAward className="h-8 w-8" />
                  Provincial & University Scholarships
                </h3>
                <p className="text-xl text-blue-100">Regional and institutional scholarship programs we help you access</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="text-xl font-bold mb-4 text-blue-600">Provincial Government Scholarships</h4>
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-semibold text-blue-800">Beijing Government Scholarship</div>
                      <div className="text-sm text-blue-600">Up to 40,000 CNY/year</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-semibold text-blue-800">Shanghai Municipal Scholarship</div>
                      <div className="text-sm text-blue-600">Up to 30,000 CNY/year</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-semibold text-blue-800">Jiangsu Jasmine Scholarship</div>
                      <div className="text-sm text-blue-600">Full tuition + stipend</div>
                    </div>
                    <p className="text-gray-600 text-sm">Offered by provincial governments for specific regions and programs</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-200">
                  <h4 className="text-xl font-bold mb-4 text-purple-600 flex items-center gap-2">
                    <FaUniversity className="h-5 w-5" />
                    University-Specific Scholarships
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">HIGHLIGHTED</span>
                  </h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                      <div className="font-semibold text-purple-800 text-lg">Tsinghua Schwarzman Scholars</div>
                      <div className="text-sm text-purple-600">Full tuition + stipend + leadership program</div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                      <div className="font-semibold text-purple-800 text-lg">Peking Yenching Academy</div>
                      <div className="text-sm text-purple-600">Full scholarship + China studies program</div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                      <div className="font-semibold text-purple-800 text-lg">Fudan University Scholarships</div>
                      <div className="text-sm text-purple-600">Merit-based awards up to 50% tuition</div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                      <div className="font-semibold text-purple-800 text-lg">Shanghai Jiao Tong University</div>
                      <div className="text-sm text-purple-600">Engineering excellence scholarships</div>
                    </div>
                    <p className="text-gray-600 text-sm font-medium">🌟 Merit-based scholarships offered directly by top universities - We help you apply!</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="text-xl font-bold mb-4 text-green-600">Special Programs</h4>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-semibold text-green-800">Confucius Institute Scholarship</div>
                      <div className="text-sm text-green-600">Chinese language studies</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-semibold text-green-800">Belt & Road Scholarships</div>
                      <div className="text-sm text-green-600">Regional cooperation programs</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-semibold text-green-800">Cultural Exchange Programs</div>
                      <div className="text-sm text-green-600">Government-sponsored initiatives</div>
                    </div>
                    <p className="text-gray-600 text-sm">Special programs for specific countries and cultural exchange</p>
                  </div>
                </div>
              </div>
            </section>

            {/* University Scholarships Highlight */}
            <section className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white mb-8">
              <h3 className="text-3xl font-bold mb-4 flex items-center gap-3">
                <FaUniversity className="h-8 w-8" />
                🎯 University Scholarships - Your Best Opportunity!
              </h3>
              <p className="text-xl text-purple-100 mb-6">Direct scholarships from top Chinese universities - often easier to get than government scholarships!</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h4 className="text-xl font-bold mb-4 text-yellow-400">Why University Scholarships?</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <FaCheckCircle className="h-5 w-5 text-yellow-400" />
                      <span>Higher success rate than government scholarships</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaCheckCircle className="h-5 w-5 text-yellow-400" />
                      <span>Direct application to universities</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaCheckCircle className="h-5 w-5 text-yellow-400" />
                      <span>Multiple scholarship types available</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaCheckCircle className="h-5 w-5 text-yellow-400" />
                      <span>We handle the entire application process</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h4 className="text-xl font-bold mb-4 text-yellow-400">Top University Scholarships</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Tsinghua University</span>
                      <span className="text-yellow-400 font-bold">Full Coverage</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Peking University</span>
                      <span className="text-yellow-400 font-bold">Full Coverage</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Fudan University</span>
                      <span className="text-yellow-400 font-bold">Up to 50%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Shanghai Jiao Tong</span>
                      <span className="text-yellow-400 font-bold">Up to 50%</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Scholarship Application Tips */}
            <section className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-3xl p-8">
              <h3 className="text-3xl font-bold text-center mb-8">Scholarship Application Tips & Timeline</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "Start application well in advance for best results",
                  "Maintain excellent academic records (GPA 3.0+ for CSC)",
                  "Prepare strong personal statement and 2-3 recommendation letters",
                  "Obtain HSK level 3+ or IELTS 6.0+ for English programs",
                  "Research specific university and scholarship requirements",
                  "We handle all scholarship applications for you",
                  "Apply for multiple scholarships to increase chances",
                  "We help prepare and translate all required documents"
                ].map((tip, index) => (
                  <div key={index} className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm">
                    <FaCheckCircle className="h-6 w-6 text-yellow-600 flex-shrink-0" />
                    <span className="text-lg font-medium">{tip}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-red-50 rounded-2xl border border-red-200">
                <h4 className="text-xl font-bold text-red-800 mb-4 text-center">Application Timeline</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600 mb-2">Early Application</div>
                    <div className="text-lg text-red-700">Apply well in advance for best results</div>
                    <div className="text-sm text-red-600">Results announced in due time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600 mb-2">Multiple Intakes</div>
                    <div className="text-lg text-red-700">Various intake periods available</div>
                    <div className="text-sm text-red-600">Flexible application periods</div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Programs Tab */}
        {activeTab === 'programs' && (
          <div className="space-y-12">
            <h2 className="text-4xl font-bold text-center mb-12">Popular Study Programs</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: "Engineering", icon: FaBuilding, programs: "Mechanical, Civil, Computer", duration: "4 years", tuition: "¥15k-35k/year", scholarship: "Full/Partial Available", highlight: true },
                { name: "Business", icon: FaBriefcase, programs: "MBA, Finance, Marketing", duration: "2-4 years", tuition: "¥15k-35k/year", scholarship: "Full/Partial Available", highlight: true },
                { name: "Medicine (MBBS)", icon: FaMicroscope, programs: "MBBS, Dentistry, Pharmacy", duration: "5-6 years", tuition: "¥25k-40k/year", scholarship: "Self-funded", highlight: false },
                { name: "Aeronautical & Aerospace", icon: FaRocket, programs: "Aviation, Aerospace Engineering", duration: "4 years", tuition: "¥15k-35k/year", scholarship: "Scholarship/Self-funded", highlight: true }
              ].map((program, index) => (
                <div key={index} className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group ${program.highlight ? 'border-2 border-green-200' : ''}`}>
                  {program.highlight && (
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      SCHOLARSHIP
                    </div>
                  )}
                  <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <program.icon className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{program.name}</h3>
                  <p className="text-gray-600 mb-3">{program.programs}</p>
                  <div className="text-sm text-gray-500 mb-2">Duration: {program.duration}</div>
                  <div className="text-sm font-semibold text-red-600 mb-2">{program.tuition}</div>
                  <div className={`text-sm font-bold px-3 py-1 rounded-full ${
                    program.scholarship.includes('Full') ? 'bg-green-100 text-green-800' :
                    program.scholarship.includes('Self') ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {program.scholarship}
                  </div>
                </div>
              ))}
            </div>

            {/* Program Benefits */}
            <section className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-12">
              <h3 className="text-3xl font-bold text-center mb-12">Why Choose Our Programs?</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaTrophy className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Scholarship Support</h4>
                  <p className="text-gray-600">100% tuition-free opportunities available</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaGlobe className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">English Medium</h4>
                  <p className="text-gray-600">No Chinese language requirement</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaUniversity className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Foundation Program</h4>
                  <p className="text-gray-600">5-month academic preparation</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaRocket className="w-8 h-8 text-orange-600" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Full Support</h4>
                  <p className="text-gray-600">We handle all applications</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Universities Tab */}
        {activeTab === 'universities' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Top Universities in China</h2>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full text-lg font-bold mb-8 shadow-lg">
                <FaCalendarAlt className="h-5 w-5" />
                🚨 SCHOLARSHIPS AVAILABLE! 🚨
              </div>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                { 
                  name: "Nanjing University of Information Science and Technology (NUIST)", 
                  rank: "Ranking: 397", 
                  programs: "AI, Computer Science, Electronic Engineering, International Economics", 
                  city: "Nanjing, Jiangsu", 
                  scholarship: "100% Tuition Free (Top 40%)", 
                  available: true,
                  foundation: "7,500 CNY",
                  bachelor: "18,000 CNY/year",
                  deadline: "Apply Early"
                },
                { 
                  name: "Zhengzhou University (ZZU)", 
                  rank: "Ranking: 259 (CWUR)", 
                  programs: "International Economics, Tourism, Civil Engineering, Pharmacy, MBBS", 
                  city: "Zhengzhou, Henan", 
                  scholarship: "100% Tuition Free (Category 1)", 
                  available: true,
                  foundation: "5,000 CNY",
                  bachelor: "23,000-36,000 CNY/year",
                  deadline: "Apply Early"
                },
                { 
                  name: "China Pharmaceutical University (CPU)", 
                  rank: "Ranking: 724", 
                  programs: "International Economics, Pharmacy, Clinical Pharmacy", 
                  city: "Nanjing, Jiangsu", 
                  scholarship: "100% Tuition Free + 10,000 CNY", 
                  available: true,
                  foundation: "5,000 CNY",
                  bachelor: "19,000-25,000 CNY/year",
                  deadline: "Apply Early"
                },
                { 
                  name: "Nanjing University of Aeronautics and Astronautics (NUAA)", 
                  rank: "Ranking: 761", 
                  programs: "Aeronautical Engineering, AI, Mechanical, Electrical, International Business", 
                  city: "Nanjing, Jiangsu", 
                  scholarship: "100% Tuition Free + Monthly Stipend", 
                  available: true,
                  foundation: "8,000 CNY",
                  bachelor: "22,900-23,900 CNY/year",
                  deadline: "Apply Early"
                },
                { 
                  name: "China Three Gorges University (CTGU)", 
                  rank: "Ranking: 1246", 
                  programs: "Aeronautical, Computer Science, Business, Pharmacy, Civil Engineering", 
                  city: "Yichang, Hubei", 
                  scholarship: "100% Tuition Free (Hubei Scholarship)", 
                  available: true,
                  foundation: "5,000 CNY",
                  bachelor: "10,000-15,000 CNY/year",
                  deadline: "Apply Early"
                },
                { 
                  name: "Nantong University (NTU)", 
                  rank: "Ranking: 1284", 
                  programs: "AI, Electronics, Mechanical, Civil Engineering", 
                  city: "Nantong, Jiangsu", 
                  scholarship: "8,000 CNY/year Tuition", 
                  available: true,
                  foundation: "8,000 CNY",
                  bachelor: "16,000 CNY/year",
                  deadline: "Apply Early"
                },
                { 
                  name: "Linyi University (LYU)", 
                  rank: "Ranking: 1647", 
                  programs: "E-Commerce, Civil Engineering, Computer Science, International Business", 
                  city: "Linyi, Shandong", 
                  scholarship: "100% Tuition Free (1st Class)", 
                  available: true,
                  foundation: "4,000 CNY",
                  bachelor: "12,000 CNY/year",
                  deadline: "Apply Early"
                },
                { 
                  name: "Xi'an Shiyou University (XSYU)", 
                  rank: "Ranking: 1969", 
                  programs: "Civil Engineering, Computer Science, Petroleum Engineering, Geology", 
                  city: "Xi'an, Shaanxi", 
                  scholarship: "100% Tuition Free + Monthly Stipend", 
                  available: true,
                  foundation: "3,000 CNY",
                  bachelor: "18,500 CNY/year",
                  deadline: "Apply Early"
                },
                { 
                  name: "Wuzhou University (WZU)", 
                  rank: "Regional University", 
                  programs: "Computer Science, International Trade and Economics", 
                  city: "Wuzhou, Guangxi", 
                  scholarship: "After Scholarship Tuition + Hostel fee: 6000 CNY", 
                  available: true,
                  foundation: "No Foundation Course",
                  bachelor: "Direct Bachelor Program Available",
                  deadline: "Apply Early"
                }
              ].map((university, index) => (
                <div key={index} className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group ${university.available ? 'border-2 border-red-200' : ''}`}>
                  {university.available && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      AVAILABLE
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                      <FaUniversity className="w-6 h-6 text-red-600" />
                    </div>
                    <span className="text-sm font-semibold text-red-600 bg-red-100 px-3 py-1 rounded-full">
                      {university.rank}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{university.name}</h3>
                  <p className="text-gray-600 mb-3 text-sm">{university.programs}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <FaMapMarkerAlt className="w-4 h-4 mr-1" />
                    {university.city}
                  </div>
                  
                  {/* Foundation Program - Only show if not "No Foundation Course" */}
                  {university.foundation !== "No Foundation Course" && (
                    <div className="bg-blue-50 rounded-lg p-3 mb-3">
                      <div className="text-sm font-semibold text-blue-800">Foundation Program Available</div>
                      <div className="text-xs text-blue-600">Tuition: {university.foundation}</div>
                    </div>
                  )}
                  
                  {/* Bachelor Program */}
                  <div className="bg-green-50 rounded-lg p-3 mb-3">
                    <div className="text-sm font-semibold text-green-800">
                      {university.foundation === "No Foundation Course" ? "Bachelor Program Available" : "Bachelor Program Available"}
                    </div>
                    <div className="text-xs text-green-600">
                      {university.foundation === "No Foundation Course" ? "Direct Entry Available" : `Tuition: ${university.bachelor}`}
                    </div>
                  </div>
                  
                  {/* Scholarship */}
                  <div className="text-sm font-semibold text-green-600 mb-2 bg-green-100 px-2 py-1 rounded">
                    🎓 {university.scholarship}
                  </div>
                  
                  {/* Deadline */}
                  <div className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full">
                    📅 Apply: {university.deadline}
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* Requirements Tab */}
        {activeTab === 'requirements' && (
          <div className="space-y-16">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Application Requirements</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple requirements for admission - we help you with everything
              </p>
            </div>
            
            {/* Academic Requirements */}
            <section className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-12">
              <h3 className="text-3xl font-bold mb-12 text-center">Academic Requirements</h3>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h4 className="text-2xl font-bold mb-6 text-red-600 flex items-center gap-3">
                    <FaGraduationCap className="h-6 w-6" />
                    Foundation + Bachelor Programs
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-red-600" />
                      <div>
                        <div className="font-semibold">High School Certificate (HSC)</div>
                        <div className="text-sm text-gray-600">Minimum 2.50+ to 5.00+ (varies by university)</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-red-600" />
                      <div>
                        <div className="font-semibold">Age Requirement</div>
                        <div className="text-sm text-gray-600">18-25 years old</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-red-600" />
                      <div>
                        <div className="font-semibold">English Proficiency</div>
                        <div className="text-sm text-gray-600">IELTS 5.5+ or equivalent (some universities)</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-red-600" />
                      <div>
                        <div className="font-semibold">Health Certificate</div>
                        <div className="text-sm text-gray-600">Medical examination required</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h4 className="text-2xl font-bold mb-6 text-orange-600 flex items-center gap-3">
                    <FaMicroscope className="h-6 w-6" />
                    MBBS Programs
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <div>
                        <div className="font-semibold">High School Certificate</div>
                        <div className="text-sm text-gray-600">Minimum 4.00+ GPA</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <div>
                        <div className="font-semibold">Science Background</div>
                        <div className="text-sm text-gray-600">Physics, Chemistry, Biology required</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <div>
                        <div className="font-semibold">English Proficiency</div>
                        <div className="text-sm text-gray-600">IELTS 6.0+ or TOEFL 80+</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <div>
                        <div className="font-semibold">Age Limit</div>
                        <div className="text-sm text-gray-600">18-25 years old</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Documents Required */}
            <section>
              <h3 className="text-3xl font-bold mb-12 text-center">Required Documents</h3>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h4 className="text-2xl font-bold mb-6 text-blue-600 flex items-center gap-3">
                    <FaFileAlt className="h-6 w-6" />
                    Academic Documents
                  </h4>
                  <div className="space-y-4">
                    {[
                      "High School Certificate (certified copy)",
                      "Academic transcripts (certified copy)",
                      "English translation of all documents",
                      "Passport copy (valid for 2+ years)",
                      "Passport-size photos (white background)",
                      "Application form (we help you complete)"
                    ].map((doc, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                        <FaCheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                        <span className="font-medium">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h4 className="text-2xl font-bold mb-6 text-green-600 flex items-center gap-3">
                    <FaShieldAlt className="h-6 w-6" />
                    Additional Documents
                  </h4>
                  <div className="space-y-4">
                    {[
                      "Medical examination certificate",
                      "Police clearance certificate",
                      "Financial proof (bank statements)",
                      "English proficiency certificate (if required)",
                      "Personal statement (we help you write)",
                      "Recommendation letters (we guide you)"
                    ].map((doc, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                        <FaCheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                        <span className="font-medium">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Application Support */}
            <section className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-12 text-white">
              <h3 className="text-3xl font-bold mb-8 text-center">We Handle Everything For You</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaFileAlt className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Document Preparation</h4>
                  <p className="text-green-100">We help prepare and translate all required documents</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaRocket className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Application Submission</h4>
                  <p className="text-green-100">We submit all applications on your behalf</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaShieldAlt className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Visa Support</h4>
                  <p className="text-green-100">Complete visa application assistance</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Process Tab */}
        {activeTab === 'process' && (
          <div className="space-y-12">
            <h2 className="text-4xl font-bold text-center mb-12">Application Process</h2>
            
            <div className="space-y-8">
              {[
                {
                  step: 1,
                  title: "Choose Program & University",
                  description: "Select your preferred university and program. Research scholarship opportunities and requirements. Check eligibility for CSC, provincial, or university scholarships."
                },
                {
                  step: 2,
                  title: "Prepare Documents",
                  description: "Gather academic transcripts, degree certificates, passport, recommendation letters, personal statement, and HSK/IELTS certificates. Get documents translated and certified."
                },
                {
                  step: 3,
                  title: "Apply for Scholarship",
                  description: "We handle all scholarship applications for you. Apply well in advance for best results."
                },
                {
                  step: 4,
                  title: "University Application",
                  description: "We submit your application to the chosen university through our agency platform. We handle all the paperwork and submission process for you."
                },
                {
                  step: 5,
                  title: "Receive Admission Letter",
                  description: "Get your admission letter and scholarship confirmation from the university. Results are announced in due time after application review."
                },
                {
                  step: 6,
                  title: "Visa Application",
                  description: "We assist with X1/X2 student visa application at Chinese embassy with admission letter, JW201/JW202 form, and all required documents."
                }
              ].map((step, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-4 text-gray-900">{step.title}</h3>
                      <p className="text-lg text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-red-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-full text-lg font-bold mb-6 shadow-lg">
              <FaStar className="h-5 w-5" />
              Limited Time Opportunity - Apply Now!
            </div>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            🚀 Start Your Education Journey in <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">China</span>
          </h2>
          
          <p className="text-xl text-yellow-100 mb-8 max-w-4xl mx-auto leading-relaxed">
            Join thousands of students who are already pursuing <span className="font-bold text-yellow-400">world-class education</span> with 
            <span className="font-bold text-orange-400"> full scholarship opportunities</span>. Get cutting-edge education with English-medium programs!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <button 
              onClick={() => handleCTAClick('china-cta')}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-5 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-xl text-lg"
            >
              <FaRocket className="h-6 w-6" />
              Apply Now - Start Your Journey!
            </button>
            <button 
              onClick={() => handleCTAClick('china-cta-consultation')}
              className="bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 text-white font-bold py-5 px-10 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 text-lg"
            >
              <FaPhone className="h-6 w-6" />
              Free Consultation
            </button>
          </div>

          {/* Key Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaTrophy className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Full Scholarships</h3>
              <p className="text-yellow-200 text-sm">CSC and university scholarships available</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">95%+ Visa Success</h3>
              <p className="text-yellow-200 text-sm">High approval rate with our expertise</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaCertificate className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Global Recognition</h3>
              <p className="text-yellow-200 text-sm">Internationally recognized degrees</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

