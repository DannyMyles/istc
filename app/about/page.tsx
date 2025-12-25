import { Shield, Target, Users, Globe, Award, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Our primary commitment is to promote and maintain the highest safety standards.'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for excellence in all our training programs and consultancy services.'
    },
    {
      icon: Users,
      title: 'Integrity',
      description: 'We conduct our business with honesty, transparency, and ethical practices.'
    },
    {
      icon: Globe,
      title: 'Innovation',
      description: 'We continuously update our methods to incorporate the latest safety practices.'
    }
  ];

  const certifications = [
    'NEMA Certified',
    'NITA Approved',
    'OSHA Standards Compliant',
    'First Aid International',
    'Fire Safety Certified',
    'Environmental Compliance'
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-accent-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About International Safety Training Centre
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              For over 16 years, we have been at the forefront of safety training and certification in Kenya and beyond.
            </p>
            <div className="inline-flex items-center gap-2 bg-accent-100 text-accent-800 px-6 py-3 rounded-full text-lg font-semibold">
              <Award size={20} />
              <span>Established 2008</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To provide comprehensive, practical, and affordable safety training that empowers organizations and individuals to create safer working environments through knowledge, skills, and awareness.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To be the leading provider of safety training and consultancy services in East Africa, recognized for excellence, innovation, and positive impact on workplace safety culture.
                </p>
              </div>
            </div>
            <div className="bg-accent-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-accent-800 mb-6">Our Core Values</h3>
              <div className="space-y-6">
                {values.map((value, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-xl">
                      <value.icon className="text-accent-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{value.title}</h4>
                      <p className="text-gray-600">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ISTC?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We stand out through our commitment to quality, experience, and client satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white adventure-card text-center p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-100 rounded-2xl mb-6 mx-auto">
                <Clock className="text-accent-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4">16+ Years Experience</h3>
              <p className="text-gray-600">
                Extensive experience in safety training across various industries.
              </p>
            </div>
            <div className="bg-white adventure-card text-center p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-100 rounded-2xl mb-6 mx-auto">
                <Users className="text-accent-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4">15,000+ Trained</h3>
              <p className="text-gray-600">
                Professionals and organizations who have benefited from our training.
              </p>
            </div>
            <div className="bg-white adventure-card text-center p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-100 rounded-2xl mb-6 mx-auto">
                <Award className="text-accent-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4">98% Success Rate</h3>
              <p className="text-gray-600">
                High certification success rate and client satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Our Certifications & Accreditations
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                  <CheckCircle className="text-green-500" size={20} />
                  <span className="font-medium">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-accent-600 to-accent-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your Safety Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join our community of safety professionals and transform your workplace safety standards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-white text-accent-800 hover:bg-accent-50 px-8 py-3 rounded-xl font-semibold text-lg transition-colors"
            >
              Contact Us
            </Link>
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