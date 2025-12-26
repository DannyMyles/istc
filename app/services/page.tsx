import { 
  Shield, Heart, Flame, TreePine, 
  Building, FileCheck, Users, Target,
  Clock, Award, CheckCircle, ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { Phone, Mail } from 'lucide-react';


export default function ServicesPage() {
  const services = [
    {
      icon: Shield,
      title: 'Occupational Safety Training',
      description: 'Comprehensive workplace safety training covering hazard identification, risk assessment, and safety management systems.',
      features: [
        'Basic Safety Principles',
        'Hazard Identification',
        'Risk Assessment',
        'Safety Management Systems',
        'Emergency Preparedness'
      ],
      duration: '1-5 Days',
      level: 'All Levels',
      href: '/services/occupational-safety'
    },
    {
      icon: Heart,
      title: 'Health & First Aid Training',
      description: 'Emergency medical response training including CPR, first aid, and workplace health management.',
      features: [
        'CPR Certification',
        'First Aid Procedures',
        'Emergency Response',
        'Medical Emergency Management',
        'Workplace Health'
      ],
      duration: '1-3 Days',
      level: 'Beginner to Advanced',
      href: '/services/first-aid'
    },
    {
      icon: Flame,
      title: 'Fire Safety Training',
      description: 'Fire prevention, evacuation procedures, firefighting equipment training, and emergency planning.',
      features: [
        'Fire Prevention',
        'Evacuation Procedures',
        'Firefighting Equipment',
        'Emergency Planning',
        'Fire Risk Assessment'
      ],
      duration: '2-3 Days',
      level: 'Intermediate',
      href: '/services/fire-safety'
    },
    {
      icon: TreePine,
      title: 'Environmental Safety',
      description: 'Environmental management, waste handling, pollution control, and sustainable practices training.',
      features: [
        'Environmental Regulations',
        'Waste Management',
        'Pollution Control',
        'Sustainable Practices',
        'Environmental Audits'
      ],
      duration: '2-4 Days',
      level: 'Intermediate to Advanced',
      href: '/services/environmental'
    },
    {
      icon: Building,
      title: 'Construction Safety',
      description: 'Construction site safety management, hazard identification, and equipment safety training.',
      features: [
        'Site Safety Management',
        'Construction Hazards',
        'Equipment Safety',
        'Fall Protection',
        'Excavation Safety'
      ],
      duration: '3-5 Days',
      level: 'Intermediate',
      href: '/services/construction-safety'
    },
    {
      icon: FileCheck,
      title: 'Safety Certification',
      description: 'Internationally recognized safety certifications, renewals, and competency assessments.',
      features: [
        'Certification Programs',
        'Renewal Services',
        'Competency Assessment',
        'Documentation Support',
        'International Standards'
      ],
      duration: 'Varies',
      level: 'All Levels',
      href: '/services/certification'
    },
    {
      icon: Users,
      title: 'Corporate Safety Programs',
      description: 'Customized safety training programs designed specifically for organizational needs.',
      features: [
        'Custom Training Programs',
        'On-site Training',
        'Safety Culture Development',
        'Leadership Training',
        'Compliance Programs'
      ],
      duration: 'Custom',
      level: 'All Levels',
      href: '/services/corporate'
    },
    {
      icon: Target,
      title: 'Safety Audits & Consultancy',
      description: 'Comprehensive workplace safety audits, compliance checks, and expert consultancy services.',
      features: [
        'Safety Audits',
        'Compliance Checks',
        'Risk Assessments',
        'Policy Development',
        'Expert Consultancy'
      ],
      duration: 'Varies',
      level: 'Advanced',
      href: '/services/audits'
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Needs Assessment',
      description: 'We evaluate your specific safety requirements and training needs.'
    },
    {
      step: '02',
      title: 'Program Design',
      description: 'Customized training programs designed to meet your objectives.'
    },
    {
      step: '03',
      title: 'Training Delivery',
      description: 'Expert-led training sessions using modern teaching methodologies.'
    },
    {
      step: '04',
      title: 'Assessment & Certification',
      description: 'Competency assessment and issuance of recognized certificates.'
    },
    {
      step: '05',
      title: 'Follow-up Support',
      description: 'Ongoing support and consultation to ensure sustained safety improvement.'
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-accent-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Comprehensive Safety Solutions
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              We offer a complete range of safety training, certification, and consultancy services to protect your workforce and ensure regulatory compliance.
            </p>
            <div className="inline-flex items-center gap-2 bg-accent-100 text-accent-800 px-6 py-3 rounded-full text-lg font-semibold">
              <Award size={20} />
              <span>Certified Safety Solutions</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Safety Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional safety services designed for various industries and organizational needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="adventure-card hover:shadow-adventure-lg transition-all duration-300">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-accent-100 p-3 rounded-xl">
                    <service.icon className="text-accent-600" size={32} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
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

                <Link 
                  href={service.href} 
                  className="flex items-center justify-between text-accent-600 font-semibold group"
                >
                  <span>Learn more about this service</span>
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Service Process
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A systematic approach to delivering effective safety solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-accent-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
                
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-accent-200 -translate-x-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose ISTC Services?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-accent-100 p-2 rounded-lg">
                    <Shield className="text-accent-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Expert Instructors</h4>
                    <p className="text-gray-600">Our trainers are certified professionals with extensive industry experience.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-accent-100 p-2 rounded-lg">
                    <Award className="text-accent-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Certified Programs</h4>
                    <p className="text-gray-600">All our programs meet international safety standards and regulations.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-accent-100 p-2 rounded-lg">
                    <Users className="text-accent-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Custom Solutions</h4>
                    <p className="text-gray-600">We tailor our services to meet your specific organizational needs.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-accent-100 p-2 rounded-lg">
                    <CheckCircle className="text-accent-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Proven Results</h4>
                    <p className="text-gray-600">98% success rate and thousands of satisfied clients across industries.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-accent-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-accent-800 mb-6">
                Get a Free Service Consultation
              </h3>
              <p className="text-gray-700 mb-6">
                Not sure which service is right for you? Schedule a free consultation with our safety experts.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-lg">
                    <Phone className="text-accent-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Call us at</p>
                    <a href="tel:+254700364722" className="font-semibold text-accent-800">
                      +254 700 364 722
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-lg">
                    <Mail className="text-accent-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email us at</p>
                    <a href="mailto:hsetraining@istc.co.ke" className="font-semibold text-accent-800">
                      hsetraining@istc.co.ke
                    </a>
                  </div>
                </div>
              </div>
              <Link 
                href="/contact" 
                className="btn-adventure w-full mt-6 text-center"
              >
                Request Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-accent-600 to-accent-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Enhance Your Safety Standards?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Contact us today to discuss how our safety services can benefit your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+254700364722" 
              className="bg-white text-accent-800 hover:bg-accent-50 px-8 py-3 rounded-xl font-semibold text-lg transition-colors"
            >
              Call Now
            </a>
            <Link 
              href="/courses" 
              className="border-2 border-white hover:bg-white/10 px-8 py-3 rounded-xl font-semibold text-lg transition-colors"
            >
              View Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
