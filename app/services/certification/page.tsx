'use client';
import { Award, CheckCircle, Calendar, Clock, Users, FileText, ArrowLeft, Phone, Mail, Star, Target, BadgeCheck, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function CertificationSupport() {
  const serviceData = {
    title: 'Certification Support',
    subtitle: 'Guidance Through Certification Processes',
    description: 'Expert assistance in navigating certification processes for safety qualifications, compliance verification, and organizational credentials.',
    overview: 'Obtaining safety certifications is essential for demonstrating competency, compliance, and credibility. Our certification support services guide you through the entire process—from application preparation to final certification. Whether you need individual qualifications or organizational certifications, we provide the expertise and support needed for successful outcomes.',
    
    duration: 'Varies by certification type',
    format: 'Application Assistance & Preparation',
    level: 'Professional Certification Guidance',
    nextIntake: 'Year-round enrollment',
    
    services: [
      { icon: <BadgeCheck size={20} />, title: 'Certification Assessment', desc: 'Evaluation of your eligibility and readiness for desired certifications' },
      { icon: <FileText size={20} />, title: 'Application Preparation', desc: 'Guidance through application forms and required documentation' },
      { icon: <Target size={20} />, title: 'Exam Preparation', desc: 'Comprehensive review and preparation for certification examinations' },
      { icon: <Star size={20} />, title: 'Credential Verification', desc: 'Assistance with credential authentication and verification processes' },
      { icon: <TrendingUp size={20} />, title: 'Renewal Management', desc: 'Support for certification renewals and continuing education requirements' },
      { icon: <Award size={20} />, title: 'Corporate Certification', desc: 'Guidance for organizational certifications and accreditations' }
    ],
    
    processSteps: [
      'Certification needs assessment and selection',
      'Eligibility evaluation and gap analysis',
      'Preparation of required documentation',
      'Application submission guidance',
      'Exam preparation and study support',
      'Pre-certification review and audit',
      'On-site assessment support (if applicable)',
      'Post-certification support and renewals'
    ],
    
    legalRequirements: [
      'NEMA certification requirements',
      'NITA qualification standards',
      'OSHA competency requirements',
      'International certification bodies',
      'Industry-specific credentialing',
      'Continuing education mandates',
      'Record keeping and documentation',
      'Renewal and recertification timelines'
    ],
    
    deliverables: [
      'Certification eligibility assessment',
      'Customized preparation plan',
      'Application checklist and templates',
      'Study materials and resources',
      'Exam readiness evaluation',
      'Certification guidance documents',
      'Post-certification support plan',
      'Renewal tracking and reminders'
    ],
    
    benefits: [
      'Increased chances of first-attempt success',
      'Time-saving through streamlined processes',
      'Access to expert guidance and resources',
      'Recognition of professional competencies',
      'Enhanced career opportunities',
      'Organizational credibility boost',
      'Compliance with industry requirements',
      'Ongoing professional development support'
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section with Background Image */}
      <div className="relative bg-gradient-to-r from-[#27AE60] to-[#219A52] text-white py-48 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: "url('/images/1.jpg')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-green-700/60"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <Link href="/services" className="text-green-200 hover:text-white flex items-center gap-2">
                <ArrowLeft size={20} /> Back to all services
              </Link>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="text-green-200" size={24} />
                  <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-semibold">
                    Professional Credentials
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
                  <h3 className="text-xl font-bold mb-4">Start Your Certification</h3>
                  <p className="text-green-200 text-sm mb-6">Get expert support for your certification journey.</p>
                  
                  <Link
                    href="/contact"
                    className="w-full bg-white text-[#27AE60] hover:bg-green-50 py-3 rounded-xl font-semibold text-lg transition-colors mb-4 flex items-center justify-center"
                  >
                    Get Certification Guidance
                  </Link>
                  
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
                        <Clock className="text-[#27AE60]" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Format</div>
                          <div className="text-gray-600">{serviceData.format}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Award className="text-[#27AE60]" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Level</div>
                          <div className="text-gray-600">{serviceData.level}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="text-[#27AE60]" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Enrollment</div>
                          <div className="text-gray-600">{serviceData.nextIntake}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Certification Support Services</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {serviceData.services.map((item, index) => (
                      <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-green-100">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-green-100 p-2 rounded-lg text-[#27AE60]">
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Support Process</h2>
                  <div className="space-y-4">
                    {serviceData.processSteps.map((step, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="bg-[#27AE60] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="bg-green-50 p-4 rounded-xl flex-1">
                          <p className="text-gray-700">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="lg:col-span-1 space-y-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Certification Bodies</h3>
                  <ul className="space-y-3">
                    {serviceData.legalRequirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-[#27AE60] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 text-sm">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Benefits</h3>
                  <div className="space-y-3">
                    {serviceData.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="text-[#27AE60] mt-1 flex-shrink-0" size={18} />
                        <span className="text-gray-700 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#27AE60] text-white rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4">Professional Recognition</h3>
                  <p className="text-green-100 mb-6">
                    Achieve recognized certifications that advance your career and organizational credibility.
                  </p>
                  <a 
                    href="mailto:hsetraining@istc.co.ke"
                    className="flex items-center justify-center gap-2 bg-white text-[#27AE60] hover:bg-green-50 py-3 rounded-xl font-semibold transition-colors"
                  >
                    <Mail size={18} />
                    Start Your Journey
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

