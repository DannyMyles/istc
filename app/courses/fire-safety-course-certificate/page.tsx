'use client';

import { useState } from 'react';
import { Calendar, Clock, Flame, Award, Users, CheckCircle, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export default function FireSafetyCourseCertificate() {
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('basic');
  
  const courses = {
    basic: {
      title: 'Basic Fire Safety',
      duration: '1 day',
      price: 'Ksh 5,000',
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
      price: 'Ksh 15,000',
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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24">
      <div className="bg-gradient-to-r from-red-700 to-red-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <Link href="/courses" className="text-red-200 hover:text-white flex items-center gap-2">
                ← Back to all courses
              </Link>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <Flame className="text-red-200" size={24} />
                  <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-semibold">
                    Fire Safety Certification
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Fire Safety Certificate Courses
                </h1>
                <p className="text-xl text-red-100 mb-6">
                  Professional Fire Safety Training
                </p>
                <p className="text-red-200 text-lg">
                  Choose from our range of fire safety courses designed for different roles and responsibilities.
                </p>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="mb-6">
                    <div className="text-3xl font-bold mb-2">{currentCourse.price}</div>
                    <p className="text-red-200 text-sm">For {currentCourse.duration} course</p>
                  </div>
                  
                  <button 
                    onClick={() => setShowEnrollmentForm(true)}
                    className="w-full bg-white text-red-600 hover:bg-red-100 py-3 rounded-xl font-semibold text-lg transition-colors mb-4"
                  >
                    Enroll Now
                  </button>
                  
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <div className="flex items-center justify-center gap-4">
                      <a href="tel:+254700364722" className="flex items-center gap-2 text-red-200 hover:text-white">
                        <Phone size={18} />
                        <span>Call Now</span>
                      </a>
                      <a href="mailto:info@istc.co.ke" className="flex items-center gap-2 text-red-200 hover:text-white">
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
                      ? 'bg-red-600 text-white'
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
                        <Calendar className="text-red-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Duration</div>
                          <div className="text-gray-600">{currentCourse.duration}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="text-red-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Format</div>
                          <div className="text-gray-600">Classroom & Practical</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Award className="text-red-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Level</div>
                          <div className="text-gray-600">Certificate</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="text-red-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Next Intake</div>
                          <div className="text-gray-600">Weekly</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentCourse.content.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 bg-white adventure-card p-4">
                        <div className="bg-red-100 p-2 rounded-lg">
                          <CheckCircle className="text-red-600" size={20} />
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
                          selectedCourse === key ? 'bg-red-50 border border-red-200' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="font-medium text-gray-900 mb-1">{course.title}</div>
                        <div className="text-sm text-gray-600">{course.duration} • {course.price}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white adventure-card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Certification</h3>
                  <div className="bg-red-50 p-4 rounded-xl">
                    <Award className="text-red-600 mb-3" size={24} />
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