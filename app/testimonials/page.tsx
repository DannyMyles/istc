'use client';

import TestimonialCard from '@/components/ui/TestimonialCard';
import { Star, Quote, TrendingUp, Users, Award } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Testimonial, TestimonialResponse, testimonialService } from '../api_services/testimonialService';

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<TestimonialResponse['pagination'] | null>(null);

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
    // Add more fallback testimonials as needed...
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
      value: '15,000+',
      label: 'Professionals Trained',
      icon: Users
    },
    {
      value: '25+',
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
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Loading Testimonials...</h1>
            <p className="text-gray-600">Please wait while we fetch the latest testimonials.</p>
          </div>
        </div>
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
              className="bg-accent-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-accent-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent-100 text-accent-800 px-6 py-3 rounded-full text-lg font-semibold mb-8">
              <Quote size={20} />
              <span>Client Testimonials</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our Clients Say About Us
            </h1>
            <p className="text-xl text-gray-600 mb-12">
              Read experiences from professionals and organizations who have transformed their safety standards with our training.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {statistics.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-100 rounded-2xl mb-4 mx-auto">
                    <stat.icon className="text-accent-600" size={32} />
                  </div>
                  <div className="text-3xl font-bold text-accent-800 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Show total testimonials count */}
            {pagination && (
              <div className="mt-8 text-gray-600">
                Showing {testimonials.length} of {pagination.totalTestimonials} testimonials
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {testimonials.length === 0 ? (
            <div className="text-center py-12">
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
                  />
                ))}
              </div>

              {/* Video Testimonials Section */}
              <div className="mt-20">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                  Video Testimonials
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-gray-100 rounded-2xl p-8">
                    <div className="aspect-video bg-accent-100 rounded-xl mb-6 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                          <div className="w-0 h-0 border-t-[12px] border-b-[12px] border-l-[20px] border-transparent border-l-accent-600 ml-1"></div>
                        </div>
                        <p className="text-gray-600">Play Video Testimonial</p>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      John Kamau - BuildRight Construction
                    </h3>
                    <p className="text-gray-600">
                      "The impact on our safety culture has been remarkable..."
                    </p>
                  </div>
                  
                  <div className="bg-gray-100 rounded-2xl p-8">
                    <div className="aspect-video bg-accent-100 rounded-xl mb-6 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                          <div className="w-0 h-0 border-t-[12px] border-b-[12px] border-l-[20px] border-transparent border-l-accent-600 ml-1"></div>
                        </div>
                        <p className="text-gray-600">Play Video Testimonial</p>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Sarah Mwangi - Precision Manufacturing
                    </h3>
                    <p className="text-gray-600">
                      "Professional certification process with excellent results..."
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent-600 to-accent-700 text-gray-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Join Our Satisfied Clients?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Experience the quality and professionalism that thousands of organizations trust for their safety training needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+254700364722" 
                className="border bg-[#039AC5] text-white hover:text-white px-8 py-3 rounded-xl font-semibold text-lg transition-colors"
              >
                Call to Enroll
              </a>
              <Link 
                href="/courses" 
                className="border border-[#039AC5] hover:bg-[#039AC5] hover:text-white px-8 py-3 rounded-xl font-semibold text-lg transition-colors"
              >
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}