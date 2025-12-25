'use client';

import { Phone, Mail, Calendar } from 'lucide-react';
import Link from 'next/link';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-adventure text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Enhance Your Safety Standards?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of professionals who trust ISTC for their safety training needs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Phone className="mx-auto mb-4" size={32} />
              <h3 className="font-semibold mb-2">Call Us Now</h3>
              <a href="tel:+254700364722" className="text-xl font-bold hover:text-accent-light transition-colors">
                +254 700 364 722
              </a>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Mail className="mx-auto mb-4" size={32} />
              <h3 className="font-semibold mb-2">Send Email</h3>
              <a href="mailto:hsetraining@istc.co.ke" className="text-xl font-bold hover:text-accent-light transition-colors">
                hsetraining@istc.co.ke
              </a>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Calendar className="mx-auto mb-4" size={32} />
              <h3 className="font-semibold mb-2">Schedule Visit</h3>
              <p className="text-xl font-bold">Book Consultation</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-white text-accent-800 hover:bg-accent-50 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              Get Free Consultation
            </Link>
            <Link 
              href="/courses" 
              className="border-2 border-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              Browse All Courses
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;