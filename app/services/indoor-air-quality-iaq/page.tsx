'use client';
import { useState } from 'react';
import { Wind, CheckCircle, Calendar, Clock, Users, FileText, ArrowLeft, Phone, Mail, Thermometer, Droplets, AlertTriangle, Building } from 'lucide-react';
import Link from 'next/link';

export default function IndoorAirQualityIAQ() {
  const [showContactForm, setShowContactForm] = useState(false);
  
  const serviceData = {
    title: 'Indoor Air Quality (IAQ) Assessment',
    subtitle: 'Comprehensive Air Quality Testing for Healthy Indoor Environments',
    description: 'We provide companies with detailed reports on air quality including composition, sources, level of pollutants and how to address any issues affecting occupant health and comfort.',
    overview: 'Indoor Air Quality refers to the air quality within and around buildings and structures, especially as it relates to the health and comfort of building occupants. Our team of auditors identifies pollutants within your workplace and recommends mitigation measures to reduce the probability of occupational diseases.',
    
    duration: '1-3 days (depending on building size)',
    format: 'On-site Testing & Analysis',
    level: 'Health Assessment Service',
    nextIntake: 'Schedule anytime',
    
    pollutantsAssessed: [
      'Particulate matter (PM2.5, PM10)',
      'Volatile Organic Compounds (VOCs)',
      'Carbon dioxide (CO2) and carbon monoxide (CO)',
      'Formaldehyde and other chemical vapors',
      'Biological contaminants (mold, bacteria)',
      'Allergens and dust mites',
      'Radon gas (where applicable)',
      'Ozone and other oxidizing gases'
    ],
    
    assessmentAreas: [
      { icon: <Thermometer size={18} />, area: 'Temperature and humidity', desc: 'Comfort parameters measurement' },
      { icon: <Wind size={18} />, area: 'Ventilation system assessment', desc: 'Air exchange rates and efficiency' },
      { icon: <Droplets size={18} />, area: 'Moisture and mold detection', desc: 'Identification of dampness issues' },
      { icon: <Building size={18} />, area: 'Building materials assessment', desc: 'Evaluation of pollutant sources' },
      { icon: <Users size={18} />, area: 'Occupant health surveys', desc: 'Symptom and complaint analysis' },
      { icon: <AlertTriangle size={18} />, area: 'Source identification', desc: 'Pinpointing pollutant origins' }
    ],
    
    healthSymptoms: [
      'Headaches, fatigue and dizziness',
      'Eye, nose and throat irritation',
      'Respiratory issues and asthma exacerbation',
      'Allergic reactions and skin irritation',
      'Difficulty concentrating ("sick building syndrome")',
      'Increased absenteeism and reduced productivity',
      'Long-term chronic health conditions',
      'Increased infection transmission risk'
    ],
    
    deliverables: [
      'Comprehensive IAQ assessment report',
      'Pollutant concentration measurements',
      'Source identification and analysis',
      'Ventilation system evaluation',
      'Health risk assessment for occupants',
      'Mitigation measures and improvement plan',
      'Priority action recommendations',
      'Follow-up testing protocol'
    ],
    
    benefits: [
      'Protect occupant health and wellbeing',
      'Increase productivity and reduce absenteeism',
      'Comply with occupational health regulations',
      'Reduce liability and workers compensation claims',
      'Improve employee satisfaction and retention',
      'Identify and eliminate pollutant sources',
      'Optimize HVAC system performance',
      'Demonstrate commitment to workplace health'
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24">
      <div className="bg-gradient-to-r from-cyan-600 to-cyan-500 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <Link href="/services" className="text-cyan-200 hover:text-white flex items-center gap-2">
                <ArrowLeft size={20} /> Back to all services
              </Link>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <Wind className="text-cyan-200" size={24} />
                  <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-semibold">
                    Occupant Health & Comfort
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {serviceData.title}
                </h1>
                <p className="text-xl text-cyan-100 mb-6">
                  {serviceData.subtitle}
                </p>
                <p className="text-cyan-200 text-lg">
                  {serviceData.description}
                </p>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-4">Request IAQ Assessment</h3>
                  <p className="text-cyan-200 text-sm mb-6">Get a comprehensive air quality evaluation for your building.</p>
                  
                  <button 
                    onClick={() => setShowContactForm(true)}
                    className="w-full bg-white text-cyan-600 hover:bg-cyan-50 py-3 rounded-xl font-semibold text-lg transition-colors mb-4"
                  >
                    Get Air Quality Quote
                  </button>
                  
                  <div className="space-y-3">
                    <a href="tel:+254700364722" className="flex items-center justify-center gap-2 text-cyan-200 hover:text-white py-2">
                      <Phone size={18} /> +254 700 364 722
                    </a>
                    <a href="mailto:hsetraining@istc.co.ke" className="flex items-center justify-center gap-2 text-cyan-200 hover:text-white py-2">
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
                        <Calendar className="text-cyan-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Duration</div>
                          <div className="text-gray-600">{serviceData.duration}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="text-cyan-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Format</div>
                          <div className="text-gray-600">{serviceData.format}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Wind className="text-cyan-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Level</div>
                          <div className="text-gray-600">{serviceData.level}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="text-cyan-600" size={20} />
                        <div>
                          <div className="font-semibold text-gray-900">Availability</div>
                          <div className="text-gray-600">{serviceData.nextIntake}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Pollutants Assessed</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {serviceData.pollutantsAssessed.map((pollutant, index) => (
                      <div key={index} className="flex items-start gap-3 bg-cyan-50 p-4 rounded-xl">
                        <AlertTriangle className="text-cyan-600 mt-1 flex-shrink-0" size={18} />
                        <span className="text-gray-700">{pollutant}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Assessment Areas</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {serviceData.assessmentAreas.map((item, index) => (
                      <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-cyan-100">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-cyan-100 p-2 rounded-lg">
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
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-cyan-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Symptoms of Poor IAQ</h3>
                  <ul className="space-y-3">
                    {serviceData.healthSymptoms.map((symptom, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 text-sm">{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border border-cyan-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Deliverables</h3>
                  <div className="space-y-3">
                    {serviceData.deliverables.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-cyan-50 rounded-lg">
                        <div className="bg-cyan-100 p-1 rounded">
                          <CheckCircle size={16} className="text-cyan-600" />
                        </div>
                        <span className="text-gray-700 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-cyan-600 text-white rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4">Breathe Easier at Work</h3>
                  <p className="text-cyan-100 mb-6">
                    Poor indoor air quality affects health, productivity and morale. Let us help you create a healthier workspace.
                  </p>
                  <a 
                    href="mailto:hsetraining@istc.co.ke"
                    className="flex items-center justify-center gap-2 bg-white text-cyan-600 hover:bg-cyan-50 py-3 rounded-xl font-semibold transition-colors"
                  >
                    <Mail size={18} />
                    Email for IAQ Assessment
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