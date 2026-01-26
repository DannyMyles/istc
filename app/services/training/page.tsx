'use client';
import { GraduationCap, CheckCircle, Calendar, Clock, Users, FileText, ArrowLeft, Phone, Mail, BookOpen, Target, Award, Brain } from 'lucide-react';
import Link from 'next/link';

export default function TrainingProgramDevelopment() {
  const serviceData = {
    title: 'Training Program Development',
    subtitle: 'Customized Learning Solutions for Your Organization',
    description: 'Design and development of tailored training programs that address your specific safety training needs and organizational objectives.',
    overview: 'Every organization has unique training requirements based on their industry, workforce characteristics, and safety challenges. Our instructional design experts work closely with you to develop customized training programs that are engaging, effective, and aligned with your operational needs and regulatory requirements.',
    
    duration: '4-12 weeks (program development)',
    format: 'Custom Design & Delivery',
    level: 'Bespoke Training Solutions',
    nextIntake: 'Custom scheduling available',
    
    services: [
      { icon: <Brain size={20} />, title: 'Needs Assessment', desc: 'Comprehensive analysis of your training requirements and learner profiles' },
      { icon: <BookOpen size={20} />, title: 'Curriculum Design', desc: 'Development of structured learning paths and course materials' },
      { icon: <Target size={20} />, title: 'Custom Content Creation', desc: 'Tailored training materials specific to your industry and hazards' },
      { icon: <GraduationCap size={20} />, title: 'Delivery Options', desc: 'Flexible delivery modes: in-person, online, or blended learning' },
      { icon: <Award size={20} />, title: 'Assessment Design', desc: 'Competency-based assessments and certification criteria' },
      { icon: <Users size={20} />, title: 'Trainer Development', desc: 'Training your internal trainers for sustainable capability building' }
    ],
    
    processSteps: [
      'Organizational training needs analysis',
      'Learner profile and competency mapping',
      'Learning objectives development',
      'Curriculum and content design',
      'Training material creation and localization',
      'Pilot testing and feedback integration',
      'Full program rollout',
      'Evaluation and continuous improvement'
    ],
    
    legalRequirements: [
      'OSHA 2007 training requirements',
      'Industry-specific competency standards',
      'Certification and assessment criteria',
      'Record keeping and documentation',
      'Trainer qualification requirements',
      'Learner assessment and evaluation',
      'Continuing professional development',
      'Accreditation and endorsement requirements'
    ],
    
    deliverables: [
      'Comprehensive training needs report',
      'Custom curriculum and lesson plans',
      'Training materials and presentations',
      'Assessment tools and rubrics',
      'Trainer guides and facilitation notes',
      'Learner workbooks and resources',
      'Evaluation and feedback mechanisms',
      'Implementation support package'
    ],
    
    benefits: [
      'Training precisely matched to your needs',
      'Improved learning outcomes and retention',
      'Enhanced employee engagement and participation',
      'Compliance with regulatory training mandates',
      'Development of internal training capabilities',
      'Cost-effective compared to off-the-shelf solutions',
      'Scalable training delivery across your organization',
      'Measurable competency development'
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24">
      <div className="bg-gradient-to-r from-[#039AC5] to-[#008DB8] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <Link href="/services" className="text-cyan-200 hover:text-white flex items-center gap-2">
                <ArrowLeft size={20} /> Back to all services
              </Link>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <GraduationCap className="text-cyan-200" size={24} />
                  <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-semibold">
                    Custom Solutions
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {serviceData.title}
                </h1>
                <p className="text-xl text-cyan-100 mb-6">
                  {serviceData.subtitle}
                </p>
                <p className="text-cyan-200 text-lg">
                  {serviceData.description}
                </p>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-4">Customize Your Training</h3>
                  <p className="text-cyan-200 text-sm mb-6">Let us design a training program that fits your unique requirements.</p>
                  
                  <Link
                    href="/contact"
                    className="w-full bg-white text-[#039AC5] hover:bg-cyan-50 py-3 rounded-xl font-semibold text-lg transition-colors mb-4 flex items-center justify-center"
                  >
                    Discuss Your Needs
                  </Link>
                  
                  <div className="space-y-3">
                    <a href="tel:+254700364722" className="flex items-center justify-center gap-2 text-cyan-200 hover:text-white py-2">
                      <Phone size={18} /> +254 700 364 722
                    </a>
                    <a href="mailto:hsetraining@istc.co.ke" className="flex items-center justify-center gap-2 text-cyan-200 hover:text-white py-2">
                      <Mail size={18} /> hsetraining@istc.co.ke
                    </a>
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Overview</h2>
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <p className="text-gray-700 text-lg mb-6">
                      {serviceData.overview}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex items-center gap-3">
                        <Calendar className="text-[#039AC5]" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Development Time</div>
                          <div className="text-gray-600">{serviceData.duration}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="text-[#039AC5]" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Format</div>
                          <div className="text-gray-600">{serviceData.format}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <GraduationCap className="text-[#039AC5]" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Level</div>
                          <div className="text-gray-600">{serviceData.level}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="text-[#039AC5]" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Scheduling</div>
                          <div className="text-gray-600">{serviceData.nextIntake}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Development Services</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {serviceData.services.map((item, index) => (
                      <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-cyan-100">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-cyan-100 p-2 rounded-lg text-[#039AC5]">
                            {item.icon}
                          </div>
                          <h3 className="font-bold text-gray-900">{item.title}</h3>
                        </div>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Development Process</h2>
                  <div className="space-y-4">
                    {serviceData.processSteps.map((step, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="bg-[#039AC5] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="bg-cyan-50 p-4 rounded-xl flex-1">
                          <p className="text-gray-700">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="lg:col-span-1 space-y-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-cyan-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Standards</h3>
                  <ul className="space-y-3">
                    {serviceData.legalRequirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-[#039AC5] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 text-sm">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border border-cyan-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Benefits</h3>
                  <div className="space-y-3">
                    {serviceData.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="text-[#039AC5] mt-1 flex-shrink-0" size={18} />
                        <span className="text-gray-700 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#039AC5] text-white rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4">Tailored Learning</h3>
                  <p className="text-cyan-100 mb-6">
                    Get training programs designed specifically for your organization's unique challenges.
                  </p>
                  <a 
                    href="mailto:hsetraining@istc.co.ke"
                    className="flex items-center justify-center gap-2 bg-white text-[#039AC5] hover:bg-cyan-50 py-3 rounded-xl font-semibold transition-colors"
                  >
                    <Mail size={18} />
                    Start Development
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

