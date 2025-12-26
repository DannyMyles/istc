'use client';

import { useState } from 'react';
import { Calendar, Clock, Users, Award, BookOpen, CheckCircle, Shield, GraduationCap, Target, ChevronRight, Phone, Mail, Download } from 'lucide-react';
import Link from 'next/link';

export default function OccupationalSafetyHealthDiploma() {
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);
  
  const courseData = {
    title: 'Diploma in Occupational Safety & Health',
    subtitle: '12-Month Modularized Distance Learning Programme',
    description: 'A comprehensive 12 months modularized distance learning programme with occasional tutorial classes offered in collaboration with Cambridge International College.',
    overview: 'This programme covers a wide scope of safety practices and standards applicable both locally and internationally, designed to provide advanced education in Occupational Safety and Health systems and practices.',
    
    duration: '12 months',
    format: 'Distance learning with occasional tutorial classes',
    level: 'Advanced Diploma',
    partnership: 'In collaboration with Cambridge International College',
    price: 'Ksh 160,000',
    nextIntake: 'April 2024',
    
    whoShouldAttend: [
      'Safety and health professionals already in the industry',
      'Individuals looking to enter the safety industry',
      'Safety officers seeking advanced qualifications',
      'Managers responsible for workplace safety'
    ],
    
    courseModules: [
      'Managing Safety and Health in the workplace',
      'Providing a Safe place to work',
      'Fire Safety',
      'Working at Height',
      'Safe use of equipment in the workplace',
      'Transport Safety',
      'Electrical Safety',
      'Hazardous Substances in the workplace',
      'Health and Safety in kitchen and eating places',
      'Psychological Health hazards in the workplace',
      'Health and Safety in Educational establishments',
      'Health Protection'
    ],
    
    learningOutcomes: [
      'Develop advanced safety management systems',
      'Implement comprehensive workplace safety protocols',
      'Conduct thorough risk assessments across industries',
      'Apply international safety standards locally'
    ],
    
    certification: 'Diploma in Occupational Safety and Health from Cambridge International College upon successful completion of all course work and assessments.',
    
    entryRequirements: [
      'Minimum grade of C- in K.C.S.E or equivalent qualification',
      'Basic understanding of workplace environments',
      'Access to computer and internet for distance learning'
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-8">
      <div className="bg-gradient-to-r from-accent-900 to-accent-800 text-[#393A40] py-12">
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
                    Advanced Programme
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
                    <p className="text-accent-200 text-sm">Full programme fee</p>
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
                    
                    <div className="grid grid-cols-2 gap-6 mb-6">
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
                        <Users className="text-accent-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Next Intake</div>
                          <div className="text-gray-600">{courseData.nextIntake}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Modules</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {courseData.courseModules.map((module, index) => (
                      <div key={index} className="flex items-start gap-3 bg-white adventure-card p-4">
                        <div className="bg-accent-100 p-2 rounded-lg">
                          <CheckCircle className="text-accent-600" size={20} />
                        </div>
                        <span className="text-gray-700 font-medium">{module}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="lg:col-span-1 space-y-8">
                <div className="bg-white adventure-card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Entry Requirements</h3>
                  <ul className="space-y-3">
                    {courseData.entryRequirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <GraduationCap className="text-accent-600 mt-1" size={18} />
                        <span className="text-gray-600">{requirement}</span>
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