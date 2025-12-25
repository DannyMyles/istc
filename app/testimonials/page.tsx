import TestimonialCard from '@/components/ui/TestimonialCard';
import { Star, Quote, TrendingUp, Users, Award } from 'lucide-react';

export default function TestimonialsPage() {
  const allTestimonials = [
    {
      name: 'John Kamau',
      role: 'Safety Manager, BuildRight Construction',
      content: 'ISTC transformed our workplace safety culture. Their practical training approach helped us reduce accidents by 60% in the first year.',
      rating: 5,
      image: 'JK'
    },
    {
      name: 'Sarah Mwangi',
      role: 'HR Director, Precision Manufacturing',
      content: 'The certification process was smooth and professional. Our team is now better equipped to handle emergencies and compliance requirements.',
      rating: 5,
      image: 'SM'
    },
    {
      name: 'David Ochieng',
      role: 'Environmental Officer, GreenTech Solutions',
      content: 'Excellent training facilities and experienced instructors. Highly recommend for corporate safety training programs.',
      rating: 4,
      image: 'DO'
    },
    {
      name: 'Grace Akinyi',
      role: 'Operations Manager, Swift Logistics',
      content: 'The fire safety training saved us during a recent incident. Our staff responded professionally thanks to ISTC training.',
      rating: 5,
      image: 'GA'
    },
    {
      name: 'Peter Mwiti',
      role: 'Site Supervisor, Urban Developers Ltd',
      content: 'Best construction safety training I have attended. Practical demonstrations made complex concepts easy to understand.',
      rating: 5,
      image: 'PM'
    },
    {
      name: 'Lucy Wanjiru',
      role: 'Quality Manager, PharmaCare Kenya',
      content: 'The chemical safety training was comprehensive and met all our regulatory requirements. Excellent service!',
      rating: 4,
      image: 'LW'
    },
    {
      name: 'James Kibet',
      role: 'CEO, SecureTech Systems',
      content: 'We have trained all our security staff with ISTC. Their professionalism and expertise are unmatched.',
      rating: 5,
      image: 'JK'
    },
    {
      name: 'Maryanne Kariuki',
      role: 'Safety Officer, PowerGrid Kenya',
      content: 'The electrical safety course was exactly what our technicians needed. Practical sessions were particularly valuable.',
      rating: 5,
      image: 'MK'
    },
    {
      name: 'Robert Mutiso',
      role: 'Facilities Manager, Mega Mall Complex',
      content: 'Regular safety audits by ISTC have helped us maintain our safety standards consistently.',
      rating: 4,
      image: 'RM'
    },
  ];

  const statistics = [
    {
      value: '4.8/5',
      label: 'Average Client Rating',
      icon: Star
    },
    {
      value: '98%',
      label: 'Would Recommend',
      icon: TrendingUp
    },
    {
      value: '15,000+',
      label: 'Professionals Trained',
      icon: Users
    },
    {
      value: '25+',
      label: 'Industry Awards',
      icon: Award
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-accent-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent-100 text-accent-800 px-6 py-3 rounded-full text-lg font-semibold mb-8">
              <Quote size={20} />
              <span>Client Testimonials</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our Clients Say About Us
            </h1>
            <p className="text-xl text-gray-600 mb-12">
              Read experiences from professionals and organizations who have transformed their safety standards with our training.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {statistics.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-100 rounded-2xl mb-4 mx-auto">
                    <stat.icon className="text-accent-600" size={32} />
                  </div>
                  <div className="text-3xl font-bold text-accent-800 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allTestimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>

          {/* Video Testimonials Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Video Testimonials
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-100 rounded-2xl p-8">
                <div className="aspect-video bg-accent-100 rounded-xl mb-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                      <div className="w-0 h-0 border-t-[12px] border-b-[12px] border-l-[20px] border-transparent border-l-accent-600 ml-1"></div>
                    </div>
                    <p className="text-gray-600">Play Video Testimonial</p>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  John Kamau - BuildRight Construction
                </h3>
                <p className="text-gray-600">
                  "The impact on our safety culture has been remarkable..."
                </p>
              </div>
              
              <div className="bg-gray-100 rounded-2xl p-8">
                <div className="aspect-video bg-accent-100 rounded-xl mb-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                      <div className="w-0 h-0 border-t-[12px] border-b-[12px] border-l-[20px] border-transparent border-l-accent-600 ml-1"></div>
                    </div>
                    <p className="text-gray-600">Play Video Testimonial</p>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Sarah Mwangi - Precision Manufacturing
                </h3>
                <p className="text-gray-600">
                  "Professional certification process with excellent results..."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent-600 to-accent-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Join Our Satisfied Clients?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Experience the quality and professionalism that thousands of organizations trust for their safety training needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+254700364722" 
                className="bg-white text-accent-800 hover:bg-accent-50 px-8 py-3 rounded-xl font-semibold text-lg transition-colors"
              >
                Call to Enroll
              </a>
              <a 
                href="/courses" 
                className="border-2 border-white hover:bg-white/10 px-8 py-3 rounded-xl font-semibold text-lg transition-colors"
              >
                Browse Courses
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}