
'use client';

import { Calendar, Clock, Award, Heart, Users, CheckCircle, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export default function PaediatricFirstAid() {
  const course = {
    title: 'Paediatric First Aid',
    duration: '1 day',
    description: 'For people who work with or look after children, enabling them to have basic knowledge on how to deal with pediatric emergency situations.',
    content: [
      'Child CPR techniques',
      'Pediatric choking',
      'Childhood illnesses',
      'Febrile convulsions',
      'Accident prevention'
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24">
      <div className="bg-gradient-to-r from-red-600 to-red-500 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <Link href="/courses/first-aid" className="text-red-200 hover:text-white flex items-center gap-2">
                ← Back to First Aid Courses
              </Link>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="text-red-200" size={24} />
                  <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-semibold">
                    First Aid Training
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {course.title}
                </h1>
                <p className="text-xl text-red-100 mb-6">
                  Specialized first aid training for children and infants
                </p>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="mb-6">
                    <p className="text-red-200 text-sm">Duration: {course.duration}</p>
                  </div>
                  
                  <Link 
                    href="/contact"
                    className="block w-full bg-white text-red-600 hover:bg-red-100 py-3 rounded-xl font-semibold text-lg transition-colors mb-4 text-center"
                  >
                    Enquire Now
                  </Link>
                  
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

      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-12">
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Overview</h2>
                  <div className="bg-white adventure-card p-8">
                    <p className="text-gray-700 text-lg mb-6">
                      {course.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex items-center gap-3">
                        <Calendar className="text-red-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Duration</div>
                          <div className="text-gray-600">{course.duration}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="text-red-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Format</div>
                          <div className="text-gray-600">Practical & Theory</div>
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
                    {course.content.map((item, index) => (
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Other First Aid Courses</h3>
                  <div className="space-y-4">
                    <Link 
                      href="/courses/first-aid/occupational"
                      className="block p-4 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div className="font-medium text-gray-900 mb-1">Occupational First Aid</div>
                      <div className="text-sm text-gray-600">3 days</div>
                    </Link>
                    <Link 
                      href="/courses/first-aid/basic"
                      className="block p-4 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div className="font-medium text-gray-900 mb-1">Basic First Aid</div>
                      <div className="text-sm text-gray-600">1 day</div>
                    </Link>
                    <Link 
                      href="/courses/first-aid/refresher"
                      className="block p-4 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div className="font-medium text-gray-900 mb-1">First Aid Refresher</div>
                      <div className="text-sm text-gray-600">1 day</div>
                    </Link>
                  </div>
                </div>

                <div className="bg-white adventure-card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Certification</h3>
                  <div className="bg-red-50 p-4 rounded-xl">
                    <Award className="text-red-600 mb-3" size={24} />
                    <p className="text-gray-700">First Aid Certificate valid for 2 years upon successful completion.</p>
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

