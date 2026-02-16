'use client';
import { Shield, CheckCircle, Calendar, Clock, Users, FileText, ArrowLeft, Phone, Mail, Target, Award, TrendingUp, Building } from 'lucide-react';
import Link from 'next/link';

export default function SafetyComplianceConsulting() {
  const serviceData = {
    title: 'Safety Compliance Consulting',
    subtitle: 'Expert Guidance for Regulatory Compliance',
    description: 'Professional consulting services to help organizations meet occupational safety and health regulations, standards, and best practices.',
    overview: 'Navigating the complex landscape of safety regulations can be challenging. Our experienced consultants provide expert guidance to help your organization achieve and maintain compliance with OSHA 2007, local regulations, and international standards. We assess your current compliance status, identify gaps, and develop practical strategies to address them.',
    
    duration: 'Flexible engagement based on needs',
    format: 'On-site Assessment & Ongoing Support',
    level: 'Expert Advisory Services',
    nextIntake: 'Available Year-Round',
    
    services: [
      { icon: <Target size={20} />, title: 'Regulatory Compliance Assessment', desc: 'Comprehensive review of your compliance status against applicable regulations' },
      { icon: <Building size={20} />, title: 'Policy & Procedure Development', desc: 'Creation of customized safety policies and procedures aligned with your operations' },
      { icon: <FileText size={20} />, title: 'Compliance Reporting', desc: 'Preparation of required safety reports and documentation' },
      { icon: <TrendingUp size={20} />, title: 'Continuous Improvement', desc: 'Ongoing support for maintaining and improving compliance standards' },
      { icon: <Shield size={20} />, title: 'OSHA Compliance', desc: 'Expert guidance on Occupational Safety and Health Act requirements' },
      { icon: <Award size={20} />, title: 'International Standards', desc: 'Consulting for ISO 45001 and other international safety standards' }
    ],
    
    processSteps: [
      'Initial compliance gap analysis',
      'Regulatory requirements mapping',
      'Risk-based priority assessment',
      'Customized compliance strategy development',
      'Implementation roadmap creation',
      'Staff training and capacity building',
      'Documentation and record-keeping systems',
      'Ongoing compliance monitoring and support'
    ],
    
    legalRequirements: [
      'Occupational Safety and Health Act (OSHA 2007)',
      'Factory Act and related regulations',
      'Environmental Management and Coordination Act',
      'Industry-specific safety regulations',
      'International labor standards',
      'Local authority requirements',
      'Insurance compliance requirements',
      'Client and contract-specific requirements'
    ],
    
    deliverables: [
      'Comprehensive compliance assessment report',
      'Gap analysis documentation',
      'Customized safety policy framework',
      'Compliance action plan',
      'Training materials and guidelines',
      'Audit readiness preparation',
      'Ongoing compliance support package',
      'Compliance certificates and documentation'
    ],
    
    benefits: [
      'Avoid costly regulatory penalties and fines',
      'Demonstrate commitment to worker safety',
      'Improve organizational reputation',
      'Enhance stakeholder confidence',
      'Streamline operations through clear procedures',
      'Support business growth and tenders',
      'Reduce workplace incidents and costs',
      'Build sustainable safety culture'
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section with Background Image */}
      <div className="relative bg-gradient-to-r from-[#E24785] to-[#D43979] text-white py-48 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: "url('/images/2.jpg')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-900/80 to-pink-700/60"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <Link href="/services" className="text-pink-200 hover:text-white flex items-center gap-2">
                <ArrowLeft size={20} /> Back to all services
              </Link>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="text-pink-200" size={24} />
                  <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-semibold">
                    Expert Advisory
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {serviceData.title}
                </h1>
                <p className="text-xl text-pink-100 mb-6">
                  {serviceData.subtitle}
                </p>
                <p className="text-pink-200 text-lg">
                  {serviceData.description}
                </p>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-4">Get Expert Guidance</h3>
                  <p className="text-pink-200 text-sm mb-6">Connect with our compliance experts for personalized guidance.</p>
                  
                  <Link
                    href="/contact"
                    className="w-full bg-white text-[#E24785] hover:bg-pink-50 py-3 rounded-xl font-semibold text-lg transition-colors mb-4 flex items-center justify-center"
                  >
                    Request Consultation
                  </Link>
                  
                  <div className="space-y-3">
                    <a href="tel:+254700364722" className="flex items-center justify-center gap-2 text-pink-200 hover:text-white py-2">
                      <Phone size={18} /> +254 700 364 722
                    </a>
                    <a href="mailto:hsetraining@istc.co.ke" className="flex items-center justify-center gap-2 text-pink-200 hover:text-white py-2">
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
                        <Calendar className="text-[#E24785]" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Engagement</div>
                          <div className="text-gray-600">{serviceData.duration}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="text-[#E24785]" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Format</div>
                          <div className="text-gray-600">{serviceData.format}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Shield className="text-[#E24785]" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Level</div>
                          <div className="text-gray-600">{serviceData.level}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="text-[#E24785]" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Availability</div>
                          <div className="text-gray-600">{serviceData.nextIntake}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Consulting Services</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {serviceData.services.map((item, index) => (
                      <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-pink-100">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-pink-100 p-2 rounded-lg text-[#E24785]">
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Consulting Process</h2>
                  <div className="space-y-4">
                    {serviceData.processSteps.map((step, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="bg-[#E24785] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="bg-pink-50 p-4 rounded-xl flex-1">
                          <p className="text-gray-700">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="lg:col-span-1 space-y-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-pink-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Regulatory Framework</h3>
                  <ul className="space-y-3">
                    {serviceData.legalRequirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-[#E24785] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 text-sm">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border border-pink-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Benefits</h3>
                  <div className="space-y-3">
                    {serviceData.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="text-[#E24785] mt-1 flex-shrink-0" size={18} />
                        <span className="text-gray-700 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#E24785] text-white rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4">Expert Support</h3>
                  <p className="text-pink-100 mb-6">
                    Our experienced consultants are ready to help you navigate complex compliance requirements.
                  </p>
                  <a 
                    href="mailto:hsetraining@istc.co.ke"
                    className="flex items-center justify-center gap-2 bg-white text-[#E24785] hover:bg-pink-50 py-3 rounded-xl font-semibold transition-colors"
                  >
                    <Mail size={18} />
                    Schedule Consultation
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

