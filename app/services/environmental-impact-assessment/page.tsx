'use client';
import { useState } from 'react';
import { Globe, CheckCircle, Calendar, Clock, Users, FileText, ArrowLeft, Phone, Mail, TreePine, Users2, Heart, Building } from 'lucide-react';
import Link from 'next/link';

export default function EnvironmentalImpactAssessment() {
  const [showContactForm, setShowContactForm] = useState(false);
  
  const serviceData = {
    title: 'Environmental Impact Assessment',
    subtitle: 'Comprehensive Evaluation of Proposed Project Impacts',
    description: 'We evaluate how a proposed project or development will impact the environment as required by environmental laws, considering socio-economic, cultural and human-health impacts.',
    overview: 'Our team of auditors evaluates the likely environmental impacts of a proposed project or development, taking into account inter-related socio-economic, cultural and human-health impacts, both beneficial and adverse. EIAs are conducted prior to project commencement and are essential for regulatory approval and sustainable development.',
    
    duration: '30-60 days (project dependent)',
    format: 'Desktop Study & Field Assessment',
    level: 'Regulatory Project Assessment',
    nextIntake: 'Schedule per project timeline',
    
    impactAreas: [
      { icon: <TreePine size={18} />, area: 'Ecological Impacts', desc: 'Flora, fauna, habitats and biodiversity' },
      { icon: <Globe size={18} />, area: 'Physical Environment', desc: 'Air, water, soil, noise and climate' },
      { icon: <Users2 size={18} />, area: 'Socio-economic Impacts', desc: 'Communities, livelihoods and economy' },
      { icon: <Heart size={18} />, area: 'Human Health Impacts', desc: 'Public health and wellbeing' },
      { icon: <Building size={18} />, area: 'Cultural Heritage', desc: 'Archaeological and historical sites' },
      { icon: <FileText size={18} />, area: 'Cumulative Impacts', desc: 'Combined effects with other developments' }
    ],
    
    projectTypes: [
      'Industrial and manufacturing facilities',
      'Infrastructure projects (roads, bridges, railways)',
      'Energy generation projects (solar, wind, thermal)',
      'Mining and extractive industry operations',
      'Agricultural and irrigation developments',
      'Tourism and hospitality facilities',
      'Commercial and residential developments',
      'Waste management and treatment facilities'
    ],
    
    processStages: [
      'Screening and scoping of assessment requirements',
      'Baseline environmental data collection',
      'Impact prediction and significance evaluation',
      'Mitigation measure development and alternatives',
      'Stakeholder consultation and public participation',
      'EIA report preparation and submission',
      'Review and decision by regulatory authority',
      'Monitoring and compliance follow-up'
    ],
    
    deliverables: [
      'Comprehensive EIA Report (EMCA compliant)',
      'Baseline environmental study',
      'Impact prediction and evaluation matrix',
      'Mitigation measures and management plan',
      'Environmental monitoring plan',
      'Stakeholder consultation report',
      'Non-technical summary for public',
      'Regulatory submission package'
    ],
    
    benefits: [
      'Ensure compliance with EMCA requirements',
      'Obtain necessary environmental licenses',
      'Identify and address potential environmental issues',
      'Enhance project design and sustainability',
      'Build community support and reduce conflicts',
      'Avoid costly delays and legal challenges',
      'Improve project acceptance by financiers',
      'Demonstrate corporate environmental responsibility'
    ],
    
    legalRequirements: [
      'Mandatory for projects listed in EMCA Schedule',
      'Required before any project commencement',
      'NEMA approval and licensing prerequisite',
      'Public participation and consultation required',
      'Technical review by environmental experts',
      'Monitoring and compliance conditions',
      'Regular reporting to regulatory authorities',
      'Potential for Environmental Audit Orders'
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24">
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <Link href="/services" className="text-emerald-200 hover:text-white flex items-center gap-2">
                <ArrowLeft size={20} /> Back to all services
              </Link>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="text-emerald-200" size={24} />
                  <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-semibold">
                    Regulatory Compliance
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {serviceData.title}
                </h1>
                <p className="text-xl text-emerald-100 mb-6">
                  {serviceData.subtitle}
                </p>
                <p className="text-emerald-200 text-lg">
                  {serviceData.description}
                </p>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-4">Request EIA Services</h3>
                  <p className="text-emerald-200 text-sm mb-6">Contact us for project-specific EIA consultation and pricing.</p>
                  
                  <button 
                    onClick={() => setShowContactForm(true)}
                    className="w-full bg-white text-emerald-600 hover:bg-emerald-50 py-3 rounded-xl font-semibold text-lg transition-colors mb-4"
                  >
                    Get EIA Proposal
                  </button>
                  
                  <div className="space-y-3">
                    <a href="tel:+254700364722" className="flex items-center justify-center gap-2 text-emerald-200 hover:text-white py-2">
                      <Phone size={18} /> +254 700 364 722
                    </a>
                    <a href="mailto:hsetraining@istc.co.ke" className="flex items-center justify-center gap-2 text-emerald-200 hover:text-white py-2">
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
                        <Calendar className="text-emerald-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Duration</div>
                          <div className="text-gray-600">{serviceData.duration}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="text-emerald-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Format</div>
                          <div className="text-gray-600">{serviceData.format}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Globe className="text-emerald-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Level</div>
                          <div className="text-gray-600">{serviceData.level}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="text-emerald-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Timing</div>
                          <div className="text-gray-600">{serviceData.nextIntake}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Impact Assessment Areas</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {serviceData.impactAreas.map((item, index) => (
                      <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-emerald-100">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-emerald-100 p-2 rounded-lg">
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">EIA Process Stages</h2>
                  <div className="space-y-4">
                    {serviceData.processStages.map((stage, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="bg-emerald-50 p-4 rounded-xl flex-1">
                          <p className="text-gray-700 font-medium">{stage}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="lg:col-span-1 space-y-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Types Requiring EIA</h3>
                  <ul className="space-y-3">
                    {serviceData.projectTypes.map((type, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 text-sm">{type}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal Requirements</h3>
                  <div className="space-y-3">
                    {serviceData.legalRequirements.map((requirement, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <FileText className="text-emerald-500 mt-1 flex-shrink-0" size={16} />
                        <span className="text-gray-700 text-sm">{requirement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-emerald-600 text-white rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4">Critical Timing</h3>
                  <p className="text-emerald-100 mb-6">
                    EIAs must be conducted BEFORE project commencement. Delays can cause significant project setbacks.
                  </p>
                  <a 
                    href="tel:+254700364722"
                    className="flex items-center justify-center gap-2 bg-white text-emerald-600 hover:bg-emerald-50 py-3 rounded-xl font-semibold transition-colors"
                  >
                    <Phone size={18} />
                    Urgent EIA Consultation
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