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
  FaPassport,
  FaIdCard,
  FaHandshake,
  FaCrown,
  FaHeart
} from 'react-icons/fa';

export default function SouthKoreaPage() {
  const { openCTA } = useCTA();
  const [activeTab, setActiveTab] = useState('overview');

  const destination = findDestination('south-korea');
  
  if (!destination) {
    return <div>Destination not found</div>;
  }

  const handleCTAClick = (source: string) => {
    trackViewContent('South Korea Page CTA Click', {
      content_category: 'Destination Page',
      content_ids: ['south-korea-cta'],
      value: 1
    });
    openCTA(source);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FaGlobe },
    { id: 'programs', label: 'EAP/KAP Programs', icon: FaGraduationCap },
    { id: 'visa', label: 'Visa Information', icon: FaPassport },
    { id: 'universities', label: 'Universities', icon: FaUniversity },
    { id: 'requirements', label: 'Requirements', icon: FaFileAlt },
    { id: 'process', label: 'Process', icon: FaClipboardList }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      {/* Floating Elements */}
      <FloatingElements variant="destinations" intensity="medium" />
      
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-red-900 to-blue-800 text-white overflow-hidden min-h-screen flex items-center">
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-96 h-96 bg-red-400/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-yellow-400/15 rounded-full blur-3xl animate-pulse delay-500"></div>
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-red-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute bottom-1/4 left-1/4 w-56 h-56 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-300"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 animate-float-slow opacity-20">
            <FaHeart className="h-12 w-12 text-red-400" />
          </div>
          <div className="absolute top-40 right-32 animate-float-slow delay-1000 opacity-20">
            <FaGraduationCap className="h-10 w-10 text-blue-400" />
          </div>
          <div className="absolute bottom-32 left-40 animate-float-slow delay-500 opacity-20">
            <FaLaptopCode className="h-14 w-14 text-yellow-400" />
          </div>
          <div className="absolute bottom-20 right-20 animate-float-slow delay-700 opacity-20">
            <FaRocket className="h-8 w-8 text-red-400" />
          </div>
        </div>
        
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-20 w-full">
          <div className="text-center">
            {/* Enhanced Intake Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500 to-blue-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-2xl animate-bounce hover:animate-none transition-all duration-300 transform hover:scale-105">
                <FaStar className="h-6 w-6" />
                🇰🇷 EAP/KAP Programs - March & September 2026 Intakes
                <FaStar className="h-5 w-5 animate-spin" />
              </div>
            </div>

            {/* Enhanced Main Heading */}
            <h1 className="text-6xl lg:text-8xl font-bold mb-8 leading-tight">
              Study in <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400 animate-pulse">South Korea</span>
            </h1>
            
            {/* Enhanced Subheading */}
            <div className="mb-8">
              <p className="text-3xl lg:text-4xl text-red-100 mb-4 font-bold">
                🇰🇷 Technology Excellence
              </p>
              <p className="text-2xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-blue-400 font-bold">
                From $3,000 Per Year!
              </p>
            </div>
            
            {/* Enhanced Description */}
            <p className="text-xl lg:text-2xl text-blue-200 mb-12 leading-relaxed max-w-5xl mx-auto">
              Experience <span className="font-bold text-red-400">world-class technology education</span> with 
              <span className="font-bold text-yellow-400"> EAP/KAP programs</span> and 
              <span className="font-bold text-blue-400"> flexible visa options</span> in South Korea's leading universities.
            </p>
            
            {/* Enhanced Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
              <div className="text-center bg-white/15 backdrop-blur-sm rounded-3xl p-8 border border-white/30 hover:bg-white/25 transition-all duration-300 transform hover:scale-105 group">
                <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FaDollarSign className="h-10 w-10 text-white" />
                </div>
                <div className="text-5xl font-bold text-red-400 mb-2">$3k-$7k</div>
                <div className="text-lg text-blue-200 font-medium">Annual Tuition</div>
                <div className="text-sm text-blue-300 mt-2">With EAP/KAP Programs</div>
                </div>
              
              <div className="text-center bg-white/15 backdrop-blur-sm rounded-3xl p-8 border border-white/30 hover:bg-white/25 transition-all duration-300 transform hover:scale-105 group">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FaUniversity className="h-10 w-10 text-white" />
                </div>
                <div className="text-5xl font-bold text-blue-400 mb-2">60+</div>
                <div className="text-lg text-blue-200 font-medium">Universities</div>
                <div className="text-sm text-blue-300 mt-2">Top-Ranked Institutions</div>
              </div>

              <div className="text-center bg-white/15 backdrop-blur-sm rounded-3xl p-8 border border-white/30 hover:bg-white/25 transition-all duration-300 transform hover:scale-105 group">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FaShieldAlt className="h-10 w-10 text-white" />
                </div>
                <div className="text-5xl font-bold text-yellow-400 mb-2">95%</div>
                <div className="text-lg text-blue-200 font-medium">Visa Success</div>
                <div className="text-sm text-blue-300 mt-2">Regional & E-VISA</div>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                <button 
                  onClick={() => handleCTAClick('sk-hero')}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-6 px-12 rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-4 shadow-2xl text-xl group"
                >
                <FaRocket className="h-6 w-6 group-hover:animate-bounce" />
                Apply Now - Start Your Journey!
                <FaStar className="h-5 w-5 animate-pulse" />
                </button>
                <button 
                  onClick={() => handleCTAClick('sk-hero-consultation')}
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
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <FaGraduationCap className="h-8 w-8 text-white" />
                </div>
                <div className="text-lg font-bold text-blue-200">EAP/KAP Programs</div>
                <div className="text-sm text-blue-300">English & Korean Prep</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <FaPassport className="h-8 w-8 text-white" />
                </div>
                <div className="text-lg font-bold text-blue-200">Flexible Visas</div>
                <div className="text-sm text-blue-300">Regional & E-VISA</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <FaLaptopCode className="h-8 w-8 text-white" />
                </div>
                <div className="text-lg font-bold text-blue-200">Tech Innovation</div>
                <div className="text-sm text-blue-300">Samsung, LG, Hyundai</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <FaHeart className="h-8 w-8 text-white" />
                </div>
                <div className="text-lg font-bold text-blue-200">K-Culture</div>
                <div className="text-sm text-blue-300">Rich Cultural Experience</div>
              </div>
            </div>
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
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">Why Study in South Korea?</h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  🇰🇷 South Korea offers the perfect combination of <span className="font-bold text-red-600">cutting-edge technology</span>, 
                  <span className="font-bold text-blue-600"> EAP/KAP programs</span>, and 
                  <span className="font-bold text-yellow-600"> flexible visa options</span> with world-class education.
                </p>
              </div>

              {/* Enhanced Feature Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-red-500 group">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FaLaptopCode className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Technology Excellence</h3>
                  <p className="text-gray-600 mb-4">Leading in AI, robotics, and digital innovation with world-class tech companies.</p>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-red-800 font-semibold text-sm">🚀 Samsung, LG, Hyundai & More</p>
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500 group">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FaGraduationCap className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">EAP/KAP Programs</h3>
                  <p className="text-gray-600 mb-4">English Academic Preparation and Korean Academic Preparation programs available.</p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-800 font-semibold text-sm">🎓 Direct University Pathway</p>
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-yellow-500 group">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FaPassport className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Flexible Visa Options</h3>
                  <p className="text-gray-600 mb-4">Regional VISA for Bachelor's and E-VISA for Master's programs.</p>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-yellow-800 font-semibold text-sm">📋 Easy Application Process</p>
                  </div>
                </div>
              </div>

              {/* Enhanced Special Features Section */}
              <div className="bg-gradient-to-br from-red-50 via-blue-50 to-yellow-50 p-12 rounded-3xl border border-red-100">
                <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">🌟 Special Features & Benefits</h3>
                <div className="grid lg:grid-cols-2 gap-12">
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <FaStar className="h-6 w-6 text-red-500" />
                      Key Benefits
                    </h4>
                    <div className="space-y-4">
                      {[
                        "EAP/KAP programs for English & Korean preparation",
                        "Regional VISA for Bachelor's, E-VISA for Master's", 
                        "No entrance exams for most programs",
                        "Direct application to universities",
                        "Affordable tuition ($3k-7k/year)",
                        "Safe and modern environment",
                        "World-class technology and innovation",
                        "Rich Korean culture and K-wave experience"
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
                          {["March 2026", "September 2026"].map((intake, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                              <span className="text-gray-700 font-medium">{intake}</span>
                  </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-red-500 to-pink-600 p-6 rounded-xl text-white">
                        <h5 className="font-bold mb-2">Visa Success Rate</h5>
                        <p className="text-red-100">95%+ success rate with our expert guidance and proven application process</p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-xl text-white">
                        <h5 className="font-bold mb-2">Processing Time</h5>
                        <p className="text-blue-100">Quick 2-4 week visa processing with streamlined documentation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        {/* EAP/KAP Programs Tab */}
        {activeTab === 'programs' && (
          <div className="space-y-12">
            <h2 className="text-4xl font-bold text-center mb-12">EAP/KAP Programs</h2>
            
            {/* EAP Program */}
            <section className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-8 text-white mb-8">
              <h3 className="text-3xl font-bold mb-4 flex items-center gap-3">
                <FaGraduationCap className="h-8 w-8" />
                EAP (English Academic Preparation) Program
              </h3>
              <p className="text-xl text-red-100">Intensive English preparation for university studies in South Korea</p>
            </section>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="text-2xl font-bold mb-4 text-red-600">Program Features</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                    <FaCheckCircle className="h-5 w-5 text-red-600" />
                    <span className="font-medium">6-12 months intensive English training</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                    <FaCheckCircle className="h-5 w-5 text-red-600" />
                    <span className="font-medium">Academic English skills development</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                    <FaCheckCircle className="h-5 w-5 text-red-600" />
                    <span className="font-medium">Korean language basics included</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                    <FaCheckCircle className="h-5 w-5 text-red-600" />
                    <span className="font-medium">Direct pathway to university programs</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="text-2xl font-bold mb-4 text-pink-600">KAP Program</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg">
                    <FaCheckCircle className="h-5 w-5 text-pink-600" />
                    <span className="font-medium">Korean Academic Preparation</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg">
                    <FaCheckCircle className="h-5 w-5 text-pink-600" />
                    <span className="font-medium">Advanced Korean language training</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg">
                    <FaCheckCircle className="h-5 w-5 text-pink-600" />
                    <span className="font-medium">Cultural adaptation program</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg">
                    <FaCheckCircle className="h-5 w-5 text-pink-600" />
                    <span className="font-medium">University entrance preparation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Program Benefits */}
            <section className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-12">
              <h3 className="text-3xl font-bold text-center mb-12">Program Benefits</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaLanguage className="w-8 h-8 text-red-600" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Language Skills</h4>
                  <p className="text-gray-600">Master English and Korean for academic success</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaUniversity className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Direct Admission</h4>
                  <p className="text-gray-600">Guaranteed pathway to partner universities</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaShieldAlt className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Visa Support</h4>
                  <p className="text-gray-600">Complete visa application assistance</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaRocket className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Full Support</h4>
                  <p className="text-gray-600">We handle all applications and documentation</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Visa Information Tab */}
        {activeTab === 'visa' && (
          <div className="space-y-12">
            <h2 className="text-4xl font-bold text-center mb-12">Visa Information</h2>
            
            {/* Regional VISA for Bachelor's */}
            <section>
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white mb-8">
                <h3 className="text-3xl font-bold mb-4 flex items-center gap-3">
                  <FaPassport className="h-8 w-8" />
                  Regional VISA (D-2-1) - Bachelor's Programs
                </h3>
                <p className="text-xl text-blue-100">Student visa for undergraduate studies in South Korea</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="text-2xl font-bold mb-4 text-blue-600">Visa Features</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Valid for entire duration of study</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Part-time work allowed (20 hours/week)</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Renewable annually</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Family members can apply for dependent visa</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="text-2xl font-bold mb-4 text-indigo-600">Requirements</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-indigo-600" />
                      <span className="font-medium">Admission letter from Korean university</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-indigo-600" />
                      <span className="font-medium">Financial proof ($10,000+ in bank account)</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-indigo-600" />
                      <span className="font-medium">Health insurance coverage</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-indigo-600" />
                      <span className="font-medium">Valid passport (6+ months validity)</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* E-VISA for Master's */}
            <section>
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white mb-8">
                <h3 className="text-3xl font-bold mb-4 flex items-center gap-3">
                  <FaIdCard className="h-8 w-8" />
                  E-VISA (D-2-2) - Master's Programs
                </h3>
                <p className="text-xl text-green-100">Electronic visa for graduate studies in South Korea</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="text-2xl font-bold mb-4 text-green-600">E-VISA Benefits</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Online application process</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Faster processing time (7-14 days)</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Digital visa document</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Research and work opportunities</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="text-2xl font-bold mb-4 text-emerald-600">Application Process</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-emerald-600" />
                      <span className="font-medium">Complete online application form</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-emerald-600" />
                      <span className="font-medium">Upload required documents digitally</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-emerald-600" />
                      <span className="font-medium">Pay visa fee online</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-emerald-600" />
                      <span className="font-medium">Receive e-visa via email</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Universities Tab */}
        {activeTab === 'universities' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Top Universities in South Korea</h2>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-blue-500 text-white px-6 py-3 rounded-full text-lg font-bold mb-8 shadow-lg">
                <FaUniversity className="h-5 w-5" />
                🇰🇷 EAP/KAP PROGRAMS AVAILABLE
              </div>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                { 
                  name: "Seoul National University", 
                  rank: "QS Ranking: 29", 
                  programs: "Engineering, Business, Medicine, Liberal Arts", 
                  city: "Seoul", 
                  eap: "Available",
                  kap: "Available",
                  tuition: "$3,000-$5,000/year"
                },
                { 
                  name: "Korea Advanced Institute of Science & Technology (KAIST)", 
                  rank: "QS Ranking: 42", 
                  programs: "Engineering, Science, Technology, Business", 
                  city: "Daejeon", 
                  eap: "Available",
                  kap: "Available",
                  tuition: "$4,000-$6,000/year"
                },
                { 
                  name: "Yonsei University", 
                  rank: "QS Ranking: 76", 
                  programs: "Medicine, Business, Engineering, Liberal Arts", 
                  city: "Seoul", 
                  eap: "Available",
                  kap: "Available",
                  tuition: "$3,500-$5,500/year"
                },
                { 
                  name: "Korea University", 
                  rank: "QS Ranking: 79", 
                  programs: "Business, Engineering, Medicine, Law", 
                  city: "Seoul", 
                  eap: "Available",
                  kap: "Available",
                  tuition: "$3,200-$5,200/year"
                },
                { 
                  name: "Sungkyunkwan University", 
                  rank: "QS Ranking: 145", 
                  programs: "Engineering, Business, Medicine, Liberal Arts", 
                  city: "Seoul", 
                  eap: "Available",
                  kap: "Available",
                  tuition: "$2,800-$4,800/year"
                },
                { 
                  name: "Hanyang University", 
                  rank: "QS Ranking: 164", 
                  programs: "Engineering, Business, Medicine, Design", 
                  city: "Seoul", 
                  eap: "Available",
                  kap: "Available",
                  tuition: "$2,500-$4,500/year"
                }
              ].map((university, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group border-2 border-red-200">
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
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <FaMapMarkerAlt className="w-4 h-4 mr-1" />
                    {university.city}
                  </div>
                  
                  {/* EAP/KAP Programs */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-blue-50 rounded-lg p-2 text-center">
                      <div className="text-xs font-semibold text-blue-800">EAP</div>
                      <div className="text-xs text-blue-600">{university.eap}</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-2 text-center">
                      <div className="text-xs font-semibold text-green-800">KAP</div>
                      <div className="text-xs text-green-600">{university.kap}</div>
                    </div>
                  </div>
                  
                  {/* Tuition */}
                  <div className="text-sm font-semibold text-red-600 mb-2 bg-red-100 px-2 py-1 rounded">
                    💰 {university.tuition}
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
                Simple requirements for South Korea study programs - we help you with everything
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
                        <div className="text-sm text-gray-600">Minimum 2.5+ GPA (4.0 scale)</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-red-600" />
                      <div>
                        <div className="font-semibold">English Proficiency</div>
                        <div className="text-sm text-gray-600">IELTS 5.5+ or TOEFL 71+ (or EAP program)</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-red-600" />
                      <div>
                        <div className="font-semibold">Age Requirement</div>
                        <div className="text-sm text-gray-600">18-25 years old</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h4 className="text-2xl font-bold mb-6 text-blue-600 flex items-center gap-3">
                    <FaMicroscope className="h-6 w-6" />
                    Master's Programs
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-semibold">Bachelor's Degree</div>
                        <div className="text-sm text-gray-600">Minimum 3.0+ GPA (4.0 scale)</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-semibold">English Proficiency</div>
                        <div className="text-sm text-gray-600">IELTS 6.0+ or TOEFL 80+</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-semibold">Research Proposal</div>
                        <div className="text-sm text-gray-600">Required for thesis-based programs</div>
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
                  <h4 className="text-2xl font-bold mb-6 text-green-600 flex items-center gap-3">
                    <FaFileAlt className="h-6 w-6" />
                    Academic Documents
                  </h4>
                  <div className="space-y-4">
                    {[
                      "High School/Bachelor's Certificate (certified copy)",
                      "Academic transcripts (certified copy)",
                      "English translation of all documents",
                      "Passport copy (valid for 2+ years)",
                      "Passport-size photos (white background)",
                      "Application form (we help you complete)"
                    ].map((doc, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                        <FaCheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                        <span className="font-medium">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h4 className="text-2xl font-bold mb-6 text-purple-600 flex items-center gap-3">
                    <FaShieldAlt className="h-6 w-6" />
                    Additional Documents
                  </h4>
                  <div className="space-y-4">
                    {[
                      "Medical examination certificate",
                      "Police clearance certificate",
                      "Financial proof (bank statements)",
                      "English proficiency certificate",
                      "Personal statement (we help you write)",
                      "Recommendation letters (we guide you)"
                    ].map((doc, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                        <FaCheckCircle className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                        <span className="font-medium">{doc}</span>
                      </div>
                    ))}
                  </div>
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
                  description: "Select your preferred university and program. Choose between EAP/KAP programs or direct admission. Research scholarship opportunities and requirements."
                },
                {
                  step: 2,
                  title: "Prepare Documents",
                  description: "Gather academic transcripts, degree certificates, passport, recommendation letters, personal statement, and English proficiency certificates. Get documents translated and certified."
                },
                {
                  step: 3,
                  title: "Apply for EAP/KAP (if needed)",
                  description: "If you need English preparation, apply for EAP/KAP program first. These programs provide direct pathway to university admission."
                },
                {
                  step: 4,
                  title: "University Application",
                  description: "We submit your application to the chosen university. We handle all the paperwork and submission process for you."
                },
                {
                  step: 5,
                  title: "Receive Admission Letter",
                  description: "Get your admission letter from the university. Results typically announced within 4-6 weeks of application submission."
                },
                {
                  step: 6,
                  title: "Visa Application",
                  description: "Apply for D-2-1 (Bachelor's) or D-2-2 (Master's) visa at Korean embassy with admission letter and all required documents."
                }
              ].map((step, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
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
      <section className="py-20 bg-gradient-to-br from-red-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-64 h-64 bg-red-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-blue-500 text-white px-6 py-3 rounded-full text-lg font-bold mb-6 shadow-lg">
              <FaStar className="h-5 w-5" />
              🇰🇷 Limited Time Opportunity - Apply Now!
            </div>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            🚀 Start Your Education Journey in <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-blue-400">South Korea</span>
          </h2>
          
          <p className="text-xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
            Join thousands of students who are already pursuing <span className="font-bold text-red-400">cutting-edge technology education</span> with 
            <span className="font-bold text-yellow-400"> EAP/KAP programs</span>. Experience world-class innovation and cultural richness!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <button 
              onClick={() => handleCTAClick('sk-cta')}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-5 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-xl text-lg"
            >
              <FaRocket className="h-6 w-6" />
              Apply Now - Start Your Journey!
            </button>
            <button 
              onClick={() => handleCTAClick('sk-cta-consultation')}
              className="bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 text-white font-bold py-5 px-10 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 text-lg"
            >
              <FaPhone className="h-6 w-6" />
              Free Consultation
            </button>
          </div>

          {/* Key Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaGraduationCap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">EAP/KAP Programs</h3>
              <p className="text-blue-200 text-sm">English and Korean preparation programs</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">95%+ Visa Success</h3>
              <p className="text-blue-200 text-sm">High approval rate with our expertise</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaLaptopCode className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Tech Innovation</h3>
              <p className="text-blue-200 text-sm">World-class technology and innovation</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}