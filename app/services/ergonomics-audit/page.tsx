'use client';
import { useState } from 'react';
import { UserCheck, CheckCircle, Calendar, Clock, Users, FileText, ArrowLeft, Phone, Mail, Monitor, Mouse, Brain } from 'lucide-react';
import { Armchair } from 'lucide-react';
import Link from 'next/link';

export default function ErgonomicsAudit() {
  const [showContactForm, setShowContactForm] = useState(false);
  
  const serviceData = {
    title: 'Ergonomics Audit',
    subtitle: 'Workstation Assessment for Productivity & Injury Prevention',
    description: 'We help companies design healthy ways to work that improve productivity, quality of work and foster engaged and loyal employees.',
    overview: 'An ergonomic audit is a brief assessment of each office worker/workstation in your organization. The purpose is to ensure staff are using workstations and equipment correctly, are aware of safe working postures, and to flag issues requiring further attention or comprehensive ergonomic assessment.',
    
    duration: '1-2 days (depending on staff number)',
    format: 'On-site Workstation Assessments',
    level: 'Health & Productivity Audit',
    nextIntake: 'Schedule anytime',
    
    assessmentAreas: [
      { icon: <Armchair size={18} />, area: 'Seating posture and support', desc: 'Chair adjustment and lumbar support' },
      { icon: <Monitor size={18} />, area: 'Monitor position and height', desc: 'Screen placement and viewing distance' },
      { icon: <Mouse size={18} />, area: 'Keyboard and mouse setup', desc: 'Input device positioning and usage' },
      { icon: <Brain size={18} />, area: 'Work organization and breaks', desc: 'Task variation and micro-breaks' },
      { icon: <UserCheck size={18} />, area: 'Employee posture assessment', desc: 'Observation and correction guidance' },
      { icon: <FileText size={18} />, area: 'Equipment adequacy check', desc: 'Evaluation of existing ergonomic tools' }
    ],
    
    injuriesPrevented: [
      'Repetitive Strain Injuries (RSI)',
      'Carpal Tunnel Syndrome',
      'Neck and back pain/discomfort',
      'Shoulder tension and stiffness',
      'Eye strain and computer vision syndrome',
      'Lower back disorders',
      'Circulatory problems in legs',
      'Musculoskeletal disorders (MSDs)'
    ],
    
    outcomes: [
      'Comparison to international ergonomic standards',
      'Evaluation of training content effectiveness',
      'Identification of program gaps and improvements',
      'Assessment of current injury control measures',
      'Benchmarking against best practices',
      'Validation of ergonomic interventions'
    ],
    
    benefits: [
      'Health and wellbeing of employees regularly checked',
      'Greater productivity and efficiency in workplace',
      'Minimize injury risk associated with sedentary work',
      'Reduce incidence of workplace injuries',
      'Lower workers compensation claims and costs',
      'Cost-effective optimization of current interventions',
      'Maximum benefit for both employer and employee',
      'Improved employee engagement and retention'
    ],
    
    deliverables: [
      'Individual workstation assessment reports',
      'Ergonomic risk assessment matrix',
      'Priority intervention recommendations',
      'Equipment specification guidance',
      'Training needs analysis',
      'Program improvement roadmap',
      'Executive summary with ROI analysis',
      'Follow-up assessment schedule'
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <Link href="/services" className="text-indigo-200 hover:text-white flex items-center gap-2">
                <ArrowLeft size={20} /> Back to all services
              </Link>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <UserCheck className="text-indigo-200" size={24} />
                  <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-semibold">
                    Workplace Wellness
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {serviceData.title}
                </h1>
                <p className="text-xl text-indigo-100 mb-6">
                  {serviceData.subtitle}
                </p>
                <p className="text-indigo-200 text-lg">
                  {serviceData.description}
                </p>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-4">Request Ergonomics Audit</h3>
                  <p className="text-indigo-200 text-sm mb-6">Get a workstation assessment plan for your organization.</p>
                  
                  <button 
                    onClick={() => setShowContactForm(true)}
                    className="w-full bg-white text-indigo-600 hover:bg-indigo-50 py-3 rounded-xl font-semibold text-lg transition-colors mb-4"
                  >
                    Get Ergonomic Quote
                  </button>
                  
                  <div className="space-y-3">
                    <a href="tel:+254700364722" className="flex items-center justify-center gap-2 text-indigo-200 hover:text-white py-2">
                      <Phone size={18} /> +254 700 364 722
                    </a>
                    <a href="mailto:hsetraining@istc.co.ke" className="flex items-center justify-center gap-2 text-indigo-200 hover:text-white py-2">
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
                        <Calendar className="text-indigo-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Duration</div>
                          <div className="text-gray-600">{serviceData.duration}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="text-indigo-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Format</div>
                          <div className="text-gray-600">{serviceData.format}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <UserCheck className="text-indigo-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Level</div>
                          <div className="text-gray-600">{serviceData.level}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="text-indigo-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Availability</div>
                          <div className="text-gray-600">{serviceData.nextIntake}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Assessment Areas</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {serviceData.assessmentAreas.map((item, index) => (
                      <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-indigo-100">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-indigo-100 p-2 rounded-lg">
                            {item.icon}
                          </div>
                          <h3 className="font-bold text-gray-900">{item.area}</h3>
                        </div>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Injuries Prevented</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {serviceData.injuriesPrevented.map((injury, index) => (
                      <div key={index} className="flex items-start gap-3 bg-red-50 p-4 rounded-xl">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{injury}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="lg:col-span-1 space-y-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-indigo-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Audit Outcomes</h3>
                  <ul className="space-y-3">
                    {serviceData.outcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 text-sm">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border border-indigo-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Benefits</h3>
                  <div className="space-y-3">
                    {serviceData.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="text-indigo-500 mt-1 flex-shrink-0" size={18} />
                        <span className="text-gray-700 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-indigo-600 text-white rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4">Expert Auditors</h3>
                  <p className="text-indigo-100 mb-4">
                    Our audits are conducted by occupational therapists/physiotherapists who specialize in ergonomics and injury management.
                  </p>
                  <a 
                    href="tel:+254700364722"
                    className="flex items-center justify-center gap-2 bg-white text-indigo-600 hover:bg-indigo-50 py-3 rounded-xl font-semibold transition-colors"
                  >
                    <Phone size={18} />
                    Consult Our Experts
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