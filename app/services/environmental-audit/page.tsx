'use client';
import { useState } from 'react';
import { TreePine, CheckCircle, Calendar, Clock, Users, FileText, ArrowLeft, Phone, Mail, Globe, Droplets, Recycle, Factory } from 'lucide-react';
import Link from 'next/link';

export default function EnvironmentalAudit() {
  const [showContactForm, setShowContactForm] = useState(false);
  
  const serviceData = {
    title: 'Environmental Audit',
    subtitle: 'EMCA Compliance & Global Best Practices Assessment',
    description: 'Our team of auditors conducts environmental audits on existing developments to check the practices and assess their impacts on the environment.',
    overview: 'We examine your company operations to ascertain environmental management effectiveness. Our goal is to assist clients not only comply with the Environmental Management and Co-ordination Act (EMCA) regulations but also achieve global best practices in environmental stewardship and sustainability.',
    
    duration: '2-5 days (depending on operations)',
    format: 'On-site Assessment & Documentation Review',
    level: 'Environmental Compliance Audit',
    nextIntake: 'Schedule anytime',
    
    auditComponents: [
      { icon: <Recycle size={18} />, component: 'Waste management practices', desc: 'Assessment of waste segregation, storage and disposal' },
      { icon: <Droplets size={18} />, component: 'Pollution control systems', desc: 'Evaluation of air, water and soil pollution controls' },
      { icon: <Factory size={18} />, component: 'Resource consumption', desc: 'Analysis of energy, water and raw material efficiency' },
      { icon: <FileText size={18} />, component: 'Legal compliance check', desc: 'Verification against EMCA and other regulations' },
      { icon: <Globe size={18} />, component: 'Sustainability initiatives', desc: 'Review of environmental and social responsibility programs' },
      { icon: <TreePine size={18} />, component: 'Biodiversity impact', desc: 'Assessment of impacts on local ecosystems' }
    ],
    
    targetSectors: [
      'Manufacturing and industrial facilities',
      'Construction and development projects',
      'Agricultural and agro-processing operations',
      'Healthcare and pharmaceutical institutions',
      'Hospitality and tourism establishments',
      'Educational institutions and research centers',
      'Commercial office buildings and complexes',
      'Transport, logistics and storage companies'
    ],
    
    benefits: [
      'Ensure compliance with EMCA regulations',
      'Identify environmental risks and liabilities',
      'Reduce environmental footprint and operational costs',
      'Enhance corporate reputation and social license',
      'Prepare for environmental certification (ISO 14001)',
      'Avoid regulatory penalties and shutdowns',
      'Improve stakeholder and community relations',
      'Align with global sustainability standards (SDGs)'
    ],
    
    deliverables: [
      'Comprehensive environmental audit report',
      'EMCA compliance assessment matrix',
      'Environmental risk register and impact assessment',
      'Corrective action plan with timelines',
      'Best practice recommendations',
      'Sustainability improvement roadmap',
      'Executive summary for management',
      'Follow-up monitoring schedule'
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24">
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <Link href="/services" className="text-green-200 hover:text-white flex items-center gap-2">
                <ArrowLeft size={20} /> Back to all services
              </Link>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <TreePine className="text-green-200" size={24} />
                  <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-semibold">
                    EMCA Compliance
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {serviceData.title}
                </h1>
                <p className="text-xl text-green-100 mb-6">
                  {serviceData.subtitle}
                </p>
                <p className="text-green-200 text-lg">
                  {serviceData.description}
                </p>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-4">Request Environmental Audit</h3>
                  <p className="text-green-200 text-sm mb-6">Get a proposal tailored to your specific operations and needs.</p>
                  
                  <button 
                    onClick={() => setShowContactForm(true)}
                    className="w-full bg-white text-green-600 hover:bg-green-50 py-3 rounded-xl font-semibold text-lg transition-colors mb-4"
                  >
                    Get Custom Quote
                  </button>
                  
                  <div className="space-y-3">
                    <a href="tel:+254700364722" className="flex items-center justify-center gap-2 text-green-200 hover:text-white py-2">
                      <Phone size={18} /> +254 700 364 722
                    </a>
                    <a href="mailto:hsetraining@istc.co.ke" className="flex items-center justify-center gap-2 text-green-200 hover:text-white py-2">
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
                        <Calendar className="text-green-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Duration</div>
                          <div className="text-gray-600">{serviceData.duration}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="text-green-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Format</div>
                          <div className="text-gray-600">{serviceData.format}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <TreePine className="text-green-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Level</div>
                          <div className="text-gray-600">{serviceData.level}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="text-green-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Availability</div>
                          <div className="text-gray-600">{serviceData.nextIntake}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Audit Components</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {serviceData.auditComponents.map((item, index) => (
                      <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-green-100">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-green-100 p-2 rounded-lg">
                            {item.icon}
                          </div>
                          <h3 className="font-bold text-gray-900">{item.component}</h3>
                        </div>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="lg:col-span-1 space-y-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Target Sectors</h3>
                  <ul className="space-y-3">
                    {serviceData.targetSectors.map((sector, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600">{sector}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Benefits</h3>
                  <div className="space-y-3">
                    {serviceData.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                        <span className="text-gray-700 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-green-600 text-white rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4">Environmental Compliance</h3>
                  <p className="text-green-100 mb-4">
                    Ensure your operations meet all EMCA requirements and global best practices.
                  </p>
                  <a 
                    href="mailto:hsetraining@istc.co.ke"
                    className="flex items-center justify-center gap-2 bg-white text-green-600 hover:bg-green-50 py-3 rounded-xl font-semibold transition-colors"
                  >
                    <Mail size={18} />
                    Email for Compliance Check
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