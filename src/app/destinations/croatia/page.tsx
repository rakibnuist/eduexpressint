'use client';

import { useState } from 'react';
import { findDestination } from '@/lib/data/destinations';
import { useCTA } from '@/context/CTAContext';
import { trackViewContent } from '@/components/TrackLead';
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
  FaShip,
  FaUmbrellaBeach,
  FaHandshake,
  FaCrown,
  FaHeart
} from 'react-icons/fa';

export default function CroatiaPage() {
  const { openCTA } = useCTA();
  const [activeTab, setActiveTab] = useState('overview');

  const destination = findDestination('croatia');
  
  if (!destination) {
    return <div>Destination not found</div>;
  }

  const handleCTAClick = (source: string) => {
    trackViewContent('Croatia Page CTA Click', {
      content_category: 'Destination Page',
      content_ids: ['croatia-cta'],
      value: 1
    });
    openCTA(source);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FaGlobe },
    { id: 'programs', label: 'Programs', icon: FaGraduationCap },
    { id: 'universities', label: 'Universities', icon: FaUniversity },
    { id: 'requirements', label: 'Requirements', icon: FaFileAlt },
    { id: 'process', label: 'Process', icon: FaClipboardList }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white overflow-hidden min-h-screen flex items-center">
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-400/15 rounded-full blur-3xl animate-pulse delay-500"></div>
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute bottom-1/4 left-1/4 w-56 h-56 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-300"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 animate-float-slow opacity-20">
            <FaShip className="h-12 w-12 text-blue-400" />
          </div>
          <div className="absolute top-40 right-32 animate-float-slow delay-1000 opacity-20">
            <FaUmbrellaBeach className="h-10 w-10 text-cyan-400" />
          </div>
          <div className="absolute bottom-32 left-40 animate-float-slow delay-500 opacity-20">
            <FaUniversity className="h-14 w-14 text-purple-400" />
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
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-2xl animate-bounce hover:animate-none transition-all duration-300 transform hover:scale-105">
                <FaStar className="h-6 w-6" />
                October 2026 Intake - Apply Now!
                <FaStar className="h-5 w-5 animate-spin" />
              </div>
            </div>

            {/* Enhanced Main Heading */}
            <h1 className="text-6xl lg:text-8xl font-bold mb-8 leading-tight">
              Study in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 animate-pulse">Croatia</span>
            </h1>
            
            {/* Enhanced Subheading */}
            <div className="mb-8">
              <p className="text-3xl lg:text-4xl text-blue-100 mb-4 font-bold">
                🇭🇷 Coastal Excellence & EU Recognition
              </p>
              <p className="text-2xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-bold">
                From €2,000 Per Year!
              </p>
            </div>
            
            {/* Enhanced Description */}
            <p className="text-xl lg:text-2xl text-cyan-200 mb-12 leading-relaxed max-w-5xl mx-auto">
              Experience <span className="font-bold text-blue-400">world-class education</span> with 
              <span className="font-bold text-cyan-400"> EU degree recognition</span> and 
              <span className="font-bold text-purple-400"> beautiful coastal lifestyle</span> in Croatia's leading universities.
            </p>
            
            {/* Enhanced Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
              <div className="text-center bg-white/15 backdrop-blur-sm rounded-3xl p-8 border border-white/30 hover:bg-white/25 transition-all duration-300 transform hover:scale-105 group">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FaDollarSign className="h-10 w-10 text-white" />
                </div>
                <div className="text-5xl font-bold text-blue-400 mb-2">€2k-€8k</div>
                <div className="text-lg text-cyan-200 font-medium">Annual Tuition</div>
                <div className="text-sm text-cyan-300 mt-2">Affordable Education</div>
                </div>
              
              <div className="text-center bg-white/15 backdrop-blur-sm rounded-3xl p-8 border border-white/30 hover:bg-white/25 transition-all duration-300 transform hover:scale-105 group">
                <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FaUniversity className="h-10 w-10 text-white" />
                </div>
                <div className="text-5xl font-bold text-cyan-400 mb-2">8+</div>
                <div className="text-lg text-cyan-200 font-medium">Universities</div>
                <div className="text-sm text-cyan-300 mt-2">Top-Ranked Institutions</div>
              </div>

              <div className="text-center bg-white/15 backdrop-blur-sm rounded-3xl p-8 border border-white/30 hover:bg-white/25 transition-all duration-300 transform hover:scale-105 group">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FaShieldAlt className="h-10 w-10 text-white" />
                </div>
                <div className="text-5xl font-bold text-purple-400 mb-2">95%</div>
                <div className="text-lg text-cyan-200 font-medium">Success Rate</div>
                <div className="text-sm text-cyan-300 mt-2">Proven Track Record</div>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                <button 
                  onClick={() => handleCTAClick('croatia-hero')}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-6 px-12 rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-4 shadow-2xl text-xl group"
                >
                <FaRocket className="h-6 w-6 group-hover:animate-bounce" />
                Apply Now - Start Your Journey!
                <FaStar className="h-5 w-5 animate-pulse" />
                </button>
                <button 
                  onClick={() => handleCTAClick('croatia-hero-consultation')}
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
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <FaCertificate className="h-8 w-8 text-white" />
                </div>
                <div className="text-lg font-bold text-cyan-200">EU Recognition</div>
                <div className="text-sm text-cyan-300">Degrees Valid Across EU</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <FaUmbrellaBeach className="h-8 w-8 text-white" />
                </div>
                <div className="text-lg font-bold text-cyan-200">Coastal Lifestyle</div>
                <div className="text-sm text-cyan-300">Beautiful Adriatic Sea</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <FaLanguage className="h-8 w-8 text-white" />
                </div>
                <div className="text-lg font-bold text-cyan-200">English Programs</div>
                <div className="text-sm text-cyan-300">No Croatian Required</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <FaHeart className="h-8 w-8 text-white" />
                </div>
                <div className="text-lg font-bold text-cyan-200">Rich Culture</div>
                <div className="text-sm text-cyan-300">Mediterranean Heritage</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* October 2026 Intake Highlight Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-full text-lg font-bold mb-6 shadow-lg">
              <FaCalendarAlt className="h-5 w-5" />
              October 2026 Intake - Application Deadline: June 15, 2026
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Study in Croatia with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Coastal Excellence</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join prestigious Croatian universities offering world-class education with unique coastal lifestyle. 
              Start your academic journey in October 2026 with excellent support and beautiful surroundings.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Education Statistics */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-center text-cyan-400">
                Education Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-cyan-500/20 rounded-lg">
                  <span className="font-semibold">Affordable Tuition</span>
                  <span className="text-2xl font-bold text-cyan-400">€2k-8k</span>
                  <span className="text-sm">EUR/year</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-blue-500/20 rounded-lg">
                  <span className="font-semibold">EU Recognition</span>
                  <span className="text-2xl font-bold text-blue-400">100%</span>
                  <span className="text-sm">Recognition</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-purple-500/20 rounded-lg">
                  <span className="font-semibold">Application Deadline</span>
                  <span className="text-2xl font-bold text-purple-400">Jun 15</span>
                  <span className="text-sm">2026</span>
                </div>
              </div>
            </div>

            {/* Top Programs */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-center text-blue-400">
                Popular Programs
              </h3>
              <div className="space-y-3">
                <div className="bg-blue-500/20 rounded-lg p-4">
                  <div className="font-bold text-blue-200">Tourism & Hospitality</div>
                  <div className="text-sm text-blue-100">Tourism Management, Hotel Management, Event Management</div>
                </div>
                <div className="bg-blue-500/20 rounded-lg p-4">
                  <div className="font-bold text-blue-200">Maritime Studies</div>
                  <div className="text-sm text-blue-100">Maritime Engineering, Naval Architecture, Port Management</div>
                </div>
                <div className="bg-blue-500/20 rounded-lg p-4">
                  <div className="font-bold text-blue-200">Engineering & Technology</div>
                  <div className="text-sm text-blue-100">Civil, Mechanical, Electrical, Computer Engineering</div>
                </div>
                <div className="bg-blue-500/20 rounded-lg p-4">
                  <div className="font-bold text-blue-200">Business & Economics</div>
                  <div className="text-sm text-blue-100">Business Administration, Economics, International Business</div>
                </div>
              </div>
            </div>

            {/* Why Choose October 2026 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-center text-purple-400">
                Why October 2026?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="h-5 w-5 text-purple-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Coastal Lifestyle</div>
                    <div className="text-sm text-gray-300">Study by the beautiful Adriatic Sea</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="h-5 w-5 text-purple-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">EU Degree Recognition</div>
                    <div className="text-sm text-gray-300">Degrees recognized across all EU countries</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="h-5 w-5 text-purple-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">English Medium</div>
                    <div className="text-sm text-gray-300">No Croatian language requirement</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="h-5 w-5 text-purple-400 mt-1 flex-shrink-0" />
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
              onClick={() => handleCTAClick('October 2026 Intake - Apply Now')}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-4 px-12 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3 mx-auto shadow-xl text-lg"
            >
              <FaRocket className="h-6 w-6" />
              Apply for October 2026 Intake
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
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600'
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
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">Why Study in Croatia?</h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  🇭🇷 Croatia offers the perfect combination of <span className="font-bold text-blue-600">EU degree recognition</span>, 
                  <span className="font-bold text-cyan-600"> coastal lifestyle</span>, and 
                  <span className="font-bold text-purple-600"> affordable education</span> with world-class universities by the Adriatic Sea.
                </p>
              </div>

              {/* Enhanced Feature Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500 group">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FaCertificate className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">EU Degree Recognition</h3>
                  <p className="text-gray-600 mb-4">Degrees recognized across all EU countries and internationally with full validity.</p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-800 font-semibold text-sm">🇪🇺 Valid Across All EU Countries</p>
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-cyan-500 group">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FaUmbrellaBeach className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Coastal Lifestyle</h3>
                  <p className="text-gray-600 mb-4">Study by the beautiful Adriatic Sea with Mediterranean climate and stunning coastline.</p>
                  <div className="bg-cyan-50 p-4 rounded-lg">
                    <p className="text-cyan-800 font-semibold text-sm">🏖️ Beautiful Adriatic Coast</p>
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500 group">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FaDollarSign className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Affordable Education</h3>
                  <p className="text-gray-600 mb-4">Low tuition fees starting from €2,000 per year with excellent value for money.</p>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-purple-800 font-semibold text-sm">💰 From €2,000 Per Year</p>
                  </div>
                </div>
              </div>

              {/* Enhanced Special Features Section */}
              <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50 p-12 rounded-3xl border border-blue-100">
                <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">🌟 Special Features & Benefits</h3>
                <div className="grid lg:grid-cols-2 gap-12">
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <FaStar className="h-6 w-6 text-blue-500" />
                      Key Benefits
                    </h4>
                    <div className="space-y-4">
                      {[
                        "EU degree recognition across all member countries",
                        "Affordable tuition fees from €2,000 per year", 
                        "Beautiful coastal lifestyle by Adriatic Sea",
                        "No entrance exams for most programs",
                        "Low cost of living (€500-700/month)",
                        "English-taught programs available",
                        "World-class maritime and tourism programs",
                        "Strong international student community"
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
                          {["October 2026", "February 2027"].map((intake, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                              <span className="text-gray-700 font-medium">{intake}</span>
                  </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-6 rounded-xl text-white">
                        <h5 className="font-bold mb-2">Visa Success Rate</h5>
                        <p className="text-blue-100">95%+ success rate with our expert guidance and proven application process</p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-cyan-500 to-purple-600 p-6 rounded-xl text-white">
                        <h5 className="font-bold mb-2">Processing Time</h5>
                        <p className="text-cyan-100">Quick 2-4 week visa processing with streamlined documentation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        {/* Programs Tab */}
        {activeTab === 'programs' && (
          <div className="space-y-12">
            <h2 className="text-4xl font-bold text-center mb-12">Popular Study Programs</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: "Tourism & Hospitality", icon: FaUmbrellaBeach, programs: "Tourism Management, Hotel Management, Event Management", duration: "3-4 years", tuition: "€2k-5k/year", highlight: true },
                { name: "Maritime Studies", icon: FaShip, programs: "Maritime Engineering, Naval Architecture, Port Management", duration: "3-4 years", tuition: "€3k-6k/year", highlight: true },
                { name: "Engineering", icon: FaBuilding, programs: "Civil, Mechanical, Electrical, Computer", duration: "3-4 years", tuition: "€3k-6k/year", highlight: true },
                { name: "Business & Economics", icon: FaBriefcase, programs: "Business Admin, Economics, International Business", duration: "3-4 years", tuition: "€2k-5k/year", highlight: true }
              ].map((program, index) => (
                <div key={index} className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group ${program.highlight ? 'border-2 border-blue-200' : ''}`}>
                  {program.highlight && (
                    <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      POPULAR
                    </div>
                  )}
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <program.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{program.name}</h3>
                  <p className="text-gray-600 mb-3">{program.programs}</p>
                  <div className="text-sm text-gray-500 mb-2">Duration: {program.duration}</div>
                  <div className="text-sm font-semibold text-blue-600 mb-2">{program.tuition}</div>
                  <div className="text-sm font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                    English Medium
                  </div>
                </div>
              ))}
            </div>

            {/* Program Benefits */}
            <section className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-12">
              <h3 className="text-3xl font-bold text-center mb-12">Why Choose Our Programs?</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCertificate className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">EU Recognition</h4>
                  <p className="text-gray-600">Degrees recognized across all EU countries</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaGlobe className="w-8 h-8 text-cyan-600" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">English Medium</h4>
                  <p className="text-gray-600">No Croatian language requirement</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaUmbrellaBeach className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Coastal Lifestyle</h4>
                  <p className="text-gray-600">Study by the beautiful Adriatic Sea</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaRocket className="w-8 h-8 text-green-600" />
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
              <h2 className="text-4xl font-bold mb-4">Top Universities in Croatia</h2>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-full text-lg font-bold mb-8 shadow-lg">
                <FaCalendarAlt className="h-5 w-5" />
                🚨 OCTOBER 2026 INTAKE - APPLICATIONS OPEN! 🚨
              </div>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                { 
                  name: "University of Zagreb", 
                  rank: "Ranking: 801-1000 (QS)", 
                  programs: "All fields - Engineering, Business, Medicine, Arts, Sciences", 
                  city: "Zagreb", 
                  oct2026: true,
                  tuition: "€2,000-6,000/year",
                  deadline: "Jun 15, 2026"
                },
                { 
                  name: "University of Split", 
                  rank: "Ranking: 1001-1200 (QS)", 
                  programs: "Maritime Studies, Tourism, Engineering, Business, Medicine", 
                  city: "Split", 
                  oct2026: true,
                  tuition: "€2,500-5,500/year",
                  deadline: "Jun 15, 2026"
                },
                { 
                  name: "University of Rijeka", 
                  rank: "Ranking: 1001-1200 (QS)", 
                  programs: "Engineering, Technology, Business, Medicine, Arts", 
                  city: "Rijeka", 
                  oct2026: true,
                  tuition: "€2,000-5,000/year",
                  deadline: "Jun 15, 2026"
                },
                { 
                  name: "University of Dubrovnik", 
                  rank: "Specialized University", 
                  programs: "Maritime Studies, Tourism Management, Business", 
                  city: "Dubrovnik", 
                  oct2026: true,
                  tuition: "€3,000-6,000/year",
                  deadline: "Jun 15, 2026"
                },
                { 
                  name: "University of Osijek", 
                  rank: "Regional University", 
                  programs: "Engineering, Business, Agriculture, Medicine, Arts", 
                  city: "Osijek", 
                  oct2026: true,
                  tuition: "€2,000-4,500/year",
                  deadline: "Jun 15, 2026"
                },
                { 
                  name: "University of Zadar", 
                  rank: "Regional University", 
                  programs: "Humanities, Social Sciences, Natural Sciences", 
                  city: "Zadar", 
                  oct2026: true,
                  tuition: "€2,000-4,000/year",
                  deadline: "Jun 15, 2026"
                }
              ].map((university, index) => (
                <div key={index} className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group ${university.oct2026 ? 'border-2 border-blue-200' : ''}`}>
                  {university.oct2026 && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      OCT 2026
                    </div>
                  )}
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
                  
                  {/* Tuition */}
                  <div className="bg-blue-50 rounded-lg p-3 mb-3">
                    <div className="text-sm font-semibold text-blue-800">Tuition Fees</div>
                    <div className="text-xs text-blue-600">{university.tuition}</div>
                  </div>
                  
                  {/* Deadline */}
                  <div className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
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
                Simple requirements for October 2026 intake - we help you with everything
              </p>
            </div>
            
            {/* Academic Requirements */}
            <section className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-12">
              <h3 className="text-3xl font-bold mb-12 text-center">Academic Requirements</h3>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h4 className="text-2xl font-bold mb-6 text-blue-600 flex items-center gap-3">
                    <FaGraduationCap className="h-6 w-6" />
                    Bachelor's Programs
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-semibold">High School Certificate</div>
                        <div className="text-sm text-gray-600">Minimum 60% average for most programs</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-semibold">Age Requirement</div>
                        <div className="text-sm text-gray-600">Under 30 years old</div>
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
                        <div className="font-semibold">Health Certificate</div>
                        <div className="text-sm text-gray-600">Medical examination required</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h4 className="text-2xl font-bold mb-6 text-cyan-600 flex items-center gap-3">
                    <FaShip className="h-6 w-6" />
                    Maritime Programs
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-cyan-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-cyan-600" />
                      <div>
                        <div className="font-semibold">High School Certificate</div>
                        <div className="text-sm text-gray-600">Minimum 70% average with Mathematics, Physics</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-cyan-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-cyan-600" />
                      <div>
                        <div className="font-semibold">Science Background</div>
                        <div className="text-sm text-gray-600">Mathematics, Physics, Chemistry preferred</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-cyan-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-cyan-600" />
                      <div>
                        <div className="font-semibold">English Proficiency</div>
                        <div className="text-sm text-gray-600">IELTS 6.0+ or TOEFL 80+</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-cyan-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-cyan-600" />
                      <div>
                        <div className="font-semibold">Physical Fitness</div>
                        <div className="text-sm text-gray-600">Medical certificate for maritime programs</div>
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
            <section className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 text-white">
              <h3 className="text-3xl font-bold mb-8 text-center">We Handle Everything For You</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaFileAlt className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Document Preparation</h4>
                  <p className="text-blue-100">We help prepare and translate all required documents</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaRocket className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Application Submission</h4>
                  <p className="text-blue-100">We submit all applications on your behalf</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaShieldAlt className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Visa Support</h4>
                  <p className="text-blue-100">Complete visa application assistance</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Process Tab */}
        {activeTab === 'process' && (
          <div className="space-y-16">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Application Process</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple 6-step process for October 2026 intake - we guide you through everything
              </p>
            </div>

            <div className="space-y-8">
              {[
                {
                  step: 1,
                  title: "Initial Consultation",
                  description: "Free consultation to understand your goals and recommend the best programs and universities in Croatia.",
                  icon: FaPhone
                },
                {
                  step: 2,
                  title: "Document Preparation",
                  description: "We help you gather and prepare all required documents including translations and certifications."
                },
                {
                  step: 3,
                  title: "Application Submission",
                  description: "We submit your application to the chosen university through our agency platform. We handle all the paperwork and submission process for you."
                },
                {
                  step: 4,
                  title: "Receive Admission Letter",
                  description: "Get your admission letter from the university. Results typically announced in August 2026 (October intake)."
                },
                {
                  step: 5,
                  title: "Visa Application",
                  description: "We assist with student visa application at Croatian embassy with admission letter and all required documents."
                },
                {
                  step: 6,
                  title: "Travel & Arrival",
                  description: "We provide pre-departure guidance and airport pickup assistance to help you settle in Croatia."
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-8 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-1 bg-white rounded-2xl p-8 shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <section className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-12">
              <h3 className="text-3xl font-bold mb-12 text-center">Application Timeline for October 2026</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h4 className="text-2xl font-bold mb-6 text-blue-600">Key Dates</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                      <span className="font-semibold">Application Deadline</span>
                      <span className="text-lg font-bold text-blue-600">June 15, 2026</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                      <span className="font-semibold">Results Announcement</span>
                      <span className="text-lg font-bold text-green-600">August 2026</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                      <span className="font-semibold">Visa Application</span>
                      <span className="text-lg font-bold text-purple-600">August-September 2026</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                      <span className="font-semibold">Classes Start</span>
                      <span className="text-lg font-bold text-orange-600">October 2026</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h4 className="text-2xl font-bold mb-6 text-cyan-600">Our Support</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-cyan-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-cyan-600 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">Free Consultation</div>
                        <div className="text-sm text-gray-600">Personalized guidance and program selection</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-cyan-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-cyan-600 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">Document Assistance</div>
                        <div className="text-sm text-gray-600">Help with translations and certifications</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-cyan-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-cyan-600 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">Application Management</div>
                        <div className="text-sm text-gray-600">We handle all university applications</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-cyan-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-cyan-600 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">Visa Support</div>
                        <div className="text-sm text-gray-600">Complete visa application assistance</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-full text-lg font-bold mb-6 shadow-lg">
              <FaStar className="h-5 w-5" />
              🇭🇷 Limited Time Opportunity - Apply Now!
            </div>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            🚀 Start Your Education Journey in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Croatia</span>
          </h2>
          
          <p className="text-xl text-cyan-100 mb-8 max-w-4xl mx-auto leading-relaxed">
            Join thousands of students who are already pursuing <span className="font-bold text-blue-400">world-class education</span> with 
            <span className="font-bold text-cyan-400"> EU degree recognition</span>. Experience coastal lifestyle and affordable education!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <button 
              onClick={() => handleCTAClick('croatia-cta')}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-5 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-xl text-lg"
            >
              <FaRocket className="h-6 w-6" />
              Apply Now - Start Your Journey!
            </button>
            <button 
              onClick={() => handleCTAClick('croatia-cta-consultation')}
              className="bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 text-white font-bold py-5 px-10 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 text-lg"
            >
              <FaPhone className="h-6 w-6" />
              Free Consultation
            </button>
          </div>

          {/* Key Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaUmbrellaBeach className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Coastal Lifestyle</h3>
              <p className="text-cyan-200 text-sm">Study by the beautiful Adriatic Sea</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">95%+ Success Rate</h3>
              <p className="text-cyan-200 text-sm">High approval rate with our expertise</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaCertificate className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">EU Recognition</h3>
              <p className="text-cyan-200 text-sm">Degrees recognized across all EU countries</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
