'use client';

import { Play, Shield, Award, Users, Clock, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-50 via-white to-accent-100/30"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent-200/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent-300/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 py-20 md:py-32 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content - Safety Training */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 bg-accent-100 text-accent-800 px-4 py-2 rounded-full text-sm font-semibold">
              <Shield size={16} />
              <span>Certified Safety Training Centre</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="block text-gray-900">Professional Safety</span>
              <span className="block text-accent-600 mt-2">Training & Certification</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl">
              Transform your workplace safety standards with our comprehensive training programs, 
              expert consultancy, and internationally recognized certifications.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/courses" 
                className="btn-adventure flex items-center justify-center gap-2 text-lg px-8 py-4 rounded-lg"
              >
                <Award size={20} />
                Explore Courses
              </Link>
              <button
                className="btn-adventure-outline flex items-center justify-center gap-2 text-lg px-8 py-4 rounded-lg"
              >
                <Play size={20} />
                Watch Introduction
              </button>
            </div>

            {/* Stats - Arranged like reference image */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div>
                <div className="text-3xl font-bold text-gray-900">15K+</div>
                <div className="text-sm text-gray-600">Trained Professionals</div>
              </div>
              <div className="border-l border-gray-200 pl-8">
                <div className="text-lg font-semibold text-gray-900">First Aid Training</div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  <Clock size={14} />
                  Next: March 15
                </div>
                <button className="mt-3 text-accent-600 font-semibold text-sm hover:text-accent-700">
                  Join Now →
                </button>
              </div>
              <div className="border-l border-gray-200 pl-8">
                <div className="text-lg font-semibold text-gray-900">Our Success</div>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  98% certification success rate with industry-leading...
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Safety Training Image with overlay elements */}
          <div className="relative">
            {/* Main Image Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/landing.png" // Replace with your actual image
                  alt="Online Learning Platform"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Overlay Stats Card - Top Right */}
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg max-w-[180px]">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">15K+</div>
                    <div className="text-sm text-gray-600">Professionals Trained</div>
                  </div>
                </div>
                
                {/* Overlay Class Card - Bottom Left */}
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg max-w-[200px]">
                  <div>
                    <h4 className="font-semibold text-gray-900">First Aid Certification</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <Clock size={14} />
                      March 15, 10:00 AM
                    </div>
                    <button className="mt-3 bg-accent-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-accent-700 transition-colors">
                      Reserve Seat
                    </button>
                  </div>
                </div>
                
                {/* Rating Badge - Bottom Right */}
                <div className="absolute bottom-6 right-6 bg-white p-3 rounded-full shadow-lg">
                  <div className="flex items-center gap-1">
                    <Star size={20} className="fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-gray-900">4.9</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional Success Info Card below the image */}
            <div className="mt-6 bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Our Training Success</h3>
              <p className="text-gray-600 text-sm">
                With over 16 years of experience, we've certified more than 15,000 safety professionals 
                across 25+ specialized courses. Our 98% certification success rate and industry partnerships 
                ensure your team receives the highest quality safety training available.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;