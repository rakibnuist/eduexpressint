import type { Metadata } from 'next';
import { 
  FaGraduationCap, 
  FaShieldAlt, 
  FaAward, 
  FaHandshake, 
  FaGlobe, 
  FaFileAlt,
  FaUsers,
  FaChartLine,
  FaClock,
  FaCheckCircle,
  FaArrowRight,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt
} from 'react-icons/fa';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Our Services | EduExpress International - Complete Study Abroad Solutions",
  description: "Comprehensive study abroad services including university applications, visa assistance, scholarship support, and career counseling. Expert guidance for your international education journey.",
};

export default function ServicesPage() {
  const mainServices = [
    {
      icon: FaGraduationCap,
      title: "University Selection & Applications",
      description: "Expert guidance to choose the perfect university and program for your academic goals and career aspirations.",
      features: [
        "Personalized university matching",
        "Program selection guidance",
        "Application form assistance",
        "Document preparation support",
        "Admission interview preparation"
      ],
      href: "/services/university-applications",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: FaShieldAlt,
      title: "Visa Assistance",
      description: "Complete visa processing support with high success rates and personalized guidance for all study destinations.",
      features: [
        "Visa application preparation",
        "Document verification",
        "Interview coaching",
        "Appeal support if needed",
        "95% success rate"
      ],
      href: "/services/visa-assistance",
      color: "from-green-500 to-green-600"
    },
    {
      icon: FaAward,
      title: "Scholarship Support",
      description: "Access to exclusive scholarships and financial aid opportunities worldwide to make your education affordable.",
      features: [
        "Scholarship research & matching",
        "Application assistance",
        "Essay writing support",
        "Merit-based opportunities",
        "Need-based financial aid"
      ],
      href: "/services/scholarship-support",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: FaHandshake,
      title: "Career Guidance",
      description: "Post-graduation career support and job placement assistance to help you succeed in your chosen field.",
      features: [
        "Career counseling sessions",
        "Resume & CV optimization",
        "Interview preparation",
        "Job placement assistance",
        "Industry networking"
      ],
      href: "/services/career-guidance",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const additionalServices = [
    {
      icon: FaGlobe,
      title: "Destination Counseling",
      description: "Comprehensive guidance on choosing the right study destination based on your preferences, budget, and career goals."
    },
    {
      icon: FaFileAlt,
      title: "Documentation Support",
      description: "Complete assistance with document preparation, attestation, and submission for university and visa applications."
    },
    {
      icon: FaUsers,
      title: "Pre-departure Orientation",
      description: "Essential information and training to help you prepare for life in your new study destination."
    },
    {
      icon: FaChartLine,
      title: "Progress Tracking",
      description: "Regular updates and monitoring of your application status throughout the entire process."
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: "Initial Consultation",
      description: "Free assessment of your academic background, goals, and preferences",
      icon: FaPhone
    },
    {
      step: 2,
      title: "Service Selection",
      description: "Choose the services that best fit your needs and budget",
      icon: FaCheckCircle
    },
    {
      step: 3,
      title: "Documentation",
      description: "Gather and prepare all required documents with our guidance",
      icon: FaFileAlt
    },
    {
      step: 4,
      title: "Application Submission",
      description: "Submit applications to universities and visa offices",
      icon: FaArrowRight
    },
    {
      step: 5,
      title: "Follow-up & Support",
      description: "Continuous support until you arrive at your destination",
      icon: FaHandshake
    }
  ];

  return (
    <div className="pt-32 pb-16 px-4 max-w-7xl mx-auto min-h-screen relative overflow-hidden">
      
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive study abroad solutions designed to make your international education journey seamless and successful. 
            From university selection to career guidance, we're with you every step of the way.
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {mainServices.map((service, index) => (
            <div key={index} className="group relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200 h-full">
                <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-center mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <FaCheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="text-center">
                  <Link 
                    href={service.href}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
                  >
                    Learn More
                    <FaArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Services */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Additional Support Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{service.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Process</h2>
          <div className="grid md:grid-cols-5 gap-6">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                  <div className="text-2xl font-bold text-blue-600 mb-2">{step.step}</div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform translate-x-3 z-0"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12 mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose EduExpress?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaUsers className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Expert Team</h3>
              <p className="text-gray-600">Our experienced counselors have helped thousands of students achieve their study abroad dreams.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Proven Success</h3>
              <p className="text-gray-600">95% visa success rate and 500+ partner universities worldwide ensure your success.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaClock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock assistance and guidance throughout your entire journey.</p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center bg-white rounded-2xl p-12 shadow-lg border border-gray-100">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get a free consultation with our expert counselors and take the first step towards your international education.
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
