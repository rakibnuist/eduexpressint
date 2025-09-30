'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import FloatingElements from '@/components/FloatingElements';
import BorderBeam from '@/components/BorderBeam';
import {
  FaGraduationCap,
  FaUsers,
  FaGlobeAmericas,
  FaAward,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaQuoteLeft,
  FaStar,
  FaRocket,
  FaCheckCircle,
  FaShieldAlt,
  FaBookOpen,
  FaHandshake,
  FaQuestionCircle,
  FaPhone,
} from 'react-icons/fa';
import { useState, useEffect } from 'react';
import Earth from '@/components/globe/globe';
import { useCTA } from '@/context/CTAContext';
import {
  EduexpertFadeInUp,
  EduexpertSlideInRight,
  EduexpertScaleIn,
  EduexpertBounceIn,
  EduexpertTextReveal,
  EduexpertStaggered,
  EduexpertCard,
  EduexpertButton,
  EduexpertIcon
} from '@/components/EduexpertAnimations';

// Animated Text Component for Hero Section
const AnimatedHeroText = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  const texts = [
    "Global Education",
    "Global Opportunity", 
    "Better Scholarship"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        setIsVisible(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className="relative h-20 sm:h-24 lg:h-28 flex items-center justify-center">
      <span 
        className={`bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent font-bold text-4xl sm:text-6xl lg:text-7xl xl:text-8xl block transition-all duration-500 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
        }`}
        style={{
          textShadow: '0 0 30px rgba(59, 130, 246, 0.5)',
          filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))'
        }}
      >
        {texts[currentTextIndex]}
      </span>
    </div>
  );
};

// Enhanced animation wrapper components with more sophisticated effects
interface AnimationProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

const FadeIn = ({ children, delay = 0, duration = 1000, className = "" }: AnimationProps) => (
  <div 
    className={`animate-fade-in-up ${className}`}
    style={{ 
      animationDelay: `${delay}ms`,
      animationDuration: `${duration}ms`,
      animationFillMode: 'both'
    }}
  >
    {children}
  </div>
);

const SlideIn = ({ children, delay = 0, duration = 800, direction = 'up', className = "" }: AnimationProps & { direction?: 'up' | 'down' | 'left' | 'right' }) => (
  <div 
    className={`animate-slide-in-${direction} ${className}`}
    style={{ 
      animationDelay: `${delay}ms`,
      animationDuration: `${duration}ms`,
      animationFillMode: 'both'
    }}
  >
    {children}
  </div>
);

const BounceIn = ({ children, delay = 0, duration = 600, className = "" }: AnimationProps) => (
  <div 
    className={`animate-bounce-in ${className}`}
    style={{ 
      animationDelay: `${delay}ms`,
      animationDuration: `${duration}ms`,
      animationFillMode: 'both'
    }}
  >
    {children}
  </div>
);

const ZoomIn = ({ children, delay = 0, duration = 600, className = "" }: AnimationProps) => (
  <div 
    className={`animate-zoom-in ${className}`}
    style={{ 
      animationDelay: `${delay}ms`,
      animationDuration: `${duration}ms`,
      animationFillMode: 'both'
    }}
  >
    {children}
  </div>
);

const RotateIn = ({ children, delay = 0, duration = 600, className = "" }: AnimationProps) => (
  <div 
    className={`animate-rotate-in ${className}`}
    style={{ 
      animationDelay: `${delay}ms`,
      animationDuration: `${duration}ms`,
      animationFillMode: 'both'
    }}
  >
    {children}
  </div>
);

const Reveal = ({ children, delay = 0, duration = 1000, className = "" }: AnimationProps) => (
  <div 
    className={`animate-reveal ${className}`}
    style={{ 
      animationDelay: `${delay}ms`,
      animationDuration: `${duration}ms`,
      animationFillMode: 'both'
    }}
  >
    {children}
  </div>
);

const Pulse = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`animate-pulse ${className}`}>
    {children}
  </div>
);

const Float = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`animate-float ${className}`}>
    {children}
  </div>
);

const Glow = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`animate-glow ${className}`}>
    {children}
  </div>
);

// Professional Typewriter Text Component
interface TypewriterTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}

const TypewriterText = ({ text, className = "", style, delay = 0 }: TypewriterTextProps) => {
  return (
    <div 
      className={`typewriter-text ${className}`} 
      style={{
        ...style,
        animationDelay: `${delay}s`,
        width: '0'
      }}
    >
      {text}
    </div>
  );
};

// Professional Text Reveal Component
interface TextRevealProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

const TextReveal = ({ text, className = "", style }: TextRevealProps) => {
  return (
    <div className={`text-reveal ${className}`} style={style}>
      {text}
    </div>
  );
};

// Simple trackLead function
const trackLead = (label: string) => {
};

// FAQ Item Component with Dropdown
const FAQItem = ({ faq, index }: { faq: { question: string; answer: string }; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SlideIn delay={800 + index * 200} duration={600}>
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm min-h-[80px] card-hover-effect faq-card">
        <CardContent className="p-0">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50/50 transition-colors duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <FaQuestionCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {faq.question}
              </h3>
            </div>
            <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
              <FaChevronRight className="h-5 w-5 text-gray-500" />
            </div>
          </button>
          
          <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="px-6 pb-6">
              <div className="ml-10 border-l-2 border-blue-200 pl-4">
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </SlideIn>
  );
};

const DEST = '/brand/destinations';

interface StudentSuccessStory {
  _id?: string;
  studentName: string;
  studentImage?: string;
  studentNationality: string;
  university: string;
  universityCountry: string;
  program: string;
  programLevel: string;
  title: string;
  story: string;
  shortDescription: string;
  testimonialQuote?: string;
  isPublished: boolean;
  isFeatured: boolean;
  priority: number;
  views: number;
  likes: number;
  createdAt?: string;
  updatedAt?: string;
}

