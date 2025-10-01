import type { Metadata } from 'next';
import { 
  FaAward, 
  FaCheckCircle, 
  FaClock, 
  FaFileAlt, 
  FaPhone,
  FaEnvelope,
  FaArrowRight,
  FaGlobe,
  FaHandshake,
  FaUserCheck,
  FaCalendarAlt,
  FaDollarSign,
  FaGraduationCap
} from 'react-icons/fa';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Scholarship Support | EduExpress International - Find & Apply for Study Abroad Scholarships",
  description: "Expert scholarship support to help you find and apply for study abroad scholarships. Access exclusive funding opportunities and maximize your chances of receiving financial aid.",
};

export default function ScholarshipSupportPage() {
  const services = [
    {
      title: "Scholarship Research & Matching",
      description: "Comprehensive research to find scholarships that match your profile and goals",
      features: [
        "Profile-based scholarship matching",
        "Merit-based opportunities",
        "Need-based financial aid",
        "Country-specific scholarships",
        "University-specific awards"
      ]
    },
    {
      title: "Application Assistance",
      description: "Complete support with scholarship application preparation and submission",
      features: [
        "Application form completion",
        "Essay writing support",
        "Document preparation",
        "Deadline management",
        "Quality review"
      ]
    },
    {
      title: "Essay Writing Support",
      description: "Expert guidance for compelling scholarship essays and personal statements",
      features: [
        "Essay topic selection",
        "Structure and formatting",
        "Content development",
        "Proofreading and editing",
        "Multiple draft reviews"
      ]
    },
    {
      title: "Follow-up & Appeals",
      description: "Support throughout the scholarship process including appeals if needed",
      features: [
        "Application status tracking",
        "Interview preparation",
        "Appeal assistance",
        "Alternative funding options",
        "Success celebration"
      ]
    }
  ];

  const scholarshipTypes = [
    {
      type: "Merit-Based Scholarships",
      description: "Awarded based on academic excellence and achievements",
      examples: ["Academic Excellence Awards", "Research Scholarships", "Leadership Awards"],
      icon: FaGraduationCap,
      color: "from-blue-500 to-blue-600"
    },
    {
      type: "Need-Based Aid",
      description: "Financial assistance based on demonstrated financial need",
      examples: ["Tuition Fee Waivers", "Living Cost Support", "Emergency Funds"],
      icon: FaDollarSign,
      color: "from-green-500 to-green-600"
    },
    {
      type: "Country-Specific",
      description: "Scholarships offered by governments and organizations",
      examples: ["Chevening (UK)", "CSC (China)", "GKS (Korea)", "Holland Scholarship"],
      icon: FaGlobe,
      color: "from-purple-500 to-purple-600"
    },
    {
      type: "University Awards",
      description: "Scholarships directly from universities and institutions",
      examples: ["Entrance Scholarships", "Departmental Awards", "Alumni Scholarships"],
      icon: FaAward,
      color: "from-orange-500 to-orange-600"
    }
  ];

  const popularScholarships = [
    {
      name: "Chevening Scholarship",
      country: "United Kingdom",
      amount: "Full tuition + living costs",
      flag: "🇬🇧",
      deadline: "November"
    },
    {
      name: "CSC Scholarship",
      country: "China",
      amount: "Full tuition + stipend",
      flag: "🇨🇳",
      deadline: "March"
    },
    {
      name: "GKS Scholarship",
      country: "South Korea",
      amount: "Full tuition + living costs",
      flag: "🇰🇷",
      deadline: "September"
    },
    {
      name: "Holland Scholarship",
      country: "Netherlands",
      amount: "€5,000 - €15,000",
      flag: "🇳🇱",
      deadline: "February"
    },
    {
      name: "Stipendium Hungaricum",
      country: "Hungary",
      amount: "Full tuition + stipend",
      flag: "🇭🇺",
      deadline: "January"
    },
    {
      name: "Finnish Government",
      country: "Finland",
      amount: "€1,500/month",
      flag: "🇫🇮",
      deadline: "January"
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: "Profile Assessment",
      description: "Evaluate your academic background, achievements, and financial situation",
      duration: "1-2 days"
    },
    {
      step: 2,
      title: "Scholarship Matching",
      description: "Research and identify scholarships that match your profile and goals",
      duration: "3-5 days"
    },
    {
      step: 3,
      title: "Application Preparation",
      description: "Prepare all required documents, essays, and application materials",
      duration: "1-2 weeks"
    },
    {
      step: 4,
      title: "Submission & Follow-up",
      description: "Submit applications and track progress with scholarship providers",
      duration: "Ongoing"
    }
  ];

  const successStats = [
    { number: "70%", label: "Success Rate", description: "Scholarship applications" },
    { number: "500+", label: "Scholarships", description: "Available opportunities" },
    { number: "€2M+", label: "Awarded", description: "Total funding secured" },
    { number: "1000+", label: "Students", description: "Successfully funded" }
  ];

  return (
    <div className="pt-32 pb-16 px-4 max-w-7xl mx-auto min-h-screen relative overflow-hidden">
      
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaAward className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Scholarship Support
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Expert scholarship support to help you find and apply for study abroad funding. 
            Access exclusive opportunities and maximize your chances of receiving financial aid.
          </p>
        </div>

        {/* Success Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {successStats.map((stat, index) => (
            <div key={index} className="text-center bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-purple-600 mb-2">{stat.number}</div>
              <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
              <div className="text-sm text-gray-600">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Scholarship Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-bold mb-4 text-purple-600">{service.title}</h3>
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

        {/* Scholarship Types */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Types of Scholarships</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {scholarshipTypes.map((type, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className={`w-16 h-16 bg-gradient-to-r ${type.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <type.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center">{type.type}</h3>
                <p className="text-gray-600 mb-6 text-center leading-relaxed">{type.description}</p>
                <ul className="space-y-2">
                  {type.examples.map((example, exampleIndex) => (
                    <li key={exampleIndex} className="flex items-center text-gray-700">
                      <FaCheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Scholarships */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Scholarships</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularScholarships.map((scholarship, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">{scholarship.flag}</div>
                  <div>
                    <h3 className="text-lg font-semibold">{scholarship.name}</h3>
                    <p className="text-sm text-gray-600">{scholarship.country}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold text-green-600">{scholarship.amount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Deadline:</span>
                    <span className="font-semibold">{scholarship.deadline}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Scholarship Process</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                  <span className="text-2xl font-bold text-white">{step.step}</span>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                  <div className="text-xs text-purple-600 font-semibold">{step.duration}</div>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform translate-x-3 z-0"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tips for Success */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-12 mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Tips for Scholarship Success</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-purple-600">Application Tips</h3>
              <ul className="space-y-3">
                {[
                  "Start early and meet all deadlines",
                  "Tailor your application to each scholarship",
                  "Highlight your unique achievements",
                  "Get strong recommendation letters",
                  "Proofread all materials carefully"
                ].map((tip, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <FaCheckCircle className="h-4 w-4 text-purple-500 mr-3 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-pink-600">Essay Writing</h3>
              <ul className="space-y-3">
                {[
                  "Tell your personal story authentically",
                  "Show impact and leadership",
                  "Connect your goals to the scholarship",
                  "Use specific examples and evidence",
                  "Keep it concise and compelling"
                ].map((tip, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <FaCheckCircle className="h-4 w-4 text-pink-500 mr-3 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Why Choose Our Service */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Scholarship Service?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-white rounded-xl p-8 shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaUserCheck className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Expert Guidance</h3>
              <p className="text-gray-600">Our counselors have extensive experience with scholarship applications and know what works.</p>
            </div>
            <div className="text-center bg-white rounded-xl p-8 shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaAward className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">High Success Rate</h3>
              <p className="text-gray-600">70% success rate with our scholarship applications, helping students secure funding.</p>
            </div>
            <div className="text-center bg-white rounded-xl p-8 shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaClock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Timely Support</h3>
              <p className="text-gray-600">We help you meet all deadlines and ensure your applications are submitted on time.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-2xl p-12 shadow-lg border border-gray-100">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Scholarship?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Let our experts help you find and apply for scholarships that match your profile and goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/contact"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2"
            >
              <FaPhone className="h-5 w-5" />
              Get Free Consultation
            </Link>
            <Link 
              href="/destinations"
              className="border-2 border-purple-500 text-purple-500 px-8 py-4 rounded-full font-semibold hover:bg-purple-500 hover:text-white transition-all duration-300 inline-flex items-center gap-2"
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
