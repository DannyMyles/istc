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
      // Ignore navigation keys inside text inputs to allow normal typing
      const target = e.target as HTMLElement;
      const isTextInput = target.tagName === 'TEXTAREA' || 
                         target.tagName === 'INPUT' || 
                         target.isContentEditable;
      
      if (e.key === 'ArrowDown' || e.key === ' ') {
        if (!isTextInput) {
          e.preventDefault();
          scrollToNextSection();
        }
      }
      if (e.key === 'ArrowUp') {
        if (!isTextInput) {
          e.preventDefault();
          const prevSection = (currentSection - 1 + sections.length) % sections.length;
          setCurrentSection(prevSection);
          sectionsRef.current[prevSection]?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
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
      details: ['+254 700 364 722'],
      action: 'tel:+254700364722',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Mail,
      title: 'Email Address',
      details: ['hsetraining@istc.co.ke'],
      action: 'mailto:hsetraining@istc.co.ke',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: MapPin,
      title: 'Office Location',
      details: ['Occidental House, Baricho Road, Nairobi', 'Kenya'],
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
    <div>
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
                <span>Support Available</span>
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
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">Expert</div>
                  <div className="text-gray-300">Team</div>
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

                {/* Partner Contacts */}
                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                      <AlertCircle className="text-white" size={24} />
                    </div>
                    <h3 className="font-bold text-white">Partner contacts</h3>
                  </div>
                  <p className="text-red-100 mb-4">
                    Emergency partner contacts for your safety needs
                  </p>
                  <div className="space-y-2">
                    <div className="bg-white/10 rounded-lg p-3">
                      <span className="font-semibold">Fire</span> - Nairobi County - <a href="tel:0202344599" className="underline">0202344599</a> / <a href="tel:0202222181" className="underline">0202222181</a>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <span className="font-semibold">Police</span> - <a href="tel:999" className="underline">999</a> or <a href="tel:911" className="underline">911</a>
                    </div>
                  </div>
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
                        className="bg-gradient-to-r from-accent-500 to-accent-600 px-8 py-3 rounded-lg font-semibold hover:from-accent-600 hover:to-accent-700 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2 w-full sm:w-auto justify-center"
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
        <section className="py-20 bg-gradient-to-b from-white to-gray-50 scroll-mt-20" id="map-section">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Visit Our Training Center
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Experience our state-of-the-art training facility in the heart of Nairobi
                </p>
              </div>
              
              <div className="bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300">
                {/* Map Container */}
                <div className="relative h-[450px] w-full">
                  {/* Google Maps Embed */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8199999999997!2d36.835!3d-1.255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f117e0e5e3a3b%3A0x1234567890abcdef!2sOccidental%20House%2C%20Baricho%20Road%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1699999999999!5m2!1sen!2ske"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                    title="ISTC Location Map"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
                  
                  {/* Location Card Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 md:left-8 md:w-96">
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20">
                      <div className="flex items-start gap-4">
                        <div className="bg-gradient-to-br from-accent-500 to-accent-600 p-3 rounded-xl text-green-500 flex-shrink-0 shadow-lg">
                          <MapPin size={24} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-1">
                            ISTC Training Center
                          </h3>
                          <p className="text-gray-600 text-sm mb-4">
                            Occidental House, Baricho Road, Nairobi, Kenya
                          </p>
                          <a 
                            href="https://maps.google.com/?q=Occidental House, Baricho Road,+Nairobi+Kenya" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-accent-500 to-accent-600 px-5 py-2.5 rounded-xl font-semibold hover:from-accent-600 hover:to-accent-700 hover:scale-105 transition-all duration-300 shadow-lg text-sm"
                          >
                            Get Directions
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Features Grid */}
                <div className="p-8 bg-gradient-to-br from-gray-50 to-white">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="group flex items-center gap-4 p-5 bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-gray-100">
                      <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Training Facilities</h4>
                        <p className="text-sm text-gray-600">Modern classrooms</p>
                      </div>
                    </div>
                    
                    <div className="group flex items-center gap-4 p-5 bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-gray-100">
                      <div className="bg-gradient-to-br from-green-100 to-green-200 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Equipment</h4>
                        <p className="text-sm text-gray-600">Latest safety gear</p>
                      </div>
                    </div>
                    
                    <div className="group flex items-center gap-4 p-5 bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-gray-100">
                      <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Parking</h4>
                        <p className="text-sm text-gray-600">Secure & convenient</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Transport Info */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                        <span>5 min walk from bus stop</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span>Easy access</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>Central location</span>
                      </div>
                    </div>
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