import type { Metadata } from 'next';
import FloatingElements from '@/components/FloatingElements';
import { 
  FaGraduationCap, 
  FaCheckCircle, 
  FaClock, 
  FaUsers, 
  FaFileAlt,
  FaPhone,
  FaEnvelope,
  FaArrowRight,
  FaGlobe,
  FaAward,
  FaHandshake
} from 'react-icons/fa';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "University Applications | EduExpress International - Expert University Selection & Application Support",
  description: "Get expert guidance for university selection, application preparation, and admission support. We help you find the perfect university and program for your academic goals.",
};

export default function UniversityApplicationsPage() {
  const services = [
    {
      title: "University Selection & Matching",
      description: "Personalized matching based on your academic profile, career goals, and preferences",
      features: [
        "Academic profile assessment",
        "Career goal alignment",
        "Budget consideration",
        "Location preferences",
        "Program ranking analysis"
      ]
    },
    {
      title: "Application Preparation",
      description: "Complete assistance with all application requirements and documentation",
      features: [
        "Application form completion",
        "Personal statement writing",
        "Recommendation letter guidance",
        "Portfolio preparation",
        "Interview preparation"
      ]
    },
    {
      title: "Documentation Support",
      description: "Expert guidance on document preparation, verification, and submission",
      features: [
        "Academic transcript preparation",
        "Document attestation",
        "Translation services",
        "Deadline management",
        "Quality assurance"
      ]
    },
    {
      title: "Admission Follow-up",
      description: "Continuous support throughout the admission process",
      features: [
        "Application status tracking",
        "University communication",
        "Admission decision support",
        "Appeal assistance",
        "Enrollment guidance"
      ]
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: "Profile Assessment",
      description: "We analyze your academic background, test scores, and career aspirations",
      duration: "1-2 days"
    },
    {
      step: 2,
      title: "University Shortlisting",
      description: "Create a personalized list of universities that match your profile",
      duration: "2-3 days"
    },
    {
      step: 3,
      title: "Application Preparation",
      description: "Prepare all required documents and complete application forms",
      duration: "1-2 weeks"
    },
    {
      step: 4,
      title: "Submission & Follow-up",
      description: "Submit applications and track progress with universities",
      duration: "Ongoing"
    }
  ];

  const successStats = [
    { number: "500+", label: "Partner Universities", description: "Worldwide network" },
    { number: "95%", label: "Admission Success", description: "Rate for our students" },
    { number: "10K+", label: "Students Placed", description: "Successfully admitted" },
    { number: "18+", label: "Countries", description: "Study destinations" }
  ];

  return (
    <div className="pt-32 pb-16 px-4 max-w-7xl mx-auto min-h-screen relative overflow-hidden">
      <FloatingElements variant="services" intensity="medium" />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaGraduationCap className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            University Applications
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Expert guidance to help you find and apply to the perfect university and program. 
            From initial selection to admission confirmation, we're with you every step of the way.
          </p>
        </div>

        {/* Success Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {successStats.map((stat, index) => (
            <div key={index} className="text-center bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
              <div className="text-sm text-gray-600">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our University Application Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-bold mb-4 text-blue-600">{service.title}</h3>
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

        {/* Process Steps */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Application Process</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                  <span className="text-2xl font-bold text-white">{step.step}</span>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                  <div className="text-xs text-blue-600 font-semibold">{step.duration}</div>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform translate-x-3 z-0"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Our Service */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12 mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our University Application Service?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaUsers className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Expert Counselors</h3>
              <p className="text-gray-600">Our experienced counselors have in-depth knowledge of universities worldwide and admission requirements.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Proven Track Record</h3>
              <p className="text-gray-600">95% admission success rate with thousands of students successfully placed in top universities.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaClock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Timely Support</h3>
              <p className="text-gray-600">We ensure all applications are submitted on time with proper follow-up throughout the process.</p>
            </div>
          </div>
        </div>

        {/* Popular Destinations */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Study Destinations</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "United Kingdom", universities: "150+", flag: "🇬🇧" },
              { name: "Netherlands", universities: "13", flag: "🇳🇱" },
              { name: "Cyprus", universities: "2", flag: "🇨🇾" },
              { name: "China", universities: "180+", flag: "🇨🇳" },
              { name: "South Korea", universities: "60+", flag: "🇰🇷" },
              { name: "Finland", universities: "13", flag: "🇫🇮" }
            ].map((destination, index) => (
              <Link key={index} href={`/destinations/${destination.name.toLowerCase().replace(' ', '-')}`}>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 text-center cursor-pointer">
                  <div className="text-4xl mb-3">{destination.flag}</div>
                  <h3 className="text-lg font-semibold mb-2">{destination.name}</h3>
                  <p className="text-sm text-gray-600">{destination.universities} Universities</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-2xl p-12 shadow-lg border border-gray-100">
          <h2 className="text-3xl font-bold mb-6">Ready to Apply to Your Dream University?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get started with a free consultation and let our experts help you find the perfect university match.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/contact"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2"
            >
              <FaPhone className="h-5 w-5" />
              Get Free Consultation
            </Link>
            <Link 
              href="/destinations"
              className="border-2 border-blue-500 text-blue-500 px-8 py-4 rounded-full font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300 inline-flex items-center gap-2"
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
