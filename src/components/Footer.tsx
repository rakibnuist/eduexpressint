// src/components/Footer.tsx
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt, FaStar } from 'react-icons/fa';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
      
      <div className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Company Info */}
            <div className="text-center md:text-left">
              {/* Logo */}
              <div className="mb-4 flex items-center justify-center md:justify-start">
                <div className="w-32 h-20 relative">
                  <Image
                    src="/brand/white-logo.png"
                    alt="EduExpress International Logo"
                    width={128}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <p className="text-white/90 mb-4 max-w-sm">
                Your trusted partner in global education, connecting students to their dream universities worldwide.
              </p>
              <div className="mb-6">
                <a href="https://www.eduexpressint.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 text-sm font-medium">
                  www.eduexpressint.com
                </a>
              </div>
              
              {/* Social Media */}
              <div className="flex space-x-4 justify-center md:justify-start">
                <a href="https://facebook.com/eduexpressint" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/70 hover:text-blue-400 transition-colors duration-300">
                  <FaFacebook size={20} />
                </a>
                <a href="https://instagram.com/eduexpressint" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/70 hover:text-pink-400 transition-colors duration-300">
                  <FaInstagram size={20} />
                </a>
                <a href="https://youtube.com/@eduexpressint" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-white/70 hover:text-red-400 transition-colors duration-300">
                  <FaYoutube size={20} />
                </a>
                <a href="https://linkedin.com/company/eduexpressint" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/70 hover:text-blue-500 transition-colors duration-300">
                  <FaLinkedin size={20} />
                </a>
                <a href="https://wa.me/8801983333566" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-white/70 hover:text-green-400 transition-colors duration-300">
                  <FaWhatsapp size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-white/80 hover:text-blue-400 transition-colors duration-300">About Us</Link></li>
                <li><Link href="/destinations" className="text-white/80 hover:text-blue-400 transition-colors duration-300">Destinations</Link></li>
                <li><Link href="/universities" className="text-white/80 hover:text-blue-400 transition-colors duration-300">Universities</Link></li>
                <li><Link href="/b2b" className="text-white/80 hover:text-blue-400 transition-colors duration-300">B2B Partnership</Link></li>
                <li><Link href="/contact" className="text-white/80 hover:text-blue-400 transition-colors duration-300">Contact Us</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4 text-white">Contact Info</h3>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-center justify-center md:justify-start gap-2">
                  <FaMapMarkerAlt className="h-4 w-4 text-blue-400 flex-shrink-0" />
                  <div className="text-sm">
                    <div>House: 12/1, Ground Floor</div>
                    <div>Road: 4/A, Dhanmondi</div>
                    <div>Dhaka - 1209, Bangladesh</div>
                  </div>
                </li>
                <li className="flex items-center justify-center md:justify-start gap-2">
                  <FaEnvelope className="h-4 w-4 text-blue-400 flex-shrink-0" />
                  <a href="mailto:info@eduexpressint.com" className="hover:text-blue-400 transition-colors duration-300 text-sm">
                    info@eduexpressint.com
                  </a>
                </li>
                <li className="flex items-center justify-center md:justify-start gap-2">
                  <FaPhone className="h-4 w-4 text-blue-400 flex-shrink-0" />
                  <div className="text-sm">
                    <a href="tel:+8801983333566" className="hover:text-blue-400 transition-colors duration-300 block">
                      +880 1983-333566
                    </a>
                    <a href="tel:+8801329663505" className="hover:text-blue-400 transition-colors duration-300 block">
                      +880 1329-6663505
                    </a>
                  </div>
                </li>
                <li className="flex items-center justify-center md:justify-start gap-2">
                  <FaWhatsapp className="h-4 w-4 text-green-400 flex-shrink-0" />
                  <div className="text-sm">
                    <a href="https://wa.me/8801983333566" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors duration-300 block">
                      WhatsApp: +880 1983-333566
                    </a>
                    <a href="https://wa.me/8801329663505" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors duration-300 block">
                      WhatsApp: +880 1329-6663505
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-8 border-t border-white/20 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
              <p className="text-white/70 text-sm">
                &copy; {year} EduExpress International. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm">
                <Link href="/privacy-policy" className="text-white/70 hover:text-blue-400 transition-colors duration-300">
                  Privacy Policy
                </Link>
                <Link href="/terms-of-service" className="text-white/70 hover:text-blue-400 transition-colors duration-300">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
