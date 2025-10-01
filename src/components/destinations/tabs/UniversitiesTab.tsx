'use client';

import { 
  FaCheckCircle,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaGlobe,
  FaStar,
  FaUsers,
  FaBook,
  FaTrophy,
  FaBuilding,
  FaLanguage
} from 'react-icons/fa';

interface UniversitiesTabProps {
  destinationConfig: {
    name: string;
  };
  handleCTAClick: (source: string) => void;
  destinationSlug: string;
}

export default function UniversitiesTab({ destinationConfig, handleCTAClick, destinationSlug }: UniversitiesTabProps) {
  return (
    <div className="space-y-16">
      <div className="text-center">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">🏛️ Top Universities</h2>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Study at <span className="font-bold text-blue-600">world-class universities</span> with 
          <span className="font-bold text-green-600"> excellent facilities</span> and 
          <span className="font-bold text-cyan-600"> international recognition</span>.
        </p>
      </div>

      <div className="space-y-12">
        {/* Top Universities Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-blue-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center">
                <FaBuilding className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">University of {destinationConfig.name}</h3>
                <p className="text-gray-600">Leading research university</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="h-5 w-5 text-blue-500" />
                <span className="text-gray-700">Capital City, {destinationConfig.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaUsers className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">25,000+ students</span>
              </div>
              <div className="flex items-center gap-3">
                <FaGlobe className="h-5 w-5 text-purple-500" />
                <span className="text-gray-700">150+ countries represented</span>
              </div>
              <div className="flex items-center gap-3">
                <FaStar className="h-5 w-5 text-yellow-500" />
                <span className="text-gray-700">QS World Ranking: 200-300</span>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl mb-6">
              <h4 className="font-bold text-blue-800 mb-2">Popular Programs</h4>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm">Computer Science</span>
                <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm">Business</span>
                <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm">Engineering</span>
                <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm">Medicine</span>
              </div>
            </div>

            <div className="bg-green-100 p-4 rounded-xl">
              <p className="text-green-800 font-semibold">
                💰 Tuition: €2,000-8,000/year
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl border border-green-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                <FaGraduationCap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Technical University of {destinationConfig.name}</h3>
                <p className="text-gray-600">Engineering & Technology focus</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Tech City, {destinationConfig.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaUsers className="h-5 w-5 text-blue-500" />
                <span className="text-gray-700">18,000+ students</span>
              </div>
              <div className="flex items-center gap-3">
                <FaTrophy className="h-5 w-5 text-yellow-500" />
                <span className="text-gray-700">Top 1% engineering programs</span>
              </div>
              <div className="flex items-center gap-3">
                <FaBook className="h-5 w-5 text-purple-500" />
                <span className="text-gray-700">Research excellence</span>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-xl mb-6">
              <h4 className="font-bold text-green-800 mb-2">Popular Programs</h4>
              <div className="flex flex-wrap gap-2">
                <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm">Mechanical Engineering</span>
                <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm">Computer Science</span>
                <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm">Civil Engineering</span>
                <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm">Data Science</span>
              </div>
            </div>

            <div className="bg-emerald-100 p-4 rounded-xl">
              <p className="text-emerald-800 font-semibold">
                💰 Tuition: €3,000-10,000/year
              </p>
            </div>
          </div>
        </div>

        {/* University Features */}
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-purple-100">
          <h3 className="text-3xl font-bold text-center mb-8">Why Choose {destinationConfig.name} Universities?</h3>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <FaGlobe className="h-10 w-10 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-3">International Recognition</h4>
              <p className="text-gray-600">
                Degrees recognized worldwide with excellent reputation in international job markets.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <FaLanguage className="h-10 w-10 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-3">English Programs</h4>
              <p className="text-gray-600">
                Wide range of English-taught programs with no language barriers for international students.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <FaTrophy className="h-10 w-10 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-3">Quality Education</h4>
              <p className="text-gray-600">
                High-quality education with modern facilities and experienced international faculty.
              </p>
            </div>
          </div>
        </div>

        {/* Application Requirements */}
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-cyan-100">
          <h3 className="text-3xl font-bold text-center mb-8">University Application Requirements</h3>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-gray-800 mb-4">Academic Requirements</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">High school diploma or equivalent</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Minimum 60% average (varies by program)</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">English proficiency (IELTS 6.0+ or equivalent)</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Motivation letter</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">CV/Resume</span>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-gray-800 mb-4">Application Process</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="h-5 w-5 text-blue-500" />
                  <span className="text-gray-700">Submit online application</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="h-5 w-5 text-blue-500" />
                  <span className="text-gray-700">Pay application fee (€50-100)</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="h-5 w-5 text-blue-500" />
                  <span className="text-gray-700">Submit required documents</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="h-5 w-5 text-blue-500" />
                  <span className="text-gray-700">Wait for admission decision (2-4 weeks)</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="h-5 w-5 text-blue-500" />
                  <span className="text-gray-700">Accept offer and pay tuition</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
