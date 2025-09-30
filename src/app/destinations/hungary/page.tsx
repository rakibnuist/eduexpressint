'use client';

import { useState } from 'react';
import { findDestination } from '@/lib/data/destinations';
import { useCTA } from '@/context/CTAContext';
import { trackViewContent } from '@/components/TrackLead';
import FloatingElements from '@/components/FloatingElements';
import { 
  FaGraduationCap, 
  FaDollarSign, 
  FaBriefcase, 
  FaGlobe, 
  FaHome, 
  FaLanguage, 
  FaPlane, 
  FaCheckCircle,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaFileAlt,
  FaMoneyBillWave,
  FaUsers,
  FaUniversity,
  FaCertificate,
  FaBookOpen,
  FaClipboardList,
  FaStar,
  FaRocket,
  FaShieldAlt,
  FaDownload,
  FaTrophy,
  FaAward,
  FaBuilding,
  FaMicroscope,
  FaLaptopCode,
  FaHandshake,
  FaCrown,
  FaHeart
} from 'react-icons/fa';

export default function HungaryPage() {
  const { openCTA } = useCTA();
  const [activeTab, setActiveTab] = useState('overview');

  const destination = findDestination('hungary');
  
  if (!destination) {
    return <div>Destination not found</div>;
  }

  const handleCTAClick = (source: string) => {
    trackViewContent('Hungary Page CTA Click', {
      content_category: 'Destination Page',
      content_ids: ['hungary-cta'],
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
      <FloatingElements variant="destinations" intensity="medium" />
      
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 text-white overflow-hidden min-h-screen flex items-center">
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-96 h-96 bg-red-400/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-yellow-400/15 rounded-full blur-3xl animate-pulse delay-500"></div>
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-red-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute bottom-1/4 left-1/4 w-56 h-56 bg-orange-400/10 rounded-full blur-3xl animate-pulse delay-300"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 animate-float-slow opacity-20">
            <FaCrown className="h-12 w-12 text-red-400" />
          </div>
          <div className="absolute top-40 right-32 animate-float-slow delay-1000 opacity-20">
            <FaGraduationCap className="h-10 w-10 text-orange-400" />
          </div>
          <div className="absolute bottom-32 left-40 animate-float-slow delay-500 opacity-20">
            <FaUniversity className="h-14 w-14 text-yellow-400" />
          </div>
          <div className="absolute bottom-20 right-20 animate-float-slow delay-700 opacity-20">
            <FaCertificate className="h-8 w-8 text-red-400" />
          </div>
        </div>
        
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-20 w-full">
          <div className="text-center">
            {/* Enhanced Intake Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-2xl animate-bounce hover:animate-none transition-all duration-300 transform hover:scale-105">
                <FaStar className="h-6 w-6" />
                January & September 2026 Intakes - Apply Now!
                <FaStar className="h-5 w-5 animate-spin" />
              </div>
            </div>

            {/* Enhanced Main Heading */}
            <h1 className="text-6xl lg:text-8xl font-bold mb-8 leading-tight">
              Study in <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 animate-pulse">Hungary</span>
            </h1>
            
            {/* Enhanced Subheading */}
            <div className="mb-8">
              <p className="text-3xl lg:text-4xl text-red-100 mb-4 font-bold">
                🇭🇺 EU Degree Recognition
              </p>
              <p className="text-2xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 font-bold">
                From €3,000 Per Year!
              </p>
            </div>
            
            {/* Enhanced Description */}
            <p className="text-xl lg:text-2xl text-orange-200 mb-12 leading-relaxed max-w-5xl mx-auto">
              Experience <span className="font-bold text-red-400">world-class education</span> with 
              <span className="font-bold text-orange-400"> EU degree recognition</span> and 
              <span className="font-bold text-yellow-400"> affordable tuition fees</span> in Hungary's leading universities.
            </p>
            
            {/* Enhanced Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
              <div className="text-center bg-white/15 backdrop-blur-sm rounded-3xl p-8 border border-white/30 hover:bg-white/25 transition-all duration-300 transform hover:scale-105 group">
                <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FaDollarSign className="h-10 w-10 text-white" />
                </div>
                <div className="text-5xl font-bold text-red-400 mb-2">€3k-€8k</div>
                <div className="text-lg text-orange-200 font-medium">Annual Tuition</div>
                <div className="text-sm text-orange-300 mt-2">With Scholarships Available</div>
                </div>
              
              <div className="text-center bg-white/15 backdrop-blur-sm rounded-3xl p-8 border border-white/30 hover:bg-white/25 transition-all duration-300 transform hover:scale-105 group">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FaUniversity className="h-10 w-10 text-white" />
                </div>
                <div className="text-5xl font-bold text-orange-400 mb-2">65+</div>
                <div className="text-lg text-orange-200 font-medium">Universities</div>
                <div className="text-sm text-orange-300 mt-2">Top-Ranked Institutions</div>
              </div>

              <div className="text-center bg-white/15 backdrop-blur-sm rounded-3xl p-8 border border-white/30 hover:bg-white/25 transition-all duration-300 transform hover:scale-105 group">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FaShieldAlt className="h-10 w-10 text-white" />
                </div>
                <div className="text-5xl font-bold text-yellow-400 mb-2">95%</div>
                <div className="text-lg text-orange-200 font-medium">Success Rate</div>
                <div className="text-sm text-orange-300 mt-2">Proven Track Record</div>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                <button 
                  onClick={() => handleCTAClick('hungary-hero')}
                className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-6 px-12 rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-4 shadow-2xl text-xl group"
                >
                <FaRocket className="h-6 w-6 group-hover:animate-bounce" />
                Apply Now - Start Your Journey!
                <FaStar className="h-5 w-5 animate-pulse" />
                </button>
                <button 
                  onClick={() => handleCTAClick('hungary-hero-consultation')}
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
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <FaCertificate className="h-8 w-8 text-white" />
                </div>
                <div className="text-lg font-bold text-orange-200">EU Recognition</div>
                <div className="text-sm text-orange-300">Degrees Valid Across EU</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <FaTrophy className="h-8 w-8 text-white" />
                </div>
                <div className="text-lg font-bold text-orange-200">Scholarships</div>
                <div className="text-sm text-orange-300">Multiple Opportunities</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <FaLanguage className="h-8 w-8 text-white" />
                </div>
                <div className="text-lg font-bold text-orange-200">English Programs</div>
                <div className="text-sm text-orange-300">No Hungarian Required</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <FaHeart className="h-8 w-8 text-white" />
                </div>
                <div className="text-lg font-bold text-orange-200">Rich Culture</div>
                <div className="text-sm text-orange-300">Central European Heritage</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2026 Intakes Highlight Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full text-lg font-bold mb-6 shadow-lg">
              <FaCalendarAlt className="h-5 w-5" />
              January & September 2026 Intakes - Application Deadlines: October 15, 2025 & January 15, 2026
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Study in Hungary with <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">World-Class Education</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join prestigious Hungarian universities offering world-class education with affordable tuition fees. 
              Start your academic journey in January or September 2026 with excellent support.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Education Statistics */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-center text-yellow-400">
                Education Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-yellow-500/20 rounded-lg">
                  <span className="font-semibold">Affordable Tuition</span>
                  <span className="text-2xl font-bold text-yellow-400">€3k-8k</span>
                  <span className="text-sm">EUR/year</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-green-500/20 rounded-lg">
                  <span className="font-semibold">EU Recognition</span>
                  <span className="text-2xl font-bold text-green-400">100%</span>
                  <span className="text-sm">Recognition</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-blue-500/20 rounded-lg">
                  <span className="font-semibold">Application Deadlines</span>
                  <span className="text-2xl font-bold text-blue-400">Oct/Jan</span>
                  <span className="text-sm">2025/2026</span>
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
                  <div className="font-bold text-green-200">Medicine & Health Sciences</div>
                  <div className="text-sm text-green-100">General Medicine, Dentistry, Pharmacy, Veterinary</div>
                </div>
                <div className="bg-green-500/20 rounded-lg p-4">
                  <div className="font-bold text-green-200">Engineering & Technology</div>
                  <div className="text-sm text-green-100">Computer Science, Mechanical, Civil, Electrical</div>
                </div>
                <div className="bg-green-500/20 rounded-lg p-4">
                  <div className="font-bold text-green-200">Business & Economics</div>
                  <div className="text-sm text-green-100">Business Administration, Economics, International Relations</div>
                </div>
                <div className="bg-green-500/20 rounded-lg p-4">
                  <div className="font-bold text-green-200">Arts & Humanities</div>
                  <div className="text-sm text-green-100">Psychology, Education, Languages, Cultural Studies</div>
                </div>
              </div>
            </div>

            {/* Why Choose 2026 Intakes */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-center text-blue-400">
                Why Choose 2026 Intakes?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Flexible Start Dates</div>
                    <div className="text-sm text-gray-300">January and September intake options</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">EU Degree Recognition</div>
                    <div className="text-sm text-gray-300">Degrees recognized across all EU countries</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">English Medium</div>
                    <div className="text-sm text-gray-300">No Hungarian language requirement</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Comprehensive Support</div>
                    <div className="text-sm text-gray-300">We handle all applications and documentation</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => handleCTAClick('2026 Intakes - Apply Now')}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 px-12 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3 mx-auto shadow-xl text-lg"
            >
              <FaRocket className="h-6 w-6" />
              Apply for 2026 Intakes
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Navigation Tabs */}
      <section className="bg-white sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex justify-center overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-6 py-4 font-semibold whitespace-nowrap transition-all duration-300 hover:bg-gray-50 ${
                  activeTab === tab.id
                      ? 'text-red-600 bg-red-50'
                      : 'text-gray-600 hover:text-red-600'
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
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">Why Study in Hungary?</h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  🇭🇺 Hungary offers the perfect combination of <span className="font-bold text-red-600">EU degree recognition</span>, 
                  <span className="font-bold text-orange-600"> affordable education</span>, and 
                  <span className="font-bold text-yellow-600"> excellent scholarship opportunities</span> with world-class universities.
                </p>
              </div>

              {/* Enhanced Feature Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-red-500 group">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FaCertificate className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">EU Degree Recognition</h3>
                  <p className="text-gray-600 mb-4">Degrees recognized across all EU countries and internationally with full validity.</p>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-red-800 font-semibold text-sm">🇪🇺 Valid Across All EU Countries</p>
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-orange-500 group">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FaDollarSign className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Affordable Education</h3>
                  <p className="text-gray-600 mb-4">Low tuition fees starting from €3,000 per year with scholarship opportunities.</p>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-orange-800 font-semibold text-sm">💰 From €3,000 Per Year</p>
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-yellow-500 group">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FaLanguage className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">English Programs</h3>
                  <p className="text-gray-600 mb-4">Wide range of English-taught programs with no Hungarian language requirement.</p>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-yellow-800 font-semibold text-sm">🌍 No Hungarian Required</p>
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
                        "EU degree recognition across all member countries",
                        "Affordable tuition fees from €3,000 per year", 
                        "No entrance exams for most programs",
                        "Direct application to universities",
                        "Low cost of living (€400-600/month)",
                        "English-taught programs available",
                        "Central European location and culture",
                        "Strong international student community"
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
                          {["January 2026", "September 2026"].map((intake, index) => (
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
                        <p className="text-orange-100">Quick 2-4 week visa processing with streamlined documentation</p>
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
            
            {/* General Scholarship Information */}
            <section>
              <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 text-white mb-8">
                <h3 className="text-3xl font-bold mb-4 flex items-center gap-3">
                  <FaTrophy className="h-8 w-8" />
                  Available Scholarships
                </h3>
                <p className="text-xl text-red-100">Various scholarship opportunities available for international students in Hungary</p>
                <div className="mt-4 p-4 bg-yellow-500/20 rounded-xl border border-yellow-500/30">
                  <div className="text-center">
                    <div className="text-sm text-yellow-200 mb-1">Scholarships Available For</div>
                    <div className="text-lg font-bold text-yellow-400">January & September 2026 Intakes</div>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="text-2xl font-bold mb-4 text-red-600">Scholarship Types</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-red-600" />
                      <span className="font-medium">Merit-based scholarships</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-red-600" />
                      <span className="font-medium">University-specific awards</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-red-600" />
                      <span className="font-medium">Research assistantships</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-red-600" />
                      <span className="font-medium">Partial tuition waivers</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-red-600" />
                      <span className="font-medium">Performance-based awards</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="text-2xl font-bold mb-4 text-orange-600">Application Requirements</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <span className="font-medium">Excellent academic performance</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <span className="font-medium">Strong personal statement</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <span className="font-medium">Recommendation letters</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <span className="font-medium">English proficiency (IELTS 6.0+ or equivalent)</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <span className="font-medium">We help with all applications</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* University Scholarships */}
            <section>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
                <h3 className="text-3xl font-bold mb-4 flex items-center gap-3">
                  <FaAward className="h-8 w-8" />
                  University-Specific Scholarships
                </h3>
                <p className="text-xl text-blue-100">Individual universities offer merit-based scholarships and financial aid</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="text-xl font-bold mb-4 text-blue-600">Academic Excellence Scholarships</h4>
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-semibold text-blue-800">Merit-based Awards</div>
                      <div className="text-sm text-blue-600">Up to 50% tuition reduction</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-semibold text-blue-800">Research Scholarships</div>
                      <div className="text-sm text-blue-600">For graduate students</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-semibold text-blue-800">Performance Awards</div>
                      <div className="text-sm text-blue-600">Based on academic achievements</div>
                    </div>
                    <p className="text-gray-600 text-sm">Offered by individual universities for outstanding students</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-200">
                  <h4 className="text-xl font-bold mb-4 text-purple-600 flex items-center gap-2">
                    <FaUniversity className="h-5 w-5" />
                    Special Programs
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">HIGHLIGHTED</span>
                  </h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                      <div className="font-semibold text-purple-800 text-lg">Erasmus+ Scholarships</div>
                      <div className="text-sm text-purple-600">EU mobility program for exchange students</div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                      <div className="font-semibold text-purple-800 text-lg">Bilateral Agreements</div>
                      <div className="text-sm text-purple-600">Country-specific scholarship programs</div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                      <div className="font-semibold text-purple-800 text-lg">Research Grants</div>
                      <div className="text-sm text-purple-600">Funding for research projects</div>
                    </div>
                    <p className="text-gray-600 text-sm font-medium">🌟 Special programs with additional benefits - We help you apply!</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="text-xl font-bold mb-4 text-green-600">Financial Aid Options</h4>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-semibold text-green-800">Work-Study Programs</div>
                      <div className="text-sm text-green-600">Part-time work opportunities</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-semibold text-green-800">Teaching Assistantships</div>
                      <div className="text-sm text-green-600">For graduate students</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-semibold text-green-800">Internship Programs</div>
                      <div className="text-sm text-green-600">Paid internship opportunities</div>
                    </div>
                    <p className="text-gray-600 text-sm">Additional financial support options available</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Scholarship Application Tips */}
            <section className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-3xl p-8">
              <h3 className="text-3xl font-bold text-center mb-8">Scholarship Application Tips & Timeline</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "Start application 6-8 months before intake (July 2025 for Sept 2026, March 2025 for Jan 2026)",
                  "Maintain excellent academic records (GPA 3.0+ for most scholarships)",
                  "Prepare strong personal statement and 2-3 recommendation letters",
                  "Obtain IELTS 6.0+ or equivalent English proficiency certificate",
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
                <h4 className="text-xl font-bold text-red-800 mb-4 text-center">Important Application Deadlines 2026</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600 mb-2">January Intake</div>
                    <div className="text-lg text-red-700">Application Deadline: October 15, 2025</div>
                    <div className="text-sm text-red-600">Results: December 2025</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600 mb-2">September Intake</div>
                    <div className="text-lg text-red-700">Application Deadline: January 15, 2026</div>
                    <div className="text-sm text-red-600">Results: May 2026</div>
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
                { name: "Medicine", icon: FaMicroscope, programs: "General Medicine, Dentistry, Pharmacy", duration: "5-6 years", tuition: "€3k-8k/year", scholarship: "Scholarships Available", highlight: true },
                { name: "Engineering", icon: FaBuilding, programs: "Computer Science, Mechanical, Civil", duration: "3-4 years", tuition: "€3k-6k/year", scholarship: "Scholarships Available", highlight: true },
                { name: "Business", icon: FaBriefcase, programs: "Business Admin, Economics, Marketing", duration: "3-4 years", tuition: "€3k-6k/year", scholarship: "Scholarships Available", highlight: true },
                { name: "Arts & Humanities", icon: FaBookOpen, programs: "Psychology, Education, Languages", duration: "3-4 years", tuition: "€3k-5k/year", scholarship: "Scholarships Available", highlight: true }
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
                    program.scholarship.includes('Available') ? 'bg-green-100 text-green-800' :
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
                  <p className="text-gray-600">Various scholarship opportunities available</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaGlobe className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">English Medium</h4>
                  <p className="text-gray-600">No Hungarian language requirement</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaUniversity className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">EU Recognition</h4>
                  <p className="text-gray-600">Degrees recognized across all EU countries</p>
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
              <h2 className="text-4xl font-bold mb-4">Top Universities in Hungary</h2>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full text-lg font-bold mb-8 shadow-lg">
                <FaCalendarAlt className="h-5 w-5" />
                🚨 JANUARY & SEPTEMBER 2026 INTAKES - SCHOLARSHIPS AVAILABLE! 🚨
              </div>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                { 
                  name: "Semmelweis University", 
                  rank: "Ranking: 401-500 (QS)", 
                  programs: "General Medicine, Dentistry, Pharmacy, Health Sciences", 
                  city: "Budapest", 
                  scholarship: "Scholarships Available", 
                  jan2026: true,
                  sept2026: true,
                  tuition: "€3,000-8,000/year",
                  deadline: "Jan 15, 2026"
                },
                { 
                  name: "University of Debrecen", 
                  rank: "Ranking: 501-600 (QS)", 
                  programs: "Medicine, Engineering, Business, Agriculture, Arts", 
                  city: "Debrecen", 
                  scholarship: "Scholarships Available", 
                  jan2026: true,
                  sept2026: true,
                  tuition: "€3,000-6,000/year",
                  deadline: "Jan 15, 2026"
                },
                { 
                  name: "Budapest University of Technology and Economics", 
                  rank: "Ranking: 601-650 (QS)", 
                  programs: "Engineering, Computer Science, Architecture, Economics", 
                  city: "Budapest", 
                  scholarship: "Scholarships Available", 
                  jan2026: true,
                  sept2026: true,
                  tuition: "€3,000-6,000/year",
                  deadline: "Jan 15, 2026"
                },
                { 
                  name: "Corvinus University of Budapest", 
                  rank: "Ranking: 651-700 (QS)", 
                  programs: "Business Administration, Economics, International Relations", 
                  city: "Budapest", 
                  scholarship: "Scholarships Available", 
                  jan2026: true,
                  sept2026: true,
                  tuition: "€3,000-5,000/year",
                  deadline: "Jan 15, 2026"
                },
                { 
                  name: "Eötvös Loránd University (ELTE)", 
                  rank: "Ranking: 701-750 (QS)", 
                  programs: "Psychology, Education, Languages, Natural Sciences", 
                  city: "Budapest", 
                  scholarship: "Scholarships Available", 
                  jan2026: true,
                  sept2026: true,
                  tuition: "€3,000-5,000/year",
                  deadline: "Jan 15, 2026"
                },
                { 
                  name: "University of Szeged", 
                  rank: "Ranking: 751-800 (QS)", 
                  programs: "Medicine, Engineering, Business, Arts, Sciences", 
                  city: "Szeged", 
                  scholarship: "Scholarships Available", 
                  jan2026: true,
                  sept2026: true,
                  tuition: "€3,000-6,000/year",
                  deadline: "Jan 15, 2026"
                }
              ].map((university, index) => (
                <div key={index} className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group ${university.jan2026 || university.sept2026 ? 'border-2 border-red-200' : ''}`}>
                  {(university.jan2026 || university.sept2026) && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      2026
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
                  
                  {/* Tuition */}
                  <div className="bg-blue-50 rounded-lg p-3 mb-3">
                    <div className="text-sm font-semibold text-blue-800">Tuition Fees</div>
                    <div className="text-xs text-blue-600">{university.tuition}</div>
                  </div>
                  
                  {/* Scholarship */}
                  <div className="text-sm font-semibold text-green-600 mb-2 bg-green-100 px-2 py-1 rounded">
                    🎓 {university.scholarship}
                  </div>
                  
                  {/* Deadline */}
                  <div className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full">
                    📅 Deadline: {university.deadline}
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
                Simple requirements for September 2026 intake - we help you with everything
              </p>
            </div>
            
            {/* Academic Requirements */}
            <section className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-12">
              <h3 className="text-3xl font-bold mb-12 text-center">Academic Requirements</h3>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h4 className="text-2xl font-bold mb-6 text-red-600 flex items-center gap-3">
                    <FaGraduationCap className="h-6 w-6" />
                    Bachelor's Programs
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-red-600" />
                      <div>
                        <div className="font-semibold">High School Certificate</div>
                        <div className="text-sm text-gray-600">Minimum 60% average for most programs</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-red-600" />
                      <div>
                        <div className="font-semibold">Age Requirement</div>
                        <div className="text-sm text-gray-600">Under 30 years old</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-red-600" />
                      <div>
                        <div className="font-semibold">English Proficiency</div>
                        <div className="text-sm text-gray-600">IELTS 6.0+ or TOEFL 80+</div>
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
                    Medicine Programs
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <div>
                        <div className="font-semibold">High School Certificate</div>
                        <div className="text-sm text-gray-600">Minimum 70% average with Biology, Chemistry, Physics</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <div>
                        <div className="font-semibold">Science Background</div>
                        <div className="text-sm text-gray-600">Biology, Chemistry, Physics required</div>
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
                        <div className="font-semibold">Entrance Exam</div>
                        <div className="text-sm text-gray-600">Biology, Chemistry, Physics test required</div>
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
                      "English proficiency certificate (IELTS/TOEFL)",
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
                  description: "Select your preferred university and program. Research scholarship opportunities and requirements. Check eligibility for Stipendium Hungaricum or university scholarships."
                },
                {
                  step: 2,
                  title: "Prepare Documents",
                  description: "Gather academic transcripts, degree certificates, passport, recommendation letters, personal statement, and IELTS/TOEFL certificates. Get documents translated and certified."
                },
                {
                  step: 3,
                  title: "Apply for Scholarship",
                  description: "We handle all scholarship applications for you. Apply 6-8 months before intake deadline."
                },
                {
                  step: 4,
                  title: "University Application",
                  description: "We submit your application to the chosen university through our agency platform. We handle all the paperwork and submission process for you."
                },
                {
                  step: 5,
                  title: "Receive Admission Letter",
                  description: "Get your admission letter and scholarship confirmation from the university. Results typically announced in May 2026 (September intake) or December 2025 (January intake)."
                },
                {
                  step: 6,
                  title: "Visa Application",
                  description: "We assist with student visa application at Hungarian embassy with admission letter and all required documents."
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
          <div className="absolute top-10 left-10 w-64 h-64 bg-red-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full text-lg font-bold mb-6 shadow-lg">
              <FaStar className="h-5 w-5" />
              🇭🇺 Limited Time Opportunity - Apply Now!
            </div>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            🚀 Start Your Education Journey in <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Hungary</span>
          </h2>
          
          <p className="text-xl text-orange-100 mb-8 max-w-4xl mx-auto leading-relaxed">
            Join thousands of students who are already pursuing <span className="font-bold text-red-400">world-class education</span> with 
            <span className="font-bold text-orange-400"> EU degree recognition</span>. Experience affordable education and rich culture!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <button 
              onClick={() => handleCTAClick('hungary-cta')}
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-5 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-xl text-lg"
            >
              <FaRocket className="h-6 w-6" />
              Apply Now - Start Your Journey!
            </button>
            <button 
              onClick={() => handleCTAClick('hungary-cta-consultation')}
              className="bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 text-white font-bold py-5 px-10 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 text-lg"
            >
              <FaPhone className="h-6 w-6" />
              Free Consultation
            </button>
          </div>

          {/* Key Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaTrophy className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Scholarships Available</h3>
              <p className="text-orange-200 text-sm">Various scholarship opportunities for international students</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">95%+ Success Rate</h3>
              <p className="text-orange-200 text-sm">High approval rate with our expertise</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaCertificate className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">EU Recognition</h3>
              <p className="text-orange-200 text-sm">Degrees recognized across all EU countries</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
