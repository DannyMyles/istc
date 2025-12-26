'use client';
import { useState } from 'react';
import { AlertTriangle, CheckCircle, Calendar, Clock, Users, FileText, ArrowLeft, Phone, Mail, Biohazard, Brain, Zap, Droplets } from 'lucide-react';
import Link from 'next/link';

export default function RiskAssessment() {
  const [showContactForm, setShowContactForm] = useState(false);
  
  const serviceData = {
    title: 'Risk Assessment',
    subtitle: 'Comprehensive Workplace Hazard Identification & Control',
    description: 'Systematic evaluation of health and safety risks faced by workers, with development of mitigation measures to reduce risk levels.',
    overview: 'Employers/Occupiers have a legal duty to assess the health and safety risks faced by their workers. Our team of auditors systematically checks for possible physical, mental, chemical and biological hazards present in workplaces and develops practical mitigation measures to reduce risk levels to as low as reasonably practicable.',
    
    duration: '2-5 days (depending on workplace complexity)',
    format: 'On-site Assessment & Analysis',
    level: 'Comprehensive Risk Management',
    nextIntake: 'Schedule anytime',
    
    hazardTypes: [
      { icon: <Zap size={18} />, type: 'Physical Hazards', examples: 'Machinery, noise, vibration, electricity, temperature extremes' },
      { icon: <Biohazard size={18} />, type: 'Chemical Hazards', examples: 'Toxic substances, flammable materials, corrosive agents' },
      { icon: <Droplets size={18} />, type: 'Biological Hazards', examples: 'Bacteria, viruses, fungi, bloodborne pathogens' },
      { icon: <Brain size={18} />, type: 'Psychosocial Hazards', examples: 'Stress, burnout, workplace violence, harassment' },
      { icon: <AlertTriangle size={18} />, type: 'Ergonomic Hazards', examples: 'Manual handling, repetitive motions, poor workstation design' },
      { icon: <Users size={18} />, type: 'Environmental Hazards', examples: 'Slips/trips/falls, confined spaces, working at height' }
    ],
    
    processSteps: [
      'Hazard identification through workplace inspection',
      'Risk analysis and likelihood/consequence evaluation',
      'Risk rating using standardized matrices',
      'Existing control measure assessment',
      'Additional control measure development',
      'Implementation priority assignment',
      'Action plan development with responsibilities',
      'Review and monitoring schedule establishment'
    ],
    
    legalRequirements: [
      'Occupational Safety and Health Act (OSHA 2007) compliance',
      'Employer duty of care obligations',
      'Workplace safety policy development requirement',
      'Regular risk assessment review mandates',
      'Employee consultation and participation',
      'Record keeping and documentation',
      'Emergency preparedness planning',
      'Contractor and visitor safety management'
    ],
    
    deliverables: [
      'Comprehensive risk assessment report',
      'Risk register with prioritized hazards',
      'Risk matrix with likelihood/consequence ratings',
      'Control measure recommendations',
      'Implementation action plan',
      'Responsibility assignment matrix',
      'Monitoring and review schedule',
      'Training needs identification'
    ],
    
    benefits: [
      'Fulfill legal duty of care requirements',
      'Proactively prevent workplace incidents',
      'Reduce accident rates and associated costs',
      'Improve safety culture and awareness',
      'Support insurance and tender applications',
      'Enhance operational efficiency',
      'Protect organizational reputation',
      'Demonstrate commitment to worker safety'
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24">
      <div className="bg-gradient-to-r from-red-600 to-red-500 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <Link href="/services" className="text-red-200 hover:text-white flex items-center gap-2">
                <ArrowLeft size={20} /> Back to all services
              </Link>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="text-red-200" size={24} />
                  <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-semibold">
                    Hazard Control
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {serviceData.title}
                </h1>
                <p className="text-xl text-red-100 mb-6">
                  {serviceData.subtitle}
                </p>
                <p className="text-red-200 text-lg">
                  {serviceData.description}
                </p>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-4">Request Risk Assessment</h3>
                  <p className="text-red-200 text-sm mb-6">Get a comprehensive hazard analysis for your workplace.</p>
                  
                  <button 
                    onClick={() => setShowContactForm(true)}
                    className="w-full bg-white text-red-600 hover:bg-red-50 py-3 rounded-xl font-semibold text-lg transition-colors mb-4"
                  >
                    Get Risk Assessment Quote
                  </button>
                  
                  <div className="space-y-3">
                    <a href="tel:+254700364722" className="flex items-center justify-center gap-2 text-red-200 hover:text-white py-2">
                      <Phone size={18} /> +254 700 364 722
                    </a>
                    <a href="mailto:hsetraining@istc.co.ke" className="flex items-center justify-center gap-2 text-red-200 hover:text-white py-2">
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
                        <Calendar className="text-red-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Duration</div>
                          <div className="text-gray-600">{serviceData.duration}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="text-red-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Format</div>
                          <div className="text-gray-600">{serviceData.format}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="text-red-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Level</div>
                          <div className="text-gray-600">{serviceData.level}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="text-red-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Availability</div>
                          <div className="text-gray-600">{serviceData.nextIntake}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Hazard Types Assessed</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {serviceData.hazardTypes.map((item, index) => (
                      <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-red-100">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-red-100 p-2 rounded-lg">
                            {item.icon}
                          </div>
                          <h3 className="font-bold text-gray-900">{item.type}</h3>
                        </div>
                        <p className="text-gray-600 text-sm">{item.examples}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Risk Assessment Process</h2>
                  <div className="space-y-4">
                    {serviceData.processSteps.map((step, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="bg-red-50 p-4 rounded-xl flex-1">
                          <p className="text-gray-700">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="lg:col-span-1 space-y-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-red-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal Requirements</h3>
                  <ul className="space-y-3">
                    {serviceData.legalRequirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 text-sm">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border border-red-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Benefits</h3>
                  <div className="space-y-3">
                    {serviceData.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="text-red-500 mt-1 flex-shrink-0" size={18} />
                        <span className="text-gray-700 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-red-600 text-white rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4">Legal Compliance</h3>
                  <p className="text-red-100 mb-6">
                    Risk assessment is not optional—it's a legal requirement under OSHA 2007. Ensure your compliance today.
                  </p>
                  <a 
                    href="mailto:hsetraining@istc.co.ke"
                    className="flex items-center justify-center gap-2 bg-white text-red-600 hover:bg-red-50 py-3 rounded-xl font-semibold transition-colors"
                  >
                    <Mail size={18} />
                    Request Compliance Check
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