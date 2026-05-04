'use client';

import { Calendar, Clock, Flame, Award, BookOpen, Users, CheckCircle, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export default function FireSafetyCourseDiploma() {
  
  const courseData = {
title: 'Certificate in Fire Science, Operations and Safety',
    subtitle: 'Fire Professional Diploma Programme',
description: 'The International Safety Training Centre, in collaboration with the Institute of Fire Engineers, is offering a Certificate in Fire Science, Operations, and Safety for fire professionals. The qualification’s content and structure have been designed to reflect best professional practices and to cover essential knowledge and understanding in the fields of fire engineering science, fire service operations, and fire safety.',
overview: 'The qualification’s content and structure have been designed to reflect best professional practices and to cover essential knowledge and understanding in the fields of fire engineering science, fire service operations, and fire safety.',
    
duration: '3 months',
    format: 'Evening & Weekend Classes',
    level: 'Professional Diploma',
    partnership: 'In collaboration with Institute of Fire Engineers',
nextIntake: 'Refer to training calendar',
    
    scheduleOptions: [
      { type: 'Evening Classes', time: '5:30 PM - 7:30 PM', days: 'Monday to Friday' },
      { type: 'Weekend Classes', time: '8:00 AM - 4:00 PM', days: 'Saturday' }
    ],
    
    courseContent: [
      {
        section: 'Fire Engineering Science',
        topics: ['Mathematics', 'Physical properties of matter', 'Mechanics', 'Heat', 'Hydraulics', 'Chemistry', 'Electricity']
      },
      {
        section: 'Fire Service Operations',
        topics: ['Incident command system', 'Search and Rescue', 'Fire fighting', 'Ventilation and salvage', 'Equipment and Appliances']
      },
      {
        section: 'Fire Safety',
        topics: ['Elements of construction', 'Fire safety Practice', 'Fixed Installations']
      }
    ],
    
certification: 'Certificate in Fire Science, Operations and Safety from Institute of Fire Engineers.',
    
    entryRequirements: [
      'Interest in fire safety and prevention',
      'Basic education qualification',
      'Commitment to complete 183 contact hours'
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section with Background Image */}
      <div className="relative bg-gradient-to-r from-cyan-600 to-cyan-500 text-white py-12 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: "url('/images/6.jpg')"
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
                    IFE Certified
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {courseData.title}
                </h1>
                <p className="text-xl text-blue-100 mb-6">
                  {courseData.subtitle}
                </p>
                <p className="text-blue-200 text-lg">
                  {courseData.description}
                </p>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="mb-6">
                    <p className="text-blue-200 text-sm">Duration: {courseData.duration}</p>
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

      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-12">
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Overview</h2>
                  <div className="bg-white adventure-card p-8">
                    <p className="text-gray-700 text-lg mb-6">
                      {courseData.overview}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div className="flex items-center gap-3">
                        <Clock className="text-[#039AC5]" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Duration</div>
                          <div className="text-gray-600">{courseData.duration}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <BookOpen className="text-[#039AC5]" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Format</div>
                          <div className="text-gray-600">{courseData.format}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Award className="text-[#039AC5]" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Level</div>
                          <div className="text-gray-600">{courseData.level}</div>
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
                    
                    <div className="bg-[#039AC5]/10 p-4 rounded-xl">
                      <div className="font-semibold text-[#039AC5] mb-2">Partnership</div>
                      <p className="text-gray-700">{courseData.partnership}</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h2>
                  <div className="space-y-6">
                    {courseData.courseContent.map((section, index) => (
                      <div key={index} className="bg-white p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">{section.section}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {section.topics.map((topic, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <CheckCircle className="text-[#039AC5]" size={16} />
                              <span className="text-gray-700">{topic}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="lg:col-span-1 space-y-8">
                <div className="bg-white adventure-card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Schedule Options</h3>
                  <div className="space-y-4">
                    {courseData.scheduleOptions.map((option, index) => (
                      <div key={index} className="border border-[#039AC5]/20 rounded-xl p-4">
                        <div className="font-medium text-gray-900 mb-2">{option.type}</div>
                        <div className="text-sm text-gray-600">
                          <div className="flex items-center gap-2 mb-1">
                            <Clock size={14} />
                            {option.time}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar size={14} />
                            {option.days}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white adventure-card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Certification</h3>
                  <div className="bg-[#039AC5]/10 p-4 rounded-xl">
                    <Award className="text-[#039AC5] mb-3" size={24} />
                    <p className="text-gray-700">{courseData.certification}</p>
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