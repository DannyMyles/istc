'use client';

import { Play, Shield, Award, Users, Clock, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ImageCarousel from './ImageCarousel';
import ReactPlayer from 'react-player';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    // Fallback timeout in case video fails silently
    const timeout = setTimeout(() => {
      setShowFallback(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-screen">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {!showFallback && (
          <ReactPlayer
            src="/videos/safety_video.mp4"
            playing={true}
            loop={true}
            muted={true}
            width="100%"
            height="100%"
            playsInline={true}
            onError={() => setShowFallback(true)}
            onPlay={() => setShowFallback(false)}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              minWidth: '100%',
              minHeight: '100%',
              objectFit: 'cover',
            }}
          />
        )}
        
        {/* Fallback Image */}
        <Image
          src="/videos/10.jpg"
          alt="Hero background"
          fill
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: '100%',
            minHeight: '100%',
            objectFit: 'cover',
          }}
          priority
        />
        
        {/* Enhanced Darker overlay for much better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/50"></div>
      </div>
      
      {/* Optional: Add an additional solid overlay for even more darkness */}
      <div className="absolute inset-0 bg-black/30 z-5"></div>
      
      {/* Decorative Elements - made less prominent */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent-200/10 rounded-full blur-3xl z-10"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent-300/5 rounded-full blur-3xl z-10"></div>

      <div className="container mx-auto px-4 py-4 md:py-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* Left Content - Safety Training */}
          <div className="space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm text-accent-800 px-4 py-2 rounded-full text-sm font-semibold">
              <Shield size={16} stroke='#FED803' fill='none' />
              <span>Certified Safety Training Centre</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight text-white">
              <span className="block">Professional Safety</span>
              <span className="block text-accent-300 mt-1 md:mt-2">Training & Certification</span>
            </h1>

            <p className="text-base md:text-lg text-gray-200 max-w-2xl">
              Transform your workplace safety standards with our comprehensive training programs, 
              expert consultancy, and internationally recognized certifications.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link 
                href="/courses" 
                className="btn-adventure flex items-center justify-center gap-2 text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-lg"
              >
                <Award size={20} />
                Explore Courses
              </Link>
              <a
                href="https://www.youtube.com/watch?v=TAD8F87NCxk"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex items-center justify-center gap-2 text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-lg"
              >
                <Play size={20} />
                Watch Introduction
              </a>
            </div>

            {/* Stats - Arranged like reference image */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 pt-6 md:pt-8 border-t border-white/20">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-white">1K+</div>
                <div className="text-sm text-gray-200">Trained Professionals</div>
              </div>
              <div className="sm:border-l sm:border-white/20 sm:pl-6 md:pl-8">
                <div className="text-base md:text-lg font-semibold text-white">First Aid Training</div>
                <div className="flex items-center gap-2 text-sm text-gray-200 mt-1">
                  <Clock size={14} />
                  Next: March 15
                </div>
                <Link 
                  href="/contact" 
                  className="btn-adventure flex items-center justify-center text-sm md:text-sm px-1 md:px-8 py-1 md:py-4 rounded-3xl mt-1"
                >
                  Enquire Now →
                </Link>
              </div>
              <div className="sm:border-l sm:border-white/20 sm:pl-6 md:pl-8">
                <div className="text-base md:text-lg font-semibold text-white">Our Success</div>
                <p className="text-sm text-gray-200 mt-1 line-clamp-2">
                  98% certification success rate with industry...
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Safety Training Image with overlay elements */}
          <div className="relative mt-8 md:mt-0">
            {/* Main Image Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl md:shadow-2xl border-2 border-white/20 backdrop-blur-sm">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/landing.png" // Replace with your actual image
                  alt="Online Learning Platform"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Overlay Stats Card - Top Right */}
                <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/90 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-lg max-w-[150px] md:max-w-[180px]">
                  <div className="text-center">
                    <div className="text-xl md:text-2xl font-bold text-gray-900">1K+</div>
                    <div className="text-xs md:text-sm text-gray-600">Professionals Trained</div>
                  </div>
                </div>
                
                {/* Overlay Class Card - Bottom Left */}
                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-white/90 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-lg max-w-[160px] md:max-w-[200px]">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm md:text-base">First Aid Certification</h4>
                    <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 mt-1">
                      <Clock size={12} />
                      March 15, 10:00 AM
                    </div>
                    {/* <button className="mt-2 md:mt-3 bg-accent-600 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-semibold hover:bg-accent-700 transition-colors">
                      Reserve Seat
                    </button> */}
                  </div>
                </div>
                
                {/* Rating Badge - Bottom Right */}
                <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-white p-2 md:p-3 rounded-full shadow-lg">
                  <div className="flex items-center gap-1">
                    <Star size={16} className="fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-gray-900 text-sm md:text-base">4.9</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional Success Info Card below the image */}
            <div className="mt-4 md:mt-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg border border-white/20">
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">Our Training Success</h3>
              <p className="text-gray-600 text-xs md:text-sm">
                With 10+ years of experience, we've certified 1,000+ professionals across 25+ safety courses, achieving a 98% success rate through strong industry partnership
              </p>
            </div>
          </div>
        </div>
        <div className='mt-24'>
          <ImageCarousel />
        </div>
      </div>
    </section>
  );
};

export default Hero;