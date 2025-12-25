import CourseCard from '@/components/ui/CourseCard';
import { Search, Filter, Clock, Users, Award, TrendingUp } from 'lucide-react';

export default function CoursesPage() {
  const allCourses = [
    {
      title: 'Occupational Health & Safety Level 1',
      description: 'Fundamental safety principles, hazard identification, and basic safety management.',
      duration: '3 Days',
      participants: 'Max 25',
      level: 'Beginner',
      nextStart: 'Mar 15, 2024',
      rating: 4.7,
      price: 18000,
      category: 'Health & Safety',
      href: '/courses/ohs-level1',
      featured: false
    },
    {
      title: 'Advanced Safety Management',
      description: 'Advanced safety systems, risk assessment methodologies, and safety leadership.',
      duration: '5 Days',
      participants: 'Max 20',
      level: 'Advanced',
      nextStart: 'Mar 22, 2024',
      rating: 4.9,
      price: 35000,
      category: 'Management',
      href: '/courses/advanced-safety',
      featured: true
    },
    {
      title: 'First Aid & CPR Certification',
      description: 'Emergency response, CPR techniques, wound care, and medical emergency management.',
      duration: '2 Days',
      participants: 'Max 25',
      level: 'Beginner',
      nextStart: 'Mar 18, 2024',
      rating: 4.8,
      price: 15000,
      category: 'First Aid',
      href: '/courses/first-aid',
      featured: false
    },
    {
      title: 'Fire Safety & Evacuation Training',
      description: 'Fire prevention, evacuation procedures, firefighting equipment, and emergency planning.',
      duration: '3 Days',
      participants: 'Max 15',
      level: 'Intermediate',
      nextStart: 'Mar 20, 2024',
      rating: 4.6,
      price: 22000,
      category: 'Fire Safety',
      href: '/courses/fire-safety',
      featured: false
    },
    {
      title: 'Construction Site Safety',
      description: 'Construction hazard identification, site safety management, and equipment safety.',
      duration: '4 Days',
      participants: 'Max 20',
      level: 'Intermediate',
      nextStart: 'Mar 25, 2024',
      rating: 4.8,
      price: 28000,
      category: 'Construction',
      href: '/courses/construction-safety',
      featured: false
    },
    {
      title: 'Environmental Management',
      description: 'Environmental regulations, waste management, pollution control, and sustainability.',
      duration: '3 Days',
      participants: 'Max 20',
      level: 'Intermediate',
      nextStart: 'Mar 28, 2024',
      rating: 4.7,
      price: 24000,
      category: 'Environmental',
      href: '/courses/environmental',
      featured: false
    },
    {
      title: 'Workplace Risk Assessment',
      description: 'Comprehensive risk assessment techniques and implementation strategies.',
      duration: '2 Days',
      participants: 'Max 15',
      level: 'Intermediate',
      nextStart: 'Apr 2, 2024',
      rating: 4.9,
      price: 20000,
      category: 'Risk Management',
      href: '/courses/risk-assessment',
      featured: false
    },
    {
      title: 'Safety Audit & Compliance',
      description: 'Conducting safety audits, compliance checking, and regulatory requirements.',
      duration: '3 Days',
      participants: 'Max 12',
      level: 'Advanced',
      nextStart: 'Apr 5, 2024',
      rating: 4.8,
      price: 32000,
      category: 'Audit',
      href: '/courses/safety-audit',
      featured: true
    },
    {
      title: 'Electrical Safety Training',
      description: 'Electrical hazards, safe work practices, and electrical equipment safety.',
      duration: '2 Days',
      participants: 'Max 15',
      level: 'Intermediate',
      nextStart: 'Apr 8, 2024',
      rating: 4.6,
      price: 19000,
      category: 'Electrical',
      href: '/courses/electrical-safety',
      featured: false
    },
    {
      title: 'Chemical Safety & Handling',
      description: 'Chemical hazards, safe handling procedures, and emergency response for chemical incidents.',
      duration: '3 Days',
      participants: 'Max 15',
      level: 'Advanced',
      nextStart: 'Apr 12, 2024',
      rating: 4.7,
      price: 26000,
      category: 'Chemical Safety',
      href: '/courses/chemical-safety',
      featured: false
    },
    {
      title: 'Machine Safety & Guarding',
      description: 'Machine hazards, safety guards, lockout/tagout procedures, and equipment safety.',
      duration: '2 Days',
      participants: 'Max 15',
      level: 'Intermediate',
      nextStart: 'Apr 15, 2024',
      rating: 4.8,
      price: 21000,
      category: 'Machine Safety',
      href: '/courses/machine-safety',
      featured: false
    },
    {
      title: 'Corporate Safety Leadership',
      description: 'Safety leadership skills, safety culture development, and strategic safety management.',
      duration: '4 Days',
      participants: 'Max 18',
      level: 'Advanced',
      nextStart: 'Apr 18, 2024',
      rating: 4.9,
      price: 38000,
      category: 'Leadership',
      href: '/courses/safety-leadership',
      featured: true
    },
  ];

  const categories = [
    'All Courses',
    'Health & Safety',
    'Fire Safety',
    'First Aid',
    'Construction',
    'Environmental',
    'Management',
    'Risk Management',
    'Electrical',
    'Chemical Safety',
  ];

  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  const durations = ['1-2 Days', '3-4 Days', '5+ Days'];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-accent-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Professional Safety Training Courses
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Choose from our comprehensive range of certified safety training programs designed for various industries and skill levels.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search courses by name, category, or keyword..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent focus:shadow-glow-accent adventure-card"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-800 mb-2">25+</div>
                <div className="text-gray-600">Courses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-800 mb-2">4.8</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-800 mb-2">98%</div>
                <div className="text-gray-600">Completion Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-800 mb-2">24/7</div>
                <div className="text-gray-600">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Courses */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="lg:flex gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-1/4 mb-8 lg:mb-0">
              <div className="bg-white adventure-card sticky top-24">
                <div className="flex items-center gap-2 mb-6">
                  <Filter size={20} className="text-accent-600" />
                  <h3 className="text-lg font-semibold">Filters</h3>
                </div>

                {/* Categories */}
                <div className="mb-8">
                  <h4 className="font-medium text-gray-900 mb-4">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="rounded text-accent-600 focus:ring-accent" />
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
                        <input type="checkbox" className="rounded text-accent-600 focus:ring-accent" />
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
                        <input type="checkbox" className="rounded text-accent-600 focus:ring-accent" />
                        <span className="text-gray-600">{duration}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button className="w-full btn-adventure py-3">
                  Apply Filters
                </button>
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
                    Showing {allCourses.length} courses
                  </p>
                </div>
                <div className="mt-4 sm:mt-0">
                  <select className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent">
                    <option>Sort by: Newest</option>
                    <option>Sort by: Price Low to High</option>
                    <option>Sort by: Price High to Low</option>
                    <option>Sort by: Rating</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allCourses.map((course, index) => (
                  <CourseCard key={index} {...course} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-12">
                <nav className="flex items-center gap-2">
                  <button className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">
                    Previous
                  </button>
                  {[1, 2, 3, 4, 5].map((page) => (
                    <button
                      key={page}
                      className={`px-4 py-2 rounded-lg ${page === 1 ? 'bg-accent text-white' : 'border border-gray-300 hover:bg-gray-50'}`}
                    >
                      {page}
                    </button>
                  ))}
                  <button className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent-600 to-accent-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Need Customized Training for Your Organization?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              We offer tailored safety training programs designed specifically for your company's needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+254700364722" 
                className="bg-white text-accent-800 hover:bg-accent-50 px-8 py-3 rounded-xl font-semibold text-lg transition-colors"
              >
                Call for Quote
              </a>
              <a 
                href="mailto:hsetraining@istc.co.ke" 
                className="border-2 border-white hover:bg-white/10 px-8 py-3 rounded-xl font-semibold text-lg transition-colors"
              >
                Request Proposal
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}