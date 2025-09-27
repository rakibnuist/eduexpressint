'use client';

import React from 'react';
import { 
  FaGraduationCap, 
  FaGlobeAmericas, 
  FaAward, 
  FaUsers, 
  FaShieldAlt, 
  FaStar, 
  FaRocket, 
  FaBookOpen, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaHeart,
  FaLightbulb,
  FaTrophy,
  FaHandshake,
  FaCheckCircle,
  FaArrowUp,
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight
} from 'react-icons/fa';

interface FloatingElement {
  type: 'particle' | 'text' | 'emoji' | 'icon';
  content?: string;
  icon?: React.ComponentType<any>;
  position: { left: number; top: number };
  delay: number;
  duration: number;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  rotation?: number;
  opacity?: number;
}

interface FloatingElementsProps {
  variant?: 'services' | 'scholarship' | 'faq' | 'hero' | 'about' | 'contact' | 'universities' | 'destinations' | 'cta' | 'general';
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

const FloatingElements: React.FC<FloatingElementsProps> = ({ 
  variant = 'services', 
  intensity = 'medium',
  className = ''
}) => {
  // Define element configurations for different variants
  const getElementsConfig = (): FloatingElement[] => {
    const baseElements: FloatingElement[] = [];
    
    // Common particles for all variants
    const particleCount = intensity === 'low' ? 8 : intensity === 'medium' ? 15 : 25;
    
    // Use fixed positions to avoid hydration mismatch
    // These are pre-calculated positions that will be consistent between server and client
    const fixedPositions = [
      { left: 12.5, top: 15.2 }, { left: 25.8, top: 8.7 }, { left: 45.3, top: 22.1 },
      { left: 67.9, top: 18.4 }, { left: 82.1, top: 35.6 }, { left: 15.7, top: 45.2 },
      { left: 38.4, top: 52.8 }, { left: 58.9, top: 48.3 }, { left: 75.2, top: 62.7 },
      { left: 22.6, top: 68.9 }, { left: 41.8, top: 75.4 }, { left: 63.5, top: 82.1 },
      { left: 85.3, top: 78.6 }, { left: 8.9, top: 25.7 }, { left: 52.1, top: 12.3 },
      { left: 71.4, top: 28.9 }, { left: 33.7, top: 38.5 }, { left: 56.2, top: 65.8 },
      { left: 78.6, top: 45.2 }, { left: 19.3, top: 58.7 }, { left: 47.8, top: 88.2 },
      { left: 69.1, top: 15.6 }, { left: 35.4, top: 72.3 }, { left: 61.7, top: 35.9 },
      { left: 84.2, top: 68.4 }
    ];
    
    // Generate particles with fixed positions to avoid hydration mismatch
    for (let i = 0; i < particleCount; i++) {
      const position = fixedPositions[i % fixedPositions.length];
      baseElements.push({
        type: 'particle',
        position,
        delay: (i * 0.3) % 5, // Fixed delays based on index
        duration: 3 + (i * 0.2) % 3, // Fixed durations based on index
        size: 'sm',
        opacity: 0.3 + (i * 0.05) % 0.2 // Fixed opacity based on index
      });
    }

    // Variant-specific elements
    switch (variant) {
      case 'services':
        return [
          ...baseElements,
          {
            type: 'text',
            content: 'University Selection',
            position: { left: 10, top: 15 },
            delay: 0,
            duration: 4,
            size: 'sm',
            color: 'text-purple-600/50',
            rotation: 12,
            opacity: 0.8
          },
          {
            type: 'text',
            content: 'Visa Support',
            position: { left: 85, top: 20 },
            delay: 1,
            duration: 4,
            size: 'sm',
            color: 'text-pink-600/50',
            rotation: -12,
            opacity: 0.8
          },
          {
            type: 'text',
            content: 'Application Help',
            position: { left: 15, top: 80 },
            delay: 2,
            duration: 4,
            size: 'sm',
            color: 'text-blue-600/50',
            rotation: 6,
            opacity: 0.8
          },
          {
            type: 'text',
            content: 'Career Guidance',
            position: { left: 80, top: 85 },
            delay: 3,
            duration: 4,
            size: 'sm',
            color: 'text-indigo-600/50',
            rotation: -6,
            opacity: 0.8
          },
          {
            type: 'icon',
            icon: FaGraduationCap,
            position: { left: 85, top: 15 },
            delay: 0.5,
            duration: 4,
            size: 'md',
            color: 'text-purple-400',
            opacity: 0.6
          },
          {
            type: 'icon',
            icon: FaGlobeAmericas,
            position: { left: 10, top: 30 },
            delay: 1.5,
            duration: 4,
            size: 'md',
            color: 'text-pink-400',
            opacity: 0.6
          },
          {
            type: 'icon',
            icon: FaAward,
            position: { left: 15, top: 80 },
            delay: 2.5,
            duration: 4,
            size: 'md',
            color: 'text-blue-400',
            opacity: 0.6
          },
          {
            type: 'icon',
            icon: FaUsers,
            position: { left: 80, top: 85 },
            delay: 3.5,
            duration: 4,
            size: 'md',
            color: 'text-indigo-400',
            opacity: 0.6
          },
          {
            type: 'emoji',
            content: '🎓',
            position: { left: 25, top: 10 },
            delay: 0.8,
            duration: 5,
            size: 'lg',
            opacity: 0.7
          },
          {
            type: 'emoji',
            content: '🌍',
            position: { left: 70, top: 40 },
            delay: 2.2,
            duration: 5,
            size: 'lg',
            opacity: 0.7
          },
          {
            type: 'emoji',
            content: '🏆',
            position: { left: 90, top: 60 },
            delay: 3.8,
            duration: 5,
            size: 'lg',
            opacity: 0.7
          }
        ];

      case 'scholarship':
        return [
          ...baseElements,
          {
            type: 'text',
            content: 'Scholarships',
            position: { left: 12, top: 18 },
            delay: 0,
            duration: 4,
            size: 'sm',
            color: 'text-orange-600/50',
            rotation: 12,
            opacity: 0.8
          },
          {
            type: 'text',
            content: 'Transparency',
            position: { left: 82, top: 22 },
            delay: 1,
            duration: 4,
            size: 'sm',
            color: 'text-amber-600/50',
            rotation: -12,
            opacity: 0.8
          },
          {
            type: 'text',
            content: 'Trust',
            position: { left: 18, top: 78 },
            delay: 2,
            duration: 4,
            size: 'sm',
            color: 'text-emerald-600/50',
            rotation: 6,
            opacity: 0.8
          },
          {
            type: 'text',
            content: 'Success',
            position: { left: 78, top: 82 },
            delay: 3,
            duration: 4,
            size: 'sm',
            color: 'text-teal-600/50',
            rotation: -6,
            opacity: 0.8
          },
          {
            type: 'icon',
            icon: FaAward,
            position: { left: 85, top: 15 },
            delay: 0.5,
            duration: 4,
            size: 'md',
            color: 'text-orange-400',
            opacity: 0.6
          },
          {
            type: 'icon',
            icon: FaShieldAlt,
            position: { left: 10, top: 30 },
            delay: 1.5,
            duration: 4,
            size: 'md',
            color: 'text-amber-400',
            opacity: 0.6
          },
          {
            type: 'icon',
            icon: FaUsers,
            position: { left: 15, top: 80 },
            delay: 2.5,
            duration: 4,
            size: 'md',
            color: 'text-emerald-400',
            opacity: 0.6
          },
          {
            type: 'icon',
            icon: FaStar,
            position: { left: 80, top: 85 },
            delay: 3.5,
            duration: 4,
            size: 'md',
            color: 'text-teal-400',
            opacity: 0.6
          },
          {
            type: 'emoji',
            content: '💰',
            position: { left: 25, top: 10 },
            delay: 0.8,
            duration: 5,
            size: 'lg',
            opacity: 0.7
          },
          {
            type: 'emoji',
            content: '🎯',
            position: { left: 70, top: 40 },
            delay: 2.2,
            duration: 5,
            size: 'lg',
            opacity: 0.7
          },
          {
            type: 'emoji',
            content: '✨',
            position: { left: 90, top: 60 },
            delay: 3.8,
            duration: 5,
            size: 'lg',
            opacity: 0.7
          }
        ];

      case 'faq':
        return [
          ...baseElements,
          {
            type: 'text',
            content: 'Questions',
            position: { left: 8, top: 12 },
            delay: 0,
            duration: 4,
            size: 'sm',
            color: 'text-violet-600/50',
            rotation: 12,
            opacity: 0.8
          },
          {
            type: 'text',
            content: 'Answers',
            position: { left: 88, top: 16 },
            delay: 1,
            duration: 4,
            size: 'sm',
            color: 'text-indigo-600/50',
            rotation: -12,
            opacity: 0.8
          },
          {
            type: 'text',
            content: 'Help',
            position: { left: 14, top: 84 },
            delay: 2,
            duration: 4,
            size: 'sm',
            color: 'text-blue-600/50',
            rotation: 6,
            opacity: 0.8
          },
          {
            type: 'text',
            content: 'Support',
            position: { left: 84, top: 88 },
            delay: 3,
            duration: 4,
            size: 'sm',
            color: 'text-violet-600/50',
            rotation: -6,
            opacity: 0.8
          },
          {
            type: 'icon',
            icon: FaBookOpen,
            position: { left: 85, top: 15 },
            delay: 0.5,
            duration: 4,
            size: 'md',
            color: 'text-violet-400',
            opacity: 0.6
          },
          {
            type: 'icon',
            icon: FaShieldAlt,
            position: { left: 10, top: 30 },
            delay: 1.5,
            duration: 4,
            size: 'md',
            color: 'text-indigo-400',
            opacity: 0.6
          },
          {
            type: 'icon',
            icon: FaUsers,
            position: { left: 15, top: 80 },
            delay: 2.5,
            duration: 4,
            size: 'md',
            color: 'text-blue-400',
            opacity: 0.6
          },
          {
            type: 'icon',
            icon: FaStar,
            position: { left: 80, top: 85 },
            delay: 3.5,
            duration: 4,
            size: 'md',
            color: 'text-violet-400',
            opacity: 0.6
          },
          {
            type: 'emoji',
            content: '❓',
            position: { left: 25, top: 10 },
            delay: 0.8,
            duration: 5,
            size: 'lg',
            opacity: 0.7
          },
          {
            type: 'emoji',
            content: '💡',
            position: { left: 70, top: 40 },
            delay: 2.2,
            duration: 5,
            size: 'lg',
            opacity: 0.7
          },
          {
            type: 'emoji',
            content: '🤝',
            position: { left: 90, top: 60 },
            delay: 3.8,
            duration: 5,
            size: 'lg',
            opacity: 0.7
          }
        ];

      case 'hero':
        return [
          ...baseElements,
          {
            type: 'text',
            content: 'Study Abroad',
            position: { left: 5, top: 10 },
            delay: 0,
            duration: 4,
            size: 'sm',
            color: 'text-white/30',
            rotation: 12,
            opacity: 0.6
          },
          {
            type: 'text',
            content: 'Global Education',
            position: { left: 90, top: 15 },
            delay: 1,
            duration: 4,
            size: 'sm',
            color: 'text-white/30',
            rotation: -12,
            opacity: 0.6
          },
          {
            type: 'text',
            content: 'Scholarships',
            position: { left: 10, top: 85 },
            delay: 2,
            duration: 4,
            size: 'sm',
            color: 'text-white/30',
            rotation: 6,
            opacity: 0.6
          },
          {
            type: 'text',
            content: 'Visa Support',
            position: { left: 85, top: 90 },
            delay: 3,
            duration: 4,
            size: 'sm',
            color: 'text-white/30',
            rotation: -6,
            opacity: 0.6
          },
          {
            type: 'emoji',
            content: '🎓',
            position: { left: 25, top: 10 },
            delay: 0.8,
            duration: 5,
            size: 'lg',
            opacity: 0.5
          },
          {
            type: 'emoji',
            content: '🌍',
            position: { left: 70, top: 40 },
            delay: 2.2,
            duration: 5,
            size: 'lg',
            opacity: 0.5
          },
          {
            type: 'emoji',
            content: '🚀',
            position: { left: 90, top: 60 },
            delay: 3.8,
            duration: 5,
            size: 'lg',
            opacity: 0.5
          },
          {
            type: 'emoji',
            content: '⭐',
            position: { left: 10, top: 50 },
            delay: 1.5,
            duration: 5,
            size: 'lg',
            opacity: 0.5
          }
        ];

      case 'about':
        return [
          ...baseElements,
          {
            type: 'text',
            content: 'About Us',
            position: { left: 15, top: 20 },
            delay: 0,
            duration: 4,
            size: 'sm',
            color: 'text-green-600/50',
            rotation: 12,
            opacity: 0.8
          },
          {
            type: 'text',
            content: 'Our Story',
            position: { left: 80, top: 25 },
            delay: 1,
            duration: 4,
            size: 'sm',
            color: 'text-blue-600/50',
            rotation: -12,
            opacity: 0.8
          },
          {
            type: 'emoji',
            content: '🏢',
            position: { left: 25, top: 10 },
            delay: 0.8,
            duration: 5,
            size: 'lg',
            opacity: 0.7
          },
          {
            type: 'emoji',
            content: '👥',
            position: { left: 70, top: 40 },
            delay: 2.2,
            duration: 5,
            size: 'lg',
            opacity: 0.7
          },
          {
            type: 'emoji',
            content: '💼',
            position: { left: 90, top: 60 },
            delay: 3.8,
            duration: 5,
            size: 'lg',
            opacity: 0.7
          }
        ];

      case 'contact':
        return [
          ...baseElements,
          {
            type: 'text',
            content: 'Contact Us',
            position: { left: 15, top: 20 },
            delay: 0,
            duration: 4,
            size: 'sm',
            color: 'text-purple-600/50',
            rotation: 12,
            opacity: 0.8
          },
          {
            type: 'text',
            content: 'Get in Touch',
            position: { left: 80, top: 25 },
            delay: 1,
            duration: 4,
            size: 'sm',
            color: 'text-pink-600/50',
            rotation: -12,
            opacity: 0.8
          },
          {
            type: 'emoji',
            content: '📞',
            position: { left: 25, top: 10 },
            delay: 0.8,
            duration: 5,
            size: 'lg',
            opacity: 0.7
          },
          {
            type: 'emoji',
            content: '📧',
            position: { left: 70, top: 40 },
            delay: 2.2,
            duration: 5,
            size: 'lg',
            opacity: 0.7
          },
          {
            type: 'emoji',
            content: '📍',
            position: { left: 90, top: 60 },
            delay: 3.8,
            duration: 5,
            size: 'lg',
            opacity: 0.7
          }
        ];

      case 'cta':
        return [
          ...baseElements.slice(0, 10), // Fewer particles for CTA
          {
            type: 'emoji',
            content: '🎯',
            position: { left: 20, top: 15 },
            delay: 0.5,
            duration: 4,
            size: 'lg',
            opacity: 0.6
          },
          {
            type: 'emoji',
            content: '💫',
            position: { left: 80, top: 25 },
            delay: 1.5,
            duration: 4,
            size: 'lg',
            opacity: 0.6
          },
          {
            type: 'emoji',
            content: '✨',
            position: { left: 15, top: 70 },
            delay: 2.5,
            duration: 4,
            size: 'lg',
            opacity: 0.6
          },
          {
            type: 'emoji',
            content: '🌟',
            position: { left: 85, top: 80 },
            delay: 3.5,
            duration: 4,
            size: 'lg',
            opacity: 0.6
          }
        ];

      case 'general':
        return [
          ...baseElements.slice(0, 15), // Moderate number of particles
          {
            type: 'text',
            content: 'Admin Panel',
            position: { left: 15, top: 20 },
            delay: 0,
            duration: 5,
            size: 'sm',
            color: 'text-blue-600/50',
            rotation: 8,
            opacity: 0.7
          },
          {
            type: 'text',
            content: 'Management',
            position: { left: 80, top: 25 },
            delay: 1,
            duration: 5,
            size: 'sm',
            color: 'text-purple-600/50',
            rotation: -8,
            opacity: 0.7
          },
          {
            type: 'emoji',
            content: '📊',
            position: { left: 20, top: 70 },
            delay: 2,
            duration: 4,
            size: 'md',
            opacity: 0.6
          },
          {
            type: 'emoji',
            content: '⚙️',
            position: { left: 75, top: 75 },
            delay: 3,
            duration: 4,
            size: 'md',
            opacity: 0.6
          }
        ];

      default:
        return baseElements;
    }
  };

  const elements = getElementsConfig();

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'sm': return 'text-xs';
      case 'md': return 'text-sm';
      case 'lg': return 'text-lg';
      default: return 'text-sm';
    }
  };

  const getParticleColor = (variant: string) => {
    switch (variant) {
      case 'services': return 'bg-gradient-to-r from-purple-400/30 to-pink-400/30';
      case 'scholarship': return 'bg-gradient-to-r from-orange-400/30 to-emerald-400/30';
      case 'faq': return 'bg-gradient-to-r from-violet-400/30 to-teal-400/30';
      case 'hero': return 'bg-gradient-to-r from-white/20 to-white/10';
      case 'about': return 'bg-gradient-to-r from-green-400/30 to-blue-400/30';
      case 'contact': return 'bg-gradient-to-r from-purple-400/30 to-pink-400/30';
      case 'cta': return 'bg-gradient-to-r from-blue-400/40 to-purple-400/40';
      case 'general': return 'bg-gradient-to-r from-blue-400/30 to-purple-400/30';
      default: return 'bg-gradient-to-r from-blue-400/30 to-purple-400/30';
    }
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {elements.map((element, index) => {
        const style = {
          left: `${element.position.left}%`,
          top: `${element.position.top}%`,
          animationDelay: `${element.delay}s`,
          animationDuration: `${element.duration}s`,
          opacity: element.opacity || 1,
          transform: element.rotation ? `rotate(${element.rotation}deg)` : undefined
        };

        switch (element.type) {
          case 'particle':
            return (
              <div
                key={`particle-${index}`}
                className={`absolute w-2 h-2 ${getParticleColor(variant)} rounded-full animate-float`}
                style={style}
              />
            );

          case 'text':
            return (
              <div
                key={`text-${index}`}
                className={`absolute ${getSizeClasses(element.size || 'sm')} font-bold ${element.color || 'text-gray-600/50'} animate-float-slow`}
                style={style}
              >
                {element.content}
              </div>
            );

          case 'emoji':
            return (
              <div
                key={`emoji-${index}`}
                className={`absolute ${getSizeClasses(element.size || 'lg')} animate-float`}
                style={style}
              >
                {element.content}
              </div>
            );

          case 'icon':
            if (element.icon) {
              const IconComponent = element.icon;
              return (
                <div
                  key={`icon-${index}`}
                  className={`absolute ${getSizeClasses(element.size || 'md')} ${element.color || 'text-gray-400'} animate-float`}
                  style={style}
                >
                  <IconComponent className="h-5 w-5" />
                </div>
              );
            }
            return null;

          default:
            return null;
        }
      })}
    </div>
  );
};

export default FloatingElements;