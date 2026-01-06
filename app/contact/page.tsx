'use client';

import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle, User, Building, MessageSquare } from 'lucide-react';
import { contactService, CreateContactRequest } from '../api_services/contactService';

// Types - Updated to use CreateContactRequest
interface ContactFormData extends Omit<CreateContactRequest, 'category'> {
  phone: string;
  company: string;
  category: CreateContactRequest['category'];
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    category: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  // Check rate limit on email change
  useEffect(() => {
    if (formData.email) {
      const isLimited = !contactService.checkRateLimit(formData.email);
      setIsRateLimited(isLimited);
      
      if (isLimited) {
        const remaining = contactService.getRemainingWaitTime(formData.email);
        setRemainingTime(remaining);
      }
    }
  }, [formData.email]);

  // Update countdown timer
  useEffect(() => {
    if (!isRateLimited || remainingTime <= 0) return;

    const timer = setInterval(() => {
      setRemainingTime(prev => {
        const newTime = prev - 1000;
        if (newTime <= 0) {
          setIsRateLimited(false);
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRateLimited, remainingTime]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check rate limit
    if (isRateLimited) {
      setSubmitStatus('error');
      setErrorMessage(`Please wait ${contactService.formatRemainingTime(remainingTime)} minutes before submitting again.`);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // Validate form data using service
      const validation = contactService.validateContactForm(formData);
      if (!validation.isValid) {
        const firstError = Object.values(validation.errors)[0];
        throw new Error(firstError);
      }

      // Prepare data for API
      const contactData: CreateContactRequest = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        phone: formData.phone.trim() || undefined,
        company: formData.company.trim() || undefined,
        category: formData.category
      };

      // Submit using service
      const response = await contactService.submitContactForm(contactData);

      // Success
      setSubmitStatus('success');
      setSuccessMessage(response.message || 'Thank you for contacting us. We will get back to you soon.');
      
      // Set rate limit
      contactService.setRateLimit(formData.email);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        category: 'general'
      });

    } catch (error: any) {
      setSubmitStatus('error');
      setErrorMessage(error.message || 'An unexpected error occurred. Please try again.');
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone Number',
      details: ['+254 700 364 722', '+254 720 123 456'],
      action: 'tel:+254700364722'
    },
    {
      icon: Mail,
      title: 'Email Address',
      details: ['hsetraining@istc.co.ke', 'training@istc.co.ke'],
      action: 'mailto:hsetraining@istc.co.ke'
    },
    {
      icon: MapPin,
      title: 'Office Location',
      details: ['Westlands, Nairobi', 'Kenya'],
      action: 'https://maps.google.com/?q=Westlands+Nairobi+Kenya'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Mon - Fri: 8:00 AM - 5:00 PM', 'Sat: 9:00 AM - 1:00 PM'],
      action: null
    },
  ];

  const subjects = [
    'General Inquiry',
    'Course Registration',
    'Corporate Training',
    'Safety Audit Request',
    'Certification Inquiry',
    'Partnership Opportunity',
    'Complaint/Feedback',
    'Other'
  ];

  const categories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'support', label: 'Support' },
    { value: 'feedback', label: 'Feedback' },
    { value: 'complaint', label: 'Complaint' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'business', label: 'Business Inquiry' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-accent-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get in Touch With Us
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Have questions about our safety training programs? Need a customized solution? Contact our team today.
            </p>
            <div className="inline-flex items-center gap-2 bg-accent-100 text-accent-800 px-6 py-3 rounded-full text-lg font-semibold">
              <Send size={20} />
              <span>24/7 Support Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h2>
              
              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-accent-100 p-3 rounded-xl">
                      <info.icon className="text-accent-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                      {info.details.map((detail, idx) => (
                        <div key={idx}>
                          {info.action ? (
                            <a 
                              href={info.action} 
                              className="text-gray-600 hover:text-accent-800 transition-colors"
                              target={info.title === 'Office Location' ? '_blank' : '_self'}
                              rel={info.title === 'Office Location' ? 'noopener noreferrer' : ''}
                            >
                              {detail}
                            </a>
                          ) : (
                            <p className="text-gray-600">{detail}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Emergency Contact */}
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-red-100 p-2 rounded-lg">
                    <AlertCircle className="text-red-600" size={24} />
                  </div>
                  <h3 className="font-bold text-red-800">Emergency Contact</h3>
                </div>
                <p className="text-red-700 mb-4">
                  For immediate safety emergencies or urgent training needs
                </p>
                <a 
                  href="tel:+254711222333" 
                  className="block text-center bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Call Emergency: +254 711 222 333
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white adventure-card p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-green-600" size={24} />
                      <div>
                        <h3 className="font-semibold text-green-800">Message Sent Successfully!</h3>
                        <p className="text-green-700">{successMessage}</p>
                      </div>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="text-red-600" size={24} />
                      <div>
                        <h3 className="font-semibold text-red-800">Error Sending Message</h3>
                        <p className="text-red-700">{errorMessage}</p>
                      </div>
                    </div>
                  </div>
                )}

                {isRateLimited && (
                  <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="text-yellow-600" size={24} />
                      <div>
                        <h3 className="font-semibold text-yellow-800">Submission Limit Reached</h3>
                        <p className="text-yellow-700">
                          Please wait {contactService.formatRemainingTime(remainingTime)} before submitting again.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                        <User size={16} />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                        <Mail size={16} />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                        <Phone size={16} />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                        <Building size={16} />
                        Company/Organization
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                        placeholder="Enter company name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                      >
                        <option value="">Select a subject</option>
                        {subjects.map((subject) => (
                          <option key={subject} value={subject}>
                            {subject}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                      >
                        {categories.map((category) => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                      <MessageSquare size={16} />
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                      placeholder="Tell us about your safety training needs..."
                      maxLength={2000}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Maximum 2000 characters ({formData.message.length}/2000)
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      type="submit"
                      disabled={isSubmitting || isRateLimited}
                      className="btn-adventure flex items-center gap-2 px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send size={20} />
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                    <p className="text-sm text-gray-500">
                      We typically respond within 24 hours
                    </p>
                  </div>
                </form>
              </div>

              {/* FAQ Section */}
              <div className="mt-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <details className="bg-gray-50 rounded-lg p-4">
                    <summary className="font-medium text-gray-900 cursor-pointer">
                      How quickly can you schedule training for our organization?
                    </summary>
                    <p className="mt-2 text-gray-600">
                      We can typically schedule training within 1-2 weeks, depending on the course and group size. For urgent needs, we offer expedited scheduling.
                    </p>
                  </details>
                  <details className="bg-gray-50 rounded-lg p-4">
                    <summary className="font-medium text-gray-900 cursor-pointer">
                      Do you offer on-site training?
                    </summary>
                    <p className="mt-2 text-gray-600">
                      Yes, we provide on-site training at your location. This is often more convenient for organizations with multiple employees needing training.
                    </p>
                  </details>
                  <details className="bg-gray-50 rounded-lg p-4">
                    <summary className="font-medium text-gray-900 cursor-pointer">
                      Are your certifications internationally recognized?
                    </summary>
                    <p className="mt-2 text-gray-600">
                      Yes, our certifications meet international safety standards and are recognized globally. We comply with OSHA, NEMA, and other international regulatory bodies.
                    </p>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map & Location */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Visit Our Training Center
          </h2>
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
            <div className="h-96 bg-accent-100 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <MapPin className="text-accent-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-accent-800 mb-2">
                  Westlands, Nairobi
                </h3>
                <p className="text-gray-600">
                  Visit our state-of-the-art training facility
                </p>
                <a 
                  href="https://maps.google.com/?q=Westlands+Nairobi+Kenya" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block mt-4 btn-adventure"
                >
                  Get Directions
                </a>
              </div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Training Facilities</h4>
                  <p className="text-gray-600">Modern classrooms and practical training areas</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Equipment Available</h4>
                  <p className="text-gray-600">Latest safety equipment for hands-on training</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Parking Available</h4>
                  <p className="text-gray-600">Secure parking for all visitors</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}