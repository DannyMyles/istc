'use client';
import { Settings, CheckCircle, Calendar, Clock, Users, FileText, ArrowLeft, Phone, Mail, Wrench, Target, Zap, Shield } from 'lucide-react';
import Link from 'next/link';

export default function CustomizedSafetySolutions() {
  const serviceData = {
    title: 'Customized Safety Solutions',
    subtitle: 'Tailored Approaches to Unique Safety Challenges',
    description: "Bespoke safety solutions designed to address your organization's specific hazards, operations, and risk profile.",
    overview: 'Every organization faces unique safety challenges that generic solutions may not adequately address. Our customized safety solutions service provides tailored approaches—combining our expertise with your operational knowledge—to develop effective, practical safety strategies that fit your specific context. From specialized hazard control systems to industry-specific safety programs, we deliver solutions that work for you.',
    
    duration: 'Project-based (varies by scope)',
    format: 'Custom Design & Implementation',
    level: 'Bespoke Safety Engineering',
    nextIntake: 'Project-based engagement',
    
    services: [
      { icon: <Wrench size={20} />, title: 'Custom Hazard Control Systems', desc: 'Engineered solutions for unique workplace hazards' },
      { icon: <Target size={20} />, title: 'Industry-Specific Programs', desc: 'Safety programs designed for your specific industry' },
      { icon: <Zap size={20} />, title: 'Equipment Safety Solutions', desc: 'Custom approaches to machinery and equipment safety' },
      { icon: <Shield size={20} />, title: 'Process Safety Management', desc: 'Tailored systems for managing complex operational risks' },
      { icon: <Settings size={20} />, title: 'Facility Safety Design', desc: 'Safety-oriented layout and design recommendations' },
      { icon: <FileText size={20} />, title: 'Integrated Safety Systems', desc: 'Comprehensive safety management approaches' }
    ],
    
    processSteps: [
      'Detailed organizational safety assessment',
      'Identification of unique hazards and challenges',
      'Analysis of current safety measures and gaps',
      'Stakeholder consultation and input gathering',
      'Custom solution design and engineering',
      'Implementation planning and resource allocation',
      'Pilot testing and refinement',
      'Full deployment and ongoing optimization'
    ],
    
    legalRequirements: [
      'OSHA 2007 general duty requirements',
      'Industry-specific safety regulations',
      'Equipment safety standards',
      'Building and construction codes',
      'Environmental safety requirements',
      'Risk management obligations',
      'Worker consultation mandates',
      'Documentation and record-keeping'
    ],
    
    deliverables: [
      'Comprehensive safety assessment report',
      'Custom hazard control strategy',
      'Detailed implementation plan',
      'Engineering specifications and drawings',
      'Standard operating procedures',
      'Training materials for new systems',
      'Monitoring and evaluation framework',
      'Technical support and maintenance plan'
    ],
    
    benefits: [
      'Solutions precisely matched to your hazards',
      'Improved safety performance and outcomes',
      'Reduced incident rates and associated costs',
      'Enhanced worker engagement and ownership',
      'Competitive advantage through safety excellence',
      'Regulatory compliance assurance',
      'Sustainable safety improvements',
      'Long-term cost effectiveness'
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="bg-gradient-to-r from-[#8E44AD] to-[#7D3C98] text-white py-12">
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
                  <Settings className="text-purple-200" size={24} />
                  <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-semibold">
                    Tailored Solutions
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
                  <h3 className="text-xl font-bold mb-4">Design Your Solution</h3>
                  <p className="text-purple-200 text-sm mb-6">Let us create a safety solution that fits your unique needs.</p>
                  
                  <Link
                    href="/contact"
                    className="w-full bg-white text-[#8E44AD] hover:bg-purple-50 py-3 rounded-xl font-semibold text-lg transition-colors mb-4 flex items-center justify-center"
                  >
                    Discuss Your Requirements
                  </Link>
                  
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
                        <Calendar className="text-[#8E44AD]" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Duration</div>
                          <div className="text-gray-600">{serviceData.duration}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="text-[#8E44AD]" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Format</div>
                          <div className="text-gray-600">{serviceData.format}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Settings className="text-[#8E44AD]" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Level</div>
                          <div className="text-gray-600">{serviceData.level}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="text-[#8E44AD]" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Engagement</div>
                          <div className="text-gray-600">{serviceData.nextIntake}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Custom Solutions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {serviceData.services.map((item, index) => (
                      <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-purple-100">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-purple-100 p-2 rounded-lg text-[#8E44AD]">
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Solution Development Process</h2>
                  <div className="space-y-4">
                    {serviceData.processSteps.map((step, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="bg-[#8E44AD] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="bg-purple-50 p-4 rounded-xl flex-1">
                          <p className="text-gray-700">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="lg:col-span-1 space-y-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Regulatory Framework</h3>
                  <ul className="space-y-3">
                    {serviceData.legalRequirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-[#8E44AD] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 text-sm">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Benefits</h3>
                  <div className="space-y-3">
                    {serviceData.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="text-[#8E44AD] mt-1 flex-shrink-0" size={18} />
                        <span className="text-gray-700 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#8E44AD] text-white rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4">Unique Challenges</h3>
                  <p className="text-purple-100 mb-6">
                    Get safety solutions designed specifically for your organization's unique context.
                  </p>
                  <a 
                    href="mailto:hsetraining@istc.co.ke"
                    className="flex items-center justify-center gap-2 bg-white text-[#8E44AD] hover:bg-purple-50 py-3 rounded-xl font-semibold transition-colors"
                  >
                    <Mail size={18} />
                    Design Your Solution
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

