'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Save, Eye, Upload, X, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { Blog, blogService, CreateBlogRequest } from '@/app/api_services/blogService'
import Toaster from '@/components/ui/Toaster'


export default function EditBlogPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [formData, setFormData] = useState<CreateBlogRequest>({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    author: '',
    image: '',
    readTime: '5 min read',
    featured: false,
    tags: [],
    metaTitle: '',
    metaDescription: ''
  })
  const [tagInput, setTagInput] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [originalBlog, setOriginalBlog] = useState<Blog | null>(null)

  useEffect(() => {
    if (id) {
      fetchBlog()
    }
  }, [id])

  const fetchBlog = async () => {
    try {
      setLoading(true)
      const blog = await blogService.getBlogById(id)
      setOriginalBlog(blog)
      
      // Convert API data to form data
      setFormData({
        title: blog.title || '',
        excerpt: blog.excerpt || '',
        content: '', // Note: You might need a separate endpoint for full content
        category: blog.category || '',
        author: blog.author || '',
        image: blog.image || '',
        readTime: blog.readTime || '5 min read',
        featured: blog.featured || false,
        tags: blog.tags || [],
        metaTitle: '', // These might not be in the regular blog response
        metaDescription: ''
      })
    } catch (error: any) {
      console.error('Error fetching blog:', error)
      toast.error(error.message || 'Failed to load blog')
      router.push('/admin/blog')
    } finally {
      setLoading(false)
    }
  }

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData({
          ...formData,
          tags: [...formData.tags, tagInput.trim()]
        })
      }
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.title.trim() || !formData.content.trim() || !formData.category.trim()) {
      toast.error('Please fill in all required fields (Title, Content, and Category)')
      return
    }

    setSaving(true)

    try {
      // Prepare data for API
      const blogData = {
        ...formData,
        author: formData.author.trim() || 'Admin',
        excerpt: formData.excerpt.trim() || 'A brief summary or introduction to your blog post...',
        metaTitle: formData.metaTitle?.trim() || formData.title.trim(),
        metaDescription: formData.metaDescription?.trim() || formData.excerpt.trim() || formData.title.trim(),
        tags: formData.tags.map(tag => tag.toLowerCase().trim())
      }

      await blogService.updateBlog(id, blogData)
      Toaster
      router.push('/admin/blog')
    } catch (error: any) {
      console.error('Error updating blog:', error)
      toast.error(error.message || 'Failed to update blog. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (field: keyof CreateBlogRequest, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    })
  }

  const categories = [
    'Safety Updates',
    'Training',
    'Environmental',
    'Equipment',
    'Regulations',
    'News',
    'Tips & Guides',
    'Technology',
    'Health & Safety',
    'Industry News'
  ]

  if (loading) {
    return (
      <div className="space-y-6 p-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-accent-50 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-accent-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Blog Post</h1>
            <p className="mt-1 text-gray-600">Loading blog post...</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-adventure border border-gray-200 p-8">
          <div className="flex justify-center items-center h-64">
            <div className="h-8 w-8 border-4 border-accent-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!originalBlog) {
    return (
      <div className="space-y-6 p-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-accent-50 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-accent-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Blog Post</h1>
            <p className="mt-1 text-gray-600">Blog not found</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-adventure border border-gray-200 p-8 text-center">
          <p className="text-gray-500">Blog post not found or has been deleted.</p>
          <button
            onClick={() => router.push('/admin/blog')}
            className="mt-4 inline-flex items-center gap-2 text-accent-600 hover:text-accent-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog Management
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-accent-50 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-accent-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Blog Post</h1>
            <p className="mt-1 text-gray-600">Edit and update blog article</p>
            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
              <span className="px-2 py-1 bg-gray-100 rounded">ID: {id}</span>
              <span className="px-2 py-1 bg-gray-100 rounded">Slug: {originalBlog.slug}</span>
              {/* <span className="px-2 py-1 bg-gray-100 rounded">
                Views: {originalBlog.views.toLocaleString()}
              </span> */}
              <span className="px-2 py-1 bg-gray-100 rounded">
                Likes: {originalBlog.likes}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.open(`/blog/${originalBlog.slug}`, '_blank')}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            Preview
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="btn-adventure flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Save className="h-5 w-5" />
            )}
            Update Blog
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="adventure-card">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Enter blog post title..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent text-lg font-medium"
              required
            />
          </div>

          {/* Excerpt */}
          <div className="adventure-card">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => handleChange('excerpt', e.target.value)}
              placeholder="A brief summary or introduction to your blog post..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent resize-none"
            />
            <p className="mt-2 text-sm text-gray-500">
              This will be shown in blog listings and search results
            </p>
          </div>

          {/* Content */}
          <div className="adventure-card">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Content *
              </label>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Eye className="h-4 w-4" />
                <span>Preview</span>
              </div>
            </div>
            <textarea
              value={formData.content}
              onChange={(e) => handleChange('content', e.target.value)}
              placeholder="Write your blog post content here (HTML or Markdown supported)..."
              rows={15}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent resize-none"
              required
            />
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <span>{formData.content.length} characters</span>
              <span>HTML/Markdown supported</span>
            </div>
          </div>

          {/* Preview Section */}
          <div className="adventure-card">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Current Blog Data</h3>
            <div className="space-y-3 text-sm">
              <div className="flex">
                <span className="w-32 text-gray-500">Current Title:</span>
                <span className="font-medium">{originalBlog.title}</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-500">Category:</span>
                <span className="font-medium">{originalBlog.category}</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-500">Author:</span>
                <span className="font-medium">{originalBlog.author}</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-500">Published:</span>
                <span className="font-medium">{blogService.formatDate(originalBlog.date)}</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-500">Tags:</span>
                {/* <div className="flex flex-wrap gap-1">
                  {originalBlog.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Featured Image */}
          <div className="adventure-card">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Featured Image URL
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => handleChange('image', e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            />
            {(formData.image || originalBlog.image) && (
              <div className="mt-4 relative">
                <img
                  src={formData.image || originalBlog.image}
                  alt="Featured preview"
                  className="w-full h-48 object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Image+Not+Found'
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleChange('image', '')}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Category */}
          <div className="adventure-card">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Author */}
          <div className="adventure-card">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Author
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => handleChange('author', e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            />
          </div>

          {/* Read Time */}
          <div className="adventure-card">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Read Time
            </label>
            <select
              value={formData.readTime}
              onChange={(e) => handleChange('readTime', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            >
              <option value="1 min read">1 min read</option>
              <option value="3 min read">3 min read</option>
              <option value="5 min read">5 min read</option>
              <option value="7 min read">7 min read</option>
              <option value="10 min read">10 min read</option>
              <option value="15+ min read">15+ min read</option>
            </select>
          </div>

          {/* Tags */}
          <div className="adventure-card">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-accent-50 text-accent-700 rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-accent-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Type and press Enter to add tags..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            />
            <p className="mt-2 text-sm text-gray-500">
              Use relevant tags like: web-development, safety, training, etc.
            </p>
          </div>

          {/* Featured Post */}
          <div className="adventure-card">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => handleChange('featured', e.target.checked)}
                className="h-4 w-4 text-accent-500 focus:ring-accent-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Mark as Featured Post
              </span>
            </label>
            <p className="mt-2 text-sm text-gray-500">
              Featured posts are highlighted on the homepage
            </p>
            {originalBlog.featured && !formData.featured && (
              <p className="mt-2 text-sm text-yellow-600">
                ⚠️ This post is currently featured. Unchecking will remove it from featured posts.
              </p>
            )}
          </div>

          {/* SEO Section */}
          <div className="adventure-card space-y-4">
            <h3 className="text-sm font-medium text-gray-700">SEO Settings</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Title
              </label>
              <input
                type="text"
                value={formData.metaTitle}
                onChange={(e) => handleChange('metaTitle', e.target.value)}
                placeholder="SEO title for search engines"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Description
              </label>
              <textarea
                value={formData.metaDescription}
                onChange={(e) => handleChange('metaDescription', e.target.value)}
                placeholder="SEO description for search engines"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Danger Zone */}
          <div className="adventure-card border border-red-200 bg-red-50">
            <h3 className="text-sm font-medium text-red-700 mb-3">Danger Zone</h3>
            <button
              type="button"
              onClick={async () => {
                if (confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
                  try {
                    await blogService.deleteBlog(id)
                    toast.success('Blog deleted successfully')
                    router.push('/admin/blog')
                  } catch (error: any) {
                    toast.error(error.message || 'Failed to delete blog')
                  }
                }
              }}
              className="w-full px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
            >
              <X className="h-4 w-4" />
              Delete Blog Post
            </button>
            <p className="mt-2 text-xs text-red-600">
              Once deleted, this blog post cannot be recovered.
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}