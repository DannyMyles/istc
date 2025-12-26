'use client';

import Link from 'next/link';
import { 
  Phone, Mail, MapPin, Shield, 
  Facebook, Twitter, Linkedin, Instagram, 
  GraduationCap, Award, Users, Clock 
} from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-accent-900 to-accent-950">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-lg">
                <Image
                  src="/istclogo.png" 
                  alt="Source of Adventure Logo" 
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold">ISTC</h3>
                <p className="text-accent-200 text-sm">International Safety Training Centre</p>
              </div>
            </div>
            <p className="text-accent-200">
              Your trusted partner for professional safety training, certification, and consultancy services.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-accent-light transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-accent-light transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-accent-light transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:text-accent-light transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-accent-200 hover:text-[#039AC5] transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-accent-light rounded-full"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-accent-200 hover:text-[#039AC5] transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-accent-light rounded-full"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-accent-200 hover:text-[#039AC5] transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-accent-light rounded-full"></span>
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-accent-200 hover:text-[#039AC5] transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-accent-light rounded-full"></span>
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-accent-200 hover:text-[#039AC5] transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-accent-light rounded-full"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Popular Courses</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/courses/first-aid" className="text-accent-200 hover:text-[#039AC5] transition-colors flex items-center gap-2">
                  <GraduationCap size={16} />
                  First Aid Training
                </Link>
              </li>
              <li>
                <Link href="/courses/fire-safety-course-certificate" className="text-accent-200 hover:text-[#039AC5] transition-colors flex items-center gap-2">
                  <GraduationCap size={16} />
                  Fire Safety
                </Link>
              </li>
              <li>
                <Link href="/courses/chemical-safety" className="text-accent-200 hover:text-[#039AC5] transition-colors flex items-center gap-2">
                  <GraduationCap size={16} />
                  Chemical Safety
                </Link>
              </li>
              <li>
                <Link href="/courses/work-at-height" className="text-accent-200 hover:text-[#039AC5] transition-colors flex items-center gap-2">
                  <GraduationCap size={16} />
                  Construction Safety
                </Link>
              </li>
              <li>
                <Link href="/courses/road-safety" className="text-accent-200 hover:text-[#039AC5] transition-colors flex items-center gap-2">
                  <GraduationCap size={16} />
                  Road Safety Training
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-accent-light" />
                <div>
                  <p className="text-sm text-accent-200">Phone</p>
                  <a href="tel:+254700364722" className="font-medium hover:text-accent-light transition-colors">
                    +254 700 364 722
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-accent-light" />
                <div>
                  <p className="text-sm text-accent-200">Email</p>
                  <a href="mailto:hsetraining@istc.co.ke" className="font-medium hover:text-accent-light transition-colors">
                    hsetraining@istc.co.ke
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-accent-light mt-1" />
                <div>
                  <p className="text-sm text-accent-200">Address</p>
                  <p className="font-medium">
                    Westlands, Nairobi, Kenya
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="bg-accent-800/50 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-xl font-bold mb-2">Stay Updated with Safety News</h4>
              <p className="text-accent-200">Subscribe to our newsletter for the latest safety training updates.</p>
            </div>
            <form className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-lg bg-white/10 border border-accent-300 text-white placeholder-accent-300 focus:outline-none focus:ring-2 focus:ring-accent-light w-full md:w-64"
              />
              <button
                type="submit"
                className="bg-accent-light text-accent-900 px-6 py-3 rounded-lg font-semibold hover:bg-white transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-accent-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-accent-300 text-sm">
              <p>© {currentYear} International Safety Training Centre. All rights reserved.</p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy" className="text-accent-300 hover:text-[#039AC5] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-accent-300 hover:text-[#039AC5] transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/sitemap" className="text-accent-300 hover:text-[#039AC5] transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;