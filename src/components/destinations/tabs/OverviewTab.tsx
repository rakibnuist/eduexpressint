'use client';

import { 
  FaCheckCircle,
  FaStar,
  FaCalendarAlt,
  FaCertificate,
  FaGlobeEurope,
  FaShieldAlt
} from 'react-icons/fa';

interface OverviewTabProps {
  destinationConfig: {
    name: string;
    features: string[];
    intakes: string[];
  };
  handleCTAClick: (source: string) => void;
  destinationSlug: string;
}

export default function OverviewTab({ destinationConfig, handleCTAClick, destinationSlug }: OverviewTabProps) {
  return (
    <div className="space-y-16">
      <div className="text-center">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">Why Study in {destinationConfig.name}?</h2>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          🌟 {destinationConfig.name} offers the perfect combination of <span className="font-bold text-blue-600">world-class education</span>, 
          <span className="font-bold text-green-600"> innovation excellence</span>, and 
          <span className="font-bold text-cyan-600"> EU work opportunities</span> in a progressive European environment.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500 group">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <FaCertificate className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-gray-900">EU Recognition</h3>
          <p className="text-gray-600 mb-4">Degrees recognized across all EU countries and internationally with full validity.</p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-800 font-semibold text-sm">🇪🇺 Valid Across All EU Countries</p>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-green-500 group">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <FaGlobeEurope className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-gray-900">EU Work Rights</h3>
          <p className="text-gray-600 mb-4">Work permit after graduation and access to entire EU job market with excellent career prospects.</p>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-green-800 font-semibold text-sm">🇪🇺 EU Job Market Access</p>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500 group">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <FaShieldAlt className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-gray-900">High Success Rate</h3>
          <p className="text-gray-600 mb-4">95%+ visa success rate with our expert guidance and proven application process.</p>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-purple-800 font-semibold text-sm">✅ 95%+ Success Rate</p>
          </div>
        </div>
      </div>

      {/* Special Features Section */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-12 rounded-3xl border border-blue-100">
        <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">🌟 Special Features & Benefits</h3>
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <FaStar className="h-6 w-6 text-blue-500" />
              Key Benefits
            </h4>
            <div className="space-y-4">
              {destinationConfig.features.map((feature, index) => (
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
                  {destinationConfig.intakes.map((intake, index) => (
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
              
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-6 rounded-xl text-white">
                <h5 className="font-bold mb-2">Processing Time</h5>
                <p className="text-cyan-100">Quick 2-3 week visa processing with streamlined documentation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
