'use client';

import { Calendar, Clock, Shield, Users, CheckCircle, Phone, Mail, HardHat, Award } from 'lucide-react';
import Link from 'next/link';

export default function ConstructionSafety() {
  
  const courseData = {
    title: 'Construction Safety Training',
    subtitle: 'Comprehensive Construction Site Safety Programme',
    description: 'Designed for construction workers, supervisors, and managers to ensure safe working practices on construction sites.',
    overview: 'Participants will learn to identify hazards commonly found on construction sites, implement safety measures, and comply with relevant safety regulations and standards.',
    
    duration: '5 days',
    format: 'Classroom & Practical Training',
    level: 'Specialized Training',
    nextIntake: 'Monthly',
    
    targetProfessions: [
      'Construction workers',
      'Site supervisors',
      'Project managers',
      'Safety officers',
      'Contractors and sub-contractors',
      'Equipment operators'
    ],
    
    courseContent: [
      'Construction hazard identification',
      'Scaffolding safety',
      'Excavation and trenching safety',
      'Fall protection systems',
      'Electrical safety on construction sites',
      'Heavy machinery and equipment safety',
      'Material handling and storage',
      'Personal Protective Equipment (PPE)',
      'Emergency response and evacuation',
      'Health and safety regulations compliance'
    ],
    
    learningOutcomes: [
      'Identify and mitigate construction site hazards',
      'Implement effective fall protection measures',
      'Safely operate construction equipment',
      'Develop and enforce site safety plans',
      'Respond effectively to construction emergencies'
    ],
    
    certification: 'Construction Safety Certificate upon successful completion.',
    
    entryRequirements: [
      'Basic understanding of workplace safety',
      'Physical ability to perform construction tasks',
      'No prior certification required'
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section with Background Image */}
      <div className="relative bg-gradient-to-r from-orange-600 to-orange-500 text-white py-12 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: "url('/images/10.jpg')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/80 to-orange-700/60"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <Link href="/courses" className="text-orange-200 hover:text-white flex items-center gap-2">
                ← Back to all courses
              </Link>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <HardHat className="text-orange-200" size={24} />
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
                    <p className="text-orange-200 text-sm">Duration: {courseData.duration}</p>
                  </div>
                  
                  <Link 
                    href="/contact"
                    className="block w-full bg-white text-orange-600 hover:bg-orange-100 py-3 rounded-xl font-semibold text-lg transition-colors mb-4 text-center"
                  >
                    Enquire Now
                  </Link>
                  
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <div className="flex items-center justify-center gap-4">
                      <a href="tel:+254700364722" className="flex items-center gap-2 text-orange-200 hover:text-white">
                        <Phone size={18} />
                        <span>Call Now</span>
                      </a>
                      <a href="mailto:hsetraining@istc.co.ke" className="flex items-center gap-2 text-orange-200 hover:text-white">
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
                        <Users className="text-[#039AC5]" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Level</div>
                          <div className="text-gray-600">{courseData.level}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="text-[#039AC5]" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Next Intake</div>
                          <div className="text-gray-600">{courseData.nextIntake}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Link href="/calendar" className="text-[#039AC5] hover:underline">
                        View Training Calendar →
                      </Link>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Target Professions</h2>
                  <div className="bg-white adventure-card p-8">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {courseData.targetProfessions.map((profession, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                          <span className="text-gray-700">{profession}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h2>
                  <div className="bg-white adventure-card p-8">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {courseData.courseContent.map((content, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="text-[#039AC5] mt-1 flex-shrink-0" size={18} />
                          <span className="text-gray-700">{content}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Outcomes</h2>
                  <div className="bg-white adventure-card p-8">
                    <ul className="space-y-4">
                      {courseData.learningOutcomes.map((outcome, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                          <span className="text-gray-700">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Certification</h2>
                  <div className="bg-white adventure-card p-8">
                    <div className="flex items-start gap-4">
                      <Award className="text-[#039AC5] flex-shrink-0" size={28} />
                      <div>
                        <p className="text-gray-700 text-lg">{courseData.certification}</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Entry Requirements</h2>
                  <div className="bg-white adventure-card p-8">
                    <ul className="space-y-4">
                      {courseData.entryRequirements.map((requirement, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="text-[#039AC5] mt-1 flex-shrink-0" size={18} />
                          <span className="text-gray-700">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  <div className="bg-white adventure-card p-6 rounded-2xl shadow-lg">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Enquiry</h3>
                    <Link 
                      href="/contact"
                      className="block w-full bg-[#039AC5] text-white py-3 rounded-xl font-semibold text-lg hover:bg-[#0284B4] transition-colors text-center mb-4"
                    >
                      Enquire Now
                    </Link>
                    <div className="space-y-3">
                      <a href="tel:+254700364722" className="flex items-center justify-center gap-2 text-gray-700 hover:text-[#039AC5]">
                        <Phone size={18} />
                        <span>+254 700 364 722</span>
                      </a>
                      <a href="mailto:hsetraining@istc.co.ke" className="flex items-center justify-center gap-2 text-gray-700 hover:text-[#039AC5]">
                        <Mail size={18} />
                        <span>hsetraining@istc.co.ke</span>
                      </a>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-[#039AC5] to-[#008DB8] text-white p-6 rounded-2xl shadow-lg">
                    <h3 className="text-lg font-bold mb-4">Why Choose ISTC?</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                        <span>Expert trainers with industry experience</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                        <span>Practical hands-on training</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                        <span>Internationally recognized certification</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                        <span>Flexible training schedules</span>
                      </li>
                    </ul>
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
