'use client';

import { useState } from 'react';
import { Calendar, Clock, Flame, Award, Users, CheckCircle, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export default function FireSafetyCourseCertificate() {
  const [selectedCourse, setSelectedCourse] = useState('basic');
  
  const courses = {
    basic: {
      title: 'Basic Fire Safety',
      duration: '1 day',
      description: 'Aimed at imparting knowledge to anyone who requires basic knowledge on fire nature, classification, causes, firefighting appliances, and prevention methods.',
      content: [
        'Nature and behaviour of fire',
        'Fire classification systems',
        'Causes of fire in workplaces',
        'Safe use of firefighting appliances',
        'Fire prevention methods',
        'Emergency evacuation procedures'
      ]
    },
    marshal: {
      title: 'Fire Marshals Training',
      duration: '3 days',
      description: 'Aimed to equip participants with necessary knowledge on fire safety, emergency preparedness, evacuation, and escape to become effective Fire Marshals.',
      content: [
        'Fire safety legislation',
        'Fire risk assessment',
        'Emergency preparedness planning',
        'Evacuation procedures',
        'Fire marshal responsibilities',
        'Fire safety inspections',
        'Record keeping and reporting'
      ]
    }
  };

  const currentCourse = courses[selectedCourse as keyof typeof courses];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section with Background Image */}
      <div className="relative bg-gradient-to-r from-cyan-600 to-cyan-500 text-white py-12 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: "url('/images/5.jpg')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/80 to-cyan-700/60"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <Link href="/courses" className="text-blue-200 hover:text-white flex items-center gap-2">
                ← Back to all courses
              </Link>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <Flame className="text-blue-200" size={24} />
                  <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-semibold">
                    Fire Safety Certification
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Fire Safety Certificate Courses
                </h1>
                <p className="text-xl text-blue-100 mb-6">
                  Professional Fire Safety Training
                </p>
                <p className="text-blue-200 text-lg">
                  Choose from our range of fire safety courses designed for different roles and responsibilities.
                </p>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="mb-6">
                    <p className="text-blue-200 text-sm">Duration: {currentCourse.duration}</p>
                  </div>
                  
                  <Link 
                    href="/contact"
                    className="block w-full bg-white text-[#039AC5] hover:bg-blue-50 py-3 rounded-xl font-semibold text-lg transition-colors mb-4 text-center"
                  >
                    Enquire Now
                  </Link>
                  
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <div className="flex items-center justify-center gap-4">
                      <a href="tel:+254700364722" className="flex items-center gap-2 text-blue-200 hover:text-white">
                        <Phone size={18} />
                        <span>Call Now</span>
                      </a>
                      <a href="mailto:info@istc.co.ke" className="flex items-center gap-2 text-blue-200 hover:text-white">
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
      </div>

      {/* Course Selection */}
      <div className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-3">
              {Object.entries(courses).map(([key, course]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCourse(key)}
                  className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                    selectedCourse === key
                      ? 'bg-[#039AC5] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {course.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-12">
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">{currentCourse.title}</h2>
                  <div className="bg-white adventure-card p-8">
                    <p className="text-gray-700 text-lg mb-6">
                      {currentCourse.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex items-center gap-3">
                        <Calendar className="text-[#039AC5]" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Duration</div>
                          <div className="text-gray-600">{currentCourse.duration}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="text-[#039AC5]" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Format</div>
                          <div className="text-gray-600">Classroom & Practical</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Award className="text-[#039AC5]" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Level</div>
                          <div className="text-gray-600">Certificate</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="text-[#039AC5]" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Next Intake</div>
                         <Link href="/calendar" className="text-[#039AC5] hover:underline">
                            View Training Calendar
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentCourse.content.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 bg-white p-4" style={{ transition: 'none' }}>
                        <div className="bg-[#039AC5]/10 p-2 rounded-lg">
                          <CheckCircle className="text-[#039AC5]" size={20} />
                        </div>
                        <span className="text-gray-700 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="lg:col-span-1 space-y-8">
                <div className="bg-white adventure-card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">All Course Options</h3>
                  <div className="space-y-4">
                    {Object.entries(courses).map(([key, course]) => (
                      <div 
                        key={key}
                        onClick={() => setSelectedCourse(key)}
                        className={`p-4 rounded-xl cursor-pointer transition-colors ${
                          selectedCourse === key ? 'bg-blue-50 border border-[#039AC5]/20' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="font-medium text-gray-900 mb-1">{course.title}</div>
                        <div className="text-sm text-gray-600">{course.duration}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white adventure-card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Certification</h3>
                  <div className="bg-[#039AC5]/10 p-4 rounded-xl">
                    <Award className="text-[#039AC5] mb-3" size={24} />
                    <p className="text-gray-700">Fire Safety Certificate upon successful completion.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}