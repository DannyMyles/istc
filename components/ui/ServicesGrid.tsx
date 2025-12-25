'use client';

import { Shield, Heart, Flame, TreePine, Building, FileCheck, Users, Target } from 'lucide-react';
import Link from 'next/link';

const ServicesGrid = () => {
  const services = [
    {
      icon: Shield,
      title: 'Occupational Safety',
      description: 'Comprehensive workplace safety training and risk assessment programs.',
      color: 'bg-blue-100 text-blue-600',
      href: '/services/occupational-safety'
    },
    {
      icon: Heart,
      title: 'Health & First Aid',
      description: 'Emergency response training, CPR certification, and medical emergency preparedness.',
      color: 'bg-red-100 text-red-600',
      href: '/services/first-aid'
    },
    {
      icon: Flame,
      title: 'Fire Safety',
      description: 'Fire prevention, evacuation procedures, and firefighting equipment training.',
      color: 'bg-orange-100 text-orange-600',
      href: '/services/fire-safety'
    },
    {
      icon: TreePine,
      title: 'Environmental Protection',
      description: 'Environmental management systems and sustainable practices training.',
      color: 'bg-green-100 text-green-600',
      href: '/services/environmental'
    },
    {
      icon: Building,
      title: 'Construction Safety',
      description: 'Site safety management and construction hazard identification.',
      color: 'bg-yellow-100 text-yellow-600',
      href: '/services/construction-safety'
    },
    {
      icon: FileCheck,
      title: 'Certification',
      description: 'Internationally recognized safety certifications and renewals.',
      color: 'bg-purple-100 text-purple-600',
      href: '/services/certification'
    },
    {
      icon: Users,
      title: 'Corporate Training',
      description: 'Customized safety training programs for organizations.',
      color: 'bg-cyan-100 text-cyan-600',
      href: '/services/corporate-training'
    },
    {
      icon: Target,
      title: 'Safety Audits',
      description: 'Comprehensive workplace safety audits and compliance checks.',
      color: 'bg-indigo-100 text-indigo-600',
      href: '/services/audits'
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent-100 text-accent-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Shield size={16} />
            <span>Our Services</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Safety Solutions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We offer a wide range of safety training and consultancy services to meet all your workplace safety needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Link 
              key={index} 
              href={service.href}
              className="group adventure-card hover:shadow-adventure-lg transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center p-6">
                <div className={`p-4 rounded-2xl ${service.color} mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-accent-800 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-4 text-accent-600 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                  Learn more
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/services" 
            className="btn-adventure-outline px-8 py-3 text-lg"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;