export default function HomePage() {
  const [currentDestinationIndex, setCurrentDestinationIndex] = useState(0);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [successStories, setSuccessStories] = useState<StudentSuccessStory[]>([]);
  const [storiesLoading, setStoriesLoading] = useState(true);
  const { openCTA } = useCTA();

  // Fetch success stories from API
  useEffect(() => {
    const fetchSuccessStories = async () => {
      try {
        const response = await fetch('/api/success-stories?featured=true&limit=10');
        if (response.ok) {
          const data = await response.json();
          setSuccessStories(data.data?.stories || []);
        }
      } catch (error) {
      } finally {
        setStoriesLoading(false);
      }
    };

    fetchSuccessStories();
  }, []);

  // Sample data
  const stats = [
    { number: "500+", label: "Universities", description: "Partner institutions worldwide" },
    { number: "10K+", label: "Students", description: "Successfully placed abroad" },
    { number: "18+", label: "Countries", description: "Study destinations available" },
    { number: "95%", label: "Success Rate", description: "Visa approval success" }
  ];

  const services = [
    {
      icon: FaGraduationCap,
      title: "University Selection",
      description: "Expert guidance to choose the perfect university and program for your academic goals."
    },
    {
      icon: FaShieldAlt,
      title: "Visa Assistance",
      description: "Complete visa processing support with high success rates and personalized guidance."
    },
    {
      icon: FaAward,
      title: "Scholarship Support",
      description: "Access to exclusive scholarships and financial aid opportunities worldwide."
    },
    {
      icon: FaHandshake,
      title: "Career Guidance",
      description: "Post-graduation career support and job placement assistance in your field."
    }
  ];

  const destinations = [
    {
      name: "United Kingdom",
      image: `${DEST}/uk.jpg`,
      flag: "🇬🇧",
      universities: 150,
      programs: "500+",
      description: "World-class education with rich cultural heritage and prestigious universities"
    },
    {
      name: "China",
      image: `${DEST}/china.jpg`,
      flag: "🇨🇳",
      universities: 200,
      programs: "800+",
      description: "Rapidly growing education system with modern facilities and global recognition"
    },
    {
      name: "South Korea",
      image: `${DEST}/south-korea.jpg`,
      flag: "🇰🇷",
      universities: 120,
      programs: "400+",
      description: "Advanced technology programs and innovative research opportunities"
    },
    {
      name: "Hungary",
      image: `${DEST}/hungary.jpg`,
      flag: "🇭🇺",
      universities: 60,
      programs: "200+",
      description: "Affordable European education with excellent quality and cultural diversity"
    },
    {
      name: "Croatia",
      image: `${DEST}/croatia.jpg`,
      flag: "🇭🇷",
      universities: 40,
      programs: "150+",
      description: "Beautiful coastal cities with quality education and EU benefits"
    },
    {
      name: "Cyprus",
      image: `${DEST}/cyprus.jpg`,
      flag: "🇨🇾",
      universities: 30,
      programs: "100+",
      description: "Mediterranean lifestyle with English-taught programs and EU membership"
    },
    {
      name: "Georgia",
      image: `${DEST}/georgia.jpg`,
      flag: "🇬🇪",
      universities: 50,
      programs: "180+",
      description: "Emerging education hub with affordable costs and growing international recognition"
    }
  ];

  // Transform success stories to testimonials format
  const transformStoriesToTestimonials = (stories: StudentSuccessStory[]) => {
    return stories.map(story => ({
      name: story.studentName,
      country: `Studying in ${story.universityCountry}`,
      image: story.studentImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(story.studentName)}&background=random&color=fff&size=150`,
      rating: 5,
      text: story.testimonialQuote || story.shortDescription || story.story.substring(0, 150) + "...",
      university: story.university,
      program: story.program,
      programLevel: story.programLevel
    }));
  };

  // Fallback testimonials if no success stories are available
  const fallbackTestimonials = [
    {
      name: "Sarah Ahmed",
      country: "Studying in UK",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "EduExpress made my dream of studying in the UK come true. Their guidance was invaluable throughout the entire process."
    },
    {
      name: "Mohammad Rahman",
      country: "Studying in China",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "The visa assistance was exceptional. I got my student visa approved on the first try thanks to their expert support."
    },
    {
      name: "Fatima Khan",
      country: "Studying in South Korea",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "They helped me secure a scholarship that covered 50% of my tuition fees. Highly recommended!"
    },
    {
      name: "Ahmed Hassan",
      country: "Studying in Hungary",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "The application process was smooth and stress-free. The team guided me through every step with professionalism."
    },
    {
      name: "Aisha Ali",
      country: "Studying in Croatia",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Croatia is beautiful and the education quality is excellent. EduExpress made my transition seamless."
    }
  ];

  // Use success stories if available, otherwise fallback to hardcoded testimonials
  const testimonials = successStories.length > 0 
    ? transformStoriesToTestimonials(successStories)
    : fallbackTestimonials;

  const faqs = [
    {
      question: "How long does the application process take?",
      answer: "The complete application process typically takes 3-6 months, depending on the country and university requirements. This includes document preparation, application submission, visa processing, and pre-departure arrangements."
    },
    {
      question: "Do you provide visa assistance?",
      answer: "Yes, we provide comprehensive visa assistance including document preparation, application submission, interview preparation, and follow-up support. Our team has extensive experience with visa requirements for all our destination countries."
    },
    {
      question: "What are your success rates?",
      answer: "We maintain a 95% success rate for visa approvals and 98% success rate for university admissions. Our experienced team ensures that applications are properly prepared and submitted according to each country's specific requirements."
    },
    {
      question: "Do you offer scholarship support?",
      answer: "Yes, we help students identify and apply for various scholarships, including merit-based, need-based, and country-specific options. We also provide guidance on alternative funding sources and financial planning."
    },
    {
      question: "Which countries do you serve?",
      answer: "We specialize in study abroad opportunities in China, UK, South Korea, Hungary, Croatia, Cyprus, and Georgia. Each destination offers unique advantages and we provide country-specific guidance and support."
    },
    {
      question: "What services are included in your consultation?",
      answer: "Our free consultation includes university selection, program matching, application guidance, document preparation, visa assistance, scholarship opportunities, and pre-departure support. We provide end-to-end assistance throughout your study abroad journey."
    },
    {
      question: "Do you help with accommodation arrangements?",
      answer: "Yes, we assist with finding suitable accommodation options including university dormitories, private apartments, and homestays. We provide guidance on housing applications and connect you with reliable accommodation providers."
    },
    {
      question: "What support do you provide after arrival?",
      answer: "We offer post-arrival support including airport pickup assistance, orientation programs, local registration help, bank account setup, and ongoing academic and personal support throughout your studies."
    },
    {
      question: "How much does your service cost?",
      answer: "We offer free initial consultation and guidance. Our service fees vary depending on the country and services required. We provide transparent pricing with no hidden costs and offer flexible payment plans."
    },
    {
      question: "Do you work with specific universities?",
      answer: "Yes, we have partnerships with top universities across all our destination countries. We can recommend the best institutions based on your academic background, career goals, and budget preferences."
    },
    {
      question: "What documents do I need to prepare?",
      answer: "Required documents typically include academic transcripts, English proficiency test scores, passport, financial statements, recommendation letters, and statement of purpose. We provide a detailed checklist based on your chosen destination and program."
    }
  ];

  // Auto-rotate carousels
  useEffect(() => {
    const destinationInterval = setInterval(() => {
      if (!isUserInteracting) {
        setCurrentDestinationIndex((prev) => (prev + 1) % destinations.length);
      }
    }, 5000);

    const testimonialInterval = setInterval(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => {
      clearInterval(destinationInterval);
      clearInterval(testimonialInterval);
    };
  }, [destinations.length, testimonials.length, isUserInteracting]);

  // Reset user interaction flag after a delay
  useEffect(() => {
    if (isUserInteracting) {
      const timer = setTimeout(() => {
        setIsUserInteracting(false);
      }, 10000); // Resume auto-rotation after 10 seconds
      return () => clearTimeout(timer);
    }
  }, [isUserInteracting]);

  // Scroll progress indicator
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-white relative">

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="group relative">
          <button
            onClick={() => openCTA('Floating CTA Button')}
            className="w-16 h-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-110 flex items-center justify-center"
          >
            <FaRocket className="h-6 w-6 text-white group-hover:animate-bounce" />
          </button>
          
          {/* Floating particles around FAB */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-2 -left-2 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-0 group-hover:opacity-100" style={{ animationDelay: '0s' }}></div>
            <div className="absolute -top-2 -right-2 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-0 group-hover:opacity-100" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-pink-400 rounded-full animate-ping opacity-0 group-hover:opacity-100" style={{ animationDelay: '1s' }}></div>
            <div className="absolute -bottom-2 -right-2 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-0 group-hover:opacity-100" style={{ animationDelay: '1.5s' }}></div>
          </div>
          
          {/* Tooltip */}
          <div className="absolute right-20 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Get Free Consultation!
            <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
          </div>
        </div>
      </div>

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transition-all duration-300" 
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900" style={{ zIndex: 1 }}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20 animate-gradient pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-400/30 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-400/30 via-transparent to-transparent pointer-events-none" />
        
        {/* Professional Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
        
        {/* Subtle Noise Texture */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }} />
        
        {/* World Map/Globe Animation Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-96 h-96 lg:w-[600px] lg:h-[600px] pointer-events-none">
              {/* Globe Container */}
              <div className="absolute inset-0 rounded-full border-4 border-white/20 animate-spin-slow">
                <div className="absolute inset-2 rounded-full border-2 border-white/10 animate-spin-reverse">
                  <div className="absolute inset-4 rounded-full border border-white/5 animate-spin-slow">
                    {/* Globe Grid Lines */}
                    <div className="absolute inset-0 rounded-full">
                      <div className="absolute top-1/2 left-0 right-0 h-px bg-white/20 transform -translate-y-1/2"></div>
                      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20 transform -translate-x-1/2"></div>
                      <div className="absolute top-1/4 left-0 right-0 h-px bg-white/10 transform -translate-y-1/2"></div>
                      <div className="absolute top-3/4 left-0 right-0 h-px bg-white/10 transform -translate-y-1/2"></div>
                      <div className="absolute left-1/4 top-0 bottom-0 w-px bg-white/10 transform -translate-x-1/2"></div>
                      <div className="absolute left-3/4 top-0 bottom-0 w-px bg-white/10 transform -translate-x-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Country Markers */}
              <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-blue-400 rounded-full animate-marker-pulse" style={{ animationDelay: '0s' }}></div>
              <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-green-400 rounded-full animate-marker-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-yellow-400 rounded-full animate-marker-pulse" style={{ animationDelay: '2s' }}></div>
              <div className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-red-400 rounded-full animate-marker-pulse" style={{ animationDelay: '3s' }}></div>
              <div className="absolute top-1/2 left-1/6 w-3 h-3 bg-purple-400 rounded-full animate-marker-pulse" style={{ animationDelay: '4s' }}></div>
              <div className="absolute top-2/3 right-1/6 w-3 h-3 bg-pink-400 rounded-full animate-marker-pulse" style={{ animationDelay: '5s' }}></div>
              <div className="absolute bottom-1/2 right-1/5 w-3 h-3 bg-cyan-400 rounded-full animate-marker-pulse" style={{ animationDelay: '6s' }}></div>
            </div>
          </div>
        </div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[
            { left: 10, top: 20, delay: 0, duration: 3 },
            { left: 85, top: 15, delay: 0.5, duration: 4 },
            { left: 25, top: 60, delay: 1, duration: 5 },
            { left: 70, top: 45, delay: 1.5, duration: 3.5 },
            { left: 15, top: 80, delay: 2, duration: 4.5 },
            { left: 90, top: 70, delay: 2.5, duration: 3.8 },
            { left: 45, top: 25, delay: 3, duration: 4.2 },
            { left: 60, top: 85, delay: 3.5, duration: 3.2 },
            { left: 5, top: 50, delay: 4, duration: 4.8 },
            { left: 95, top: 35, delay: 4.5, duration: 3.6 },
            { left: 35, top: 10, delay: 0.2, duration: 4.1 },
            { left: 80, top: 55, delay: 0.8, duration: 3.9 },
            { left: 20, top: 75, delay: 1.2, duration: 4.3 },
            { left: 75, top: 25, delay: 1.8, duration: 3.7 },
            { left: 50, top: 90, delay: 2.2, duration: 4.4 },
            { left: 30, top: 40, delay: 2.8, duration: 3.4 },
            { left: 65, top: 15, delay: 3.2, duration: 4.6 },
            { left: 40, top: 65, delay: 3.8, duration: 3.3 },
            { left: 12, top: 30, delay: 4.2, duration: 4.7 },
            { left: 88, top: 80, delay: 4.8, duration: 3.5 }
          ].map((particle, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`
              }}
            />
          ))}
        </div>

        {/* Animated Connection Lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.1 }}>
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
            <path
              d="M 100 200 Q 300 100 500 200 T 900 200"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              fill="none"
              className="animate-draw-line"
            />
            <path
              d="M 200 400 Q 400 300 600 400 T 1000 400"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              fill="none"
              className="animate-draw-line"
              style={{ animationDelay: '2s' }}
            />
            <path
              d="M 50 600 Q 250 500 450 600 T 850 600"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              fill="none"
              className="animate-draw-line"
              style={{ animationDelay: '4s' }}
            />
          </svg>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 animate-float-slow">
            <FaGraduationCap className="h-8 w-8 text-blue-400/30" />
          </div>
          <div className="absolute top-40 right-32 animate-float-slow" style={{ animationDelay: '1s' }}>
            <FaGlobeAmericas className="h-6 w-6 text-purple-400/30" />
          </div>
          <div className="absolute bottom-40 left-32 animate-float-slow" style={{ animationDelay: '2s' }}>
            <FaAward className="h-7 w-7 text-pink-400/30" />
          </div>
          <div className="absolute bottom-20 right-20 animate-float-slow" style={{ animationDelay: '3s' }}>
            <FaUsers className="h-6 w-6 text-cyan-400/30" />
          </div>
          <div className="absolute top-1/2 left-10 animate-float-slow" style={{ animationDelay: '4s' }}>
            <FaRocket className="h-5 w-5 text-yellow-400/30" />
          </div>
          <div className="absolute top-1/3 right-10 animate-float-slow" style={{ animationDelay: '5s' }}>
            <FaShieldAlt className="h-6 w-6 text-green-400/30" />
          </div>
        </div>

        {/* Floating Educational Text */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-32 left-16 animate-float-slow opacity-15">
            <span className="text-sm font-semibold text-white/30 rotate-12 bg-white/5 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">Study Abroad</span>
          </div>
          <div className="absolute top-48 right-24 animate-float-slow opacity-15" style={{ animationDelay: '1s' }}>
            <span className="text-sm font-semibold text-white/30 -rotate-12 bg-white/5 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">Global Education</span>
          </div>
          <div className="absolute bottom-48 left-24 animate-float-slow opacity-15" style={{ animationDelay: '2s' }}>
            <span className="text-sm font-semibold text-white/30 rotate-6 bg-white/5 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">Scholarships</span>
          </div>
          <div className="absolute bottom-32 right-16 animate-float-slow opacity-15" style={{ animationDelay: '3s' }}>
            <span className="text-sm font-semibold text-white/30 -rotate-6 bg-white/5 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">Visa Support</span>
          </div>
          <div className="absolute top-1/2 left-8 animate-float-slow opacity-10" style={{ animationDelay: '4s' }}>
            <span className="text-xs font-medium text-white/25 rotate-45 bg-white/5 px-2 py-1 rounded-full backdrop-blur-sm">Universities</span>
          </div>
          <div className="absolute top-1/4 right-8 animate-float-slow opacity-10" style={{ animationDelay: '5s' }}>
            <span className="text-xs font-medium text-white/25 -rotate-45 bg-white/5 px-2 py-1 rounded-full backdrop-blur-sm">Career</span>
          </div>
          <div className="absolute top-1/3 left-1/3 animate-float-slow opacity-10" style={{ animationDelay: '6s' }}>
            <span className="text-xs font-medium text-white/25 rotate-12 bg-white/5 px-2 py-1 rounded-full backdrop-blur-sm">Success</span>
          </div>
          <div className="absolute bottom-1/3 right-1/3 animate-float-slow opacity-10" style={{ animationDelay: '7s' }}>
            <span className="text-xs font-medium text-white/25 -rotate-12 bg-white/5 px-2 py-1 rounded-full backdrop-blur-sm">Future</span>
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:py-32">
          <div className="text-center">
            <EduexpertFadeInUp delay={0.2} duration={1.2}>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                <EduexpertSlideInRight delay={0.4} duration={0.8}>
                  <span className="text-white">Your Gateway to</span>
                </EduexpertSlideInRight>
                <div className="mt-2">
                  <AnimatedHeroText />
                </div>
            </h1>
            </EduexpertFadeInUp>
            
            <EduexpertTextReveal delay={1.0} duration={1.0}>
              <p className="mx-auto mt-8 max-w-3xl text-lg sm:text-xl text-white/90 leading-relaxed">
                Connect with world-class universities worldwide. Expert counseling, scholarship opportunities, and personalized support for your academic journey abroad.
              </p>
            </EduexpertTextReveal>
              
            {/* Hero Section Buttons - Fixed Layout */}
             <EduexpertStaggered delay={0.2} className="hero-button-container mt-12 flex flex-col items-center gap-6 sm:flex-row sm:gap-8 sm:justify-center max-w-4xl mx-auto px-4">
              <EduexpertButton
                onClick={() => {
                  openCTA('Hero Section Get Free Consultation');
                }}
                className="group relative bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold px-8 py-4 sm:px-12 sm:py-6 rounded-2xl shadow-2xl border border-emerald-400/20 cursor-pointer w-full sm:w-auto min-w-[280px] sm:min-w-[320px]"
              >
                <span className="flex items-center justify-center gap-3 sm:gap-4 text-lg sm:text-xl">
                  <FaPhone className="h-5 w-5 sm:h-6 sm:w-6" />
                  Get Free Consultation
                  <FaArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </EduexpertButton>
              
              <EduexpertButton
                onClick={() => {
                  trackLead('Hero CTA - Browse Universities');
                  window.location.href = '/universities';
                }}
                className="group bg-white/20 backdrop-blur-lg border-2 border-white/30 text-white hover:bg-white hover:text-gray-800 font-bold px-8 py-4 sm:px-12 sm:py-6 rounded-2xl shadow-2xl cursor-pointer w-full sm:w-auto min-w-[280px] sm:min-w-[320px]"
              >
                <span className="flex items-center justify-center gap-3 sm:gap-4 text-lg sm:text-xl">
                  <FaGraduationCap className="h-5 w-5 sm:h-6 sm:w-6" />
                  Browse Universities
                </span>
              </EduexpertButton>
            </EduexpertStaggered>

            {/* Enhanced Key Benefits */}
            <EduexpertFadeInUp delay={1.5} duration={0.8}>
              <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <EduexpertBounceIn delay={1.8} duration={0.6}>
                  <EduexpertCard className="group flex flex-col items-center gap-4 p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 relative">
                    <BorderBeam 
                      size={120} 
                      duration={10} 
                      borderWidth={1.5}
                      colorFrom="#3B82F6" 
                      colorTo="#06B6D4"
                      delay={0}
                    />
                    <EduexpertIcon className="p-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:rotate-12 transition-transform duration-300">
                      <Pulse>
                        <FaCheckCircle className="h-6 w-6 text-white" />
                      </Pulse>
                    </EduexpertIcon>
                    <span className="text-white font-semibold text-lg">Free Consultation</span>
                    <span className="text-white/70 text-sm text-center">Expert guidance at no cost</span>
                  </EduexpertCard>
                </EduexpertBounceIn>
                
                <EduexpertBounceIn delay={2.0} duration={0.6}>
                  <EduexpertCard className="group flex flex-col items-center gap-4 p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 relative">
                    <BorderBeam 
                      size={120} 
                      duration={12} 
                      borderWidth={1.5}
                      colorFrom="#8B5CF6" 
                      colorTo="#EC4899"
                      delay={2}
                    />
                    <EduexpertIcon className="p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 group-hover:rotate-12 transition-transform duration-300">
                      <Pulse>
                        <FaShieldAlt className="h-6 w-6 text-white" />
                      </Pulse>
                    </EduexpertIcon>
                    <span className="text-white font-semibold text-lg">Visa Support</span>
                    <span className="text-white/70 text-sm text-center">95% success rate</span>
                  </EduexpertCard>
                </EduexpertBounceIn>
                
                <EduexpertBounceIn delay={2.2} duration={0.6}>
                  <EduexpertCard className="group flex flex-col items-center gap-4 p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 relative">
                    <BorderBeam 
                      size={120} 
                      duration={14} 
                      borderWidth={1.5}
                      colorFrom="#EC4899" 
                      colorTo="#F97316"
                      delay={4}
                    />
                    <EduexpertIcon className="p-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 group-hover:rotate-12 transition-transform duration-300">
                      <Pulse>
                        <FaAward className="h-6 w-6 text-white" />
                      </Pulse>
                    </EduexpertIcon>
                    <span className="text-white font-semibold text-lg">Scholarship Access</span>
                    <span className="text-white/70 text-sm text-center">Exclusive opportunities</span>
                  </EduexpertCard>
                </EduexpertBounceIn>
              </div>
            </EduexpertFadeInUp>

          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="relative py-16 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 via-purple-100/50 to-pink-100/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-200/30 via-transparent to-transparent" />
        
        {/* Educational Animated Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 animate-float-slow opacity-30">
            <span className="text-lg font-bold text-blue-600/40">500+ Universities</span>
          </div>
          <div className="absolute top-20 right-20 animate-float-slow opacity-30" style={{ animationDelay: '1s' }}>
            <span className="text-lg font-bold text-purple-600/40">10K+ Students</span>
          </div>
          <div className="absolute bottom-20 left-20 animate-float-slow opacity-30" style={{ animationDelay: '2s' }}>
            <span className="text-lg font-bold text-pink-600/40">18+ Countries</span>
          </div>
          <div className="absolute bottom-10 right-10 animate-float-slow opacity-30" style={{ animationDelay: '3s' }}>
            <span className="text-lg font-bold text-indigo-600/40">95% Success</span>
          </div>
          
          {/* Floating educational icons */}
          <div className="absolute top-1/4 left-1/4 animate-float-slow opacity-20">
            <div className="text-3xl">🎓</div>
          </div>
          <div className="absolute top-1/3 right-1/3 animate-float-slow opacity-20" style={{ animationDelay: '1s' }}>
            <div className="text-3xl">🌍</div>
          </div>
          <div className="absolute bottom-1/3 left-1/3 animate-float-slow opacity-20" style={{ animationDelay: '2s' }}>
            <div className="text-3xl">📚</div>
          </div>
          <div className="absolute bottom-1/4 right-1/4 animate-float-slow opacity-20" style={{ animationDelay: '3s' }}>
            <div className="text-3xl">🏆</div>
          </div>
          
          {/* Additional Floating Icons */}
          <div className="absolute top-1/2 left-1/6 animate-float opacity-15" style={{ animationDelay: '0.5s' }}>
            <FaRocket className="h-5 w-5 text-blue-400" />
          </div>
          <div className="absolute top-1/6 right-1/6 animate-float opacity-15" style={{ animationDelay: '1.5s' }}>
            <FaShieldAlt className="h-5 w-5 text-purple-400" />
          </div>
          <div className="absolute bottom-1/6 left-1/2 animate-float opacity-15" style={{ animationDelay: '2.5s' }}>
            <FaBookOpen className="h-5 w-5 text-pink-400" />
          </div>
          <div className="absolute bottom-1/2 right-1/2 animate-float opacity-15" style={{ animationDelay: '3.5s' }}>
            <FaStar className="h-5 w-5 text-indigo-400" />
          </div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-6">
          <EduexpertFadeInUp delay={0.2} duration={1.0}>
            <div className="text-center mb-20">
              <EduexpertTextReveal delay={0.4} duration={0.8}>
                <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
              <span className="shiny-text">Trusted by Students</span>{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Worldwide
              </span>
            </h2>
              </EduexpertTextReveal>
              <EduexpertTextReveal delay={0.6} duration={0.8}>
                <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
                  Join thousands of successful students who achieved their study abroad dreams with our expert guidance
                </p>
              </EduexpertTextReveal>
          </div>
          </EduexpertFadeInUp>
          
          <EduexpertStaggered delay={0.1} className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <EduexpertBounceIn key={stat.label} delay={0.8 + index * 0.2} duration={0.6}>
                <EduexpertCard className="group relative text-center p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg cursor-pointer h-[200px] flex flex-col justify-center stats-card">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Animated background particles */}
                  <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    <div className="absolute top-2 left-2 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-0 group-hover:opacity-100" style={{ animationDelay: '0s' }}></div>
                    <div className="absolute top-4 right-3 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-0 group-hover:opacity-100" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute bottom-3 left-4 w-1 h-1 bg-pink-400 rounded-full animate-ping opacity-0 group-hover:opacity-100" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute bottom-2 right-2 w-1 h-1 bg-cyan-400 rounded-full animate-ping opacity-0 group-hover:opacity-100" style={{ animationDelay: '1.5s' }}></div>
                    </div>
                  
                  <div className="relative z-10">
                    <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent sm:text-6xl group-hover:scale-110 transition-transform duration-300 group-hover:animate-pulse">
                      {stat.number}
                    </div>
                    <div className="mt-4 text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {stat.label}
                    </div>
                    <div className="mt-2 text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                      {stat.description}
                  </div>
                  </div>
                  
                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                  
                  {/* Hover effect indicator */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:animate-bounce">
                    <FaArrowRight className="h-3 w-3 text-white m-auto mt-1.5" />
                  </div>
                </EduexpertCard>
              </EduexpertBounceIn>
            ))}
          </EduexpertStaggered>
        </div>
      </section>

      {/* Professional Section Separator */}
      <div className="relative py-12 bg-gradient-to-r from-slate-50 to-gray-50">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center space-x-8">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <FaGraduationCap className="h-6 w-6 text-blue-600 animate-bounce" />
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* SERVICES SECTION */}
      <section className="py-16 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-200/30 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pink-200/30 via-transparent to-transparent" />
        
        <FloatingElements variant="services" intensity="high" />
        
        <div className="relative mx-auto max-w-7xl px-6">
          <EduexpertFadeInUp delay={0.2} duration={1.0}>
            <div className="text-center mb-20">
              <EduexpertTextReveal delay={0.4} duration={0.8}>
                <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
                  <span className="shiny-text">Our</span>{' '}
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Services
              </span>
            </h2>
              </EduexpertTextReveal>
              <EduexpertTextReveal delay={0.6} duration={0.8}>
                <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
                  Comprehensive support for your study abroad journey with personalized guidance every step of the way
                </p>
              </EduexpertTextReveal>
          </div>
          </EduexpertFadeInUp>
          
          <EduexpertStaggered delay={0.1} className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <EduexpertScaleIn key={service.title} delay={0.8 + index * 0.2} duration={0.6}>
                <EduexpertCard className="group h-[400px] border-0 shadow-xl bg-white/80 backdrop-blur-sm cursor-pointer service-card relative">
                  <BorderBeam 
                    size={200} 
                    duration={15} 
                    borderWidth={2}
                    colorFrom="#8B5CF6" 
                    colorTo="#EC4899"
                    delay={index * 2}
                  />
                  <CardContent className="p-8 text-center relative overflow-hidden">
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Floating particles on hover */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-float" style={{ animationDelay: '0s' }}></div>
                      <div className="absolute top-6 right-6 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 animate-float" style={{ animationDelay: '0.5s' }}></div>
                      <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 animate-float" style={{ animationDelay: '1s' }}></div>
                      <div className="absolute bottom-4 right-4 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 animate-float" style={{ animationDelay: '1.5s' }}></div>
            </div>
            
                    <div className="relative z-10">
                      <EduexpertIcon className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 group-hover:rotate-12 transition-transform duration-500 shadow-lg relative">
                        <service.icon className="h-10 w-10 text-white group-hover:scale-110 transition-transform duration-300" />
                        
                        {/* Icon glow effect */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-500"></div>
                      </EduexpertIcon>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                        {service.title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                        {service.description}
                      </p>
                      
                      {/* Hover effect indicator */}
                      <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                        <div className="inline-flex items-center gap-2 text-purple-600 font-semibold">
                          <span>Learn More</span>
                          <FaArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
                    </div>
                    
                    {/* Animated border */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                    
                    {/* Corner decorations */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </CardContent>
                </EduexpertCard>
              </EduexpertScaleIn>
            ))}
          </EduexpertStaggered>
        </div>
      </section>

      {/* Professional Section Separator - Diamond Pattern */}
      <div className="relative py-12 bg-gradient-to-r from-gray-50 to-slate-50">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center space-x-6">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-500 rotate-45 animate-pulse"></div>
              <FaGlobeAmericas className="h-5 w-5 text-emerald-600 animate-bounce" />
              <div className="w-2 h-2 bg-teal-500 rotate-45 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-teal-500 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* DESTINATIONS CAROUSEL - Enhanced 3D Card Style */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden relative">
        {/* Enhanced geometric background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-200/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-indigo-200/20 via-transparent to-transparent" />
        
        {/* Animated geometric shapes with enhanced effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full animate-float-slow"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full animate-float-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-32 left-40 w-28 h-28 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full animate-float-slow" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 right-20 w-36 h-36 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full animate-float-slow" style={{ animationDelay: '3s' }}></div>
          
          {/* Enhanced floating destination tags with 3D effect */}
          <div className="absolute top-16 left-16 animate-float-slow opacity-30">
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200/30 shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-300">
              <span className="text-sm font-semibold text-blue-700">🇬🇧 UK</span>
            </div>
          </div>
          <div className="absolute top-24 right-20 animate-float-slow opacity-30" style={{ animationDelay: '1s' }}>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-200/30 shadow-lg transform -rotate-12 hover:rotate-0 transition-transform duration-300">
              <span className="text-sm font-semibold text-emerald-700">🇨🇳 China</span>
            </div>
          </div>
          <div className="absolute bottom-24 left-20 animate-float-slow opacity-30" style={{ animationDelay: '2s' }}>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200/30 shadow-lg transform rotate-6 hover:rotate-0 transition-transform duration-300">
              <span className="text-sm font-semibold text-purple-700">🇰🇷 Korea</span>
            </div>
          </div>
          <div className="absolute bottom-16 right-16 animate-float-slow opacity-30" style={{ animationDelay: '3s' }}>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-200/30 shadow-lg transform -rotate-6 hover:rotate-0 transition-transform duration-300">
              <span className="text-sm font-semibold text-cyan-700">🇪🇺 Europe</span>
            </div>
          </div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-6">
          <FadeIn delay={200} duration={1000}>
            <div className="text-center mb-20">
              <SlideIn direction="up" delay={400} duration={800}>
                <h2 className="text-5xl font-bold text-gray-900 sm:text-6xl lg:text-7xl">
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Study
                  </span>
                  {' '}
                  <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                    Destinations
                  </span>
                </h2>
              </SlideIn>
              <SlideIn direction="up" delay={600} duration={800}>
                <p className="mt-8 text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  Discover world-class universities across the globe. From historic institutions to cutting-edge research centers, 
                  find your perfect academic home in these top study destinations.
                </p>
              </SlideIn>
            </div>
          </FadeIn>

          {/* Destinations Carousel */}
          <div className="relative z-10">
            <SlideIn direction="up" delay={800} duration={1000}>
              <div className="overflow-hidden rounded-3xl">
                <div 
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${currentDestinationIndex * 100}%)` }}
                >
                  {destinations.map((destination, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-4">
                      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
                        {/* Layout: Details Left, Globe Right */}
                        <div className="flex flex-col lg:flex-row min-h-[500px]">
                          
                          {/* Left Side - Country Details */}
                          <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center relative">
                            {/* Country Header with Flag */}
                            <div className="mb-6">
                              <div className="flex items-center gap-3 mb-3">
                                <span className="text-4xl">{destination.flag}</span>
                                <h3 className="text-3xl md:text-4xl font-bold text-white">
                                  {destination.name}
                                </h3>
                              </div>
                            </div>
                            
                            {/* Description */}
                            <p className="text-lg text-white/90 mb-8 leading-relaxed">
                              {destination.description}
                            </p>
                            
                            {/* Stats Cards */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                                <div className="text-3xl font-bold text-white mb-1">{destination.universities}</div>
                                <div className="text-sm font-semibold text-white/80 uppercase tracking-wide">Universities</div>
                                <div className="absolute top-2 right-2 text-lg">{destination.flag}</div>
                              </div>
                              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                                <div className="text-3xl font-bold text-white mb-1">{destination.programs}</div>
                                <div className="text-sm font-semibold text-white/80 uppercase tracking-wide">Programs</div>
                                <div className="absolute top-2 right-2 text-lg">{destination.flag}</div>
                              </div>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                              <button 
                                onClick={() => {
                                  const countrySlug = destination.name.toLowerCase().replace(/\s+/g, '-');
                                  window.location.href = `/destinations/${countrySlug}`;
                                }}
                                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 border border-white/30 flex items-center justify-center gap-2"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Explore {destination.name}
                              </button>
                              
                              <button 
                                onClick={() => {
                                  window.location.href = `/universities?country=${encodeURIComponent(destination.name)}`;
                                }}
                                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 border border-white/30 flex items-center justify-center gap-2"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                </svg>
                                Universities
                              </button>
                            </div>
                          </div>
                          
                          
                          {/* Right Side - Animated Globe */}
                          <div className="lg:w-2/5 p-8 lg:p-12 flex items-center justify-center relative">
                            {/* Canvas-based Animated Globe */}
                            <Earth />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SlideIn>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrentDestinationIndex((prev) => {
                  const newIndex = (prev - 1 + destinations.length) % destinations.length;
                  return newIndex;
                });
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-50 text-gray-800 p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 z-30 cursor-pointer"
              aria-label="Previous destination"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrentDestinationIndex((prev) => {
                  const newIndex = (prev + 1) % destinations.length;
                  return newIndex;
                });
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-50 text-gray-800 p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 z-30 cursor-pointer"
              aria-label="Next destination"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-3 relative z-20">
              {destinations.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentDestinationIndex(index);
                  }}
                  className={`w-4 h-4 rounded-full transition-all duration-300 cursor-pointer ${
                    index === currentDestinationIndex 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-125 shadow-lg' 
                      : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                  }`}
                  aria-label={`Go to destination ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS CAROUSEL */}
      <section className="py-16 bg-gradient-to-br from-emerald-100 via-teal-100 to-orange-100 relative overflow-hidden">
        {/* Student Success Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 animate-float-slow opacity-25">
            <span className="text-sm font-bold text-amber-600/50 rotate-12">Success Stories</span>
          </div>
          <div className="absolute top-32 right-24 animate-float-slow opacity-25" style={{ animationDelay: '1s' }}>
            <span className="text-sm font-bold text-orange-600/50 -rotate-12">Happy Students</span>
          </div>
          <div className="absolute bottom-32 left-24 animate-float-slow opacity-25" style={{ animationDelay: '2s' }}>
            <span className="text-sm font-bold text-yellow-600/50 rotate-6">Testimonials</span>
          </div>
          <div className="absolute bottom-20 right-20 animate-float-slow opacity-25" style={{ animationDelay: '3s' }}>
            <span className="text-sm font-bold text-amber-600/50 -rotate-6">Reviews</span>
          </div>
          
          {/* Floating success icons */}
          <div className="absolute top-1/4 left-12 animate-float-slow opacity-20">
            <div className="text-2xl">⭐</div>
          </div>
          <div className="absolute top-1/3 right-12 animate-float-slow opacity-20" style={{ animationDelay: '1s' }}>
            <div className="text-2xl">🎉</div>
          </div>
          <div className="absolute bottom-1/3 left-16 animate-float-slow opacity-20" style={{ animationDelay: '2s' }}>
            <div className="text-2xl">💯</div>
          </div>
          <div className="absolute bottom-1/4 right-16 animate-float-slow opacity-20" style={{ animationDelay: '3s' }}>
            <div className="text-2xl">🏆</div>
          </div>
        </div>
        
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <FadeIn delay={200}>
          <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                <span className="shiny-text">Student Success Stories</span>
            </h2>
              <p className="mt-4 text-lg text-gray-600">
                Hear from students who achieved their study abroad dreams
            </p>
          </div>
          </FadeIn>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              {storiesLoading ? (
                <div className="flex items-center justify-center h-[400px]">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading success stories...</p>
                  </div>
                </div>
              ) : (
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentTestimonialIndex * 100}%)` }}
                >
                  {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <Card className="mx-4 border-0 shadow-xl bg-white/90 backdrop-blur-sm h-[400px] card-hover-effect testimonial-card relative">
                      <BorderBeam 
                        size={180} 
                        duration={16} 
                        borderWidth={2}
                        colorFrom="#F97316" 
                        colorTo="#EF4444"
                        delay={index * 2}
                      />
                      <CardContent className="p-8 text-center">
                        {/* Student Avatar */}
                        <div className="relative mb-6 group">
                          <div className="mx-auto w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <img
                              src={testimonial.image} 
                              alt={testimonial.name} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center group-hover:animate-bounce">
                              <FaCheckCircle className="h-4 w-4 text-white" />
                            </div>
                          </div>
                          {/* Avatar glow effect */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300"></div>
                        </div>

                        <FaQuoteLeft className="mx-auto mb-4 h-6 w-6 text-blue-600" />
                        <p className="text-lg text-gray-700 mb-6 italic leading-relaxed">
                          "{testimonial.text}"
                        </p>
                        
                        <div className="flex justify-center mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <FaStar key={i} className="h-5 w-5 text-yellow-400" />
                            ))}
                          </div>

                        <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                        <div className="text-sm text-blue-600 font-medium">{testimonial.country}</div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
                </div>
              )}
            </div>

            {/* Navigation */}
            <button
              onClick={() => setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-gray-600 p-3 rounded-full hover:bg-white/30 transition-colors"
            >
              <FaChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-gray-600 p-3 rounded-full hover:bg-white/30 transition-colors"
            >
              <FaChevronRight className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonialIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonialIndex ? 'bg-orange-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SCHOLARSHIPS & TRUST SECTION */}
      <section className="py-16 bg-gradient-to-br from-orange-100 via-amber-100 to-emerald-100 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-200/30 via-transparent to-transparent" />
        
        <FloatingElements variant="scholarship" intensity="high" />
        
        <div className="relative mx-auto max-w-7xl px-6">
          <FadeIn delay={200} duration={1000}>
            <div className="text-center mb-20">
              <SlideIn direction="up" delay={400} duration={800}>
                <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
                  <span className="shiny-text">Scholarships &</span>{' '}
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Trust
              </span>
            </h2>
              </SlideIn>
              <SlideIn direction="up" delay={600} duration={800}>
                <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
                  We believe in making quality education accessible through transparent processes, 
                  trusted partnerships, and comprehensive scholarship opportunities.
                </p>
              </SlideIn>
          </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <SlideIn delay={800} duration={600}>
              <div className="group p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-xl h-[400px] flex flex-col card-hover-effect scholarship-card relative">
                <BorderBeam 
                  size={200} 
                  duration={18} 
                  borderWidth={2}
                  colorFrom="#10B981" 
                  colorTo="#14B8A6"
                  delay={0}
                />
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:rotate-12 transition-transform duration-300">
                    <FaAward className="h-8 w-8 text-white" />
                </div>
                  <h3 className="text-2xl font-bold text-gray-900">Scholarship Programs</h3>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Access to exclusive scholarship opportunities worth up to $50,000 annually. 
                  We partner with universities to provide merit-based and need-based financial aid.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="h-5 w-5 text-emerald-500" />
                    <span className="text-sm text-gray-600">Merit-based scholarships</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="h-5 w-5 text-emerald-500" />
                    <span className="text-sm text-gray-600">Need-based financial aid</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="h-5 w-5 text-emerald-500" />
                    <span className="text-sm text-gray-600">University partnership programs</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="h-5 w-5 text-emerald-500" />
                    <span className="text-sm text-gray-600">Application assistance included</span>
                </div>
              </div>
            </div>
            </SlideIn>
            
            <SlideIn delay={1000} duration={600}>
              <div className="group p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-xl h-[400px] flex flex-col card-hover-effect scholarship-card relative">
                <BorderBeam 
                  size={200} 
                  duration={20} 
                  borderWidth={2}
                  colorFrom="#3B82F6" 
                  colorTo="#6366F1"
                  delay={3}
                />
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:rotate-12 transition-transform duration-300">
                    <FaShieldAlt className="h-8 w-8 text-white" />
                </div>
                  <h3 className="text-2xl font-bold text-gray-900">100% Transparency</h3>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Complete transparency in all our processes. No hidden fees, no surprise costs. 
                  You'll know exactly what you're paying for from day one.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="h-5 w-5 text-blue-500" />
                    <span className="text-sm text-gray-600">No hidden fees or charges</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="h-5 w-5 text-blue-500" />
                    <span className="text-sm text-gray-600">Clear fee structure</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="h-5 w-5 text-blue-500" />
                    <span className="text-sm text-gray-600">Regular progress updates</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="h-5 w-5 text-blue-500" />
                    <span className="text-sm text-gray-600">Open communication policy</span>
                </div>
              </div>
            </div>
            </SlideIn>
            
            <SlideIn delay={1200} duration={600}>
              <div className="group p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-xl h-[400px] flex flex-col card-hover-effect scholarship-card relative">
                <BorderBeam 
                  size={200} 
                  duration={22} 
                  borderWidth={2}
                  colorFrom="#8B5CF6" 
                  colorTo="#EC4899"
                  delay={6}
                />
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 group-hover:rotate-12 transition-transform duration-300">
                    <FaUsers className="h-8 w-8 text-white" />
                </div>
                  <h3 className="text-2xl font-bold text-gray-900">Trusted by 10K+ Students</h3>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Join thousands of successful students who have achieved their study abroad dreams 
                  with our trusted guidance and support.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="h-5 w-5 text-purple-500" />
                    <span className="text-sm text-gray-600">95% visa success rate</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="h-5 w-5 text-purple-500" />
                    <span className="text-sm text-gray-600">24/7 student support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="h-5 w-5 text-purple-500" />
                    <span className="text-sm text-gray-600">Verified testimonials</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="h-5 w-5 text-purple-500" />
                    <span className="text-sm text-gray-600">Accredited partnerships</span>
                </div>
              </div>
            </div>
            </SlideIn>
          </div>

          <div className="mt-16 text-center">
            <SlideIn delay={1400} duration={600}>
              <div className="inline-flex flex-col items-center space-y-6">
                <div className="flex items-center space-x-8 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaAward className="h-5 w-5 text-emerald-500" />
                    <span className="font-semibold">$2M+ in Scholarships Awarded</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaShieldAlt className="h-5 w-5 text-blue-500" />
                    <span className="font-semibold">100% Transparent Process</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUsers className="h-5 w-5 text-purple-500" />
                    <span className="font-semibold">10K+ Successful Students</span>
                  </div>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
        
        {/* Separate Scholarship button container outside the complex structure */}
        <div className="relative z-50 flex justify-center items-center py-10">
          <button
            type="button"
            onClick={() => openCTA('Scholarship Section Apply for Scholarship')}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-110"
            style={{ zIndex: 9999 }}
          >
            <span className="flex items-center gap-2">
              <FaAward className="h-5 w-5" />
              Apply for Scholarships
              <FaArrowRight className="h-4 w-4" />
            </span>
          </button>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 bg-gradient-to-br from-emerald-100 via-teal-100 to-violet-100 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-200/20 via-transparent to-transparent" />
        
        <FloatingElements variant="faq" intensity="high" />
        
        <div className="relative mx-auto max-w-4xl px-6">
          <FadeIn delay={200} duration={1000}>
            <div className="text-center mb-20">
              <SlideIn direction="up" delay={400} duration={800}>
                <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
                  <span className="shiny-text">Frequently Asked</span>{' '}
                  <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                    Questions
              </span>
            </h2>
              </SlideIn>
              <SlideIn direction="up" delay={600} duration={800}>
                <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
                  Get answers to common questions about studying abroad and our services
                </p>
              </SlideIn>
            </div>
          </FadeIn>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-20 bg-gradient-to-br from-violet-200 via-indigo-300 to-slate-800 relative overflow-hidden">
        {/* Floating CTA Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 animate-float-slow opacity-20">
            <span className="text-sm font-bold text-white/50 rotate-12">Apply Now</span>
          </div>
          <div className="absolute top-32 right-32 animate-float-slow opacity-20" style={{ animationDelay: '1s' }}>
            <span className="text-sm font-bold text-white/50 -rotate-12">Get Started</span>
          </div>
          <div className="absolute bottom-20 left-32 animate-float-slow opacity-20" style={{ animationDelay: '2s' }}>
            <span className="text-sm font-bold text-white/50 rotate-6">Study Abroad</span>
          </div>
          <div className="absolute bottom-32 right-20 animate-float-slow opacity-20" style={{ animationDelay: '3s' }}>
            <span className="text-sm font-bold text-white/50 -rotate-6">Success</span>
          </div>
          
          {/* Floating CTA Icons */}
          <div className="absolute top-16 right-16 animate-float opacity-15">
            <FaRocket className="h-6 w-6 text-white/40" />
          </div>
          <div className="absolute top-40 left-40 animate-float opacity-15" style={{ animationDelay: '0.5s' }}>
            <FaGraduationCap className="h-6 w-6 text-white/40" />
          </div>
          <div className="absolute bottom-16 left-16 animate-float opacity-15" style={{ animationDelay: '1.5s' }}>
            <FaAward className="h-6 w-6 text-white/40" />
          </div>
          <div className="absolute bottom-40 right-40 animate-float opacity-15" style={{ animationDelay: '2.5s' }}>
            <FaStar className="h-6 w-6 text-white/40" />
          </div>
        </div>
        
        <div className="mx-auto max-w-4xl px-6 text-center relative z-10">
          <FadeIn delay={200}>
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">
              <span className="shiny-text">Ready to Start Your Study Abroad Journey?</span>
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Get personalized guidance and make your international education dreams a reality
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                onClick={() => openCTA('Final CTA Section Apply Now')}
                className="shiny-button text-white font-bold px-12 py-6 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-blue-500/50 hover:rotate-2 transform-gpu text-lg"
              >
                <span className="flex items-center gap-3">
                  <FaRocket className="h-5 w-5 animate-bounce" />
                  Apply Now
                  <FaArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                </span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="pulse-button border-2 border-white/50 text-white bg-white/20 backdrop-blur-sm font-bold px-12 py-6 rounded-full transition-all duration-300 hover:bg-white hover:text-purple-600 hover:border-white hover:scale-110 hover:rotate-2 transform-gpu text-lg"
              >
                <Link href="/contact" onClick={() => trackLead('Final CTA - Contact Us')}>
                <span className="flex items-center gap-2">
                    <FaPhone className="h-4 w-4" />
                  Contact Us
                </span>
              </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>


    </div>
  );
}