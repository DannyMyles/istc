'use client';

import { Calendar, Clock, Car, Shield, Users, CheckCircle, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export default function RoadSafety() {
  
  const courseData = {
    title: 'Road Safety Training',
    subtitle: 'Transport Safety Management Programme',
    description: 'Intended to equip transport managers, drivers, supervisors and logistics staff with the necessary skills to manage transport safety.',
    overview: 'Comprehensive training covering all aspects of road safety management for professionals involved in transport operations.',
    
    duration: '2 days',
    format: 'Classroom & Case Studies',
    level: 'Professional Training',
nextIntake: 'Refer to training calendar',
    
    targetParticipants: [
      'Transport managers and supervisors',
      'Commercial vehicle drivers',
      'Logistics and fleet managers',
      'Safety officers in transport companies',
      'Courier and delivery service staff',
      'Public transport operators'
    ],
    
    courseContent: [
      'Road safety legislation and compliance',
      'Driver behavior and risk assessment',
      'Vehicle safety inspections and maintenance',
      'Accident investigation and reporting',
      'Defensive driving techniques',
      'Emergency response procedures',
      'Fuel efficiency and environmental considerations',
      'Documentation and record keeping'
    ],
    
    learningOutcomes: [
      'Implement effective transport safety policies',
      'Conduct driver risk assessments',
      'Manage vehicle safety inspections',
      'Investigate and report transport accidents'
    ],
    
    certification: 'Road Safety Certificate upon successful completion.',
    
    entryRequirements: [
      'Involvement in transport operations',
      'Basic understanding of road safety',
      'No prior certification required'
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
            backgroundImage: "url('/images/road .webp')"
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
                  <Car className="text-blue-200" size={24} />
                  <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-semibold">
                    Transport Safety
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
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex items-center gap-3">
                        <Calendar className="text-[#039AC5]" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Duration</div>
                          <div className="text-gray-600">{courseData.duration}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="text-[#039AC5]" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Format</div>
                          <div className="text-gray-600">{courseData.format}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Shield className="text-[#039AC5]" size={20} />
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
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {courseData.courseContent.map((content, index) => (
                      <div key={index} className="flex items-start gap-3 bg-white p-4">
                        <div className="bg-[#039AC5]/10 p-2 rounded-lg">
                          <CheckCircle className="text-[#039AC5]" size={20} />
                        </div>
                        <span className="text-gray-700 font-medium">{content}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="lg:col-span-1 space-y-8">
                <div className="bg-white adventure-card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Target Participants</h3>
                  <ul className="space-y-3">
                    {courseData.targetParticipants.map((participant, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-[#039AC5] rounded-full mt-2"></div>
                        <span className="text-gray-600">{participant}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white adventure-card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Certification</h3>
                  <div className="bg-[#039AC5]/10 p-4 rounded-xl">
                    <Shield className="text-[#039AC5] mb-3" size={24} />
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