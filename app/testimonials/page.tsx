'use client';

import TestimonialCard from '@/components/ui/TestimonialCard';
import { Star, Quote, TrendingUp, Users, Award, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { Testimonial, TestimonialResponse, testimonialService } from '../api_services/testimonialService';
import Spinner, { LoadingSpinner } from '@/components/ui/Spinner';

export default function TestimonialsPage() {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [currentSection, setCurrentSection] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<TestimonialResponse['pagination'] | null>(null);

  // Define sections for scroll navigation
  const sections = [
    { id: 'testimonials', title: 'Testimonials' },
    { id: 'videos', title: 'Video Testimonials' },
    { id: 'cta', title: 'Join Our Clients' }
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

  // Fetch testimonials on component mount
  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response: TestimonialResponse = await testimonialService.getAllTestimonials();
      
      // Filter only active testimonials for public display
      const activeTestimonials = response.testimonials.filter(testimonial => testimonial.isActive);
      setTestimonials(activeTestimonials);
      setPagination(response.pagination);
    } catch (err) {
      console.error('Error fetching testimonials:', err);
      setError('Failed to load testimonials. Please try again later.');
      if (process.env.NODE_ENV === 'development') {
        console.log('Using fallback data');
        setTestimonials(fallbackTestimonials);
      }
    } finally {
      setLoading(false);
    }
  };

  // Ref callback functions
  const setHeroRef = (el: HTMLDivElement | null) => {
    sectionsRef.current[0] = el;
  };

  const setTestimonialsRef = (el: HTMLDivElement | null) => {
    sectionsRef.current[1] = el;
  };

  const setContactRef = (el: HTMLDivElement | null) => {
    sectionsRef.current[2] = el;
  };

  // Fallback data in case API fails
  const fallbackTestimonials = [
    {
      id: '1',
      name: 'John Kamau',
      role: 'Safety Manager',
      company: 'BuildRight Construction',
      content: 'ISTC transformed our workplace safety culture. Their practical training approach helped us reduce accidents by 60% in the first year.',
      rating: 5,
      image: '',
      avatarColor: '#3B82F6',
      featured: true,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Sarah Mwangi',
      role: 'Operations Director',
      company: 'Precision Manufacturing Ltd',
      content: 'The professional certification process was excellent. Our team gained valuable skills that improved our safety compliance significantly.',
      rating: 5,
      image: '',
      avatarColor: '#10B981',
      featured: true,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'David Omondi',
      role: 'Head of Safety',
      company: 'Kenya Oil Refineries',
      content: 'Comprehensive training that exceeded our expectations. The instructors were knowledgeable and the materials were up-to-date.',
      rating: 4,
      image: '',
      avatarColor: '#8B5CF6',
      featured: false,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '4',
      name: 'Grace Akinyi',
      role: 'HR Manager',
      company: 'Healthcare Solutions Inc.',
      content: 'Perfect balance of theory and practical exercises. Our healthcare staff now feel more confident in emergency situations.',
      rating: 5,
      image: '',
      avatarColor: '#EF4444',
      featured: true,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '5',
      name: 'Robert Njoroge',
      role: 'Site Manager',
      company: 'Urban Builders Ltd',
      content: 'The fire safety course was exceptional. We implemented their recommendations and passed our safety audit with flying colors.',
      rating: 5,
      image: '',
      avatarColor: '#F59E0B',
      featured: false,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '6',
      name: 'Mary Wambui',
      role: 'Environmental Officer',
      company: 'Green Energy Solutions',
      content: 'Outstanding environmental compliance training. The practical approach helped us implement effective waste management systems.',
      rating: 4,
      image: '',
      avatarColor: '#EC4899',
      featured: true,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  // Calculate statistics from API data
  const statistics = [
    {
      value: testimonialService.calculateStats(testimonials).averageRating || '4.8/5',
      label: 'Average Client Rating',
      icon: Star
    },
    {
      value: '98%',
      label: 'Would Recommend',
      icon: TrendingUp
    },
    {
      value: '1,000+',
      label: 'Professionals Trained',
      icon: Users
    },
    {
      value: '5+',
      label: 'Industry Awards',
      icon: Award
    },
  ];

  // Get initials from name
  const getInitials = (name: string): string => {
    if (!name.trim()) return 'JD';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Format role and company
  const formatRole = (testimonial: Testimonial): string => {
    if (testimonial.company) {
      return `${testimonial.role}, ${testimonial.company}`;
    }
    return testimonial.role;
  };

  // Render loading state
  if (loading) {
    return (
      <div className="pt-20">
        <LoadingSpinner 
          text="Loading Testimonials..." 
          size="lg"
          className="min-h-[60vh]"
        />
      </div>
    );
  }

  // Render error state
  if (error && testimonials.length === 0) {
    return (
      <div className="pt-20">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4 text-red-600">Oops!</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={fetchTestimonials}
              className="btn-adventure px-6 py-3 rounded-lg font-semibold"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div >
      {/* Hero Section with Background Image */}
      <div ref={setHeroRef}>
        <section className="relative py-28 md:py-12 overflow-hidden">
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
            style={{
              backgroundImage: "url('/images/7.jpg')",
              backgroundColor: '#039AC5'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-gray-900/50"></div>
            <div className="absolute inset-0 opacity-10 bg-[url('/images/patterns/quote-pattern.svg')]"></div>
          </div>
          
          <div className="container relative z-10 mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-accent-500/10 backdrop-blur-sm border border-accent-500/20 text-white px-6 py-2 rounded-full text-sm font-medium mb-8">
                <Quote size={16} />
                <span>Client Testimonials</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                What Our <span className="text-accent-400">Clients Say</span> About Us
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
                Read experiences from professionals and organizations who have transformed their safety standards with our training.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                {statistics.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Show total testimonials count */}
              {pagination && (
                <div className="mt-8 text-gray-300">
                  Showing {testimonials.length} of {pagination.totalTestimonials} testimonials
                </div>
              )}
            </div>
          </div>
          
          {/* Scroll Indicator */}
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
                <div className="absolute inset-0 border-2 border-white/30 rounded-full animate-ping group-hover:border-white"></div>
                <div className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center group-hover:bg-white/20 group-hover:border-white/40 transition-all duration-300">
                  <ChevronDown 
                    className="w-5 h-5 text-white transform group-hover:translate-y-0.5 transition-transform duration-300" 
                  />
                </div>
              </div>
              
              <div className="absolute -bottom-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                <span className="text-xs text-accent-300 font-medium">↑↓ Arrow keys to navigate</span>
              </div>
            </div>
          </button>
        </section>
      </div>

      {/* Testimonials Grid Section */}
      <div ref={setTestimonialsRef}>
        <section className="py-20 bg-gradient-to-b from-white to-gray-50 scroll-mt-20" id="testimonials-section">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Client Success Stories
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Real experiences from professionals across various industries
              </p>
            </div>

            {testimonials.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                  No testimonials available
                </h3>
                <p className="text-gray-600">
                  Check back soon for client testimonials.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {testimonials.map((testimonial) => (
                    <TestimonialCard
                      key={testimonial.id}
                      name={testimonial.name}
                      role={formatRole(testimonial)}
                      content={testimonial.content}
                      rating={testimonial.rating}
                      image={testimonial.image || getInitials(testimonial.name)}
                      avatarColor={testimonial.avatarColor}
                      // featured={testimonial.featured}
                    />
                  ))}
                </div>

                {/* Video Testimonials Section */}
                <div className="mt-20">
                  <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                    Video Testimonials
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className="aspect-video bg-gradient-to-br from-accent-100 to-blue-100 rounded-xl mb-6 overflow-hidden relative group cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                              <div className="w-0 h-0 border-t-[12px] border-b-[12px] border-l-[20px] border-transparent border-l-accent-600 ml-1"></div>
                            </div>
                            <p className="text-gray-600 font-medium">Play Video Testimonial</p>
                          </div>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        John Kamau - BuildRight Construction
                      </h3>
                      <p className="text-gray-600 mb-4">
                        "The impact on our safety culture has been remarkable. Our accident rates dropped by 60% in the first year."
                      </p>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-500 ml-2">5.0 Rating</span>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl mb-6 overflow-hidden relative group cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                              <div className="w-0 h-0 border-t-[12px] border-b-[12px] border-l-[20px] border-transparent border-l-green-600 ml-1"></div>
                            </div>
                            <p className="text-gray-600 font-medium">Play Video Testimonial</p>
                          </div>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Sarah Mwangi - Precision Manufacturing
                      </h3>
                      <p className="text-gray-600 mb-4">
                        "Professional certification process with excellent results. Our team's skills improved dramatically."
                      </p>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-500 ml-2">5.0 Rating</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <div ref={setContactRef}>
        <section className="py-20 bg-gradient-to-r from-accent-600 to-accent-700 text-gray-700 scroll-mt-20" id="contact-section">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-[#303136] px-4 py-1 rounded-full text-sm font-medium mb-6">
                <Quote size={14} />
                <span>Join Our Satisfied Clients</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-[#303136] mb-6">
                Ready to Experience Excellence?
              </h2>
              
              <p className="text-xl mb-8 text-[#303136]/90">
                Join thousands of professionals and organizations who trust ISTC for their safety training and compliance needs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <a 
                  href="tel:+254700364722" 
                  className="btn-adventure px-8 py-3 rounded-xl font-semibold text-lg"
                >
                  Call to Enquire 
                </a>
                <Link 
                  href="/courses" 
                  className="btn-outline px-8 py-3 rounded-xl font-semibold text-lg"
                >
                  Browse Courses
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[#303136]/80">
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">98%</div>
                  <p className="text-sm">Client Satisfaction Rate</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">Custom</div>
                  <p className="text-sm">Training Solutions</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">Expert</div>
                  <p className="text-sm">Instructors</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}