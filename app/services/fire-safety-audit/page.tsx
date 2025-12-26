'use client';
import { useState } from 'react';
import { Flame, CheckCircle, Calendar, Clock, Users, FileText, ArrowLeft, Phone, Mail, Building, AlertTriangle, Zap, Eye } from 'lucide-react';
import Link from 'next/link';

export default function FireSafetyAudit() {
  const [showContactForm, setShowContactForm] = useState(false);
  
  const serviceData = {
    title: 'Fire Safety Audit',
    subtitle: 'Comprehensive Fire Safety Management Systems Assessment',
    description: 'An in-depth examination of your organization\'s fire safety management systems and associated arrangements against contemporary best practice specifications.',
    overview: 'We examine your premises to ascertain how they are managed in terms of fire safety. Current legislation places the emphasis on the employer/landlord to effectively identify, control and mitigate the risk of fire within any premises. Our audit provides a structured route toward continual improvement and best practice status.',
    
    duration: '1-3 days (depending on premises size)',
    format: 'On-site Inspection & Systems Review',
    level: 'Specialized Safety Audit',
    nextIntake: 'Schedule anytime',
    
    auditFocusAreas: [
      { icon: <Eye size={18} />, area: 'Fire detection and alarm systems', desc: 'Testing and assessment of detection capabilities' },
      { icon: <AlertTriangle size={18} />, area: 'Emergency escape routes and signage', desc: 'Evaluation of escape routes and wayfinding' },
      { icon: <Flame size={18} />, area: 'Firefighting equipment adequacy', desc: 'Inspection of extinguishers, hoses and other equipment' },
      { icon: <Zap size={18} />, area: 'Electrical fire risk assessment', desc: 'Identification of electrical fire hazards' },
      { icon: <Building size={18} />, area: 'Flammable materials storage', desc: 'Assessment of storage and handling procedures' },
      { icon: <FileText size={18} />, area: 'Hot work permit systems', desc: 'Review of permit-to-work procedures' }
    ],
    
    whoItsFor: [
      'Organizations of any size across all sectors',
      'Employers and landlords (the "responsible person")',
      'Facility and property management companies',
      'Healthcare and educational institutions',
      'Hospitality and retail establishments',
      'Manufacturing and industrial facilities',
      'Warehousing and storage operations'
    ],
    
    benefits: [
      'Comprehensive outcome with detailed recommendations',
      'Developed with fire safety experts and recognized standards',
      'External recognition of fire safety management',
      'Demonstration of commitment to regulators and stakeholders',
      'Structured route toward continual improvement',
      'Moral, legal and financial risk mitigation',
      'Reduced insurance premiums potential',
      'Enhanced emergency preparedness'
    ],
    
    deliverables: [
      'Detailed fire safety audit report',
      'Fire risk assessment matrix',
      'Compliance gap analysis',
      'Prioritized corrective action plan',
      'Best practice recommendations',
      'Emergency procedure improvements',
      'Follow-up audit schedule'
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24">
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <Link href="/services" className="text-orange-200 hover:text-white flex items-center gap-2">
                <ArrowLeft size={20} /> Back to all services
              </Link>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <Flame className="text-orange-200" size={24} />
                  <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-semibold">
                    Fire Risk Management
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {serviceData.title}
                </h1>
                <p className="text-xl text-orange-100 mb-6">
                  {serviceData.subtitle}
                </p>
                <p className="text-orange-200 text-lg">
                  {serviceData.description}
                </p>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-4">Request Fire Safety Audit</h3>
                  <p className="text-orange-200 text-sm mb-6">Get a customized quote based on your premises size and complexity.</p>
                  
                  <button 
                    onClick={() => setShowContactForm(true)}
                    className="w-full bg-white text-orange-600 hover:bg-orange-50 py-3 rounded-xl font-semibold text-lg transition-colors mb-4"
                  >
                    Request Quote
                  </button>
                  
                  <div className="space-y-3">
                    <a href="tel:+254700364722" className="flex items-center justify-center gap-2 text-orange-200 hover:text-white py-2">
                      <Phone size={18} /> +254 700 364 722
                    </a>
                    <a href="mailto:hsetraining@istc.co.ke" className="flex items-center justify-center gap-2 text-orange-200 hover:text-white py-2">
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
                        <Calendar className="text-orange-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Duration</div>
                          <div className="text-gray-600">{serviceData.duration}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="text-orange-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Format</div>
                          <div className="text-gray-600">{serviceData.format}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Flame className="text-orange-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Level</div>
                          <div className="text-gray-600">{serviceData.level}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="text-orange-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Availability</div>
                          <div className="text-gray-600">{serviceData.nextIntake}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Focus Areas of Audit</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {serviceData.auditFocusAreas.map((item, index) => (
                      <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-orange-100">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-orange-100 p-2 rounded-lg">
                            {item.icon}
                          </div>
                          <h3 className="font-bold text-gray-900">{item.area}</h3>
                        </div>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="lg:col-span-1 space-y-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Who This Service Is For</h3>
                  <ul className="space-y-3">
                    {serviceData.whoItsFor.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Deliverables</h3>
                  <div className="space-y-3">
                    {serviceData.deliverables.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                        <div className="bg-orange-100 p-1 rounded">
                          <CheckCircle size={16} className="text-orange-600" />
                        </div>
                        <span className="text-gray-700 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-orange-600 text-white rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4">Need Immediate Assistance?</h3>
                  <p className="text-orange-100 mb-6">
                    Contact our fire safety experts for urgent consultations or to schedule an audit.
                  </p>
                  <a 
                    href="tel:+254700364722"
                    className="flex items-center justify-center gap-2 bg-white text-orange-600 hover:bg-orange-50 py-3 rounded-xl font-semibold transition-colors"
                  >
                    <Phone size={18} />
                    Call Fire Safety Team
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