'use client';
import { useState } from 'react';
import { Volume2, CheckCircle, Calendar, Clock, Users, FileText, ArrowLeft, Phone, Mail, Ear, AlertTriangle, Headphones } from 'lucide-react';
import Link from 'next/link';

export default function NoiseMeasurement() {
  const [showContactForm, setShowContactForm] = useState(false);
  
  const serviceData = {
    title: 'Noise Measurement & Assessment',
    subtitle: 'Environmental & Workplace Noise Control Solutions',
    description: 'Professional acoustical consultancy services in the assessment, management and control of environmental and workplace noise to prevent hearing damage.',
    overview: 'Constant noise can negatively impact work performance and health. Employers have a duty to ensure noise is eliminated or reduced to a minimum. We provide comprehensive noise measurement services including assessment and detailed reports on environmental and workplace noise exposure levels.',
    
    duration: '1-2 days (site specific)',
    format: 'On-site Measurement & Analysis',
    level: 'Technical Measurement Service',
    nextIntake: 'Schedule anytime',
    
    healthRisks: [
      'Noise-Induced Hearing Loss (irreversible)',
      'Tinnitus (ringing in ears)',
      'Sleep deprivation and fatigue',
      'Poor concentration and reduced productivity',
      'Stress and increased blood pressure',
      'Communication difficulties and safety risks'
    ],
    
    servicesOffered: [
      { icon: <Volume2 size={18} />, service: 'Workplace noise monitoring', desc: 'Area and personal dosimetry measurements' },
      { icon: <Headphones size={18} />, service: 'Environmental noise assessment', desc: 'Community and neighborhood impact studies' },
      { icon: <Ear size={18} />, service: 'Hearing conservation programs', desc: 'Development and implementation support' },
      { icon: <AlertTriangle size={18} />, service: 'Noise control recommendations', desc: 'Engineering and administrative controls' },
      { icon: <FileText size={18} />, service: 'Regulatory compliance assessment', desc: 'Against national and international standards' },
      { icon: <CheckCircle size={18} />, service: 'Noise mitigation planning', desc: 'Practical solutions and implementation roadmaps' }
    ],
    
    deliverables: [
      'Site-specific noise measurement report',
      'Sound level measurements and analysis',
      'Noise exposure assessment for workers',
      'Comparison against regulatory criteria',
      'Noise mitigation measures identification',
      'Recommendations to achieve design criteria',
      'Hearing conservation program outline',
      'Follow-up monitoring recommendations'
    ],
    
    benefits: [
      'Comply with occupational noise regulations',
      'Prevent irreversible hearing damage to employees',
      'Reduce workers compensation claims',
      'Improve workplace communication and safety',
      'Enhance productivity and concentration',
      'Address community noise complaints',
      'Support planning and development applications',
      'Demonstrate duty of care to stakeholders'
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24">
      <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <Link href="/services" className="text-purple-200 hover:text-white flex items-center gap-2">
                <ArrowLeft size={20} /> Back to all services
              </Link>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <Volume2 className="text-purple-200" size={24} />
                  <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-semibold">
                    Hearing Conservation
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {serviceData.title}
                </h1>
                <p className="text-xl text-purple-100 mb-6">
                  {serviceData.subtitle}
                </p>
                <p className="text-purple-200 text-lg">
                  {serviceData.description}
                </p>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-4">Request Noise Assessment</h3>
                  <p className="text-purple-200 text-sm mb-6">Get a customized noise measurement plan for your facility.</p>
                  
                  <button 
                    onClick={() => setShowContactForm(true)}
                    className="w-full bg-white text-purple-600 hover:bg-purple-50 py-3 rounded-xl font-semibold text-lg transition-colors mb-4"
                  >
                    Get Measurement Quote
                  </button>
                  
                  <div className="space-y-3">
                    <a href="tel:+254700364722" className="flex items-center justify-center gap-2 text-purple-200 hover:text-white py-2">
                      <Phone size={18} /> +254 700 364 722
                    </a>
                    <a href="mailto:hsetraining@istc.co.ke" className="flex items-center justify-center gap-2 text-purple-200 hover:text-white py-2">
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
                        <Calendar className="text-purple-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Duration</div>
                          <div className="text-gray-600">{serviceData.duration}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="text-purple-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Format</div>
                          <div className="text-gray-600">{serviceData.format}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Volume2 className="text-purple-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Level</div>
                          <div className="text-gray-600">{serviceData.level}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="text-purple-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Availability</div>
                          <div className="text-gray-600">{serviceData.nextIntake}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Health Risks of Noise Exposure</h2>
                  <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {serviceData.healthRisks.map((risk, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <AlertTriangle className="text-red-500 mt-1 flex-shrink-0" size={18} />
                          <span className="text-gray-700">{risk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Services Offered</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {serviceData.servicesOffered.map((item, index) => (
                      <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-purple-100">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-purple-100 p-2 rounded-lg">
                            {item.icon}
                          </div>
                          <h3 className="font-bold text-gray-900">{item.service}</h3>
                        </div>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="lg:col-span-1 space-y-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Deliverables</h3>
                  <ul className="space-y-3">
                    {serviceData.deliverables.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Benefits</h3>
                  <div className="space-y-3">
                    {serviceData.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="text-purple-500 mt-1 flex-shrink-0" size={18} />
                        <span className="text-gray-700 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-purple-600 text-white rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4">Protect Your Workforce</h3>
                  <p className="text-purple-100 mb-6">
                    Noise-induced hearing loss is permanent. Proactive measurement and control protects your employees and your business.
                  </p>
                  <a 
                    href="tel:+254700364722"
                    className="flex items-center justify-center gap-2 bg-white text-purple-600 hover:bg-purple-50 py-3 rounded-xl font-semibold transition-colors"
                  >
                    <Phone size={18} />
                    Schedule Assessment
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