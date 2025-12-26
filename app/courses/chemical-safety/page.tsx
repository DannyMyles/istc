'use client';

import { useState } from 'react';
import { Calendar, Clock, Shield, Users, CheckCircle, Phone, Mail, FlaskConical } from 'lucide-react';
import Link from 'next/link';

export default function ChemicalSafety() {
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);
  
  const courseData = {
    title: 'Chemical Safety Training',
    subtitle: 'Safe Handling and Management of Hazardous Chemicals',
    description: 'Designed for individuals who handle chemicals in the workplace to ensure that they perform their duties safely.',
    overview: 'Participants will understand the physical and health hazards of chemicals used in the workplace, the importance of MSDS, and identify methods of protection.',
    
    duration: '2 days',
    format: 'Classroom & Practical Demonstrations',
    level: 'Specialized Training',
    price: 'Ksh 15,000',
    nextIntake: 'Bi-weekly',
    
    targetProfessions: [
      'Pesticide handlers and applicators',
      'Laboratory personnel and technicians',
      'Spray painters and coating applicators',
      'Industrial cleaning staff',
      'Chemical storage and warehouse staff',
      'Maintenance workers handling chemicals'
    ],
    
    courseContent: [
      'Chemical hazard identification',
      'Understanding Material Safety Data Sheets (MSDS)',
      'Safe chemical storage and handling',
      'Personal Protective Equipment (PPE) selection',
      'Emergency procedures for chemical spills',
      'Exposure monitoring and control',
      'Waste disposal and environmental protection',
      'Regulatory compliance requirements'
    ],
    
    learningOutcomes: [
      'Identify chemical hazards in the workplace',
      'Interpret and use MSDS effectively',
      'Select appropriate PPE for chemical handling',
      'Implement emergency response procedures'
    ],
    
    certification: 'Chemical Safety Certificate upon successful completion.',
    
    entryRequirements: [
      'Basic understanding of workplace safety',
      'Involvement with chemical handling',
      'No prior certification required'
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24">
      <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <Link href="/courses" className="text-purple-200 hover:text-white flex items-center gap-2">
                ← Back to all courses
              </Link>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <FlaskConical className="text-purple-200" size={24} />
                  <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-semibold">
                    Hazardous Materials
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {courseData.title}
                </h1>
                <p className="text-xl text-purple-100 mb-6">
                  {courseData.subtitle}
                </p>
                <p className="text-purple-200 text-lg">
                  {courseData.description}
                </p>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="mb-6">
                    <div className="text-3xl font-bold mb-2">{courseData.price}</div>
                    <p className="text-purple-200 text-sm">Per participant</p>
                  </div>
                  
                  <button 
                    onClick={() => setShowEnrollmentForm(true)}
                    className="w-full bg-white text-purple-600 hover:bg-purple-100 py-3 rounded-xl font-semibold text-lg transition-colors mb-4"
                  >
                    Enroll Now
                  </button>
                  
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <div className="flex items-center justify-center gap-4">
                      <a href="tel:+254700364722" className="flex items-center gap-2 text-purple-200 hover:text-white">
                        <Phone size={18} />
                        <span>Call Now</span>
                      </a>
                      <a href="mailto:info@istc.co.ke" className="flex items-center gap-2 text-purple-200 hover:text-white">
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
                        <Calendar className="text-purple-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Duration</div>
                          <div className="text-gray-600">{courseData.duration}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="text-purple-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Format</div>
                          <div className="text-gray-600">{courseData.format}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Shield className="text-purple-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Level</div>
                          <div className="text-gray-600">{courseData.level}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="text-purple-600" size={20} />
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
                        <div className="bg-purple-100 p-2 rounded-lg">
                          <CheckCircle className="text-purple-600" size={20} />
                        </div>
                        <span className="text-gray-700 font-medium">{content}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="lg:col-span-1 space-y-8">
                <div className="bg-white adventure-card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Target Professions</h3>
                  <ul className="space-y-3">
                    {courseData.targetProfessions.map((profession, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                        <span className="text-gray-600">{profession}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white adventure-card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Certification</h3>
                  <div className="bg-purple-50 p-4 rounded-xl">
                    <Shield className="text-purple-600 mb-3" size={24} />
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