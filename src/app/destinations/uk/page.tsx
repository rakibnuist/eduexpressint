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
  FaPassport,
  FaCrown
} from 'react-icons/fa';

export default function UKPage() {
  const { openCTA } = useCTA();
  const [activeTab, setActiveTab] = useState('overview');

  const destination = findDestination('uk');
  
  if (!destination) {
    return <div>Destination not found</div>;
  }

  const handleCTAClick = (source: string) => {
    trackViewContent('UK Page CTA Click', {
      content_category: 'Destination Page',
      content_ids: ['uk-cta'],
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
      <section className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white overflow-hidden min-h-screen flex items-center">
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-400/15 rounded-full blur-3xl animate-pulse delay-500"></div>
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute bottom-1/4 left-1/4 w-56 h-56 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-300"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 animate-float-slow opacity-20">
            <FaCrown className="h-12 w-12 text-blue-400" />
          </div>
          <div className="absolute top-40 right-32 animate-float-slow delay-1000 opacity-20">
            <FaGraduationCap className="h-10 w-10 text-purple-400" />
          </div>
          <div className="absolute bottom-32 left-40 animate-float-slow delay-500 opacity-20">
            <FaUniversity className="h-14 w-14 text-indigo-400" />
          </div>
          <div className="absolute bottom-20 right-20 animate-float-slow delay-700 opacity-20">
            <FaCertificate className="h-8 w-8 text-blue-400" />
          </div>
        </div>
        
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-20 w-full">
          <div className="text-center">
            {/* Enhanced Intake Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-2xl animate-bounce hover:animate-none transition-all duration-300 transform hover:scale-105">
                <FaCalendarAlt className="h-6 w-6" />
                January, May & September 2026 Intakes Available
                <FaStar className="h-5 w-5 animate-spin" />
              </div>
            </div>

            {/* Enhanced Main Heading */}
            <h1 className="text-6xl lg:text-8xl font-bold mb-8 leading-tight">
              Study in the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 animate-pulse">United Kingdom</span>
            </h1>
            
            {/* Enhanced Subheading */}
            <div className="mb-8">
              <p className="text-3xl lg:text-4xl text-blue-100 mb-4 font-bold">
                👑 World-Class Education
              </p>
              <p className="text-2xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold">
                From £15,000 Per Year!
              </p>
            </div>
            
            {/* Enhanced Description */}
            <p className="text-xl lg:text-2xl text-blue-200 mb-12 leading-relaxed max-w-5xl mx-auto">
              Experience <span className="font-bold text-blue-400">world-class education</span> at 
              <span className="font-bold text-purple-400"> Russell Group universities</span> with 
              <span className="font-bold text-indigo-400"> excellent scholarship opportunities</span> and global recognition.
            </p>
            
            {/* Enhanced Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
              <div className="text-center bg-white/15 backdrop-blur-sm rounded-3xl p-8 border border-white/30 hover:bg-white/25 transition-all duration-300 transform hover:scale-105 group">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FaDollarSign className="h-10 w-10 text-white" />
                </div>
                <div className="text-5xl font-bold text-blue-400 mb-2">£15k-£35k</div>
                <div className="text-lg text-blue-200 font-medium">Annual Tuition</div>
                <div className="text-sm text-blue-300 mt-2">With Scholarships Available</div>
                </div>
              
              <div className="text-center bg-white/15 backdrop-blur-sm rounded-3xl p-8 border border-white/30 hover:bg-white/25 transition-all duration-300 transform hover:scale-105 group">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FaTrophy className="h-10 w-10 text-white" />
                </div>
                <div className="text-5xl font-bold text-purple-400 mb-2">160+</div>
                <div className="text-lg text-blue-200 font-medium">Universities</div>
                <div className="text-sm text-blue-300 mt-2">Russell Group Excellence</div>
              </div>

              <div className="text-center bg-white/15 backdrop-blur-sm rounded-3xl p-8 border border-white/30 hover:bg-white/25 transition-all duration-300 transform hover:scale-105 group">
                <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FaHome className="h-10 w-10 text-white" />
                </div>
                <div className="text-5xl font-bold text-indigo-400 mb-2">£800-£1200</div>
                <div className="text-lg text-blue-200 font-medium">Monthly Living</div>
                <div className="text-sm text-blue-300 mt-2">Including London</div>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                <button 
                  onClick={() => handleCTAClick('uk-hero')}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-6 px-12 rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-4 shadow-2xl text-xl group"
                >
                <FaRocket className="h-6 w-6 group-hover:animate-bounce" />
                Apply Now - Start Your Journey!
                <FaStar className="h-5 w-5 animate-pulse" />
                </button>
                <button 
                  onClick={() => handleCTAClick('uk-hero-consultation')}
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
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <FaCrown className="h-8 w-8 text-white" />
                </div>
                <div className="text-lg font-bold text-blue-200">Russell Group</div>
                <div className="text-sm text-blue-300">24 Elite Universities</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <FaTrophy className="h-8 w-8 text-white" />
                </div>
                <div className="text-lg font-bold text-blue-200">Scholarships</div>
                <div className="text-sm text-blue-300">Chevening & Commonwealth</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <FaRocket className="h-8 w-8 text-white" />
                </div>
                <div className="text-lg font-bold text-blue-200">Post-Study Work</div>
                <div className="text-sm text-blue-300">2-Year Graduate Route</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <FaPassport className="h-8 w-8 text-white" />
                </div>
                <div className="text-lg font-bold text-blue-200">Global Recognition</div>
                <div className="text-sm text-blue-300">World-Class Degrees</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UK Intake Highlight Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg">
                <FaCalendarAlt className="h-5 w-5" />
                January, May & September 2026 Intakes Available
              </div>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Study in the UK with <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">World-Class Education</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join prestigious UK universities including Russell Group institutions with excellent scholarship opportunities. 
              Experience world-class education with global recognition and post-study work opportunities.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Scholarship Statistics */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-center text-yellow-400">
                UK Education Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-yellow-500/20 rounded-lg">
                  <span className="font-semibold">Russell Group</span>
                  <span className="text-2xl font-bold text-yellow-400">24</span>
                  <span className="text-sm">Universities</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-green-500/20 rounded-lg">
                  <span className="font-semibold">Scholarships</span>
                  <span className="text-2xl font-bold text-green-400">£10k</span>
                  <span className="text-sm">per year</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-blue-500/20 rounded-lg">
                  <span className="font-semibold">Post-Study Work</span>
                  <span className="text-2xl font-bold text-blue-400">2</span>
                  <span className="text-sm">years</span>
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
                  <div className="font-bold text-green-200">Business & Management</div>
                  <div className="text-sm text-green-100">MBA, Finance, Marketing, International Business</div>
                </div>
                <div className="bg-green-500/20 rounded-lg p-4">
                  <div className="font-bold text-green-200">Engineering & Technology</div>
                  <div className="text-sm text-green-100">Computer Science, AI, Mechanical, Civil</div>
                </div>
                <div className="bg-green-500/20 rounded-lg p-4">
                  <div className="font-bold text-green-200">Medicine & Health</div>
                  <div className="text-sm text-green-100">Medicine, Dentistry, Pharmacy, Nursing</div>
                </div>
                <div className="bg-green-500/20 rounded-lg p-4">
                  <div className="font-bold text-green-200">Arts & Humanities</div>
                  <div className="text-sm text-green-100">Law, Literature, History, Psychology</div>
                </div>
              </div>
            </div>

            {/* Why Choose UK */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-center text-blue-400">
                Why Choose UK?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">World-Class Education</div>
                    <div className="text-sm text-gray-300">Top-ranked universities globally</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Post-Study Work Visa</div>
                    <div className="text-sm text-gray-300">2-year work opportunity after graduation</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Global Recognition</div>
                    <div className="text-sm text-gray-300">Degrees recognized worldwide</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Scholarship Opportunities</div>
                    <div className="text-sm text-gray-300">Multiple funding options available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => handleCTAClick('UK Intake - Apply Now')}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 px-12 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3 mx-auto shadow-xl text-lg"
            >
              <FaRocket className="h-6 w-6" />
              Apply for UK Intake
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
                      ? 'text-blue-600 border-blue-600 bg-blue-50 shadow-sm'
                      : 'text-gray-600 border-transparent hover:text-blue-600 hover:border-blue-300'
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
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">Why Study in the UK?</h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  🌟 The UK offers the perfect combination of <span className="font-bold text-blue-600">world-class education</span>, 
                  <span className="font-bold text-purple-600"> Russell Group universities</span>, and 
                  <span className="font-bold text-indigo-600"> excellent scholarship opportunities</span> with global recognition.
                </p>
              </div>

              {/* Enhanced Feature Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500 group">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FaCrown className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Russell Group Universities</h3>
                  <p className="text-gray-600 mb-4">24 elite universities with world-class rankings and global recognition.</p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-800 font-semibold text-sm">👑 Oxford, Cambridge, Imperial & More</p>
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500 group">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FaTrophy className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Scholarship Opportunities</h3>
                  <p className="text-gray-600 mb-4">Chevening, Commonwealth, and university-specific scholarships available.</p>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-purple-800 font-semibold text-sm">🎓 Full Funding Available</p>
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-indigo-500 group">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FaRocket className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Post-Study Work Visa</h3>
                  <p className="text-gray-600 mb-4">2-year Graduate Route visa allowing work opportunities after graduation.</p>
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <p className="text-indigo-800 font-semibold text-sm">💼 Career Opportunities</p>
                  </div>
                </div>
              </div>

              {/* Enhanced Special Features Section */}
              <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 p-12 rounded-3xl border border-blue-100">
                <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">🌟 Special Features & Benefits</h3>
                <div className="grid lg:grid-cols-2 gap-12">
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <FaStar className="h-6 w-6 text-blue-500" />
                      Key Benefits
                    </h4>
                    <div className="space-y-4">
                      {[
                        "Russell Group & world-class universities",
                        "Chevening & Commonwealth scholarships", 
                        "No entrance exams for most programs",
                        "Direct UCAS application process",
                        "Affordable living costs (£800-1200/month)",
                        "English-speaking environment",
                        "Modern facilities and technology",
                        "Strong international community"
                      ].map((feature, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm">
                          <FaCheckCircle className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <FaCalendarAlt className="h-6 w-6 text-blue-500" />
                      Intake Information
                    </h4>
                    <div className="space-y-6">
                      <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h5 className="font-bold text-gray-900 mb-3">Available Intakes</h5>
                        <div className="space-y-2">
                          {["January 2026", "May 2026", "September 2026"].map((intake, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                              <span className="text-gray-700 font-medium">{intake}</span>
                  </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-xl text-white">
                        <h5 className="font-bold mb-2">Visa Success Rate</h5>
                        <p className="text-blue-100">98%+ success rate with our expert guidance and proven application process</p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 rounded-xl text-white">
                        <h5 className="font-bold mb-2">Processing Time</h5>
                        <p className="text-purple-100">Quick 2-3 week visa processing with streamlined documentation</p>
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
            
            {/* Chevening Scholarship */}
            <section>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
                <h3 className="text-3xl font-bold mb-4 flex items-center gap-3">
                  <FaTrophy className="h-8 w-8" />
                  Chevening Scholarships
                </h3>
                <p className="text-xl text-blue-100">The UK government's global scholarship programme - Funded by the Foreign, Commonwealth & Development Office</p>
                <div className="mt-4 p-4 bg-yellow-500/20 rounded-xl border border-yellow-500/30">
                  <div className="text-center">
                    <div className="text-sm text-yellow-200 mb-1">2025-2026 Application Deadlines</div>
                    <div className="text-lg font-bold text-yellow-400">September 2025 Intake: June 2025 | January 2026 Intake: October 2025</div>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="text-2xl font-bold mb-4 text-blue-600">Coverage & Benefits</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Full tuition fee coverage</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Monthly living allowance: £1,200-1,500</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Return economy airfare</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Arrival allowance: £500</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Thesis grant: £500</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="text-2xl font-bold mb-4 text-orange-600">Eligibility & Requirements</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <span className="font-medium">Citizen of Chevening-eligible country</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <span className="font-medium">Return to home country for 2 years</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <span className="font-medium">Academic excellence (2:1 or equivalent)</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <span className="font-medium">2+ years work experience</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <span className="font-medium">English proficiency: IELTS 6.5+ or equivalent</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Commonwealth & University Scholarships */}
            <section>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
                <h3 className="text-3xl font-bold mb-4 flex items-center gap-3">
                  <FaAward className="h-8 w-8" />
                  Commonwealth & University Scholarships
                </h3>
                <p className="text-xl text-blue-100">Government and institutional scholarship programs we help you access</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="text-xl font-bold mb-4 text-blue-600">Commonwealth Scholarships</h4>
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-semibold text-blue-800">Commonwealth Master's Scholarships</div>
                      <div className="text-sm text-blue-600">Full tuition + living allowance</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-semibold text-blue-800">Commonwealth PhD Scholarships</div>
                      <div className="text-sm text-blue-600">Full funding for 3-4 years</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-semibold text-blue-800">Commonwealth Split-site Scholarships</div>
                      <div className="text-sm text-blue-600">12 months in UK + home country</div>
                    </div>
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
                      <div className="font-semibold text-purple-800 text-lg">Oxford Clarendon Scholarships</div>
                      <div className="text-sm text-purple-600">Full tuition + living allowance</div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                      <div className="font-semibold text-purple-800 text-lg">Cambridge Gates Scholarships</div>
                      <div className="text-sm text-purple-600">Full funding for international students</div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                      <div className="font-semibold text-purple-800 text-lg">Imperial College Scholarships</div>
                      <div className="text-sm text-purple-600">Merit-based awards up to £10,000/year</div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                      <div className="font-semibold text-purple-800 text-lg">LSE Graduate Support Scheme</div>
                      <div className="text-sm text-purple-600">Need-based awards up to £15,000</div>
                    </div>
                    <p className="text-gray-600 text-sm font-medium">🌟 Merit-based scholarships offered directly by top UK universities - We help you apply!</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="text-xl font-bold mb-4 text-green-600">Special Programs</h4>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-semibold text-green-800">Marshall Scholarships</div>
                      <div className="text-sm text-green-600">US citizens studying in UK</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-semibold text-green-800">Rhodes Scholarships</div>
                      <div className="text-sm text-green-600">Oxford University funding</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-semibold text-green-800">Fulbright Scholarships</div>
                      <div className="text-sm text-green-600">US-UK exchange programs</div>
                    </div>
                    <p className="text-gray-600 text-sm">Special programs for specific countries and international exchange</p>
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
              <p className="text-xl text-purple-100 mb-6">Direct scholarships from top UK universities - often easier to get than government scholarships!</p>
              
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
                      <span className="font-medium">Oxford University</span>
                      <span className="text-yellow-400 font-bold">Clarendon Scholarships</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Cambridge University</span>
                      <span className="text-yellow-400 font-bold">Gates Scholarships</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Imperial College</span>
                      <span className="text-yellow-400 font-bold">Up to £10,000/year</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">LSE</span>
                      <span className="text-yellow-400 font-bold">Up to £15,000</span>
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
                  "Start application 6-8 months before your preferred intake",
                  "Maintain excellent academic records (2:1 or equivalent for Chevening)",
                  "Prepare strong personal statement and 2-3 recommendation letters",
                  "Obtain IELTS 6.5+ or equivalent for English proficiency",
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
              
            </section>
          </div>
        )}

        {/* Programs Tab */}
        {activeTab === 'programs' && (
          <div className="space-y-12">
            <h2 className="text-4xl font-bold text-center mb-12">Popular Study Programs</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: "Business & Management", icon: FaBriefcase, programs: "MBA, Finance, Marketing, Economics", duration: "1-2 years", tuition: "£15k-35k/year", scholarship: "Scholarships Available", highlight: true },
                { name: "Engineering & Technology", icon: FaBuilding, programs: "Computer Science, AI, Mechanical, Civil", duration: "3-4 years", tuition: "£20k-40k/year", scholarship: "Scholarships Available", highlight: true },
                { name: "Medicine & Health", icon: FaMicroscope, programs: "Medicine, Dentistry, Pharmacy, Nursing", duration: "4-6 years", tuition: "£25k-45k/year", scholarship: "Limited Scholarships", highlight: false },
                { name: "Arts & Humanities", icon: FaBookOpen, programs: "Law, Literature, History, Psychology", duration: "3-4 years", tuition: "£15k-30k/year", scholarship: "Scholarships Available", highlight: true }
              ].map((program, index) => (
                <div key={index} className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group ${program.highlight ? 'border-2 border-green-200' : ''}`}>
                  {program.highlight && (
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      SCHOLARSHIP
                    </div>
                  )}
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <program.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{program.name}</h3>
                  <p className="text-gray-600 mb-3">{program.programs}</p>
                  <div className="text-sm text-gray-500 mb-2">Duration: {program.duration}</div>
                  <div className="text-sm font-semibold text-blue-600 mb-2">{program.tuition}</div>
                  <div className={`text-sm font-bold px-3 py-1 rounded-full ${
                    program.scholarship.includes('Available') ? 'bg-green-100 text-green-800' :
                    program.scholarship.includes('Limited') ? 'bg-orange-100 text-orange-800' :
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
                  <p className="text-gray-600">Chevening, Commonwealth & university scholarships</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaGlobe className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">English Medium</h4>
                  <p className="text-gray-600">Native English-speaking environment</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaUniversity className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">World-Class Universities</h4>
                  <p className="text-gray-600">Russell Group & top-ranked institutions</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaRocket className="w-8 h-8 text-orange-600" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Post-Study Work</h4>
                  <p className="text-gray-600">2-year Graduate Route visa</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Universities Tab */}
        {activeTab === 'universities' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Top Universities in the UK</h2>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full text-lg font-bold mb-8 shadow-lg">
                <FaCalendarAlt className="h-5 w-5" />
                🎓 JANUARY, MAY & SEPTEMBER 2026 INTAKES - APPLY NOW! 🎓
              </div>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                { 
                  name: "University of Oxford", 
                  rank: "Ranking: #1 (QS World)", 
                  programs: "Business, Engineering, Medicine, Law, Arts", 
                  city: "Oxford, England", 
                  scholarship: "Clarendon Scholarships Available", 
                  march2026: false,
                  foundation: "N/A",
                  bachelor: "£25,000-35,000/year",
                  deadline: "Oct 15, 2025"
                },
                { 
                  name: "University of Cambridge", 
                  rank: "Ranking: #2 (QS World)", 
                  programs: "Business, Engineering, Medicine, Law, Arts", 
                  city: "Cambridge, England", 
                  scholarship: "Gates Scholarships Available", 
                  march2026: false,
                  foundation: "N/A",
                  bachelor: "£25,000-35,000/year",
                  deadline: "Oct 15, 2025"
                },
                { 
                  name: "Imperial College London", 
                  rank: "Ranking: #6 (QS World)", 
                  programs: "Engineering, Medicine, Business, Computer Science", 
                  city: "London, England", 
                  scholarship: "Merit Scholarships up to £10,000", 
                  march2026: false,
                  foundation: "N/A",
                  bachelor: "£30,000-40,000/year",
                  deadline: "Jan 15, 2026"
                },
                { 
                  name: "London School of Economics (LSE)", 
                  rank: "Ranking: #45 (QS World)", 
                  programs: "Economics, Business, Law, Social Sciences", 
                  city: "London, England", 
                  scholarship: "Graduate Support Scheme up to £15,000", 
                  march2026: false,
                  foundation: "N/A",
                  bachelor: "£20,000-30,000/year",
                  deadline: "Jan 15, 2026"
                },
                { 
                  name: "University College London (UCL)", 
                  rank: "Ranking: #9 (QS World)", 
                  programs: "Engineering, Medicine, Business, Arts, Sciences", 
                  city: "London, England", 
                  scholarship: "Global Excellence Scholarships", 
                  march2026: false,
                  foundation: "N/A",
                  bachelor: "£25,000-35,000/year",
                  deadline: "Jan 15, 2026"
                },
                { 
                  name: "University of Edinburgh", 
                  rank: "Ranking: #22 (QS World)", 
                  programs: "Business, Engineering, Medicine, Arts, Sciences", 
                  city: "Edinburgh, Scotland", 
                  scholarship: "Edinburgh Global Scholarships", 
                  march2026: false,
                  foundation: "N/A",
                  bachelor: "£20,000-30,000/year",
                  deadline: "Jan 15, 2026"
                },
                { 
                  name: "King's College London", 
                  rank: "Ranking: #40 (QS World)", 
                  programs: "Medicine, Law, Business, Arts, Sciences", 
                  city: "London, England", 
                  scholarship: "International Scholarships", 
                  march2026: false,
                  foundation: "N/A",
                  bachelor: "£25,000-35,000/year",
                  deadline: "Jan 15, 2026"
                },
                { 
                  name: "University of Manchester", 
                  rank: "Ranking: #32 (QS World)", 
                  programs: "Engineering, Business, Medicine, Arts, Sciences", 
                  city: "Manchester, England", 
                  scholarship: "International Excellence Scholarships", 
                  march2026: false,
                  foundation: "N/A",
                  bachelor: "£20,000-30,000/year",
                  deadline: "Jan 15, 2026"
                },
                { 
                  name: "University of Bristol", 
                  rank: "Ranking: #55 (QS World)", 
                  programs: "Engineering, Business, Medicine, Arts, Sciences", 
                  city: "Bristol, England", 
                  scholarship: "Think Big Scholarships", 
                  march2026: false,
                  foundation: "N/A",
                  bachelor: "£20,000-30,000/year",
                  deadline: "Jan 15, 2026"
                }
              ].map((university, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <FaUniversity className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                      {university.rank}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{university.name}</h3>
                  <p className="text-gray-600 mb-3 text-sm">{university.programs}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <FaMapMarkerAlt className="w-4 h-4 mr-1" />
                    {university.city}
                  </div>
                  
                  {/* Foundation Program */}
                  <div className="bg-blue-50 rounded-lg p-3 mb-3">
                    <div className="text-sm font-semibold text-blue-800">Foundation Program (March-July)</div>
                    <div className="text-xs text-blue-600">Tuition: {university.foundation}</div>
                  </div>
                  
                  {/* Bachelor Program */}
                  <div className="bg-green-50 rounded-lg p-3 mb-3">
                    <div className="text-sm font-semibold text-green-800">Bachelor Program (Sept Start)</div>
                    <div className="text-xs text-green-600">Tuition: {university.bachelor}</div>
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
                Clear requirements for UK study programs - we help you with everything
              </p>
            </div>
            
            {/* Academic Requirements */}
            <section className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-12">
              <h3 className="text-3xl font-bold mb-12 text-center">Academic Requirements</h3>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h4 className="text-2xl font-bold mb-6 text-blue-600 flex items-center gap-3">
                    <FaGraduationCap className="h-6 w-6" />
                    Undergraduate Programs
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-semibold">A-Levels or Equivalent</div>
                        <div className="text-sm text-gray-600">AAB-AAA for Russell Group, BBC-ABB for other universities</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-semibold">International Qualifications</div>
                        <div className="text-sm text-gray-600">IB (32-38 points), SAT, or country-specific equivalents</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-semibold">English Proficiency</div>
                        <div className="text-sm text-gray-600">IELTS 6.0-7.0 or TOEFL 80-100 (varies by university)</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-semibold">UCAS Personal Statement</div>
                        <div className="text-sm text-gray-600">4000 characters showcasing academic interests and goals</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h4 className="text-2xl font-bold mb-6 text-orange-600 flex items-center gap-3">
                    <FaMicroscope className="h-6 w-6" />
                    Graduate Programs
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <div>
                        <div className="font-semibold">Bachelor's Degree</div>
                        <div className="text-sm text-gray-600">2:1 (Upper Second) or equivalent (60%+)</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <div>
                        <div className="font-semibold">Relevant Academic Background</div>
                        <div className="text-sm text-gray-600">Related field of study or professional experience</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <div>
                        <div className="font-semibold">English Proficiency</div>
                        <div className="text-sm text-gray-600">IELTS 6.5-7.5 or TOEFL 90-110 (varies by program)</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <div>
                        <div className="font-semibold">Professional Experience</div>
                        <div className="text-sm text-gray-600">2-3 years for MBA, varies for other programs</div>
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
                      "A-Level certificates or equivalent qualifications",
                      "Academic transcripts (certified copies)",
                      "English translation of all documents (if required)",
                      "Passport copy (valid for 6+ months)",
                      "Passport-size photos (UK visa specifications)",
                      "UCAS application form (we help you complete)"
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
                      "Tuberculosis (TB) test certificate (if required)",
                      "Criminal record certificate (if required)",
                      "Financial proof (bank statements for 28+ days)",
                      "IELTS/TOEFL certificate (original copy)",
                      "Personal statement (we help you write)",
                      "Academic references (2 references required)"
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
                  <h4 className="text-xl font-bold mb-2">UCAS Application</h4>
                  <p className="text-green-100">We help complete your UCAS application and personal statement</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaRocket className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">University Applications</h4>
                  <p className="text-green-100">We submit applications to multiple UK universities</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaShieldAlt className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Student Visa Support</h4>
                  <p className="text-green-100">Complete UK student visa application assistance</p>
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
                  description: "Select your preferred UK university and program. Research scholarship opportunities including Chevening, Commonwealth, and university-specific scholarships. Check eligibility and requirements."
                },
                {
                  step: 2,
                  title: "Prepare Documents",
                  description: "Gather A-level certificates, academic transcripts, passport, academic references, personal statement, and IELTS/TOEFL certificates. Get documents translated and certified if required."
                },
                {
                  step: 3,
                  title: "Apply for Scholarships",
                  description: "We handle all scholarship applications including Chevening, Commonwealth, and university scholarships. Apply 6-8 months before your preferred intake."
                },
                {
                  step: 4,
                  title: "UCAS Application",
                  description: "We help you complete your UCAS application, personal statement, and submit to up to 5 UK universities. We handle all the paperwork and submission process for you."
                },
                {
                  step: 5,
                  title: "Receive Offers",
                  description: "Get your conditional or unconditional offers from UK universities. Results typically announced within 2-6 weeks of application submission."
                },
                {
                  step: 6,
                  title: "Student Visa Application",
                  description: "We assist with UK student visa (Tier 4) application with CAS letter, financial proof, TB test certificate, and all required documents."
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
      <section className="py-20 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full text-lg font-bold mb-6 shadow-lg">
              <FaStar className="h-5 w-5" />
              Limited Time Opportunity - Apply Now!
            </div>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            🚀 Start Your Education Journey in the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">United Kingdom</span>
          </h2>
          
          <p className="text-xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
            Join thousands of students who are already pursuing <span className="font-bold text-blue-400">world-class education</span> at 
            <span className="font-bold text-purple-400"> Russell Group universities</span>. Get cutting-edge education with excellent scholarship opportunities!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <button 
              onClick={() => handleCTAClick('uk-cta')}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-5 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-xl text-lg"
            >
              <FaRocket className="h-6 w-6" />
              Apply Now - Start Your Journey!
            </button>
            <button 
              onClick={() => handleCTAClick('uk-cta-consultation')}
              className="bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 text-white font-bold py-5 px-10 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 text-lg"
            >
              <FaPhone className="h-6 w-6" />
              Free Consultation
            </button>
          </div>

          {/* Key Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaTrophy className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Scholarships Available</h3>
              <p className="text-blue-200 text-sm">Chevening, Commonwealth & university scholarships</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">98%+ Visa Success</h3>
              <p className="text-blue-200 text-sm">High approval rate with our expertise</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaCertificate className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Global Recognition</h3>
              <p className="text-blue-200 text-sm">World-class degrees from Russell Group</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

