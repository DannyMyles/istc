'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Calendar, 
  User, 
  Clock, 
  Tag, 
  ChevronLeft, 
  Share2, 
  Heart, 
  Eye, 
  Bookmark,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  MessageCircle,
  ArrowRight,
  ChevronRight
} from 'lucide-react'
import { Blog, blogService } from '@/app/api_services/blogService'
import { normalizeTags } from '@/app/api_services/blogService'

export default function BlogDetailPage() {
  const params = useParams()
  
  // Extract ID from params
  const id = params?.id as string | undefined
  
  const [blog, setBlog] = useState<Blog | null>(null)
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [commentsOpen, setCommentsOpen] = useState(false)

  useEffect(() => {
    if (!id) {
      setError('Invalid blog ID')
      setLoading(false)
      return
    }
    
    fetchBlog()
    fetchRelatedBlogs()
    
    // Check if blog is liked/bookmarked (from localStorage)
    const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs') || '[]')
    const bookmarkedBlogs = JSON.parse(localStorage.getItem('bookmarkedBlogs') || '[]')
    setIsLiked(likedBlogs.includes(id))
    setIsBookmarked(bookmarkedBlogs.includes(id))
  }, [id])

  const fetchBlog = async () => {
    if (!id) return
    
    try {
      setLoading(true)
      setError(null)
      const data = await blogService.getBlogById(id) // Use getBlogById
      setBlog(data)
    } catch (err) {
      console.error('Error fetching blog:', err)
      setError('Blog post not found or failed to load.')
    } finally {
      setLoading(false)
    }
  }

  const fetchRelatedBlogs = async () => {
    try {
      if (!blog) return
      
      const response = await blogService.getAllBlogs({
        category: blog.category,
        limit: 3
      })
      
      // Filter out current blog and get max 3 related posts
      const related = response.blogs
        .filter(b => b.id !== id)
        .slice(0, 3)
      
      setRelatedBlogs(related)
    } catch (error) {
      console.error('Error fetching related blogs:', error)
    }
  }

  // app/blog/[id]/page.tsx - Update handleLike function
  const handleLike = async () => {
    if (!blog || !id) return
    
    try {
      // Call the API to like the blog
      const response = await blogService.likeBlog(blog.id)
      
      // Update blog likes count from API response
      setBlog((prev:any) => prev ? { 
        ...prev, 
        likes: response.likes || prev.likes + 1 
      } : null)
      
      // Update localStorage
      const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs') || '[]')
      if (!isLiked) {
        localStorage.setItem('likedBlogs', JSON.stringify([...likedBlogs, id]))
      }
      setIsLiked(!isLiked)
    } catch (error) {
      console.error('Error liking blog:', error)
      // Show error message to user
      setError('Failed to like blog. Please try again.')
    }
  }

  const handleBookmark = () => {
    if (!id) return
    
    const bookmarkedBlogs = JSON.parse(localStorage.getItem('bookmarkedBlogs') || '[]')
    
    if (isBookmarked) {
      const updated = bookmarkedBlogs.filter((b: string) => b !== id)
      localStorage.setItem('bookmarkedBlogs', JSON.stringify(updated))
    } else {
      localStorage.setItem('bookmarkedBlogs', JSON.stringify([...bookmarkedBlogs, id]))
    }
    
    setIsBookmarked(!isBookmarked)
  }

  const handleShare = (platform: string) => {
    if (!blog || !id) return
    
    const url = window.location.href
    const title = blog.title
    const text = blog.excerpt
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(text)}`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${title}\n\n${text}\n\nRead more: ${url}`)}`
    }
    
    if (platform === 'copy') {
      navigator.clipboard.writeText(url)
      alert('Link copied to clipboard!')
    } else if (shareUrls[platform as keyof typeof shareUrls]) {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400')
    }
    
    setShareOpen(false)
  }

  const getImageUrl = () => {
    if (!blog) return ''
    return blogService.getBlogImageUrl(blog)
  }

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog post...</p>
        </div>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="pt-2 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-6xl mb-6">😕</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {error || 'Blog Not Found'}
            </h1>
            <p className="text-gray-600 mb-8">
              The blog post you're looking for doesn't exist or has been moved.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent-700 transition-colors"
            >
              <ChevronLeft size={20} />
              Back to All Articles
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20">
      {/* Back Navigation */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-accent-800 transition-colors"
          >
            <ChevronLeft size={20} />
            Back to All Articles
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-accent-50 to-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-accent-800 transition-colors">
                Home
              </Link>
              <ChevronRight size={16} />
              <Link href="/blog" className="hover:text-accent-800 transition-colors">
                Blog
              </Link>
              <ChevronRight size={16} />
              <span className="text-accent-800 font-medium">{blog.category}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {blog.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <User size={18} />
                <span>{blog.author}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{blogService.formatDate(blog.createdAt)}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{blog.readTime || blogService.estimateReadTime(blog.content)}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Eye size={18} />
                <span>{blog.views} views</span>
              </div>
            </div>

            {/* Category */}
            <div className="inline-flex items-center gap-2 bg-accent-100 text-accent-800 px-4 py-2 rounded-full mb-8">
              <Tag size={16} />
              <span className="font-medium">{blog.category}</span>
            </div>

            {/* Featured Image */}
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8 adventure-card">
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${getImageUrl()})` }}
              >
                {!blog.imageInfo?.hasImage && (
                  <div className="h-full flex items-center justify-center bg-accent-100">
                    <div className="text-center">
                      <div className="text-6xl mb-4">📝</div>
                      <p className="text-gray-600">No image available</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isLiked 
                      ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
                  <span>{blog.likes}</span>
                </button>

                <button
                  onClick={handleBookmark}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isBookmarked
                      ? 'bg-accent-50 text-accent-800 hover:bg-accent-100'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Bookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
                  <span>Save</span>
                </button>

                <div className="relative">
                  <button
                    onClick={() => setShareOpen(!shareOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    <Share2 size={20} />
                    <span>Share</span>
                  </button>

                  {shareOpen && (
                    <div className="absolute left-0 bottom-full mb-2 bg-white rounded-xl shadow-lg border border-gray-200 p-3 z-10">
                      <div className="grid grid-cols-4 gap-2">
                        <button
                          onClick={() => handleShare('facebook')}
                          className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                          title="Share on Facebook"
                        >
                          <Facebook size={20} />
                        </button>
                        <button
                          onClick={() => handleShare('twitter')}
                          className="p-2 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors"
                          title="Share on Twitter"
                        >
                          <Twitter size={20} />
                        </button>
                        <button
                          onClick={() => handleShare('linkedin')}
                          className="p-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                          title="Share on LinkedIn"
                        >
                          <Linkedin size={20} />
                        </button>
                        <button
                          onClick={() => handleShare('email')}
                          className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                          title="Share via Email"
                        >
                          <Mail size={20} />
                        </button>
                      </div>
                      <button
                        onClick={() => handleShare('copy')}
                        className="w-full mt-2 px-3 py-2 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Copy Link
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => setCommentsOpen(!commentsOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <MessageCircle size={20} />
                <span>Comments</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="lg:flex gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              {/* Excerpt */}
              {blog.excerpt && (
                <div className="bg-accent-50 border-l-4 border-accent-500 p-6 rounded-r-lg mb-8">
                  <p className="text-lg font-medium text-gray-900 italic">
                    "{blog.excerpt}"
                  </p>
                </div>
              )}

              {/* Content */}
              <article className="prose prose-lg max-w-none mb-12">
                <div 
                  dangerouslySetInnerHTML={{ __html: blog.content || blog.excerpt }}
                  className="blog-content"
                />
              </article>

              {/* Tags */}
              {normalizeTags(blog.tags || []).length > 0 && (
                <div className="mb-12">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {normalizeTags(blog.tags).map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Info */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-12">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">About the Author</h3>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center text-2xl">
                    👤
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{blog.author}</h4>
                    <p className="text-gray-600 mt-2">
                      {blog.authorDetails?.email || 'Safety expert and content writer'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              {commentsOpen && (
                <div className="mb-12">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Comments</h3>
                  <div className="space-y-4">
                    <div className="text-center py-8 text-gray-500">
                      <MessageCircle size={48} className="mx-auto mb-4 text-gray-300" />
                      <p>Comments feature coming soon!</p>
                      <p className="text-sm mt-2">Share your thoughts on social media using the share buttons above.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Share Bottom */}
              <div className="border-t border-gray-200 pt-8 mb-12">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this article</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleShare('facebook')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                  >
                    <Facebook size={20} />
                    <span>Facebook</span>
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors"
                  >
                    <Twitter size={20} />
                    <span>Twitter</span>
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                  >
                    <Linkedin size={20} />
                    <span>LinkedIn</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3 mt-8 lg:mt-0">
              <div className="space-y-8">
                {/* Related Articles */}
                {relatedBlogs.length > 0 && (
                  <div className="bg-white adventure-card">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Articles</h3>
                    <div className="space-y-4">
                      {relatedBlogs.map((relatedBlog) => (
                        <Link
                          key={relatedBlog.id}
                          href={`/blog/${relatedBlog.id}`} 
                          className="block group"
                        >
                          <div className="flex gap-3">
                            <div 
                              className="w-16 h-16 flex-shrink-0 rounded-lg bg-cover bg-center bg-accent-50"
                              style={{ 
                                backgroundImage: `url(${blogService.getBlogImageUrl(relatedBlog)})` 
                              }}
                            >
                              {!relatedBlog.imageInfo?.hasImage && (
                                <div className="w-full h-full flex items-center justify-center text-lg">
                                  📝
                                </div>
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 group-hover:text-accent-800 transition-colors line-clamp-2">
                                {relatedBlog.title}
                              </h4>
                              <p className="text-sm text-gray-500 mt-1">
                                {blogService.formatDate(relatedBlog.createdAt)}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Table of Contents */}
                <div className="bg-white adventure-card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Table of Contents</h3>
                  <div className="space-y-2" id="toc-container">
                    <p className="text-gray-500 text-sm">
                      Reading the full article will show sections here.
                    </p>
                  </div>
                </div>

                {/* Newsletter */}
                <div className="bg-gradient-to-br from-accent-600 to-accent-700 text-white rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-3">Enjoying this article?</h3>
                  <p className="text-accent-100 mb-4">
                    Subscribe to our newsletter for more safety insights and updates.
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

                {/* Popular Tags */}
                <div className="bg-white adventure-card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Safety Training', 'Workplace Safety', 'OSHA Compliance', 'Emergency Procedures', 'Risk Assessment', 'PPE Guidelines'].map((topic, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation to Next/Previous */}
      <div className="border-t border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <Link
              href="/blog"
              className="flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-200 hover:border-accent-500 hover:bg-accent-50 transition-colors group"
            >
              <ChevronLeft size={20} />
              <span className="font-medium group-hover:text-accent-800">All Articles</span>
            </Link>
            
            <Link
              href="/blog"
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white hover:bg-accent-700 transition-colors group"
            >
              <span className="font-medium">Explore More Articles</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}