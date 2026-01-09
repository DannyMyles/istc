// app/blog/page.tsx
'use client'

import { useState, useEffect, useCallback } from 'react'
import { 
  Calendar, 
  User, 
  Clock, 
  ArrowRight, 
  Tag, 
  Search, 
  Filter,
  Heart,
  Eye,
  Bookmark,
  TrendingUp,
  Sparkles,
  X,
  Loader2
} from 'lucide-react'
import Link from 'next/link'
import { Blog, blogService, Category } from '../api_services/blogService'
import debounce from 'lodash/debounce'

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [featuredBlogs, setFeaturedBlogs] = useState<Blog[]>([])
  const [trendingBlogs, setTrendingBlogs] = useState<Blog[]>([])
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
  const [error, setError] = useState<string | null>(null)
  const [likedBlogs, setLikedBlogs] = useState<Set<string>>(new Set())
  const [bookmarkedBlogs, setBookmarkedBlogs] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchInitialData()
    loadUserPreferences()
  }, [])

  const loadUserPreferences = () => {
    // Load liked and bookmarked blogs from localStorage
    try {
      const liked = JSON.parse(localStorage.getItem('likedBlogs') || '[]')
      const bookmarked = JSON.parse(localStorage.getItem('bookmarkedBlogs') || '[]')
      setLikedBlogs(new Set(liked))
      setBookmarkedBlogs(new Set(bookmarked))
    } catch (error) {
      console.error('Error loading user preferences:', error)
    }
  }

  const fetchInitialData = async () => {
    try {
      setLoading(true)
      setError(null)
      await Promise.all([
        fetchBlogs(),
        fetchFeaturedBlogs(),
        fetchCategories(),
        fetchTrendingBlogs()
      ])
    } catch (err) {
      console.error('Error fetching initial data:', err)
      setError('Failed to load blog posts. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const fetchBlogs = async (page = 1) => {
    try {
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
      setError('Failed to load blog posts. Please try again.')
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

  const fetchTrendingBlogs = async () => {
    try {
      const response = await blogService.getAllBlogs({ 
        limit: 5,
        sort: 'views' 
      })
      setTrendingBlogs(response.blogs)
    } catch (error) {
      console.error('Error fetching trending blogs:', error)
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

  // Debounced search
  const debouncedSearch = useCallback(
    debounce(() => {
      fetchBlogs(1)
    }, 500),
    []
  )

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchBlogs(1)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    debouncedSearch()
  }

  const handleClearSearch = () => {
    setSearchQuery('')
    fetchBlogs(1)
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    fetchBlogs(1)
  }

  const handlePageChange = (page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    fetchBlogs(page)
  }

  const handleLikeBlog = async (id: string, slug: string) => {
  try {
    if (!likedBlogs.has(slug)) {
      // Call the API to like the blog
      const response = await blogService.likeBlog(id)
      
      // Update local state with API response
      setBlogs(prev => prev.map(blog => 
        blog.id === id ? { ...blog, likes: response.likes } : blog
      ))
      setFeaturedBlogs(prev => prev.map(blog => 
        blog.id === id ? { ...blog, likes: response.likes } : blog
      ))
      
      // Update liked blogs set
      const newLiked = new Set(likedBlogs)
      newLiked.add(slug)
      setLikedBlogs(newLiked)
      localStorage.setItem('likedBlogs', JSON.stringify([...newLiked]))
    }
  } catch (error) {
    console.error('Error liking blog:', error)
    // Optional: Show toast notification
    alert('Failed to like blog. Please try again.')
  }
}

  const handleBookmarkBlog = (slug: string) => {
    const newBookmarked = new Set(bookmarkedBlogs)
    if (newBookmarked.has(slug)) {
      newBookmarked.delete(slug)
    } else {
      newBookmarked.add(slug)
    }
    setBookmarkedBlogs(newBookmarked)
    localStorage.setItem('bookmarkedBlogs', JSON.stringify([...newBookmarked]))
  }

  const getImageUrl = (blog: Blog) => {
    return blogService.getBlogImageUrl(blog)
  }

  const getReadingProgress = () => {
    if (blogs.length === 0) return 0
    const readCount = blogs.filter(blog => bookmarkedBlogs.has(blog.slug)).length
    return Math.round((readCount / blogs.length) * 100)
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

  if (error && blogs.length === 0) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-6">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchInitialData}
            className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-accent-50 to-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-sm">
              <Sparkles className="text-accent-600" size={16} />
              <span className="text-sm font-medium text-gray-700">
                {pagination.totalBlogs}+ Articles Published
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Safety Insights & 
              <span className="text-accent-600"> Articles</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Latest news, insights, and expert advice on workplace safety, training, and compliance.
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search articles, topics, or keywords..."
                  className="w-full pl-12 pr-12 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent focus:shadow-glow-accent adventure-card"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-16 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                )}
                <button
                  type="submit"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-accent-600 text-white px-6 py-2 rounded-lg hover:bg-accent-700 transition-colors flex items-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      <Search size={20} />
                      Search
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{pagination.totalBlogs}</div>
                <div className="text-sm text-gray-600">Total Articles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{featuredBlogs.length}</div>
                <div className="text-sm text-gray-600">Featured</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{categories.length}</div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{getReadingProgress()}%</div>
                <div className="text-sm text-gray-600">Your Progress</div>
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
              {/* Category Filters */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleCategorySelect('All Topics')}
                    className={`px-4 py-2 rounded-full transition-all duration-300 ${
                      selectedCategory === 'All Topics'
                        ? 'bg-accent text-white shadow-glow-accent'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    All Topics
                  </button>
                  {categories.slice(0, 6).map((category) => (
                    <button
                      key={category.name}
                      onClick={() => handleCategorySelect(category.name)}
                      className={`px-4 py-2 rounded-full transition-all duration-300 ${
                        selectedCategory === category.name
                          ? 'bg-accent text-white shadow-glow-accent'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {category.name} ({category.count})
                    </button>
                  ))}
                  {categories.length > 6 && (
                    <div className="relative group">
                      <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                        +{categories.length - 6} more
                      </button>
                      <div className="absolute left-0 top-full mt-2 hidden group-hover:block bg-white rounded-xl shadow-lg border border-gray-200 p-2 z-10 min-w-[200px]">
                        {categories.slice(6).map((category) => (
                          <button
                            key={category.name}
                            onClick={() => handleCategorySelect(category.name)}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                              selectedCategory === category.name
                                ? 'bg-accent-50 text-accent-800'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            {category.name} ({category.count})
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Featured Posts */}
              {featuredBlogs.length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <Sparkles className="text-yellow-500" size={20} />
                      Featured Articles
                    </h2>
                    <Link 
                      href="/blog?filter=featured" 
                      className="text-accent-600 hover:text-accent-700 font-medium flex items-center gap-1"
                    >
                      View all
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {featuredBlogs.map((post) => {
                      const isLiked = likedBlogs.has(post.slug)
                      const isBookmarked = bookmarkedBlogs.has(post.slug)
                      
                      return (
                        <div 
                          key={post.id} 
                          className="adventure-card hover:shadow-adventure-lg transition-all duration-300 group overflow-hidden"
                        >
                          {/* Image */}
                          <div className="relative h-48 overflow-hidden">
                            <div 
                              className="absolute inset-0 bg-accent-100 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                              style={{ backgroundImage: `url(${getImageUrl(post)})` }}
                            >
                              {!post.imageInfo?.hasImage && (
                                <div className="h-full flex items-center justify-center text-6xl">
                                  📝
                                </div>
                              )}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 right-4">
                              <span className="inline-block bg-white/90 backdrop-blur-sm text-accent-800 px-3 py-1 rounded-full text-sm font-medium">
                                {post.category}
                              </span>
                            </div>
                          </div>
                          
                          <div className="p-5">
                            <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                              <span className="flex items-center gap-1">
                                <Calendar size={14} />
                                {blogService.formatDate(post.createdAt)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock size={14} />
                                {post.readTime}
                              </span>
                              <span className="flex items-center gap-1 ml-auto">
                                <Eye size={14} />
                                {post.views}
                              </span>
                            </div>
                            
                            <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-accent-800 transition-colors line-clamp-2">
                              <Link href={`/blog/${post.id}`} className="hover:no-underline">
                                {post.title}
                              </Link>
                            </h3>
                            
                            <p className="text-gray-600 mb-4 line-clamp-2">
                              {post.excerpt}
                            </p>
                            
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                              <span className="flex items-center gap-2 text-gray-500">
                                <User size={16} />
                                {post.author}
                              </span>
                              
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => handleBookmarkBlog(post.slug)}
                                  className={`transition-colors ${
                                    isBookmarked 
                                      ? 'text-accent-600' 
                                      : 'text-gray-400 hover:text-accent-600'
                                  }`}
                                  title={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
                                >
                                  <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
                                </button>
                                
                                <button
                                  onClick={() => handleLikeBlog(post.id, post.slug)}
                                  className={`transition-colors flex items-center gap-1 ${
                                    isLiked 
                                      ? 'text-red-500' 
                                      : 'text-gray-400 hover:text-red-500'
                                  }`}
                                >
                                  <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
                                  <span className="text-sm">{post.likes}</span>
                                </button>
                                
                                <Link 
                                  href={`/blog/${post.id}`}
                                  className="text-accent-600 font-medium flex items-center gap-2 group/link"
                                >
                                  Read
                                  <ArrowRight className="group-hover/link:translate-x-1 transition-transform" size={16} />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* All Posts */}
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
                    {searchQuery && (
                      <p className="text-gray-600 mt-1">
                        Search results for "<span className="font-medium">{searchQuery}</span>"
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Filter size={16} />
                      <span>Showing {blogs.length} of {pagination.totalBlogs} articles</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-600">Sort by:</label>
                      <select 
                        className="text-sm border border-gray-200 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-accent"
                        onChange={(e) => {
                          // Implement sorting logic here
                          console.log('Sort by:', e.target.value)
                        }}
                      >
                        <option value="newest">Newest</option>
                        <option value="popular">Most Popular</option>
                        <option value="trending">Trending</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {loading ? (
                  <div className="text-center py-12">
                    <Loader2 className="animate-spin mx-auto text-accent-600" size={32} />
                    <p className="mt-4 text-gray-600">Loading articles...</p>
                  </div>
                ) : blogs.length === 0 ? (
                  <div className="text-center py-12 adventure-card max-w-md mx-auto">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                    <p className="text-gray-600 mb-6">
                      {searchQuery 
                        ? `No results for "${searchQuery}"`
                        : `No articles in "${selectedCategory}" category`
                      }
                    </p>
                    <div className="space-y-3">
                      <button
                        onClick={() => {
                          setSearchQuery('')
                          setSelectedCategory('All Topics')
                          fetchBlogs(1)
                        }}
                        className="w-full bg-accent text-white py-2 rounded-lg hover:bg-accent-700 transition-colors"
                      >
                        View all articles
                      </button>
                      <p className="text-sm text-gray-500">
                        Or try a different search term
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {blogs.map((post) => {
                        const isLiked = likedBlogs.has(post.slug)
                        const isBookmarked = bookmarkedBlogs.has(post.slug)
                        
                        return (
                          <div key={post.id} className="adventure-card hover:shadow-adventure-lg transition-all duration-300 group h-full flex flex-col">
                            {/* Image */}
                            <div className="relative h-40 overflow-hidden rounded-t-xl">
                              <div 
                                className="absolute inset-0 bg-accent-50 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                style={{ backgroundImage: `url(${getImageUrl(post)})` }}
                              >
                                {!post.imageInfo?.hasImage && (
                                  <div className="h-full flex items-center justify-center text-4xl">
                                    📝
                                  </div>
                                )}
                              </div>
                              <div className="absolute top-3 left-3">
                                <span className="inline-block bg-white/90 backdrop-blur-sm text-accent-800 px-2 py-1 rounded-full text-xs font-medium">
                                  {post.category}
                                </span>
                              </div>
                            </div>
                            
                            <div className="p-4 flex-grow flex flex-col">
                              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                <span>{blogService.formatDate(post.createdAt)}</span>
                                <span>•</span>
                                <span>{post.readTime}</span>
                              </div>
                              
                              <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-accent-800 transition-colors line-clamp-2 flex-grow">
                                <Link href={`/blog/${post.id}`} className="hover:no-underline">
                                  {post.title}
                                </Link>
                              </h3>
                              
                              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                {post.excerpt}
                              </p>
                              
                              <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                                <span className="flex items-center gap-2 text-xs text-gray-500">
                                  <User size={12} />
                                  {post.author.split(' ')[0]} {/* First name only */}
                                </span>
                                
                                <div className="flex items-center gap-3">
                                  <span className="text-xs text-gray-500 flex items-center gap-1">
                                    <Eye size={12} />
                                    {post.views}
                                  </span>
                                  
                                  <button
                                    onClick={() => handleLikeBlog(post.id, post.slug)}
                                    className={`transition-colors flex items-center gap-1 ${
                                      isLiked 
                                        ? 'text-red-500' 
                                        : 'text-gray-400 hover:text-red-500'
                                    }`}
                                  >
                                    <Heart size={14} fill={isLiked ? 'currentColor' : 'none'} />
                                    <span className="text-xs">{post.likes}</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* Pagination */}
                    {pagination.totalPages > 1 && (
                      <div className="flex justify-center mt-12">
                        <nav className="flex items-center gap-2">
                          <button
                            onClick={() => handlePageChange(pagination.currentPage - 1)}
                            disabled={!pagination.hasPrevPage || loading}
                            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                          >
                            <ArrowRight className="rotate-180" size={16} />
                            Previous
                          </button>
                          
                          {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                            const page = i + 1
                            if (page > pagination.totalPages) return null
                            
                            return (
                              <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                disabled={loading}
                                className={`px-4 py-2 rounded-lg transition-colors ${
                                  page === pagination.currentPage
                                    ? 'bg-accent text-white shadow-glow-accent'
                                    : 'border border-gray-300 hover:bg-gray-50'
                                } ${loading ? 'opacity-50' : ''}`}
                              >
                                {page}
                              </button>
                            )
                          })}
                          
                          {pagination.totalPages > 5 && (
                            <>
                              <span className="px-2 text-gray-400">...</span>
                              <button
                                onClick={() => handlePageChange(pagination.totalPages)}
                                disabled={loading}
                                className={`px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors ${loading ? 'opacity-50' : ''}`}
                              >
                                {pagination.totalPages}
                              </button>
                            </>
                          )}
                          
                          <button
                            onClick={() => handlePageChange(pagination.currentPage + 1)}
                            disabled={!pagination.hasNextPage || loading}
                            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                          >
                            Next
                            <ArrowRight size={16} />
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
              <div className="space-y-8 sticky top-24">
                {/* Categories */}
                <div className="bg-white adventure-card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Tag size={20} />
                    Browse Categories
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleCategorySelect('All Topics')}
                      className={`flex items-center justify-between w-full text-left py-3 px-3 rounded-xl transition-all duration-300 ${
                        selectedCategory === 'All Topics'
                          ? 'bg-accent-50 text-accent-800 shadow-sm'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-accent-800'
                      }`}
                    >
                      <span className="font-medium">All Topics</span>
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                        {pagination.totalBlogs}
                      </span>
                    </button>
                    
                    {categories.map((category) => (
                      <button
                        key={category.name}
                        onClick={() => handleCategorySelect(category.name)}
                        className={`flex items-center justify-between w-full text-left py-3 px-3 rounded-xl transition-all duration-300 ${
                          selectedCategory === category.name
                            ? 'bg-accent-50 text-accent-800 shadow-sm'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-accent-800'
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

                {/* Trending Articles */}
                {trendingBlogs.length > 0 && (
                  <div className="bg-white adventure-card">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <TrendingUp className="text-orange-500" size={20} />
                      Trending Now
                    </h3>
                    <div className="space-y-4">
                      {trendingBlogs.slice(0, 5).map((blog, index) => (
                        <Link
                          key={blog.id}
                          href={`/blog/${blog.id}`}
                          className="flex items-center gap-3 group"
                        >
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent-50 flex items-center justify-center text-sm font-bold text-accent-800">
                            #{index + 1}
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-medium text-gray-900 group-hover:text-accent-800 transition-colors line-clamp-2 text-sm">
                              {blog.title}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                              <Eye size={12} />
                              <span>{blog.views} views</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Newsletter */}
                <div className="bg-gradient-to-br from-accent-600 to-accent-700 text-white rounded-2xl p-6">
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-4">
                    <Sparkles size={14} />
                    <span className="text-sm font-medium">Exclusive Content</span>
                  </div>
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
                      Subscribe Now
                    </button>
                  </form>
                  <p className="text-xs text-accent-200 mt-3 text-center">
                    No spam. Unsubscribe anytime.
                  </p>
                </div>

                {/* Bookmarked Articles */}
                {bookmarkedBlogs.size > 0 && (
                  <div className="bg-white adventure-card">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Bookmark className="text-accent-600" size={20} />
                      Your Bookmarks
                    </h3>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600">
                        You have {bookmarkedBlogs.size} saved article{bookmarkedBlogs.size !== 1 ? 's' : ''}
                      </p>
                      <Link
                        href="/blog?filter=bookmarked"
                        className="inline-flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium text-sm"
                      >
                        View all bookmarks
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}