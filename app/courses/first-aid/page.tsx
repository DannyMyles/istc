'use client';

import { Calendar, Clock, Award, Heart, Phone, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function FirstAid() {
  const courses = [
    {
      title: 'Occupational First Aid',
      duration: '3 days',
      description: 'For individuals who wish to take the role of nominated first aiders in the workplace.',
      href: '/courses/first-aid/occupational',
      icon: Heart
    },
    {
      title: 'Basic First Aid',
      duration: '1 day',
      description: 'Aimed to equip participants with basic lifesaving skills and information to deal with emergency situations.',
      href: '/courses/first-aid/basic',
      icon: Heart
    },
    {
      title: 'Paediatric First Aid',
      duration: '1 day',
      description: 'For people who work with or look after children, enabling them to have basic knowledge on how to deal with pediatric emergency situations.',
      href: '/courses/first-aid/paediatric',
      icon: Heart
    },
    {
      title: 'First Aid Refresher',
      duration: '2 days',
      description: 'For people intending to requalify in their role as first aiders in the workplace.',
      href: '/courses/first-aid/refresher',
      icon: Heart
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-cyan-600 to-cyan-500 text-white py-16 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: "url('/images/first-aid.webp')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/80 to-cyan-700/60"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <Link href="/courses" className="text-cyan-200 hover:text-white flex items-center gap-2">
                ← Back to all courses
              </Link>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="text-cyan-200" size={24} />
                  <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-semibold">
                    First Aid Training
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  First Aid Training Programs
                </h1>
                <p className="text-xl text-cyan-100 mb-6">
                  Comprehensive emergency response training for all levels
                </p>
                <p className="text-cyan-200 text-lg">
All courses lead to certification valid for 1 year.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-center mb-6">
                  <Award className="text-cyan-200 mx-auto mb-3" size={48} />
                  <h3 className="text-xl font-semibold text-white">Certification</h3>
All courses include certification valid for 1 year
                </div>
                
                <Link 
                  href="/contact"
                  className="block w-full bg-white text-cyan-600 hover:bg-cyan-50 py-3 rounded-xl font-semibold text-lg transition-colors mb-4 text-center"
                >
                  Enquire Now
                </Link>
                
                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="flex items-center justify-center gap-6">
                    <a href="tel:+254700364722" className="flex items-center gap-2 text-cyan-200 hover:text-white">
                      <Phone size={18} />
                      <span>Call Now</span>
                    </a>
                    <a href="mailto:info@istc.co.ke" className="flex items-center gap-2 text-cyan-200 hover:text-white">
                      <Mail size={18} />
                      <span>Email Us</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Listing */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Our First Aid Courses
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course, index) => (
                <Link
                  key={index}
                  href={course.href}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-cyan-100 p-3 rounded-xl group-hover:bg-cyan-600 transition-colors">
                      <course.icon className="text-cyan-600 group-hover:text-white transition-colors" size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
                        <div className="flex items-center gap-1 text-gray-500 text-sm">
                          <Clock size={16} />
                          <span>{course.duration}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{course.description}</p>
                      <div className="flex items-center gap-2 text-cyan-600 font-medium group-hover:gap-3 transition-all">
                        <span>View Course Details</span>
                        <ArrowRight size={18} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Training Info Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-md text-center">
                <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="text-cyan-600" size={32} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Weekly Intakes</h3>
                <p className="text-gray-600">Courses run every week with flexible scheduling to accommodate your needs.</p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-md text-center">
                <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="text-cyan-600" size={32} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Certified Training</h3>
                <p className="text-gray-600">All courses are certified and recognized for workplace safety compliance.</p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-md text-center">
                <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-cyan-600" size={32} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Hands-On Learning</h3>
                <p className="text-gray-600">Practical training with real-world scenarios and CPR/AED equipment.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

