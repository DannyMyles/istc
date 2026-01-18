'use client';

import { useState, useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle, User, Building, MessageSquare, ChevronDown } from 'lucide-react';
import { contactService, CreateContactRequest } from '../api_services/contactService';

// Types - Updated to use CreateContactRequest
interface ContactFormData extends Omit<CreateContactRequest, 'category'> {
  phone: string;
  company: string;
  category: CreateContactRequest['category'];
}

export default function ContactPage() {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [currentSection, setCurrentSection] = useState(0);
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

  // Define sections for scroll navigation
  const sections = [
    { id: 'contact', title: 'Contact Form' },
    { id: 'map', title: 'Visit Us' },
    { id: 'faq', title: 'FAQ' }
  ];

  const scrollToNextSection = () => {
    const nextSection = (currentSection + 1) % sections.length;
    setCurrentSection(nextSection);
    
    if (sectionsRef.current[nextSection]) {
      sectionsRef.current[nextSection]?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        scrollToNextSection();
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevSection = (currentSection - 1 + sections.length) % sections.length;
        setCurrentSection(prevSection);
        sectionsRef.current[prevSection]?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    };

    // Intersection Observer to track current section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = sectionsRef.current.findIndex(ref => ref === entry.target);
            if (index !== -1) {
              setCurrentSection(index);
            }
          }
        });
      },
      { threshold: 0.3, rootMargin: '-100px 0px -100px 0px' }
    );

    sectionsRef.current.forEach(section => {
      if (section) observer.observe(section);
    });

    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      observer.disconnect();
    };
  }, [currentSection, sections.length]);

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

  // Ref callback functions
  const setHeroRef = (el: HTMLDivElement | null) => {
    sectionsRef.current[0] = el;
  };

  const setFormRef = (el: HTMLDivElement | null) => {
    sectionsRef.current[1] = el;
  };

  const setMapRef = (el: HTMLDivElement | null) => {
    sectionsRef.current[2] = el;
  };

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
      action: 'tel:+254700364722',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Mail,
      title: 'Email Address',
      details: ['hsetraining@istc.co.ke', 'training@istc.co.ke'],
      action: 'mailto:hsetraining@istc.co.ke',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: MapPin,
      title: 'Office Location',
      details: ['Occidental House, Baricho Road,, Nairobi', 'Kenya'],
      action: 'https://maps.google.com/?q=Occidental House, Baricho Road,+Nairobi+Kenya',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Mon - Fri: 8:00 AM - 5:00 PM', 'Sat: 9:00 AM - 1:00 PM'],
      action: null,
      color: 'from-orange-500 to-orange-600'
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
    <div className="pt-8">
      {/* Hero Section with Background Image */}
      <div ref={setHeroRef}>
        <section className="relative py-28 md:py-62 overflow-hidden">
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
            style={{
              backgroundImage: "url('/images/9.jpg')",
              backgroundColor: '#039AC5'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-gray-900/50"></div>
            <div className="absolute inset-0 opacity-10 bg-[url('/images/patterns/network-pattern.svg')]"></div>
          </div>
          
          <div className="container relative z-10 mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-accent-500/10 backdrop-blur-sm border border-accent-500/20 text-white px-6 py-2 rounded-full text-sm font-medium mb-8">
                <Send size={16} />
                <span>24/7 Support Available</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Get in <span className="text-accent-400">Touch</span> With Us
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
                Have questions about our safety training programs? Need a customized solution? Contact our expert team today.
              </p>

              {/* Quick Contact Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">24/7</div>
                  <div className="text-gray-300">Support Line</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">1-2 Hrs</div>
                  <div className="text-gray-300">Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">98%</div>
                  <div className="text-gray-300">Satisfaction Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">100%</div>
                  <div className="text-gray-300">Confidential</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <button
            onClick={scrollToNextSection}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 group focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-full"
            aria-label={`Scroll to ${sections[0]?.title} section`}
          >
            <div className="flex flex-col items-center gap-3">
              {/* Progress indicator */}
              <div className="flex items-center gap-1 mb-1">
                {sections.map((_, index) => (
                  <div 
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      index === currentSection 
                        ? 'bg-accent-400 w-4' 
                        : index < currentSection 
                          ? 'bg-white/60' 
                          : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
              
              <span className="text-xs text-white/70 group-hover:text-white transition-colors">
                Next: {sections[(currentSection + 1) % sections.length]?.title}
              </span>
              
              <div className="relative">
                <div className="absolute inset-0 border-2 border-white/30 rounded-full animate-ping group-hover:border-white"></div>
                <div className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center group-hover:bg-white/20 group-hover:border-white/40 transition-all duration-300">
                  <ChevronDown 
                    className="w-5 h-5 text-white transform group-hover:translate-y-0.5 transition-transform duration-300" 
                  />
                </div>
              </div>
              
              <div className="absolute -bottom-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                <span className="text-xs text-accent-300 font-medium">↑↓ Arrow keys to navigate</span>
              </div>
            </div>
          </button>
        </section>
      </div>

      {/* Contact Content Section */}
      <div ref={setFormRef}>
        <section className="py-20 bg-gradient-to-b from-white to-gray-50 scroll-mt-20" id="contact-section">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Information */}
              <div className="lg:col-span-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h2>
                
                <div className="space-y-6 mb-8">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="group">
                      <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300">
                        <div className={`bg-gradient-to-r ${info.color} p-3 rounded-xl text-white group-hover:scale-110 transition-transform duration-300`}>
                          <info.icon className="text-white" size={24} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                          {info.details.map((detail, idx) => (
                            <div key={idx}>
                              {info.action ? (
                                <a 
                                  href={info.action} 
                                  className="text-gray-600 hover:text-accent-800 transition-colors group-hover:font-medium"
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
                    </div>
                  ))}
                </div>

                {/* Emergency Contact */}
                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                      <AlertCircle className="text-white" size={24} />
                    </div>
                    <h3 className="font-bold text-white">Emergency Contact</h3>
                  </div>
                  <p className="text-red-100 mb-4">
                    For immediate safety emergencies or urgent training needs
                  </p>
                  <a 
                    href="tel:+254711222333" 
                    className="block text-center bg-white text-red-600 py-3 rounded-lg font-semibold hover:bg-red-50 hover:scale-[1.02] transition-all duration-300 shadow-md"
                  >
                    Call Emergency: +254 711 222 333
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100">
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
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-300 hover:border-accent-300"
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
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-300 hover:border-accent-300"
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
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-300 hover:border-accent-300"
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
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-300 hover:border-accent-300"
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
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-300 hover:border-accent-300"
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
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-300 hover:border-accent-300"
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
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-300 hover:border-accent-300"
                        placeholder="Tell us about your safety training needs..."
                        maxLength={2000}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Maximum 2000 characters ({formData.message.length}/2000)
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <button
                        type="submit"
                        disabled={isSubmitting || isRateLimited}
                        className="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-accent-600 hover:to-accent-700 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2 w-full sm:w-auto justify-center"
                      >
                        <Send size={20} />
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </button>
                      <p className="text-sm text-gray-500 text-center sm:text-right">
                        We typically respond within 24 hours
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Map & Location Section */}
      <div ref={setMapRef}>
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white scroll-mt-20" id="map-section">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Visit Our Training Center
            </h2>
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="h-96 bg-gradient-to-br from-accent-100 to-blue-100 flex items-center justify-center relative">
                {/* Map Pattern Background */}
                <div className="absolute inset-0 opacity-20 bg-[url('/images/patterns/map-pattern.svg')] bg-repeat bg-center"></div>
                <div className="text-center relative z-10">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300">
                    <MapPin className="text-white" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-accent-800 mb-2">
                    Occidental House, Baricho Road,, Nairobi
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Visit our state-of-the-art training facility
                  </p>
                  <a 
                    href="https://maps.google.com/?q=Occidental House, Baricho Road,+Nairobi+Kenya" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-accent-500 to-accent-600   px-8 py-3 rounded-lg font-semibold hover:from-accent-600 hover:to-accent-700 hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300">
                    <h4 className="font-semibold text-gray-900 mb-2">Training Facilities</h4>
                    <p className="text-gray-600">Modern classrooms and practical training areas</p>
                  </div>
                  <div className="text-center p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300">
                    <h4 className="font-semibold text-gray-900 mb-2">Equipment Available</h4>
                    <p className="text-gray-600">Latest safety equipment for hands-on training</p>
                  </div>
                  <div className="text-center p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300">
                    <h4 className="font-semibold text-gray-900 mb-2">Parking Available</h4>
                    <p className="text-gray-600">Secure parking for all visitors</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <details className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <summary className="font-semibold text-gray-900 cursor-pointer p-6 list-none flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <span>How quickly can you schedule training for our organization?</span>
                  <ChevronDown className="group-open:rotate-180 transition-transform duration-300 text-accent-600" />
                </summary>
                <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                  <p className="text-gray-600">
                    We can typically schedule training within 1-2 weeks, depending on the course and group size. For urgent needs, we offer expedited scheduling and can sometimes accommodate requests within 48-72 hours.
                  </p>
                </div>
              </details>
              
              <details className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <summary className="font-semibold text-gray-900 cursor-pointer p-6 list-none flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <span>Do you offer on-site training?</span>
                  <ChevronDown className="group-open:rotate-180 transition-transform duration-300 text-accent-600" />
                </summary>
                <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                  <p className="text-gray-600">
                    Yes, we provide on-site training at your location. This is often more convenient for organizations with multiple employees needing training. We bring all necessary equipment and materials to your site, minimizing disruption to your operations.
                  </p>
                </div>
              </details>
              
              <details className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <summary className="font-semibold text-gray-900 cursor-pointer p-6 list-none flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <span>Are your certifications internationally recognized?</span>
                  <ChevronDown className="group-open:rotate-180 transition-transform duration-300 text-accent-600" />
                </summary>
                <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                  <p className="text-gray-600">
                    Yes, our certifications meet international safety standards and are recognized globally. We comply with OSHA, NEMA, and other international regulatory bodies. Our certifications are accepted by employers worldwide in the safety and environmental sectors.
                  </p>
                </div>
              </details>
              
              <details className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <summary className="font-semibold text-gray-900 cursor-pointer p-6 list-none flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <span>What payment methods do you accept?</span>
                  <ChevronDown className="group-open:rotate-180 transition-transform duration-300 text-accent-600" />
                </summary>
                <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                  <p className="text-gray-600">
                    We accept various payment methods including bank transfers, mobile money (M-Pesa, Airtel Money), credit/debit cards, and cash. For corporate clients, we can arrange invoice-based billing with payment terms.
                  </p>
                </div>
              </details>
              
              <details className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <summary className="font-semibold text-gray-900 cursor-pointer p-6 list-none flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <span>Do you provide post-training support?</span>
                  <ChevronDown className="group-open:rotate-180 transition-transform duration-300 text-accent-600" />
                </summary>
                <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                  <p className="text-gray-600">
                    Yes, we offer comprehensive post-training support including follow-up consultations, refresher courses, and access to our online resource library. Our trainers are available for technical support and guidance even after training completion.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}