'use client';

import { useState } from 'react';
import { Calendar, Clock, Award, Shield, BookOpen, CheckCircle, GraduationCap, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export default function OccupationalSafetyHealthCertificate() {
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);
  
  const courseData = {
    title: 'Occupational Safety & Health Certificate',
    subtitle: 'Professional Certificate Programme',
    description: 'A short professional certificate intended to equip participants with necessary knowledge and skills on matters of Occupational Safety and Health.',
    overview: 'Designed to educate on occupational safety and health systems and practices with the aim of reducing or achieving zero accident levels and understanding applicable legislation.',
    
    duration: '3 months',
    format: 'Classroom & Practical Sessions',
    level: 'Professional Certificate',
    price: 'Ksh 45,000',
    nextIntake: 'Monthly Intakes Available',
    
    whoShouldAttend: [
      'Those already in a safety and health role',
      'Individuals looking to enter the safety industry',
      'Managers responsible for workplace safety',
      'Team leaders and supervisors'
    ],
    
    courseTopics: [
      'Introduction to Occupational Safety & Health',
      'Legal Framework and Compliance',
      'Risk Assessment and Management',
      'Accident Investigation and Reporting',
      'Safety Inspections and Audits',
      'Emergency Preparedness and Response',
      'Safety Communication and Training',
      'Personal Protective Equipment (PPE)'
    ],
    
    learningOutcomes: [
      'Understand OSH legal requirements',
      'Conduct basic risk assessments',
      'Implement safety procedures',
      'Maintain safety documentation'
    ],
    
    certification: 'Certificate in Occupational Safety and Health upon successful completion.',
    
    entryRequirements: [
      'Basic education background',
      'Interest in workplace safety',
      'No prior experience required'
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24">
      <div className="bg-gradient-to-r from-accent-800 to-accent-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <Link href="/courses" className="text-accent-200 hover:text-white flex items-center gap-2">
                ← Back to all courses
              </Link>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="text-accent-200" size={24} />
                  <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-semibold">
                    Professional Certificate
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {courseData.title}
                </h1>
                <p className="text-xl text-accent-100 mb-6">
                  {courseData.subtitle}
                </p>
                <p className="text-accent-200 text-lg">
                  {courseData.description}
                </p>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="mb-6">
                    <div className="text-3xl font-bold mb-2">{courseData.price}</div>
                    <p className="text-accent-200 text-sm">Course fee inclusive of materials</p>
                  </div>
                  
                  <button 
                    onClick={() => setShowEnrollmentForm(true)}
                    className="w-full bg-white text-accent-800 hover:bg-accent-100 py-3 rounded-xl font-semibold text-lg transition-colors mb-4"
                  >
                    Enroll Now
                  </button>
                  
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <div className="flex items-center justify-center gap-4">
                      <a href="tel:+254700364722" className="flex items-center gap-2 text-accent-200 hover:text-white">
                        <Phone size={18} />
                        <span>Call Now</span>
                      </a>
                      <a href="mailto:info@istc.co.ke" className="flex items-center gap-2 text-accent-200 hover:text-white">
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
                        <Calendar className="text-accent-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Duration</div>
                          <div className="text-gray-600">{courseData.duration}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="text-accent-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Format</div>
                          <div className="text-gray-600">{courseData.format}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Award className="text-accent-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Level</div>
                          <div className="text-gray-600">{courseData.level}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="text-accent-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Next Intake</div>
                          <div className="text-gray-600">{courseData.nextIntake}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Topics</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {courseData.courseTopics.map((topic, index) => (
                      <div key={index} className="flex items-start gap-3 bg-white adventure-card p-4">
                        <div className="bg-accent-100 p-2 rounded-lg">
                          <CheckCircle className="text-accent-600" size={20} />
                        </div>
                        <span className="text-gray-700 font-medium">{topic}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="lg:col-span-1 space-y-8">
                <div className="bg-white adventure-card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Who Should Attend</h3>
                  <ul className="space-y-3">
                    {courseData.whoShouldAttend.map((attendee, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-accent-600 rounded-full mt-2"></div>
                        <span className="text-gray-600">{attendee}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white adventure-card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Certification</h3>
                  <div className="bg-accent-50 p-4 rounded-xl">
                    <Award className="text-accent-600 mb-3" size={24} />
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