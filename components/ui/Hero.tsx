'use client';

import { Play, Shield, Award, Users, Clock, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ImageCarousel from './ImageCarousel';
import ReactPlayer from 'react-player';
import { useState, useEffect } from 'react';
import { trainingService, Training } from '@/app/api_services/trainingService';

interface UpcomingSession {
  trainingTitle: string;
  formattedDate: string;
  time: string;
  startDate: Date;
}

const Hero = () => {
  const [showFallback, setShowFallback] = useState(false);
  const [upcomingSessions, setUpcomingSessions] = useState<UpcomingSession[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextSession, setNextSession] = useState<UpcomingSession | null>(null);

  useEffect(() => {
    // Fallback timeout in case video fails silently
    const timeout = setTimeout(() => {
      setShowFallback(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const fetchUpcomingSessions = async () => {
      try {
        const response = await trainingService.getAllTrainings();
        const trainings = response.trainings;

        // Get all upcoming sessions from all trainings
        const allUpcomingSessions: UpcomingSession[] = [];

        trainings.forEach(training => {
          training.sessions.forEach(session => {
            const sessionDate = new Date(session.startDate);
            if (sessionDate >= new Date()) {
              allUpcomingSessions.push({
                trainingTitle: training.title,
                formattedDate: trainingService.formatDate(session.startDate),
                time: sessionDate.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                }),
                startDate: sessionDate
              });
            }
          });
        });

        // Sort by date and take the next 5 upcoming sessions
        const sortedSessions = allUpcomingSessions
          .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
          .slice(0, 5);

        setUpcomingSessions(sortedSessions);
        // Set the very next session for the stats section
        if (sortedSessions.length > 0) {
          setNextSession(sortedSessions[0]);
        }
      } catch (error) {
        console.error('Error fetching upcoming sessions:', error);
        // Keep empty array on error
      }
    };

    fetchUpcomingSessions();
  }, []);

  // Auto-slide every 4 seconds
  useEffect(() => {
    if (upcomingSessions.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % upcomingSessions.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [upcomingSessions.length]);

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
          src="/videos/hero_bg.jpeg"
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
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/10"></div>
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
                  <div className="text-2xl md:text-3xl font-bold text-white">38k+ trained.</div>
                <div className="text-sm text-gray-200">trained</div>
              </div>
              <div className="sm:border-l sm:border-white/20 sm:pl-6 md:pl-8">
                {nextSession ? (
                  <>
                    <div className="text-base md:text-lg font-semibold text-white truncate">{nextSession.trainingTitle}</div>
                    <div className="flex items-center gap-2 text-sm text-gray-200 mt-1">
                      <Clock size={14} />
                      Next: {nextSession.formattedDate}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-base md:text-lg font-semibold text-white">No Upcoming Training</div>
                    <div className="flex items-center gap-2 text-sm text-gray-200 mt-1">
                      <Clock size={14} />
                      Next: TBA
                    </div>
                  </>
                )}
                {upcomingSessions.length > 1 && (
                  <div className="flex justify-center gap-1 mt-2">
                    {upcomingSessions.map((session, index) => (
                      <div
                        key={`${session.startDate.getTime()}-${index}`}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          index === currentIndex
                            ? 'bg-white'
                            : 'bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                )}
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
                  Strong completion and certification record...
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Safety Training Image with overlay elements */}
          <div className="relative mt-8 md:mt-0">
            {/* Main Image Container with floating animation */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20 group hover:shadow-3xl transition-all duration-500">
              <div className="aspect-[3/3] relative overflow-hidden">
                <Image
                  src="/images/landing_updated.png"
                  alt="Online Learning Platform"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                
                {/* Gradient overlay for better card visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/30"></div>
                
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                {/* Overlay Stats Card - Top Right */}
                <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 md:p-4 shadow-lg max-w-[150px] md:max-w-[180px] hover:bg-white/20 hover:scale-105 transition-all duration-300">
                  <div className="text-center">
                    <div className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">38k+</div>
                    <div className="text-xs md:text-sm text-white/90 font-medium">trained</div>
                  </div>
                </div>
                
                {/* Overlay Upcoming Training Slider - Bottom Left */}
                {upcomingSessions.length > 0 && (
                  <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 md:p-4 shadow-lg max-w-[160px] md:max-w-[200px] hover:bg-white/20 hover:scale-105 transition-all duration-300">
                    <div className="relative overflow-hidden">
                      {upcomingSessions.map((session, index) => (
                        <div
                          key={`${session.startDate.getTime()}-${index}`}
                          className={`transition-all duration-500 ease-in-out ${
                            index === currentIndex
                              ? 'opacity-100 translate-y-0'
                              : 'opacity-0 translate-y-2 absolute inset-0'
                          }`}
                        >
                          <h4 className="font-semibold text-white text-sm md:text-base drop-shadow-lg truncate">
                            {session.trainingTitle}
                          </h4>
                          <div className="flex items-center gap-2 text-xs md:text-sm text-white/90 mt-1">
                            <Clock size={12} className="text-white animate-pulse" />
                            {session.formattedDate}, {session.time}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Slider Indicators */}
                      {upcomingSessions.length > 1 && (
                      <div className="flex justify-center gap-1 mt-2">
                        {upcomingSessions.map((session, index) => (
                          <div
                            key={`${session.startDate.getTime()}-${index}`}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                              index === currentIndex
                                ? 'bg-white'
                                : 'bg-white/40'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
                
                {/* Rating Badge - Bottom Right */}
                <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-white/10 backdrop-blur-md border border-white/20 p-2 md:p-2.5 rounded-full shadow-lg hover:bg-white/20 hover:scale-110 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-1.5">
                    <Star size={18} className="fill-yellow-400 text-yellow-400 drop-shadow-lg" />
                    <span className="font-bold text-white text-sm md:text-base drop-shadow-lg">4.9</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional Success Info Card below the image */}
            <div className="mt-4 md:mt-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 md:p-6 shadow-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-accent-500/20 rounded-lg">
                  <Award size={20} className="text-accent-300" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-white mb-1 drop-shadow-lg">Our Training Success</h3>
                  <p className="text-white/80 text-xs md:text-sm">
                    With over 2 decades of experience, we've certified thousands of professionals across various safety courses, achieving a strong completion and certification record through industry partnerships.
                  </p>
                </div>
              </div>
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
