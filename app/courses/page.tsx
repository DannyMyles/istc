'use client';

import CourseCard from '@/components/ui/CourseCard';
import { Search, Filter, Clock, Users, Award, TrendingUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function CoursesPage() {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [currentSection, setCurrentSection] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('newest');

  // Define sections for scroll navigation
  const sections = [
    { id: 'courses', title: 'All Courses' },
    { id: 'categories', title: 'Categories' },
    { id: 'contact', title: 'Get Quote' }
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

  // Ref callback functions
  const setHeroRef = (el: HTMLDivElement | null) => {
    sectionsRef.current[0] = el;
  };

  const setCoursesRef = (el: HTMLDivElement | null) => {
    sectionsRef.current[1] = el;
  };

  const setContactRef = (el: HTMLDivElement | null) => {
    sectionsRef.current[2] = el;
  };

  const allCourses = [
    // Occupational Safety & Health Courses
    {
      title: 'Occupational Safety & Health Diploma',
      description: '12-month modularized distance learning programme in collaboration with Cambridge International College.',
      duration: '12 Months',
      participants: 'Distance Learning',
      level: 'Advanced',
      nextStart: 'April 15, 2024',
      rating: 4.9,
      price: 45000,
      category: 'Occupational Safety',
      href: '/courses/occupational-safety-health-diploma',
      featured: true
    },
    {
      title: 'Occupational Safety & Health Certificate',
      description: 'Professional certificate for workplace safety, accident prevention, and legal compliance.',
      duration: '4 days',
      participants: 'Max 25',
      level: 'Beginner',
      nextStart: 'March 18, 2024',
      rating: 4.7,
      price: 15000,
      category: 'Occupational Safety',
      href: '/courses/occupational-safety-health-certificate',
      featured: false
    },
    // Fire Safety Courses
    {
      title: 'IFE Level 2 Fire Safety Diploma',
      description: 'Fire Science, Operations and Safety certification from Institute of Fire Engineers.',
      duration: '183 Hours',
      participants: 'Max 20',
      level: 'Advanced',
      nextStart: 'April 2, 2024',
      rating: 4.8,
      price: 35000,
      category: 'Fire Safety',
      href: '/courses/fire-safety-course-diploma',
      featured: true
    },
    {
      title: 'Fire Safety Certificate Courses',
      description: 'Basic fire safety and fire marshal training for workplace fire prevention.',
      duration: '1-3 Days',
      participants: 'Max 25',
      level: 'Beginner',
      nextStart: 'March 20, 2024',
      rating: 4.6,
      price: 5000,
      category: 'Fire Safety',
      href: '/courses/fire-safety-course-certificate',
      featured: false
    },
    // First Aid Courses
    {
      title: 'Occupational First Aid',
      description: '3-day comprehensive first aid training for workplace nominated first aiders.',
      duration: '3 Days',
      participants: 'Max 25',
      level: 'Beginner',
      nextStart: 'March 15, 2024',
      rating: 4.9,
      price: 8000,
      category: 'First Aid',
      href: '/courses/first-aid/occupational',
      featured: false
    },
    {
      title: 'Basic First Aid',
      description: '1-day basic lifesaving skills and emergency situation management.',
      duration: '1 Day',
      participants: 'Max 30',
      level: 'Beginner',
      nextStart: 'March 22, 2024',
      rating: 4.8,
      price: 3500,
      category: 'First Aid',
      href: '/courses/first-aid/basic',
      featured: false
    },
    {
      title: 'Paediatric First Aid',
      description: 'Specialized first aid training for those working with or looking after children.',
      duration: '1 Day',
      participants: 'Max 25',
      level: 'Beginner',
      nextStart: 'March 25, 2024',
      rating: 4.7,
      price: 4000,
      category: 'First Aid',
      href: '/courses/first-aid/paediatric',
      featured: false
    },
    {
      title: 'First Aid Refresher',
      description: 'Requalification course for workplace first aiders.',
      duration: '2 Day',
      participants: 'Max 20',
      level: 'Intermediate',
      nextStart: 'March 28, 2024',
      rating: 4.8,
      price: 3000,
      category: 'First Aid',
      href: '/courses/first-aid/refresher',
      featured: false
    },
    // Specialized Safety Courses
    {
      title: 'Work at Height Safety',
      description: 'Safety training for telecommunications, construction, and maintenance at height.',
      duration: '2 Days',
      participants: 'Max 15',
      level: 'Intermediate',
      nextStart: 'April 5, 2024',
      rating: 4.7,
      price: 12000,
      category: 'Construction Safety',
      href: '/courses/work-at-height',
      featured: false
    },
    {
      title: 'Chemical Safety & Handling',
      description: 'Safe chemical handling, MSDS understanding, and PPE training.',
      duration: '2 Days',
      participants: 'Max 15',
      level: 'Intermediate',
      nextStart: 'April 8, 2024',
      rating: 4.6,
      price: 10000,
      category: 'Chemical Safety',
      href: '/courses/chemical-safety',
      featured: false
    },
    {
      title: 'Disaster & Emergency Preparedness',
      description: 'Emergency planning, disaster response, and crisis management training.',
      duration: '3 Days',
      participants: 'Max 20',
      level: 'Intermediate',
      nextStart: 'April 12, 2024',
      rating: 4.8,
      price: 15000,
      category: 'Emergency Management',
      href: '/courses/disaster-emergency-preparedness',
      featured: true
    },
    {
      title: 'Road Safety Training',
      description: 'Transport safety management for drivers, supervisors, and logistics staff.',
      duration: '2 Days',
      participants: 'Max 25',
      level: 'Intermediate',
      nextStart: 'April 15, 2024',
      rating: 4.7,
      price: 8000,
      category: 'Transport Safety',
      href: '/courses/road-safety',
      featured: false
    },
  ];

  const categories = [
    'All Courses',
    'Occupational Safety',
    'Fire Safety',
    'First Aid',
    'Construction Safety',
    'Chemical Safety',
    'Emergency Management',
    'Transport Safety',
  ];

  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  const durations = ['1-2 Days', '3-5 Days', '1+ Month'];

  // Filter and sort courses
  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = searchQuery === '' || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategories.length === 0 || 
      selectedCategories.includes('All Courses') ||
      selectedCategories.includes(course.category);
    
    const matchesLevel = selectedLevels.length === 0 || 
      selectedLevels.includes(course.level);
    
    const matchesDuration = selectedDurations.length === 0 || 
      (course.duration.includes('Day') && selectedDurations.some(d => d.includes('Day'))) ||
      (course.duration.includes('Month') && selectedDurations.some(d => d.includes('Month')));

    return matchesSearch && matchesCategory && matchesLevel && matchesDuration;
  });

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch(sortBy) {
      case 'rating':
        return b.rating - a.rating;
      default: // newest (default)
        return 0;
    }
  });

  const handleCategoryToggle = (category: string) => {
    if (category === 'All Courses') {
      setSelectedCategories(selectedCategories.includes('All Courses') ? [] : ['All Courses']);
    } else {
      setSelectedCategories(prev => 
        prev.includes(category) 
          ? prev.filter(c => c !== category && c !== 'All Courses')
          : [...prev.filter(c => c !== 'All Courses'), category]
      );
    }
  };

  const handleLevelToggle = (level: string) => {
    setSelectedLevels(prev => 
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
  };

  const handleDurationToggle = (duration: string) => {
    setSelectedDurations(prev => 
      prev.includes(duration) ? prev.filter(d => d !== duration) : [...prev, duration]
    );
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedLevels([]);
    setSelectedDurations([]);
    setSearchQuery('');
    setSortBy('newest');
  };

  return (
    <div >
      {/* Hero Section with Background Image */}
      <div ref={setHeroRef}>
        <section className="relative py-28 md:py-32 overflow-hidden">
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
            style={{
              backgroundImage: "url('/images/1.jpg')",
              backgroundColor: '#039AC5'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-gray-900/50"></div>
            <div className="absolute inset-0 opacity-10 bg-[url('/images/patterns/grid-pattern.svg')]"></div>
          </div>
          
          <div className="container relative z-10 mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-accent-500/10 backdrop-blur-sm border border-accent-500/20 text-white px-6 py-2 rounded-full text-sm font-medium mb-8">
                <Award size={16} />
                <span>Certified Professional Training</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Professional <span className="text-accent-400">Safety Training</span> Courses
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
                Choose from our comprehensive range of certified safety training programs designed for various industries and skill levels.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto mb-12">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search courses by name, category, or keyword..."
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent focus:shadow-glow-accent adventure-card bg-white/90 backdrop-blur-sm"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">{allCourses.length}+</div>
                  <div className="text-gray-300">Courses</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">4.8</div>
                  <div className="text-gray-300">Average Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">98%</div>
                  <div className="text-gray-300">Completion Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">1K+</div>
                  <div className="text-gray-300">Trained Professionals</div>
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
                  <svg 
                    className="w-5 h-5 text-white transform group-hover:translate-y-0.5 transition-transform duration-300" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </div>
              </div>
              
              <div className="absolute -bottom-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                <span className="text-xs text-accent-300 font-medium">↑↓ Arrow keys to navigate</span>
              </div>
            </div>
          </button>
        </section>
      </div>

      {/* Filters & Courses Section */}
      <div ref={setCoursesRef}>
        <section className="py-20 scroll-mt-20" id="courses-section">
          <div className="container mx-auto px-4">
            <div className="lg:flex gap-8">
              {/* Sidebar Filters */}
              <div className="lg:w-1/4 mb-8 lg:mb-0">
                <div className="bg-white adventure-card sticky top-24 rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <div className="flex items-center gap-2">
                      <Filter size={20} className="text-accent-600" />
                      <h3 className="text-lg font-semibold">Filters</h3>
                    </div>
                    {(selectedCategories.length > 0 || selectedLevels.length > 0 || selectedDurations.length > 0 || searchQuery) && (
                      <button 
                        onClick={resetFilters}
                        className="text-sm text-accent-600 hover:text-accent-700 font-medium"
                      >
                        Clear All
                      </button>
                    )}
                  </div>

                  {/* Categories */}
                  <div className="mb-8">
                    <h4 className="font-medium text-gray-900 mb-4">Categories</h4>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <label key={category} className="flex items-center gap-3 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCategoryToggle(category)}
                            className="rounded text-accent-600 focus:ring-accent" 
                          />
                          <span className="text-gray-600">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Level */}
                  <div className="mb-8">
                    <h4 className="font-medium text-gray-900 mb-4">Level</h4>
                    <div className="space-y-2">
                      {levels.map((level) => (
                        <label key={level} className="flex items-center gap-3 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={selectedLevels.includes(level)}
                            onChange={() => handleLevelToggle(level)}
                            className="rounded text-accent-600 focus:ring-accent" 
                          />
                          <span className="text-gray-600">{level}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="mb-8">
                    <h4 className="font-medium text-gray-900 mb-4">Duration</h4>
                    <div className="space-y-2">
                      {durations.map((duration) => (
                        <label key={duration} className="flex items-center gap-3 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={selectedDurations.includes(duration)}
                            onChange={() => handleDurationToggle(duration)}
                            className="rounded text-accent-600 focus:ring-accent" 
                          />
                          <span className="text-gray-600">{duration}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button className="w-full bg-accent-600 text-white py-3 rounded-lg font-medium hover:bg-accent-700 transition-colors">
                    Apply Filters
                  </button>
                </div>

                {/* Quick Info */}
                <div className="mt-6 bg-gradient-to-br from-accent-50 to-white adventure-card rounded-xl shadow-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Why Train With Us?</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-sm text-gray-600">Certified & Accredited</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-sm text-gray-600">Experienced Instructors</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Clock className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="text-sm text-gray-600">Flexible Scheduling</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-orange-600" />
                      </div>
                      <span className="text-sm text-gray-600">Career Advancement</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Courses Grid */}
              <div className="lg:w-3/4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      All Training Programs
                    </h2>
                    <p className="text-gray-600">
                      Showing {sortedCourses.length} of {allCourses.length} courses
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="newest">Sort by: Newest</option>
                      <option value="rating">Sort by: Rating</option>
                    </select>
                  </div>
                </div>

                {sortedCourses.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                      <Search className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
                    <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
                    <button 
                      onClick={resetFilters}
                      className="px-6 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {sortedCourses.map((course, index) => (
                        <CourseCard key={index} {...course} />
                      ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-12">
                      <nav className="flex items-center gap-2">
                        {[1].map((page) => (
                          <button
                            key={page}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                              page === 1 
                                ? 'bg-accent-600 text-white hover:bg-accent-700' 
                                : 'border border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </nav>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <div ref={setContactRef}>
        <section className="py-20 bg-gradient-to-r from-accent-600 to-accent-700 text-gray-700 scroll-mt-20" id="contact-section">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-[#292A2E] px-4 py-1 rounded-full text-sm font-medium mb-6">
                <Award size={14} />
                <span>Custom Training Solutions</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-[#292A2E] mb-6">
                Need Customized Training for Your Organization?
              </h2>
              
              <p className="text-xl mb-8 text-[#292A2E]/90">
                We offer tailored safety training programs designed specifically for your company's needs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:+254700364722" 
                  className="bg-white text-accent-700 hover:bg-gray-100 hover:scale-105 px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg"
                >
                  Call for Quote
                </a>
                <a 
                  href="mailto:hsetraining@istc.co.ke" 
                  className="bg-transparent border-2 border-white text-[#292A2E] hover:bg-white hover:text-accent-700 px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300"
                >
                  Request Proposal
                </a>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-[#292A2E]/80">
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">On-Site</div>
                  <p className="text-sm">Training at your location</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">Bulk Discounts</div>
                  <p className="text-sm">Special rates for groups</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">Flexible</div>
                  <p className="text-sm">Custom schedule & content</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}