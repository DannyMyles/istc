'use client';

import { Shield, Target, Users, Globe, Award, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function AboutPage() {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [currentSection, setCurrentSection] = useState(0);

  // Define sections in order
  const sections = [
    { id: 'mission', title: 'Mission & Vision' },
    { id: 'why-us', title: 'Why Choose Us' },
    { id: 'certifications', title: 'Certifications' },
    { id: 'contact', title: 'Get Started' }
  ];

  const scrollToNextSection = () => {
    const nextSection = (currentSection + 1) % sections.length;
    setCurrentSection(nextSection);
    
    if (sectionsRef.current[nextSection]) {
      sectionsRef.current[nextSection]?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        scrollToNextSection();
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevSection = (currentSection - 1 + sections.length) % sections.length;
        setCurrentSection(prevSection);
        sectionsRef.current[prevSection]?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    };

    // Intersection Observer to track current section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = sectionsRef.current.findIndex(ref => ref === entry.target);
            if (index !== -1) {
              setCurrentSection(index);
            }
          }
        });
      },
      { threshold: 0.3, rootMargin: '-100px 0px -100px 0px' }
    );

    sectionsRef.current.forEach(section => {
      if (section) observer.observe(section);
    });

    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      observer.disconnect();
    };
  }, [currentSection, sections.length]);

  // Correct ref callback functions - must return void
  const setMissionRef = (el: HTMLDivElement | null) => {
    sectionsRef.current[0] = el;
  };

  const setWhyUsRef = (el: HTMLDivElement | null) => {
    sectionsRef.current[1] = el;
  };

  const setCertificationsRef = (el: HTMLDivElement | null) => {
    sectionsRef.current[2] = el;
  };

  const setContactRef = (el: HTMLDivElement | null) => {
    sectionsRef.current[3] = el;
  };

  const values = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Our primary commitment is to promote and maintain the highest safety standards.'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for excellence in all our training programs and consultancy services.'
    },
    {
      icon: Users,
      title: 'Integrity',
      description: 'We conduct our business with honesty, transparency, and ethical practices.'
    },
    {
      icon: Globe,
      title: 'Innovation',
      description: 'We continuously update our methods to incorporate the latest safety practices.'
    }
  ];

  const certifications = [
    'NEMA Certified',
    'NITA Approved',
    'OSHA Standards Compliant',
    'First Aid International',
    'Fire Safety Certified',
    'Environmental Compliance'
  ];

  return (
    <div className="pt-8">
      {/* Hero Section with Background Image */}
      <section className="relative py-28 md:py-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: "url('/images/6.jpg')",
            backgroundColor: '#039AC5'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-gray-900/50"></div>
          <div className="absolute inset-0 opacity-10 bg-[url('/images/patterns/dots-pattern.svg')]"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent-500/10 backdrop-blur-sm border border-accent-500/20 text-white px-6 py-2 rounded-full text-sm font-medium mb-8">
              <Award size={16} />
              <span>Pioneers in Safety Training Since 2008</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              About <span className="text-accent-400">International Safety</span> Training Centre
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              For over 16 years, we have been at the forefront of safety training and certification in Kenya and beyond, transforming workplaces through excellence.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-12">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">10+</div>
                <div className="text-sm text-gray-300">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">1000+</div>
                <div className="text-sm text-gray-300">Professionals Trained</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">98%</div>
                <div className="text-sm text-gray-300">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">10+</div>
                <div className="text-sm text-gray-300">Training Programs</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Scroll Indicator with Progress */}
        <button
          onClick={scrollToNextSection}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 group focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-full"
          aria-label={`Scroll to ${sections[0]?.title} section`}
        >
          <div className="flex flex-col items-center gap-3">
            {/* Progress indicator */}
            <div className="flex items-center gap-1 mb-1">
              {sections.map((_, index) => (
                <div 
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    index === currentSection 
                      ? 'bg-accent-400 w-4' 
                      : index < currentSection 
                        ? 'bg-white/60' 
                        : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
            
            <span className="text-xs text-white/70 group-hover:text-white transition-colors">
              Next: {sections[(currentSection + 1) % sections.length]?.title}
            </span>
            
            <div className="relative">
              {/* Pulsing animation */}
              <div className="absolute inset-0 border-2 border-white/30 rounded-full animate-ping group-hover:border-white"></div>
              
              {/* Main arrow container */}
              <div className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center group-hover:bg-white/20 group-hover:border-white/40 transition-all duration-300">
                <svg 
                  className="w-5 h-5 text-white transform group-hover:translate-y-0.5 transition-transform duration-300" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
              </div>
            </div>
            
            {/* Keyboard hint */}
            <div className="absolute -bottom-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              <span className="text-xs text-accent-300 font-medium">↑↓ Arrow keys to navigate</span>
            </div>
          </div>
        </button>
      </section>

      {/* Mission & Vision Section */}
      <div ref={setMissionRef}>
        <section className="py-20 scroll-mt-20" id="mission-section">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    To provide comprehensive, practical, and affordable safety training that empowers organizations and individuals to create safer working environments through knowledge, skills, and awareness.
                  </p>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    To be the leading provider of safety training and consultancy services in East Africa, recognized for excellence, innovation, and positive impact on workplace safety culture.
                  </p>
                </div>
              </div>
              <div className="bg-accent-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-accent-800 mb-6">Our Core Values</h3>
                <div className="space-y-6">
                  {values.map((value, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="bg-white p-3 rounded-xl">
                        <value.icon className="text-accent-600" size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{value.title}</h4>
                        <p className="text-gray-600">{value.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Why Choose Us Section */}
      <div ref={setWhyUsRef}>
        <section className="py-20 bg-gray-50 scroll-mt-20" id="why-us-section">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose ISTC?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We stand out through our commitment to quality, experience, and client satisfaction.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-100 rounded-2xl mb-6 mx-auto">
                  <Clock className="text-accent-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-4">10+ Years Experience</h3>
                <p className="text-gray-600">
                  Extensive experience in safety training across various industries including construction, manufacturing, oil & gas, and healthcare.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-100 rounded-2xl mb-6 mx-auto">
                  <Users className="text-accent-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-4">1000+ Trained</h3>
                <p className="text-gray-600">
                  Professionals and organizations who have benefited from our training programs, with 92% reporting improved safety performance.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-100 rounded-2xl mb-6 mx-auto">
                  <Award className="text-accent-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-4">98% Success Rate</h3>
                <p className="text-gray-600">
                  High certification success rate and client satisfaction, with industry-recognized accreditations and partnerships.
                </p>
              </div>
            </div>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-accent-500 to-accent-600 text-[#303136] rounded-xl p-6">
                <h4 className="text-lg font-semibold mb-2">Industry Partnerships</h4>
                <p className="opacity-90">Collaborations with leading industry bodies and government agencies</p>
              </div>
              <div className="bg-gradient-to-r from-[#f0c711] to-[#d3ae0b] text-[#ffffff] rounded-xl p-6">
                <h4 className="text-lg font-semibold mb-2">Modern Facilities</h4>
                <p className="opacity-90">State-of-the-art training facilities with real-world simulation equipment</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Certifications Section */}
      <div ref={setCertificationsRef}>
        <section className="py-20 scroll-mt-20" id="certifications-section">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Our Certifications & Accreditations
              </h2>
              <p className="text-lg text-gray-600 text-center mb-8 max-w-2xl mx-auto">
                We maintain the highest standards of quality and compliance with industry regulations.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications.map((cert, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 bg-gray-50 p-5 rounded-xl hover:bg-accent-50 hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="flex-shrink-0">
                      <CheckCircle className="text-green-500 group-hover:text-green-600" size={24} />
                    </div>
                    <span className="font-medium text-gray-800 group-hover:text-gray-900">{cert}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 bg-gradient-to-r from-gray-50 to-accent-50 rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Continuous Compliance</h3>
                <p className="text-gray-600 mb-6">
                  Our training programs are regularly updated to comply with the latest national and international safety standards.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                    <span className="text-sm font-medium text-gray-700">Annual Audits</span>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                    <span className="text-sm font-medium text-gray-700">Quality Assurance</span>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                    <span className="text-sm font-medium text-gray-700">Regular Updates</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <div ref={setContactRef}>
        <section className="py-20 bg-gradient-to-r from-accent-600 to-accent-700 text-gray-700 scroll-mt-20" id="contact-section">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-[#5F606A] px-4 py-1 rounded-full text-sm font-medium mb-6">
                <Award size={14} />
                <span>Ready to Begin</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-[#5F606A] mb-6">
                Start Your Safety Journey Today
              </h2>
              
              <p className="text-xl mb-8 text-[#5F606A]/90">
                Join thousands of professionals and organizations who trust ISTC for their safety training needs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link 
                  href="/contact" 
                  className="bg-white text-accent-700 hover:bg-gray-100 hover:scale-105 px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg"
                >
                  Contact Our Team
                </Link>
                <Link 
                  href="/courses" 
                  className="bg-transparent border-2 border-white text-[#5F606A] hover:bg-white hover:text-accent-700 px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300"
                >
                  Browse Courses
                </Link>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[#5F606A]/80">
                <div className="text-center">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">Flexible</div>
                  <div className="text-sm">Scheduling</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">On-Site</div>
                  <div className="text-sm">Training</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">Custom</div>
                  <div className="text-sm">Programs</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}