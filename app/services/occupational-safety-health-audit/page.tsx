'use client';
import { useState } from 'react';
import { Shield, CheckCircle, Calendar, Clock, Users, FileText, ArrowLeft, Phone, Mail, Target, TrendingUp, Users2, Brain } from 'lucide-react';
import Link from 'next/link';

export default function OccupationalSafetyHealthAudit() {
  const [showContactForm, setShowContactForm] = useState(false);
  
  const serviceData = {
    title: 'Occupational Safety & Health Audit',
    subtitle: 'Compliance with OSHA 2007 & Contemporary Best Practices',
    description: 'A quantified audit process to test your health and safety performance against latest legislation, recognized standards, and best practice techniques.',
    overview: 'We provide the most comprehensive, contemporary, quantified audit process available. It goes beyond basic compliance with the Occupational Safety and Health Act (2007) to evaluate your systems against five key best-practice indicators that are continually assessed throughout the audit process.',
    
    duration: '2-5 days (depending on facility size)',
    format: 'On-site Audit & Documentation Review',
    level: 'Comprehensive Compliance Audit',
    nextIntake: 'Schedule anytime',
    
    bestPracticeIndicators: [
      { icon: <Target size={20} />, name: 'Leadership', desc: 'Assessment of safety leadership and management commitment at all levels' },
      { icon: <Users2 size={20} />, name: 'Stakeholder Engagement', desc: 'Evaluation of communication, consultation and involvement of all stakeholders' },
      { icon: <Shield size={20} />, name: 'Risk Management', desc: 'Review of hazard identification, risk assessment and control systems' },
      { icon: <Brain size={20} />, name: 'Safety Culture', desc: 'Analysis of organizational health and safety culture and worker participation' },
      { icon: <TrendingUp size={20} />, name: 'Continual Improvement', desc: 'Assessment of monitoring, review and improvement processes' }
    ],
    
    deliverables: [
      'Quantified audit outcome report with scoring',
      'Detailed recommendations against best practices',
      'Gap analysis against OSHA 2007 requirements',
      'Prioritized action plan for improvement',
      'Executive summary for management',
      'Benchmarking against industry standards'
    ],
    
    benefits: [
      'Demonstrate legal compliance with OSHA 2007',
      'Identify safety performance gaps before incidents occur',
      'Benchmark against industry best practices',
      'Reduce workplace accidents and associated costs',
      'Enhance organizational safety culture',
      'Provide assurance to stakeholders and regulators',
      'Support insurance and tender requirements',
      'Improve employee morale and retention'
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24">
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <Link href="/services" className="text-blue-200 hover:text-white flex items-center gap-2">
                <ArrowLeft size={20} /> Back to all services
              </Link>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="text-blue-200" size={24} />
                  <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-semibold">
                    OSHA 2007 Compliance
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {serviceData.title}
                </h1>
                <p className="text-xl text-blue-100 mb-6">
                  {serviceData.subtitle}
                </p>
                <p className="text-blue-200 text-lg">
                  {serviceData.description}
                </p>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-4">Request This Service</h3>
                  <p className="text-blue-200 text-sm mb-6">Contact us for a customized proposal based on your facility size and needs.</p>
                  
                  <button 
                    onClick={() => setShowContactForm(true)}
                    className="w-full bg-white text-blue-600 hover:bg-blue-50 py-3 rounded-xl font-semibold text-lg transition-colors mb-4"
                  >
                    Get Quote
                  </button>
                  
                  <div className="space-y-3">
                    <a href="tel:+254700364722" className="flex items-center justify-center gap-2 text-blue-200 hover:text-white py-2">
                      <Phone size={18} /> +254 700 364 722
                    </a>
                    <a href="mailto:hsetraining@istc.co.ke" className="flex items-center justify-center gap-2 text-blue-200 hover:text-white py-2">
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
                        <Calendar className="text-blue-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Duration</div>
                          <div className="text-gray-600">{serviceData.duration}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="text-blue-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Format</div>
                          <div className="text-gray-600">{serviceData.format}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Shield className="text-blue-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Level</div>
                          <div className="text-gray-600">{serviceData.level}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="text-blue-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Availability</div>
                          <div className="text-gray-600">{serviceData.nextIntake}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Best Practice Indicators Assessed</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {serviceData.bestPracticeIndicators.map((indicator, index) => (
                      <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-blue-100">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            {indicator.icon}
                          </div>
                          <h3 className="font-bold text-gray-900">{indicator.name}</h3>
                        </div>
                        <p className="text-gray-600 text-sm">{indicator.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Benefits</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {serviceData.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3 bg-blue-50 p-4 rounded-xl">
                        <CheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="lg:col-span-1 space-y-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Deliverables</h3>
                  <ul className="space-y-3">
                    {serviceData.deliverables.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-600 text-white rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4">Ready for Compliance?</h3>
                  <p className="text-blue-100 mb-6">
                    Schedule your OSH audit today and ensure your workplace meets all legal requirements and best practices.
                  </p>
                  <a 
                    href="tel:+254700364722"
                    className="flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-blue-50 py-3 rounded-xl font-semibold transition-colors mb-3"
                  >
                    <Phone size={18} />
                    Call to Schedule
                  </a>
                  <a 
                    href="mailto:hsetraining@istc.co.ke"
                    className="flex items-center justify-center gap-2 border-2 border-white hover:bg-white/10 py-3 rounded-xl font-semibold transition-colors"
                  >
                    <Mail size={18} />
                    Email Inquiry
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