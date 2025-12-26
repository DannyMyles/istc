'use client';

import { 
  Shield, Flame, TreePine, Users, FileCheck,
  Target, Activity, Headphones, AlertTriangle, Wind,
  Clock, Award, CheckCircle, ArrowRight, Search, Filter,
  BarChart3, TrendingUp, Users as UsersIcon, Building
} from 'lucide-react';
import Link from 'next/link';
import { Phone, Mail } from 'lucide-react';
import { useState } from 'react';

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('All Services');
  const [searchQuery, setSearchQuery] = useState('');
  
  const services = [
    {
      icon: Shield,
      title: 'Occupational Safety & Health Audit',
      description: 'Comprehensive workplace safety and health audits to ensure compliance with legal requirements and international standards.',
      features: [
        'OSHA Compliance Assessment',
        'Workplace Hazard Analysis',
        'Safety Policy Review',
        'Emergency Preparedness Audit',
        'Health & Safety Management Systems'
      ],
      duration: '2-5 Days',
      level: 'Comprehensive Audit',
      href: '/services/occupational-safety-health-audit',
      category: 'Safety Audits',
      featured: true,
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Flame,
      title: 'Fire Safety Audit',
      description: 'Detailed fire safety assessment of buildings, facilities, and fire protection systems to ensure compliance and safety.',
      features: [
        'Fire Detection Systems Audit',
        'Fire Fighting Equipment Check',
        'Evacuation Route Analysis',
        'Fire Safety Management Review',
        'Emergency Lighting Assessment'
      ],
      duration: '1-3 Days',
      level: 'Specialized Audit',
      href: '/services/fire-safety-audit',
      category: 'Safety Audits',
      featured: true,
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: TreePine,
      title: 'Environmental Audit',
      description: 'Systematic evaluation of environmental performance and compliance with environmental regulations and standards.',
      features: [
        'Waste Management Assessment',
        'Pollution Control Review',
        'Resource Conservation Audit',
        'Environmental Compliance Check',
        'Sustainability Practices Evaluation'
      ],
      duration: '3-7 Days',
      level: 'Environmental Compliance',
      href: '/services/environmental-audit',
      category: 'Environmental Services',
      featured: false,
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Activity,
      title: 'Noise Measurement & Assessment',
      description: 'Professional noise level monitoring and assessment to protect employees from hearing damage and ensure regulatory compliance.',
      features: [
        'Workplace Noise Monitoring',
        'Personal Noise Dosimetry',
        'Noise Control Recommendations',
        'Hearing Conservation Programs',
        'Regulatory Compliance Assessment'
      ],
      duration: '1-2 Days',
      level: 'Measurement Service',
      href: '/services/noise-measurement',
      category: 'Health Assessments',
      featured: false,
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Wind,
      title: 'Indoor Air Quality (IAQ) Assessment',
      description: 'Comprehensive indoor air quality testing and assessment to ensure healthy indoor environments for occupants.',
      features: [
        'Air Contaminant Testing',
        'Ventilation System Assessment',
        'Temperature & Humidity Monitoring',
        'Mold & Allergen Detection',
        'Air Quality Improvement Plans'
      ],
      duration: '1-3 Days',
      level: 'Health Assessment',
      href: '/services/indoor-air-quality-iaq',
      category: 'Health Assessments',
      featured: false,
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      icon: FileCheck,
      title: 'Ergonomics Audit',
      description: 'Workstation and workplace ergonomic assessment to prevent musculoskeletal disorders and improve productivity.',
      features: [
        'Workstation Evaluation',
        'Posture Assessment',
        'Manual Handling Review',
        'Ergonomic Risk Assessment',
        'Workplace Modification Recommendations'
      ],
      duration: '1-2 Days',
      level: 'Ergonomic Assessment',
      href: '/services/ergonomics-audit',
      category: 'Health Assessments',
      featured: true,
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: Target,
      title: 'Risk Assessment',
      description: 'Systematic identification, analysis, and evaluation of risks to develop effective control measures.',
      features: [
        'Hazard Identification',
        'Risk Analysis & Evaluation',
        'Control Measure Development',
        'Risk Documentation',
        'Ongoing Risk Monitoring'
      ],
      duration: '2-5 Days',
      level: 'Risk Management',
      href: '/services/risk-assessment',
      category: 'Risk Management',
      featured: false,
      color: 'from-red-500 to-red-600'
    },
    {
      icon: TreePine,
      title: 'Environmental Impact Assessment',
      description: 'Comprehensive assessment of potential environmental impacts of proposed projects and developments.',
      features: [
        'Environmental Baseline Studies',
        'Impact Prediction & Evaluation',
        'Mitigation Measures Development',
        'Stakeholder Consultation',
        'EIA Report Preparation'
      ],
      duration: '30-60 Days',
      level: 'Project Assessment',
      href: '/services/environmental-impact-assessment',
      category: 'Environmental Services',
      featured: true,
      color: 'from-emerald-500 to-emerald-600'
    },
  ];

  const categories = [
    'All Services',
    'Safety Audits',
    'Environmental Services',
    'Health Assessments',
    'Risk Management'
  ];

  // Filter services based on active category and search query
  const filteredServices = services.filter(service => {
    const matchesCategory = activeCategory === 'All Services' || service.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  // Get featured services
  const featuredServices = services.filter(service => service.featured);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-accent-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Professional Safety & Environmental Services
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Comprehensive audit, assessment, and consultancy services to ensure workplace safety, environmental compliance, and risk management.
            </p>
            <div className="inline-flex items-center gap-2 bg-accent-100 text-accent-800 px-6 py-3 rounded-full text-lg font-semibold">
              <Award size={20} />
              <span>Certified & Accredited Services</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
                <input
                  type="text"
                  placeholder="Search services by name, description, or features..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent focus:shadow-glow-accent adventure-card"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-accent-600 text-white shadow-lg'
                      : 'border border-gray-300 bg-white hover:border-accent-600 hover:bg-accent-50 text-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-800 mb-2">{services.length}</div>
                <div className="text-gray-600">Professional Services</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-800 mb-2">15+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-800 mb-2">500+</div>
                <div className="text-gray-600">Clients Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-800 mb-2">98%</div>
                <div className="text-gray-600">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Services
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our most requested professional services trusted by industry leaders.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {featuredServices.map((service, index) => (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl transform group-hover:scale-105 transition-transform duration-300"></div>
                  <div className="relative bg-white rounded-2xl shadow-xl p-8 transform group-hover:-translate-y-2 transition-transform duration-300">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${service.color} text-white mb-6`}>
                      <service.icon size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock size={16} />
                          {service.duration}
                        </span>
                      </div>
                      <Link 
                        href={service.href}
                        className="flex items-center gap-2 text-accent-600 font-semibold group/link"
                      >
                        Learn more
                        <ArrowRight className="group-hover/link:translate-x-2 transition-transform" size={18} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  All Professional Services
                </h2>
                <p className="text-gray-600">
                  Showing {filteredServices.length} of {services.length} services
                </p>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Filter size={20} />
                <span>Filtered by: {activeCategory}</span>
              </div>
            </div>

            {filteredServices.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search size={48} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No services found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredServices.map((service, index) => (
                  <div key={index} className="adventure-card hover:shadow-adventure-lg transition-all duration-300 group border border-gray-200">
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`bg-gradient-to-r ${service.color} p-3 rounded-xl text-white`}>
                        <service.icon size={32} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {service.category}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{service.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                          <span className="flex items-center gap-1">
                            <Clock size={16} />
                            {service.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Award size={16} />
                            {service.level}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-medium text-gray-900 mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-500" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <Link 
                        href={service.href} 
                        className="flex items-center gap-2 text-accent-600 font-semibold group/link"
                      >
                        <span>View service details</span>
                        <ArrowRight className="group-hover/link:translate-x-2 transition-transform" />
                      </Link>
                      <a 
                        href="mailto:hsetraining@istc.co.ke"
                        className="text-sm text-gray-500 hover:text-accent-600"
                      >
                        Get quote
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Why Choose ISTC Services?
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-accent-100 p-3 rounded-xl">
                      <BarChart3 className="text-accent-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Data-Driven Approach</h4>
                      <p className="text-gray-600">We use quantified metrics and evidence-based methodologies for accurate assessments.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-accent-100 p-3 rounded-xl">
                      <UsersIcon className="text-accent-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Expert Team</h4>
                      <p className="text-gray-600">Our auditors are certified professionals with extensive industry experience.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-accent-100 p-3 rounded-xl">
                      <TrendingUp className="text-accent-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Proven Results</h4>
                      <p className="text-gray-600">98% success rate with thousands of satisfied clients across industries.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-accent-100 p-3 rounded-xl">
                      <Building className="text-accent-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Industry Coverage</h4>
                      <p className="text-gray-600">We serve all sectors from manufacturing to healthcare, construction to hospitality.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">
                  Get a Free Service Consultation
                </h3>
                <p className="text-accent-100 mb-8">
                  Not sure which service is right for you? Schedule a free consultation with our safety experts to discuss your specific needs.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <Phone className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="text-accent-200 text-sm">Call us at</p>
                      <a href="tel:+254700364722" className="text-xl font-bold hover:text-accent-100">
                        +254 700 364 722
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <Mail className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="text-accent-200 text-sm">Email us at</p>
                      <a href="mailto:hsetraining@istc.co.ke" className="text-xl font-bold hover:text-accent-100">
                        hsetraining@istc.co.ke
                      </a>
                    </div>
                  </div>
                </div>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center w-full bg-white text-accent-600 hover:bg-accent-50 px-8 py-4 rounded-xl font-semibold text-lg transition-colors mt-8"
                >
                  Request Free Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent-600 to-accent-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Enhance Your Safety Standards?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Contact us today to discuss how our professional services can benefit your organization and ensure regulatory compliance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+254700364722" 
              className="bg-white text-accent-800 hover:bg-accent-50 px-8 py-3 rounded-xl font-semibold text-lg transition-colors"
            >
              Call Now for Consultation
            </a>
            <Link 
              href="/courses" 
              className="border-2 border-white hover:bg-white/10 px-8 py-3 rounded-xl font-semibold text-lg transition-colors"
            >
              View Training Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}