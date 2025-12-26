'use client';

import { useState } from 'react';
import { Calendar, Clock, Users, Award, Shield, AlertTriangle, CheckCircle, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export default function WorkAtHeight() {
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);
  
  const courseData = {
    title: 'Work at Height Safety Training',
    subtitle: 'Comprehensive Height Safety Programme',
    description: 'Designed for anyone working immediately above ground level and any processes that can lead to workers falling even from ground level.',
    overview: 'Participants will learn to manage risks from working at height, steps to avoid, prevent or reduce risks and accidents.',
    
    duration: '2 days',
    format: 'Practical & Classroom Training',
    level: 'Specialized Training',
    price: 'Ksh 18,000',
    nextIntake: 'Every Monday',
    
    targetIndustries: [
      'Telecommunications industry',
      'Construction industry',
      'Maintenance and repair services',
      'Window cleaning services',
      'Roofing contractors',
      'Any workplace with height risks'
    ],
    
    courseContent: [
      'Legal requirements for work at height',
      'Risk assessment for height work',
      'Fall prevention systems',
      'Personal fall protection equipment',
      'Scaffolding safety',
      'Ladder safety',
      'Emergency rescue procedures',
      'Practical demonstrations'
    ],
    
    learningOutcomes: [
      'Identify height-related hazards',
      'Select appropriate safety equipment',
      'Implement fall prevention measures',
      'Conduct rescue operations'
    ],
    
    certification: 'Work at Height Safety Certificate upon successful completion.',
    
    entryRequirements: [
      'Basic understanding of workplace safety',
      'Physically fit for practical sessions',
      'No prior experience required'
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24">
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <Link href="/courses" className="text-orange-200 hover:text-white flex items-center gap-2">
                ← Back to all courses
              </Link>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="text-orange-200" size={24} />
                  <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-semibold">
                    Specialized Training
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {courseData.title}
                </h1>
                <p className="text-xl text-orange-100 mb-6">
                  {courseData.subtitle}
                </p>
                <p className="text-orange-200 text-lg">
                  {courseData.description}
                </p>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="mb-6">
                    <div className="text-3xl font-bold mb-2">{courseData.price}</div>
                    <p className="text-orange-200 text-sm">Per participant</p>
                  </div>
                  
                  <button 
                    onClick={() => setShowEnrollmentForm(true)}
                    className="w-full bg-white text-orange-600 hover:bg-orange-100 py-3 rounded-xl font-semibold text-lg transition-colors mb-4"
                  >
                    Enroll Now
                  </button>
                  
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <div className="flex items-center justify-center gap-4">
                      <a href="tel:+254700364722" className="flex items-center gap-2 text-orange-200 hover:text-white">
                        <Phone size={18} />
                        <span>Call Now</span>
                      </a>
                      <a href="mailto:info@istc.co.ke" className="flex items-center gap-2 text-orange-200 hover:text-white">
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
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex items-center gap-3">
                        <Calendar className="text-orange-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Duration</div>
                          <div className="text-gray-600">{courseData.duration}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="text-orange-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Format</div>
                          <div className="text-gray-600">{courseData.format}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Award className="text-orange-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Level</div>
                          <div className="text-gray-600">{courseData.level}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="text-orange-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Next Intake</div>
                          <div className="text-gray-600">{courseData.nextIntake}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {courseData.courseContent.map((content, index) => (
                      <div key={index} className="flex items-start gap-3 bg-white adventure-card p-4">
                        <div className="bg-orange-100 p-2 rounded-lg">
                          <CheckCircle className="text-orange-600" size={20} />
                        </div>
                        <span className="text-gray-700 font-medium">{content}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="lg:col-span-1 space-y-8">
                <div className="bg-white adventure-card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Target Industries</h3>
                  <ul className="space-y-3">
                    {courseData.targetIndustries.map((industry, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                        <span className="text-gray-600">{industry}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white adventure-card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Certification</h3>
                  <div className="bg-orange-50 p-4 rounded-xl">
                    <Award className="text-orange-600 mb-3" size={24} />
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