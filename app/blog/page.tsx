// app/blog/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Calendar, User, Clock, ArrowRight, Tag, Search, Filter } from 'lucide-react'
import Link from 'next/link'
import { Blog, blogService, Category } from '../api_services/blogService'

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [featuredBlogs, setFeaturedBlogs] = useState<Blog[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Topics')
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalBlogs: 0,
    hasNextPage: false,
    hasPrevPage: false
  })

  useEffect(() => {
    fetchBlogs()
    fetchFeaturedBlogs()
    fetchCategories()
  }, [])

  const fetchBlogs = async (page = 1) => {
    try {
      setLoading(true)
      const params: any = {
        page,
        limit: 9
      }
      
      if (searchQuery) params.search = searchQuery
      if (selectedCategory !== 'All Topics') params.category = selectedCategory
      
      const response = await blogService.getAllBlogs(params)
      setBlogs(response.blogs)
      setPagination(response.pagination)
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchFeaturedBlogs = async () => {
    try {
      const featured = await blogService.getFeaturedBlogs()
      setFeaturedBlogs(featured)
    } catch (error) {
      console.error('Error fetching featured blogs:', error)
    }
  }

  const fetchCategories = async () => {
    try {
      const categoriesData = await blogService.getBlogCategories()
      setCategories(categoriesData)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchBlogs(1)
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    fetchBlogs(1)
  }

  const handlePageChange = (page: number) => {
    fetchBlogs(page)
  }

  const handleLikeBlog = async (id: string) => {
    try {
      await blogService.likeBlog(id)
      // Update local state
      setBlogs(prev => prev.map(blog => 
        blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog
      ))
    } catch (error) {
      console.error('Error liking blog:', error)
    }
  }

  const getImageUrl = (blog: Blog) => {
    return blogService.getBlogImageUrl(blog)
  }

  if (loading && blogs.length === 0) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blogs...</p>
        </div>
      </div>
    )
  }

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
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles, topics, or keywords..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent focus:shadow-glow-accent adventure-card"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
                <button
                  type="submit"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-accent-600 text-white px-4 py-2 rounded-lg hover:bg-accent-700 transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
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
              {featuredBlogs.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {featuredBlogs.map((post) => (
                      <div key={post.id} className="adventure-card hover:shadow-adventure-lg transition-all duration-300">
                        {/* Image */}
                        <div 
                          className="h-48 bg-accent-100 rounded-xl mb-6 bg-cover bg-center"
                          style={{ backgroundImage: `url(${getImageUrl(post)})` }}
                        >
                          {!post.imageInfo?.hasImage && (
                            <div className="h-full flex items-center justify-center text-6xl">
                              📝
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                          <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full">
                            {post.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {blogService.formatDate(post.createdAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {post.readTime}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-accent-800 transition-colors">
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h3>
                        
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2 text-gray-500">
                            <User size={16} />
                            {post.author}
                          </span>
                          
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => handleLikeBlog(post.id)}
                              className="text-gray-500 hover:text-red-500 transition-colors"
                            >
                              ❤️ {post.likes}
                            </button>
                            
                            <Link 
                              href={`/blog/${post.slug}`}
                              className="text-accent-600 font-medium flex items-center gap-2 group"
                            >
                              Read article
                              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* All Posts */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
                  <div className="flex items-center gap-2">
                    <Filter size={20} className="text-gray-500" />
                    <span className="text-gray-600">Showing {blogs.length} of {pagination.totalBlogs} articles</span>
                  </div>
                </div>
                
                {blogs.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No articles found. Try a different search or category.</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {blogs.map((post) => (
                        <div key={post.id} className="adventure-card hover:shadow-adventure-lg transition-all duration-300">
                          {/* Image */}
                          <div 
                            className="h-40 bg-accent-50 rounded-xl mb-4 bg-cover bg-center"
                            style={{ backgroundImage: `url(${getImageUrl(post)})` }}
                          >
                            {!post.imageInfo?.hasImage && (
                              <div className="h-full flex items-center justify-center text-4xl">
                                📝
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                            <span className="bg-accent-50 text-accent-800 px-2 py-1 rounded-full">
                              {post.category}
                            </span>
                          </div>
                          
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-accent-800 transition-colors line-clamp-2">
                            <Link href={`/blog/${post.slug}`}>
                              {post.title}
                            </Link>
                          </h3>
                          
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">
                              {blogService.formatDate(post.createdAt)}
                            </span>
                            <div className="flex items-center gap-3">
                              <span className="text-gray-500">👁️ {post.views}</span>
                              <button
                                onClick={() => handleLikeBlog(post.id)}
                                className="text-gray-500 hover:text-red-500 transition-colors"
                              >
                                ❤️ {post.likes}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pagination */}
                    {pagination.totalPages > 1 && (
                      <div className="flex justify-center mt-12">
                        <nav className="flex items-center gap-2">
                          <button
                            onClick={() => handlePageChange(pagination.currentPage - 1)}
                            disabled={!pagination.hasPrevPage}
                            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Previous
                          </button>
                          
                          {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                            const page = i + 1
                            return (
                              <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`px-4 py-2 rounded-lg ${
                                  page === pagination.currentPage
                                    ? 'bg-accent text-white'
                                    : 'border border-gray-300 hover:bg-gray-50'
                                }`}
                              >
                                {page}
                              </button>
                            )
                          })}
                          
                          {pagination.totalPages > 5 && (
                            <>
                              <span className="px-2">...</span>
                              <button
                                onClick={() => handlePageChange(pagination.totalPages)}
                                className={`px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50`}
                              >
                                {pagination.totalPages}
                              </button>
                            </>
                          )}
                          
                          <button
                            onClick={() => handlePageChange(pagination.currentPage + 1)}
                            disabled={!pagination.hasNextPage}
                            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Next
                          </button>
                        </nav>
                      </div>
                    )}
                  </>
                )}
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
                    <button
                      onClick={() => handleCategorySelect('All Topics')}
                      className={`flex items-center justify-between w-full text-left py-2 px-1 rounded transition-colors ${
                        selectedCategory === 'All Topics'
                          ? 'bg-accent-50 text-accent-800'
                          : 'text-gray-600 hover:text-accent-800'
                      }`}
                    >
                      <span>All Topics</span>
                      <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded">
                        {pagination.totalBlogs}
                      </span>
                    </button>
                    
                    {categories.map((category) => (
                      <button
                        key={category.name}
                        onClick={() => handleCategorySelect(category.name)}
                        className={`flex items-center justify-between w-full text-left py-2 px-1 rounded transition-colors ${
                          selectedCategory === category.name
                            ? 'bg-accent-50 text-accent-800'
                            : 'text-gray-600 hover:text-accent-800'
                        }`}
                      >
                        <span>{category.name}</span>
                        <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded">
                          {category.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Newsletter - Optional, keep as is or implement */}
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
    </div>
  )
}