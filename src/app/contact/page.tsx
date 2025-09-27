'use client';

import { useState } from 'react';
import { 
  FaPhone, 
  FaMapMarkerAlt, 
  FaEnvelope, 
  FaClock, 
  FaPaperPlane,
  FaWhatsapp,
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaCheckCircle,
  FaExclamationCircle
} from 'react-icons/fa';
import FloatingElements from '@/components/FloatingElements';
import BorderBeam from '@/components/BorderBeam';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: FaPhone,
      title: "Phone Numbers",
      details: [
        "📲 +880 1983-333566",
        "📲 +880 1329-6663505"
      ],
      color: "from-green-500 to-emerald-500",
      action: "tel:+8801983333566"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Office Address",
      details: [
        "House: 12/1, Ground Floor",
        "Road: 4/A, Dhanmondi",
        "Dhaka - 1209, Bangladesh"
      ],
      color: "from-blue-500 to-cyan-500",
      action: "https://maps.google.com/?q=12/1+Ground+Floor+Road+4/A+Dhanmondi+Dhaka+1209"
    },
    {
      icon: FaEnvelope,
      title: "Email",
      details: [
        "info@eduexpressint.com",
        "support@eduexpressint.com"
      ],
      color: "from-purple-500 to-pink-500",
      action: "mailto:info@eduexpressint.com"
    },
    {
      icon: FaClock,
      title: "Office Hours",
      details: [
        "Saturday - Thursday: 9:00 AM - 6:00 PM",
        "Friday: Closed"
      ],
      color: "from-orange-500 to-red-500",
      action: null
    }
  ];

  const socialLinks = [
    { icon: FaFacebook, href: "https://facebook.com/eduexpressint", color: "hover:text-blue-600", label: "Facebook" },
    { icon: FaInstagram, href: "https://instagram.com/eduexpressint", color: "hover:text-pink-500", label: "Instagram" },
    { icon: FaYoutube, href: "https://youtube.com/@eduexpressint", color: "hover:text-red-500", label: "YouTube" },
    { icon: FaLinkedin, href: "https://linkedin.com/company/eduexpressint", color: "hover:text-blue-700", label: "LinkedIn" }
  ];

  return (
    <div className="pt-32 pb-16 px-4 max-w-7xl mx-auto min-h-screen relative overflow-hidden">
      <FloatingElements variant="contact" intensity="medium" />
      
      <div className="relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3 rounded-full mb-8">
            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
            <span className="text-purple-700 font-semibold text-sm uppercase tracking-wide">Get In Touch</span>
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Contact Us
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Ready to start your study abroad journey? Get in touch with our expert counselors 
            for personalized guidance and support. We're here to help you achieve your educational dreams.
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Online Support Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>24/7 WhatsApp Support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span>Expert Consultation</span>
            </div>
          </div>
        </div>

        {/* Contact Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {contactInfo.map((info, index) => (
            <div key={index} className="group relative h-64">
              <BorderBeam 
                size={150} 
                duration={12 + index * 2} 
                borderWidth={2}
                colorFrom="#8B5CF6" 
                colorTo="#EC4899"
                delay={index * 1.5}
              />
              {info.action ? (
                <a 
                  href={info.action}
                  target={info.action.startsWith('http') ? '_blank' : '_self'}
                  rel={info.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="block h-full"
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 h-full relative group-hover:shadow-2xl group-hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${info.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <info.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">{info.title}</h3>
                    <div className="space-y-2 flex-1">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                          {detail}
                        </p>
                      ))}
                    </div>
                    <div className="mt-4 text-xs text-purple-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Click to {info.action.startsWith('tel:') ? 'call' : info.action.startsWith('mailto:') ? 'email' : 'view on map'}
                    </div>
                  </div>
                </a>
              ) : (
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 h-full relative group-hover:shadow-2xl transition-all duration-300 flex flex-col">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${info.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <info.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">{info.title}</h3>
                  <div className="space-y-2 flex-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* Map */}
          <div className="relative h-96">
            <BorderBeam 
              size={200} 
              duration={18} 
              borderWidth={2}
              colorFrom="#3B82F6" 
              colorTo="#06B6D4"
              delay={2}
            />
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50 relative h-full flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Find Us</h3>
              <div className="flex-1 rounded-xl overflow-hidden bg-gray-100 relative">
                {/* Interactive Map Card */}
                <div className="w-full h-full bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl relative overflow-hidden group cursor-pointer" onClick={() => window.open('https://maps.app.goo.gl/L7TkiPpbWXB6G8S39', '_blank')}>
                  {/* Map Pattern Background */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 via-cyan-100 to-blue-200">
                      {/* Grid Pattern */}
                      <div className="absolute inset-0" style={{
                        backgroundImage: `
                          linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '20px 20px'
                      }} />
                    </div>
                  </div>
                  
                  {/* Location Pin */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Location Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <div className="text-white">
                      <h4 className="text-xl font-bold mb-2">EduExpress International</h4>
                      <p className="text-sm text-gray-200 mb-4 leading-relaxed">
                        House: 12/1, Ground Floor, Road: 4/A<br />
                        Dhanmondi, Dhaka - 1209, Bangladesh
                      </p>
                      <div className="flex items-center gap-2 text-blue-300 group-hover:text-blue-200 transition-colors duration-300">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <span className="text-sm font-medium">Click to open in Google Maps</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                </div>
              </div>
              <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    <strong>📍 EduExpress International Office</strong>
                  </p>
                  <a 
                    href="https://maps.app.goo.gl/L7TkiPpbWXB6G8S39" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-300 flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Contact */}
          <div className="relative h-96">
            <BorderBeam 
              size={150} 
              duration={20} 
              borderWidth={2}
              colorFrom="#10B981" 
              colorTo="#059669"
              delay={4}
            />
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50 relative h-full flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">24/7 WhatsApp Support</h3>
              <div className="space-y-4 flex-1">
                <a 
                  href="https://wa.me/8801983333566" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-xl transition-all duration-300 group border border-green-200"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <FaWhatsapp className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">Primary WhatsApp</p>
                    <p className="text-green-600 font-medium">+880 1983-333566</p>
                    <p className="text-xs text-green-500 mt-1">Main support line</p>
                  </div>
                  <div className="text-green-500 group-hover:translate-x-1 transition-transform duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>
                
                <a 
                  href="https://wa.me/8801329663505" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 rounded-xl transition-all duration-300 group border border-emerald-200"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <FaWhatsapp className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">Alternative WhatsApp</p>
                    <p className="text-emerald-600 font-medium">+880 1329-6663505</p>
                    <p className="text-xs text-emerald-500 mt-1">Backup support line</p>
                  </div>
                  <div className="text-emerald-500 group-hover:translate-x-1 transition-transform duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>
              </div>
              <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="flex items-center gap-2 text-green-700 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">Both lines online - Ready to Help!</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="relative h-96">
            <BorderBeam 
              size={150} 
              duration={16} 
              borderWidth={2}
              colorFrom="#EC4899" 
              colorTo="#F97316"
              delay={6}
            />
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50 relative h-full flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Connect With Us</h3>
              <div className="grid grid-cols-2 gap-4 flex-1">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 group ${social.color}`}
                  >
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                      <social.icon className="h-5 w-5 text-gray-600 group-hover:text-current" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{social.label}</p>
                      <p className="text-xs text-gray-500">Follow us</p>
                    </div>
                  </a>
                ))}
              </div>
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <FaEnvelope className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Website</p>
                    <a href="https://www.eduexpressint.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 text-sm hover:text-purple-700 transition-colors duration-300">
                      www.eduexpressint.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form - Full Width */}
        <div className="relative">
          <BorderBeam 
            size={300} 
            duration={20} 
            borderWidth={2}
            colorFrom="#8B5CF6" 
            colorTo="#EC4899"
            delay={0}
          />
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 relative">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <FaPaperPlane className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-gray-900">Send us a Message</h2>
                <p className="text-gray-600 text-lg">We'll get back to you within 24 hours</p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/50"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/50"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/50"
                    placeholder="+880 1234 567890"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/50"
                  >
                    <option value="">Select a subject</option>
                    <option value="study-abroad">Study Abroad Consultation</option>
                    <option value="visa-support">Visa Support</option>
                    <option value="scholarship">Scholarship Information</option>
                    <option value="university-selection">University Selection</option>
                    <option value="general-inquiry">General Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/50 resize-none"
                  placeholder="Tell us about your study abroad goals and how we can help you..."
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-12 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="h-6 w-6" />
                      Send Message
                    </>
                  )}
                </button>
              </div>

              {submitStatus === 'success' && (
                <div className="flex items-center justify-center gap-3 p-6 bg-green-50 border border-green-200 rounded-xl">
                  <FaCheckCircle className="h-6 w-6 text-green-600" />
                  <p className="text-green-700 font-medium text-lg">Message sent successfully! We'll get back to you soon.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="flex items-center justify-center gap-3 p-6 bg-red-50 border border-red-200 rounded-xl">
                  <FaExclamationCircle className="h-6 w-6 text-red-600" />
                  <p className="text-red-700 font-medium text-lg">Failed to send message. Please try again.</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
