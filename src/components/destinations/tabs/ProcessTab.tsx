'use client';

import { 
  FaCheckCircle,
  FaSearch,
  FaFileAlt,
  FaPlane,
  FaHome,
  FaGraduationCap,
  FaCalendarAlt,
  FaUser,
  FaPassport,
  FaMoneyBillWave,
  FaHeart
} from 'react-icons/fa';

interface ProcessTabProps {
  destinationConfig: {
    name: string;
  };
  handleCTAClick: (source: string) => void;
  destinationSlug: string;
}

export default function ProcessTab({ destinationConfig, handleCTAClick, destinationSlug }: ProcessTabProps) {
  return (
    <div className="space-y-16">
      <div className="text-center">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">🚀 Application Process</h2>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Follow our <span className="font-bold text-blue-600">step-by-step guide</span> to successfully apply and 
          <span className="font-bold text-green-600"> start your journey</span> to studying in {destinationConfig.name}.
        </p>
      </div>

      <div className="space-y-12">
        {/* Step-by-Step Process */}
        <div className="space-y-8">
          {/* Step 1 */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-blue-100">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <FaSearch className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">Step 1</span>
                  <h3 className="text-2xl font-bold text-gray-900">Research & Choose Program</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Research universities and programs that match your interests and career goals.
                </p>
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-800">What to Research:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="h-4 w-4 text-blue-500" />
                        <span>Program curriculum and structure</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="h-4 w-4 text-blue-500" />
                        <span>University rankings and reputation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="h-4 w-4 text-blue-500" />
                        <span>Tuition fees and living costs</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="h-4 w-4 text-blue-500" />
                        <span>Scholarship opportunities</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-800">Timeline:</h4>
                    <div className="bg-blue-50 p-4 rounded-xl">
                      <p className="text-blue-800 font-semibold">Start Early</p>
                      <p className="text-blue-600 text-sm">Begin researching to make informed decisions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-green-100">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <FaFileAlt className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Step 2</span>
                  <h3 className="text-2xl font-bold text-gray-900">Prepare Documents</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Gather and prepare all required documents for your application.
                </p>
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-800">Required Documents:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="h-4 w-4 text-green-500" />
                        <span>Academic transcripts (translated & notarized)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="h-4 w-4 text-green-500" />
                        <span>Language proficiency certificate</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="h-4 w-4 text-green-500" />
                        <span>Motivation letter</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="h-4 w-4 text-green-500" />
                        <span>CV/Resume</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="h-4 w-4 text-green-500" />
                        <span>Passport copy</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-800">Timeline:</h4>
                    <div className="bg-green-50 p-4 rounded-xl">
                      <p className="text-green-800 font-semibold">Prepare Early</p>
                      <p className="text-green-600 text-sm">Start preparing documents in advance</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-purple-100">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <FaGraduationCap className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">Step 3</span>
                  <h3 className="text-2xl font-bold text-gray-900">Apply to Universities</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Submit your applications to selected universities.
                </p>
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-800">Application Process:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="h-4 w-4 text-purple-500" />
                        <span>Complete online application form</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="h-4 w-4 text-purple-500" />
                        <span>Upload required documents</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="h-4 w-4 text-purple-500" />
                        <span>Pay application fee (€50-100)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="h-4 w-4 text-purple-500" />
                        <span>Submit application</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-800">Timeline:</h4>
                    <div className="bg-purple-50 p-4 rounded-xl">
                      <p className="text-purple-800 font-semibold">Apply Early</p>
                      <p className="text-purple-600 text-sm">Submit applications in advance</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-cyan-100">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <FaPassport className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm font-semibold">Step 4</span>
                  <h3 className="text-2xl font-bold text-gray-900">Apply for Visa</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Once accepted, apply for your student visa.
                </p>
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-800">Visa Requirements:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="h-4 w-4 text-cyan-500" />
                        <span>University acceptance letter</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="h-4 w-4 text-cyan-500" />
                        <span>Financial proof (bank statements)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="h-4 w-4 text-cyan-500" />
                        <span>Health insurance</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="h-4 w-4 text-cyan-500" />
                        <span>Medical certificate</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="h-4 w-4 text-cyan-500" />
                        <span>Valid passport</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-800">Timeline:</h4>
                    <div className="bg-cyan-50 p-4 rounded-xl">
                      <p className="text-cyan-800 font-semibold">Apply Early</p>
                      <p className="text-cyan-600 text-sm">Visa processing takes several weeks</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-yellow-100">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <FaPlane className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">Step 5</span>
                  <h3 className="text-2xl font-bold text-gray-900">Travel & Arrival</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Prepare for your journey and arrival in {destinationConfig.name}.
                </p>
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-800">Pre-Departure:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="h-4 w-4 text-yellow-500" />
                        <span>Book flight tickets</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="h-4 w-4 text-yellow-500" />
                        <span>Arrange accommodation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="h-4 w-4 text-yellow-500" />
                        <span>Pack essential documents</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="h-4 w-4 text-yellow-500" />
                        <span>Inform university of arrival</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-800">Timeline:</h4>
                    <div className="bg-yellow-50 p-4 rounded-xl">
                      <p className="text-yellow-800 font-semibold">Arrive Early</p>
                      <p className="text-yellow-600 text-sm">Give yourself time to settle in</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 6 */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-red-100">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <FaHome className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">Step 6</span>
                  <h3 className="text-2xl font-bold text-gray-900">Settle & Start Studies</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Complete registration and begin your academic journey.
                </p>
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-800">Upon Arrival:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="h-4 w-4 text-red-500" />
                        <span>Complete university registration</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="h-4 w-4 text-red-500" />
                        <span>Open bank account</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="h-4 w-4 text-red-500" />
                        <span>Register with local authorities</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="h-4 w-4 text-red-500" />
                        <span>Attend orientation programs</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-800">Timeline:</h4>
                    <div className="bg-red-50 p-4 rounded-xl">
                      <p className="text-red-800 font-semibold">Upon Arrival</p>
                      <p className="text-red-600 text-sm">Complete all formalities</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Tips */}
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-indigo-100">
          <h3 className="text-3xl font-bold text-center mb-8">💡 Important Tips</h3>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-gray-800 mb-4">Application Tips</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                  <FaCheckCircle className="h-5 w-5 text-indigo-500 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">Start Early</p>
                    <p className="text-gray-600 text-sm">Begin your application process well in advance</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                  <FaCheckCircle className="h-5 w-5 text-indigo-500 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">Multiple Applications</p>
                    <p className="text-gray-600 text-sm">Apply to 3-5 universities to increase your chances</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                  <FaCheckCircle className="h-5 w-5 text-indigo-500 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">Document Quality</p>
                    <p className="text-gray-600 text-sm">Ensure all documents are properly translated and notarized</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-gray-800 mb-4">Visa Tips</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <FaCheckCircle className="h-5 w-5 text-purple-500 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">Financial Proof</p>
                    <p className="text-gray-600 text-sm">Maintain consistent bank balance for 3-6 months</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <FaCheckCircle className="h-5 w-5 text-purple-500 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">Interview Preparation</p>
                    <p className="text-gray-600 text-sm">Be ready to explain your study plans and goals</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <FaCheckCircle className="h-5 w-5 text-purple-500 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">Health Insurance</p>
                    <p className="text-gray-600 text-sm">Purchase comprehensive health insurance before travel</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
