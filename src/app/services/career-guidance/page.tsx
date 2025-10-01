import type { Metadata } from 'next';
import { 
  FaHandshake, 
  FaCheckCircle, 
  FaClock, 
  FaFileAlt, 
  FaPhone,
  FaEnvelope,
  FaArrowRight,
  FaGlobe,
  FaAward,
  FaUserCheck,
  FaCalendarAlt,
  FaDollarSign,
  FaGraduationCap,
  FaUsers,
  FaChartLine,
  FaBriefcase
} from 'react-icons/fa';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Career Guidance | EduExpress International - Post-Graduation Career Support & Job Placement",
  description: "Expert career guidance and job placement assistance for international students. Get support with resume optimization, interview preparation, and career development.",
};

export default function CareerGuidancePage() {
  const services = [
    {
      title: "Career Counseling Sessions",
      description: "One-on-one career counseling to help you identify your career goals and develop a strategic plan",
      features: [
        "Career assessment and planning",
        "Industry research and analysis",
        "Goal setting and timeline creation",
        "Skills gap identification",
        "Career transition support"
      ]
    },
    {
      title: "Resume & CV Optimization",
      description: "Professional resume and CV writing services tailored for international job markets",
      features: [
        "ATS-friendly resume formatting",
        "Industry-specific optimization",
        "Achievement-focused content",
        "Multiple format versions",
        "LinkedIn profile optimization"
      ]
    },
    {
      title: "Interview Preparation",
      description: "Comprehensive interview coaching and preparation for various job markets",
      features: [
        "Mock interview sessions",
        "Behavioral question practice",
        "Technical interview prep",
        "Cultural adaptation guidance",
        "Confidence building"
      ]
    },
    {
      title: "Job Placement Assistance",
      description: "Direct connections with employers and job placement support",
      features: [
        "Job search strategy",
        "Employer networking",
        "Application tracking",
        "Salary negotiation",
        "Onboarding support"
      ]
    }
  ];

  const careerPaths = [
    {
      field: "Technology & IT",
      description: "Software development, data science, cybersecurity, and tech consulting",
      opportunities: ["Software Engineer", "Data Scientist", "Product Manager", "Tech Consultant"],
      icon: FaChartLine,
      color: "from-blue-500 to-blue-600"
    },
    {
      field: "Business & Finance",
      description: "Management, finance, marketing, and business consulting roles",
      opportunities: ["Business Analyst", "Financial Advisor", "Marketing Manager", "Consultant"],
      icon: FaBriefcase,
      color: "from-green-500 to-green-600"
    },
    {
      field: "Healthcare & Medicine",
      description: "Medical practice, research, healthcare administration, and public health",
      opportunities: ["Doctor", "Researcher", "Healthcare Admin", "Public Health Specialist"],
      icon: FaUsers,
      color: "from-red-500 to-red-600"
    },
    {
      field: "Education & Research",
      description: "Academic positions, research roles, and educational administration",
      opportunities: ["Professor", "Researcher", "Academic Admin", "Education Consultant"],
      icon: FaGraduationCap,
      color: "from-purple-500 to-purple-600"
    }
  ];

  const successStats = [
    { number: "85%", label: "Job Placement", description: "Within 6 months" },
    { number: "500+", label: "Employer Partners", description: "Global network" },
    { number: "€50K+", label: "Average Salary", description: "Starting salary" },
    { number: "24/7", label: "Career Support", description: "Ongoing assistance" }
  ];

  const processSteps = [
    {
      step: 1,
      title: "Career Assessment",
      description: "Evaluate your skills, interests, and career goals through comprehensive assessment",
      duration: "1-2 days"
    },
    {
      step: 2,
      title: "Strategy Development",
      description: "Create a personalized career development plan and job search strategy",
      duration: "3-5 days"
    },
    {
      step: 3,
      title: "Skill Enhancement",
      description: "Identify and develop skills needed for your target roles and industries",
      duration: "2-4 weeks"
    },
    {
      step: 4,
      title: "Job Search & Placement",
      description: "Execute job search strategy with ongoing support and placement assistance",
      duration: "Ongoing"
    }
  ];

  const countries = [
    { name: "United Kingdom", workVisa: "Graduate Route (2 years)", flag: "🇬🇧" },
    { name: "Netherlands", workVisa: "Orientation Year (1 year)", flag: "🇳🇱" },
    { name: "Cyprus", workVisa: "4+4 Year Work Permit", flag: "🇨🇾" },
    { name: "China", workVisa: "Work Permit + Residence", flag: "🇨🇳" },
    { name: "South Korea", workVisa: "D-10 Job Seeker Visa", flag: "🇰🇷" },
    { name: "Finland", workVisa: "Residence Permit", flag: "🇫🇮" }
  ];

  return (
    <div className="pt-32 pb-16 px-4 max-w-7xl mx-auto min-h-screen relative overflow-hidden">
      
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaHandshake className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
            Career Guidance
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Expert career guidance and job placement assistance for international students. 
            Get support with resume optimization, interview preparation, and career development.
          </p>
        </div>

        {/* Success Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {successStats.map((stat, index) => (
            <div key={index} className="text-center bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-orange-600 mb-2">{stat.number}</div>
              <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
              <div className="text-sm text-gray-600">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Career Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-bold mb-4 text-orange-600">{service.title}</h3>
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

        {/* Career Paths */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Career Paths</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {careerPaths.map((path, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className={`w-16 h-16 bg-gradient-to-r ${path.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <path.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center">{path.field}</h3>
                <p className="text-gray-600 mb-6 text-center leading-relaxed">{path.description}</p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800">Popular Roles:</h4>
                  <ul className="space-y-1">
                    {path.opportunities.map((role, roleIndex) => (
                      <li key={roleIndex} className="flex items-center text-gray-700">
                        <FaCheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        {role}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Work Visa Information */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Post-Study Work Opportunities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {countries.map((country, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">{country.flag}</div>
                  <div>
                    <h3 className="text-lg font-semibold">{country.name}</h3>
                    <p className="text-sm text-gray-600">Work Visa Options</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="text-gray-600">Work Permit:</span>
                    <span className="font-semibold ml-2 text-green-600">{country.workVisa}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Career Development Process</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                  <span className="text-2xl font-bold text-white">{step.step}</span>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                  <div className="text-xs text-orange-600 font-semibold">{step.duration}</div>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-orange-500 to-red-500 transform translate-x-3 z-0"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Career Tips */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-3xl p-12 mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Career Success Tips</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-orange-600">Job Search Strategy</h3>
              <ul className="space-y-3">
                {[
                  "Start early and be proactive",
                  "Network with industry professionals",
                  "Use multiple job search platforms",
                  "Tailor applications to each role",
                  "Follow up on applications"
                ].map((tip, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <FaCheckCircle className="h-4 w-4 text-orange-500 mr-3 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-red-600">Interview Success</h3>
              <ul className="space-y-3">
                {[
                  "Research the company thoroughly",
                  "Practice common interview questions",
                  "Prepare specific examples (STAR method)",
                  "Dress professionally and arrive early",
                  "Ask thoughtful questions about the role"
                ].map((tip, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <FaCheckCircle className="h-4 w-4 text-red-500 mr-3 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Why Choose Our Service */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Career Service?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-white rounded-xl p-8 shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaUserCheck className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Expert Counselors</h3>
              <p className="text-gray-600">Our career counselors have extensive experience in international job markets and recruitment.</p>
            </div>
            <div className="text-center bg-white rounded-xl p-8 shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaAward className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Proven Results</h3>
              <p className="text-gray-600">85% job placement rate within 6 months of graduation with competitive starting salaries.</p>
            </div>
            <div className="text-center bg-white rounded-xl p-8 shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaClock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Ongoing Support</h3>
              <p className="text-gray-600">Continuous career support even after job placement to ensure long-term success.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-2xl p-12 shadow-lg border border-gray-100">
          <h2 className="text-3xl font-bold mb-6">Ready to Launch Your Career?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get expert career guidance and job placement support to kickstart your professional journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/contact"
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2"
            >
              <FaPhone className="h-5 w-5" />
              Get Free Consultation
            </Link>
            <Link 
              href="/destinations"
              className="border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-full font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300 inline-flex items-center gap-2"
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
