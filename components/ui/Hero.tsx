'use client';

import { Play, Shield, Award, Users, Clock } from 'lucide-react';
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
          
          {/* Left Content */}
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
                className="btn-adventure flex items-center justify-center gap-2 text-lg px-8 py-4"
              >
                <Award size={20} />
                Explore Courses
              </Link>
              <Link 
                href="/consultation" 
                className="btn-adventure-outline flex items-center justify-center gap-2 text-lg px-8 py-4"
              >
                <Play size={20} />
                Watch Introduction
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-800">15K+</div>
                <div className="text-sm text-gray-600">Trained Professionals</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-800">98%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-800">25+</div>
                <div className="text-sm text-gray-600">Certified Courses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-800">16</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image/Illustration */}
          <div className="relative">
            <div className="relative z-10">
              {/* Main Card */}
              <div className="bg-white rounded-2xl shadow-adventure-lg p-8">
                <div className="aspect-video bg-gradient-to-br from-accent-100 to-accent-200 rounded-xl mb-6 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <Shield size={40} className="text-accent-600" />
                    </div>
                    <h3 className="text-xl font-bold text-accent-800 mb-2">Safety First</h3>
                    <p className="text-gray-600">Protecting lives through quality training</p>
                  </div>
                </div>
                
                {/* Notification Cards */}
                <div className="space-y-4">
                  <div className="bg-accent-50 p-4 rounded-xl flex items-center gap-4">
                    <div className="bg-accent-100 p-2 rounded-lg">
                      <Users className="text-accent-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-accent-800">Group Training Available</h4>
                      <p className="text-sm text-gray-600">Corporate packages with discounts</p>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-xl flex items-center gap-4">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Clock className="text-green-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-800">Next Course Starts Soon</h4>
                      <p className="text-sm text-gray-600">First Aid Training - March 15</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-adventure-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-800">4.9</div>
                  <div className="text-sm text-gray-600">Rating</div>
                  <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-accent-600 text-white p-4 rounded-xl shadow-adventure-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold">25%</div>
                  <div className="text-sm">Early Bird Discount</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;