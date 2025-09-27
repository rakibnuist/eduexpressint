import type { Metadata } from 'next';
import FloatingElements from '@/components/FloatingElements';
import { 
  FaShieldAlt, 
  FaCheckCircle, 
  FaClock, 
  FaFileAlt, 
  FaPhone,
  FaEnvelope,
  FaArrowRight,
  FaGlobe,
  FaAward,
  FaHandshake,
  FaUserCheck,
  FaCalendarAlt
} from 'react-icons/fa';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Visa Assistance | EduExpress International - Expert Student Visa Support with 95% Success Rate",
  description: "Complete student visa assistance with 95% success rate. Expert guidance for visa applications, document preparation, and interview coaching for all study destinations.",
};

export default function VisaAssistancePage() {
  const services = [
    {
      title: "Visa Application Preparation",
      description: "Complete assistance with visa application forms and requirements",
      features: [
        "Application form completion",
        "Document checklist preparation",
        "Requirement analysis",
        "Timeline planning",
        "Fee calculation"
      ]
    },
    {
      title: "Document Verification",
      description: "Thorough review and preparation of all required documents",
      features: [
        "Document authenticity check",
        "Translation services",
        "Attestation guidance",
        "Bank statement preparation",
        "Medical certificate assistance"
      ]
    },
    {
      title: "Interview Coaching",
      description: "Comprehensive preparation for visa interviews",
      features: [
        "Mock interview sessions",
        "Common questions practice",
        "Confidence building",
        "Document presentation",
        "Follow-up preparation"
      ]
    },
    {
      title: "Appeal Support",
      description: "Expert assistance in case of visa rejection",
      features: [
        "Rejection analysis",
        "Appeal documentation",
        "Legal representation",
        "Reapplication strategy",
        "Success rate improvement"
      ]
    }
  ];

  const visaTypes = [
    {
      country: "United Kingdom",
      type: "Student Visa (Tier 4)",
      processingTime: "3-8 weeks",
      successRate: "98%",
      flag: "🇬🇧"
    },
    {
      country: "Netherlands",
      type: "MVV + Residence Permit",
      processingTime: "2-4 weeks",
      successRate: "95%",
      flag: "🇳🇱"
    },
    {
      country: "Cyprus",
      type: "Student Visa",
      processingTime: "2-3 weeks",
      successRate: "100%",
      flag: "🇨🇾"
    },
    {
      country: "China",
      type: "X1/X2 Visa",
      processingTime: "1-2 weeks",
      successRate: "92%",
      flag: "🇨🇳"
    },
    {
      country: "South Korea",
      type: "D-2 Visa",
      processingTime: "2-4 weeks",
      successRate: "90%",
      flag: "🇰🇷"
    },
    {
      country: "Finland",
      type: "Residence Permit",
      processingTime: "1-3 months",
      successRate: "88%",
      flag: "🇫🇮"
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: "Document Collection",
      description: "Gather all required documents and prepare them according to embassy requirements",
      duration: "1-2 weeks"
    },
    {
      step: 2,
      title: "Application Submission",
      description: "Complete and submit visa application with all supporting documents",
      duration: "1-2 days"
    },
    {
      step: 3,
      title: "Interview Preparation",
      description: "Mock interviews and coaching sessions to prepare for embassy interview",
      duration: "1 week"
    },
    {
      step: 4,
      title: "Follow-up & Collection",
      description: "Track application status and assist with visa collection",
      duration: "Ongoing"
    }
  ];

  const successStats = [
    { number: "95%", label: "Success Rate", description: "Visa approval rate" },
    { number: "10K+", label: "Visas Processed", description: "Successfully obtained" },
    { number: "18+", label: "Countries", description: "Visa support available" },
    { number: "24/7", label: "Support", description: "Round-the-clock assistance" }
  ];

  return (
    <div className="pt-32 pb-16 px-4 max-w-7xl mx-auto min-h-screen relative overflow-hidden">
      <FloatingElements variant="services" intensity="medium" />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaShieldAlt className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Visa Assistance
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Expert visa assistance with a 95% success rate. Complete support for student visa applications, 
            document preparation, and interview coaching for all study destinations.
          </p>
        </div>

        {/* Success Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {successStats.map((stat, index) => (
            <div key={index} className="text-center bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-green-600 mb-2">{stat.number}</div>
              <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
              <div className="text-sm text-gray-600">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Visa Assistance Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-bold mb-4 text-green-600">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700">
                      <FaCheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Visa Types by Country */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Visa Types by Country</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visaTypes.map((visa, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">{visa.flag}</div>
                  <div>
                    <h3 className="text-lg font-semibold">{visa.country}</h3>
                    <p className="text-sm text-gray-600">{visa.type}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Processing Time:</span>
                    <span className="font-semibold">{visa.processingTime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Success Rate:</span>
                    <span className="font-semibold text-green-600">{visa.successRate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Visa Process</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                  <span className="text-2xl font-bold text-white">{step.step}</span>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                  <div className="text-xs text-green-600 font-semibold">{step.duration}</div>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-green-500 to-blue-500 transform translate-x-3 z-0"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Required Documents */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-12 mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Common Required Documents</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-600">Academic Documents</h3>
              <ul className="space-y-2">
                {[
                  "Academic transcripts and certificates",
                  "English language proficiency test results",
                  "University offer letter",
                  "Academic reference letters",
                  "Statement of purpose"
                ].map((doc, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <FaCheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-600">Financial & Personal Documents</h3>
              <ul className="space-y-2">
                {[
                  "Bank statements (6 months)",
                  "Sponsor's financial documents",
                  "Passport (valid for 2+ years)",
                  "Medical certificate",
                  "Police clearance certificate"
                ].map((doc, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <FaCheckCircle className="h-4 w-4 text-blue-500 mr-3 flex-shrink-0" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Why Choose Our Service */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Visa Service?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-white rounded-xl p-8 shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaAward className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">High Success Rate</h3>
              <p className="text-gray-600">95% visa approval rate with thousands of successful applications across all destinations.</p>
            </div>
            <div className="text-center bg-white rounded-xl p-8 shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaUserCheck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Expert Guidance</h3>
              <p className="text-gray-600">Experienced visa counselors with in-depth knowledge of each country's requirements.</p>
            </div>
            <div className="text-center bg-white rounded-xl p-8 shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaClock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Timely Processing</h3>
              <p className="text-gray-600">Efficient document preparation and submission to meet all deadlines and requirements.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-2xl p-12 shadow-lg border border-gray-100">
          <h2 className="text-3xl font-bold mb-6">Need Visa Assistance?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get expert visa assistance with our proven track record. Start your application process today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/contact"
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2"
            >
              <FaPhone className="h-5 w-5" />
              Get Free Consultation
            </Link>
            <Link 
              href="/destinations"
              className="border-2 border-green-500 text-green-500 px-8 py-4 rounded-full font-semibold hover:bg-green-500 hover:text-white transition-all duration-300 inline-flex items-center gap-2"
            >
              <FaGlobe className="h-5 w-5" />
              Explore Destinations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
