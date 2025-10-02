'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaGraduationCap,
  FaBars,
  FaChevronDown,
  FaRocket,
  FaBookOpen,
  FaFileAlt,
  FaUserGraduate,
  FaHandshake,
  FaTimes
} from 'react-icons/fa';
import { useCTA } from '@/context/CTAContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { openCTA } = useCTA();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const destinations = [
    { name: 'China', href: '/destinations/china', flag: '🇨🇳' },
    { name: 'United Kingdom', href: '/destinations/uk', flag: '🇬🇧' },
    { name: 'South Korea', href: '/destinations/south-korea', flag: '🇰🇷' },
    { name: 'Hungary', href: '/destinations/hungary', flag: '🇭🇺' },
    { name: 'Croatia', href: '/destinations/croatia', flag: '🇭🇷' },
    { name: 'Cyprus', href: '/destinations/cyprus', flag: '🇨🇾' },
    { name: 'Georgia', href: '/destinations/georgia', flag: '🇬🇪' },
    { name: 'Netherlands', href: '/destinations/netherlands', flag: '🇳🇱' },
    { name: 'Finland', href: '/destinations/finland', flag: '🇫🇮' },
  ];

  const services = [
    { name: 'University Applications', href: '/services/university-applications', icon: FaUserGraduate, description: 'Complete application support' },
    { name: 'Visa Assistance', href: '/services/visa-assistance', icon: FaFileAlt, description: 'Expert visa guidance' },
    { name: 'Scholarship Support', href: '/services/scholarship-support', icon: FaBookOpen, description: 'Find funding opportunities' },
    { name: 'Career Counseling', href: '/services/career-guidance', icon: FaHandshake, description: 'Professional guidance' },
  ];

  type DestinationItem = {
    name: string;
    href: string;
    flag: string;
  };

  type ServiceItem = {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
  };

  const navigationItems = [
    { href: '/', label: 'Home', hasDropdown: false },
    { href: '/destinations', label: 'Destinations', hasDropdown: true, dropdownItems: destinations },
    { href: '/universities', label: 'Universities', hasDropdown: false },
    { href: '/services', label: 'Services', hasDropdown: true, dropdownItems: services },
    { href: '/b2b', label: 'B2B Partnership', hasDropdown: false },
    { href: '/about', label: 'About', hasDropdown: false },
    { href: '/update', label: 'Updates', hasDropdown: false },
    { href: '/contact', label: 'Contact', hasDropdown: false },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-[9998] transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
          : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Clean and Minimal */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link href="/" className="flex items-center">
              <div className="w-24 h-12 relative">
                <Image
                  src="/brand/logo.png"
                  alt="EduExpress International Logo"
                  width={96}
                  height={48}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation - Professional and Clean */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Link
                    href={item.href}
                    className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 group"
                    onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <FaChevronDown className={`inline-block ml-1 h-3 w-3 transition-transform duration-200 ${
                        activeDropdown === item.label ? 'rotate-180' : ''
                      }`} />
                    )}
                    
                    {/* Hover underline effect */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-blue-600"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.2 }}
                    />
                  </Link>
                </motion.div>

                {/* Professional Dropdown */}
                <AnimatePresence>
                  {item.hasDropdown && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 z-30"
                      onMouseEnter={() => setActiveDropdown(item.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <div className="grid gap-3">
                        {item.dropdownItems?.map((dropdownItem, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: idx * 0.05 }}
                          >
                            <Link
                              href={dropdownItem.href}
                              className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
                            >
                              {item.label === 'Destinations' ? (
                                <>
                                  <span className="text-2xl">{(dropdownItem as DestinationItem).flag}</span>
                                  <div>
                                    <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                      {dropdownItem.name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      Study in {dropdownItem.name}
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                    {React.createElement((dropdownItem as ServiceItem).icon, { className: "h-5 w-5 text-blue-600" })}
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                      {dropdownItem.name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {(dropdownItem as ServiceItem).description}
                                    </div>
                                  </div>
                                </>
                              )}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Professional CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden lg:block"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openCTA('Navbar Apply Now')}
              className="shiny-button text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-lg"
            >
              <span className="flex items-center">
                <FaRocket className="mr-2 h-4 w-4" />
                Apply Now
              </span>
            </motion.button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:hidden"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-3 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200 bg-white shadow-sm"
              aria-label="Toggle mobile menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaTimes className="h-6 w-6 text-gray-700" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaBars className="h-6 w-6 text-gray-700" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-[9999]"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-80 sm:w-96 bg-white shadow-2xl z-[9999] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-xl flex items-center justify-center shadow-lg">
                    <FaGraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <FaTimes className="h-5 w-5 text-gray-700" />
                  </button>
                </div>
                
                <nav className="flex-1 space-y-2">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-3 text-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
                      >
                        {item.label}
                      </Link>
                      
                      {/* Mobile Dropdown Items */}
                      {item.hasDropdown && item.dropdownItems && (
                        <div className="ml-4 space-y-1">
                          {item.dropdownItems.map((dropdownItem, idx) => (
                            <Link
                              key={idx}
                              href={dropdownItem.href}
                              onClick={() => setIsOpen(false)}
                              className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                              {item.label === 'Destinations' ? (
                                <span className="flex items-center">
                                  <span className="mr-3">{(dropdownItem as DestinationItem).flag}</span>
                                  {dropdownItem.name}
                                </span>
                              ) : (
                                <span className="flex items-center">
                                  {React.createElement((dropdownItem as ServiceItem).icon, { className: "mr-3 h-4 w-4 text-blue-600" })}
                                  {dropdownItem.name}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </nav>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="pt-6 border-t border-gray-200"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      openCTA('Mobile Navbar Apply Now');
                      setIsOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg"
                  >
                    <span className="flex items-center justify-center">
                      <FaRocket className="mr-2 h-5 w-5" />
                      Apply Now
                    </span>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
