import { Calendar, User, Clock, ArrowRight, Tag, Search } from 'lucide-react';
import Link from 'next/link';

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: 'The Importance of Regular Fire Safety Training',
      excerpt: 'Learn why regular fire safety training is crucial for workplace safety and compliance with regulations.',
      category: 'Fire Safety',
      author: 'Safety Expert',
      date: 'Mar 15, 2024',
      readTime: '5 min read',
      image: '🔥',
      featured: true
    },
    {
      id: 2,
      title: '5 Essential First Aid Skills Every Employee Should Know',
      excerpt: 'Critical first aid skills that can save lives in workplace emergencies.',
      category: 'First Aid',
      author: 'Medical Trainer',
      date: 'Mar 12, 2024',
      readTime: '4 min read',
      image: '🩹',
      featured: false
    },
    {
      id: 3,
      title: 'Construction Site Safety: Best Practices for 2024',
      excerpt: 'Latest safety practices and technologies for construction site safety management.',
      category: 'Construction',
      author: 'Site Safety Officer',
      date: 'Mar 10, 2024',
      readTime: '6 min read',
      image: '🏗️',
      featured: true
    },
    {
      id: 4,
      title: 'Environmental Safety Regulations Update',
      excerpt: 'Recent changes in environmental safety regulations and compliance requirements.',
      category: 'Environmental',
      author: 'Environmental Specialist',
      date: 'Mar 8, 2024',
      readTime: '7 min read',
      image: '🌱',
      featured: false
    },
    {
      id: 5,
      title: 'Building a Strong Safety Culture in Your Organization',
      excerpt: 'Strategies for developing and maintaining a positive safety culture at work.',
      category: 'Safety Culture',
      author: 'HR Consultant',
      date: 'Mar 5, 2024',
      readTime: '8 min read',
      image: '👥',
      featured: false
    },
    {
      id: 6,
      title: 'Electrical Safety: Common Hazards and Prevention',
      excerpt: 'Identifying and preventing common electrical hazards in the workplace.',
      category: 'Electrical Safety',
      author: 'Electrical Engineer',
      date: 'Mar 3, 2024',
      readTime: '5 min read',
      image: '⚡',
      featured: false
    },
    {
      id: 7,
      title: 'Mental Health and Workplace Safety',
      excerpt: 'The connection between mental health and safety performance in the workplace.',
      category: 'Health & Wellness',
      author: 'Psychologist',
      date: 'Feb 28, 2024',
      readTime: '6 min read',
      image: '🧠',
      featured: false
    },
    {
      id: 8,
      title: 'Emergency Response Planning: A Step-by-Step Guide',
      excerpt: 'Creating effective emergency response plans for various workplace scenarios.',
      category: 'Emergency Planning',
      author: 'Safety Manager',
      date: 'Feb 25, 2024',
      readTime: '9 min read',
      image: '🚨',
      featured: true
    },
    {
      id: 9,
      title: 'Chemical Safety: Storage and Handling Guidelines',
      excerpt: 'Best practices for safe chemical storage and handling in industrial settings.',
      category: 'Chemical Safety',
      author: 'Chemical Engineer',
      date: 'Feb 22, 2024',
      readTime: '7 min read',
      image: '🧪',
      featured: false
    },
  ];

  const categories = [
    'All Topics',
    'Fire Safety',
    'First Aid',
    'Construction',
    'Environmental',
    'Electrical Safety',
    'Safety Culture',
    'Emergency Planning',
    'Regulations'
  ];

  const popularPosts = [
    {
      title: '10 Workplace Safety Tips You Need to Know',
      views: '1.2K'
    },
    {
      title: 'Understanding OSHA Compliance in Kenya',
      views: '980'
    },
    {
      title: 'The Cost of Workplace Accidents',
      views: '850'
    },
    {
      title: 'Safety Equipment Maintenance Guide',
      views: '720'
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-accent-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Safety Insights & Articles
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Latest news, insights, and expert advice on workplace safety, training, and compliance.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles, topics, or keywords..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent focus:shadow-glow-accent adventure-card"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="lg:flex gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              {/* Featured Posts */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {blogPosts.filter(post => post.featured).map((post) => (
                    <div key={post.id} className="adventure-card hover:shadow-adventure-lg transition-all duration-300">
                      <div className="h-48 bg-accent-100 rounded-xl mb-6 flex items-center justify-center text-6xl">
                        {post.image}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-accent-800 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-gray-500">
                          <User size={16} />
                          {post.author}
                        </span>
                        <Link 
                          href={`/blog/${post.id}`} 
                          className="text-accent-600 font-medium flex items-center gap-2 group"
                        >
                          Read article
                          <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* All Posts */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogPosts.map((post) => (
                    <div key={post.id} className="adventure-card hover:shadow-adventure-lg transition-all duration-300">
                      <div className="h-40 bg-accent-50 rounded-xl mb-4 flex items-center justify-center text-5xl">
                        {post.image}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <span className="bg-accent-50 text-accent-800 px-2 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-accent-800 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">{post.date}</span>
                        <Link 
                          href={`/blog/${post.id}`} 
                          className="text-accent-600 font-medium"
                        >
                          Read →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
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

            {/* Sidebar */}
            <div className="lg:w-1/3 mt-8 lg:mt-0">
              <div className="space-y-8">
                {/* Categories */}
                <div className="bg-white adventure-card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Tag size={20} />
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Link
                        key={category}
                        href="#"
                        className="flex items-center justify-between text-gray-600 hover:text-accent-800 transition-colors py-2"
                      >
                        <span>{category}</span>
                        <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded">12</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Popular Posts */}
                <div className="bg-white adventure-card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Popular Articles
                  </h3>
                  <div className="space-y-4">
                    {popularPosts.map((post, index) => (
                      <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                        <div className="text-2xl text-gray-300 font-bold">{index + 1}</div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1 hover:text-accent-800 transition-colors cursor-pointer">
                            {post.title}
                          </h4>
                          <p className="text-sm text-gray-500">{post.views} views</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Newsletter */}
                <div className="bg-gradient-to-br from-accent-600 to-accent-700 text-white rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-3">Stay Updated</h3>
                  <p className="text-accent-100 mb-4">
                    Subscribe to our newsletter for the latest safety insights and updates.
                  </p>
                  <form className="space-y-3">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-accent-300 text-white placeholder-accent-300 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                    <button
                      type="submit"
                      className="w-full bg-white text-accent-800 py-3 rounded-lg font-semibold hover:bg-accent-50 transition-colors"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Have Safety Questions?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Our safety experts are available to answer your questions and provide guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:hsetraining@istc.co.ke" 
              className="btn-adventure px-8 py-3 text-lg"
            >
              Ask Our Experts
            </a>
            <Link 
              href="/courses" 
              className="btn-adventure-outline px-8 py-3 text-lg"
            >
              Browse Training
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}