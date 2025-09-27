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
  FaPassport,
  FaIdCard
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-red-900 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-blue-500 text-white px-6 py-3 rounded-full text-lg font-bold mb-6 shadow-lg animate-pulse">
                <FaStar className="h-5 w-5" />
                🇰🇷 STUDY IN SOUTH KOREA - EAP/KAP PROGRAMS
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Study in <span className="text-yellow-400">South Korea</span>
              </h1>
              
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                Experience world-class education with EAP/KAP programs, Regional VISA for Bachelor's, and E-VISA for Master's programs in South Korea's leading universities.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <button
                  onClick={() => handleCTAClick('South Korea Hero - EAP/KAP Programs')}
                  className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
                >
                  <FaGraduationCap className="h-5 w-5" />
                  EAP/KAP Programs
                </button>
                <button
                  onClick={() => handleCTAClick('South Korea Hero - Visa Info')}
                  className="bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center gap-3"
                >
                  <FaPassport className="h-5 w-5" />
                  Visa Information
                </button>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">$3k-$7k</div>
                  <div className="text-sm text-gray-300">Tuition per year</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">60+</div>
                  <div className="text-sm text-gray-300">Universities</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">95%</div>
                  <div className="text-sm text-gray-300">Visa Success</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">$800-$1200</div>
                  <div className="text-sm text-gray-300">Monthly Living</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6 text-center">🎓🇰🇷 STUDY IN SOUTH KOREA</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FaGraduationCap className="h-6 w-6 text-yellow-400" />
                    <span className="text-lg">EAP/KAP Programs - English Academic Preparation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaPassport className="h-6 w-6 text-yellow-400" />
                    <span className="text-lg">Regional VISA for Bachelor's Programs</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaIdCard className="h-6 w-6 text-yellow-400" />
                    <span className="text-lg">E-VISA for Master's Programs</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaRocket className="h-6 w-6 text-yellow-400" />
                    <span className="text-lg">World-class technology and innovation</span>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-red-500/30 to-blue-500/30 rounded-xl border-2 border-red-400/50">
                  <div className="text-center">
                    <div className="text-lg text-red-200 mb-2 font-bold">🎯 MARCH & SEPTEMBER INTAKES</div>
                    <div className="text-xl font-bold text-yellow-400 mb-2">Multiple Application Deadlines</div>
                    <div className="text-sm text-yellow-200">Flexible start dates throughout the year!</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-semibold whitespace-nowrap transition-all duration-300 border-b-2 hover:bg-gray-50 ${
                    activeTab === tab.id
                      ? 'text-red-600 border-red-600 bg-red-50 shadow-sm'
                      : 'text-gray-600 border-transparent hover:text-red-600 hover:border-red-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Why Study in South Korea */}
            <section>
              <h2 className="text-4xl font-bold text-center mb-12">Why Study in South Korea?</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { icon: FaLaptopCode, title: "Technology Excellence", desc: "Leading in AI, robotics, and digital innovation" },
                  { icon: FaTrophy, title: "GKS Scholarships", desc: "Korean Government Scholarship Program available" },
                  { icon: FaDollarSign, title: "Affordable Education", desc: "Quality education at competitive prices" },
                  { icon: FaHome, title: "Safe Environment", desc: "One of the safest countries in the world" },
                  { icon: FaLanguage, title: "English Programs", desc: "EAP/KAP programs in English medium" },
                  { icon: FaGlobe, title: "Global Recognition", desc: "Degrees recognized worldwide" },
                  { icon: FaRocket, title: "Innovation Hub", desc: "Home to Samsung, LG, and Hyundai" },
                  { icon: FaUsers, title: "Cultural Experience", desc: "Rich Korean culture and K-wave influence" }
                ].map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-red-600" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                      <p className="text-gray-600">{feature.desc}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Intakes */}
            <section>
              <h3 className="text-3xl font-bold text-center mb-8">Available Intakes</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-8 text-white text-center">
                  <FaCalendarAlt className="h-16 w-16 mx-auto mb-4" />
                  <h4 className="text-3xl font-bold mb-4">March Intake</h4>
                  <p className="text-xl mb-4">Spring Semester</p>
                  <p className="text-red-100">Application Deadline: November</p>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-8 text-white text-center">
                  <FaCalendarAlt className="h-16 w-16 mx-auto mb-4" />
                  <h4 className="text-3xl font-bold mb-4">September Intake</h4>
                  <p className="text-xl mb-4">Fall Semester</p>
                  <p className="text-blue-100">Application Deadline: May</p>
                </div>
              </div>
            </section>
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

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-red-900 via-blue-900 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to Start Your Journey in South Korea?</h2>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Join thousands of international students who have chosen South Korea for their education. 
              Experience world-class technology, innovation, and cultural richness.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={() => handleCTAClick('South Korea Bottom CTA - Free Consultation')}
                className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg"
              >
                <FaPhone className="h-5 w-5" />
                Get Free Consultation
              </button>
              <button
                onClick={() => handleCTAClick('South Korea Bottom CTA - EAP/KAP Info')}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg"
              >
                <FaGraduationCap className="h-5 w-5" />
                EAP/KAP Programs
              </button>
            </div>

            {/* Key Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <FaGraduationCap className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">EAP/KAP Programs</h3>
                <p className="text-sm text-gray-300">English and Korean preparation programs</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <FaPassport className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">Flexible Visa Options</h3>
                <p className="text-sm text-gray-300">Regional VISA for Bachelor's, E-VISA for Master's</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <FaRocket className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">95% Success Rate</h3>
                <p className="text-sm text-gray-300">Proven track record with expert guidance</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}