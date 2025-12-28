'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Eye, Upload, X } from 'lucide-react'

export default function CreateBlogPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [featuredImage, setFeaturedImage] = useState('')
  const [status, setStatus] = useState('draft')
  const [loading, setLoading] = useState(false)

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()])
      }
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log('Blog created:', { title, content, category, tags, status })
    router.push('/admin/blog')
  }

  const categories = [
    'Safety Updates',
    'Training',
    'Environmental',
    'Equipment',
    'Regulations',
    'News',
    'Tips & Guides'
  ]

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
            <h1 className="text-3xl font-bold text-gray-900">Create Blog Post</h1>
            <p className="mt-1 text-gray-600">Write and publish a new blog article</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setStatus('draft')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              status === 'draft'
                ? 'bg-accent-100 text-accent-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Save Draft
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="btn-adventure flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Save className="h-5 w-5" />
            )}
            {status === 'draft' ? 'Publish Now' : 'Update Post'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="adventure-card">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog post title..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent text-lg font-medium"
              required
            />
          </div>

          {/* Content */}
          <div className="adventure-card">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Eye className="h-4 w-4" />
                <span>Preview</span>
              </div>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog post content here..."
              rows={15}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent resize-none"
              required
            />
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <span>{content.length} characters</span>
              <span>Markdown supported</span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Featured Image */}
          <div className="adventure-card">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Featured Image
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-accent-500 transition-colors cursor-pointer">
              {featuredImage ? (
                <div className="relative">
                  <img
                    src={featuredImage}
                    alt="Featured"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => setFeaturedImage('')}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                  <button
                    type="button"
                    className="mt-4 px-4 py-2 bg-accent-50 text-accent-700 rounded-lg text-sm font-medium hover:bg-accent-100 transition-colors"
                  >
                    Upload Image
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Category */}
          <div className="adventure-card">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="adventure-card">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-accent-50 text-accent-700 rounded-full text-sm"
                >
                  {tag}
                  <button
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
          </div>

          {/* Status */}
          <div className="adventure-card">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="draft"
                  checked={status === 'draft'}
                  onChange={(e) => setStatus(e.target.value)}
                  className="h-4 w-4 text-accent-500 focus:ring-accent-500"
                />
                <span className="ml-2">Draft</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="published"
                  checked={status === 'published'}
                  onChange={(e) => setStatus(e.target.value)}
                  className="h-4 w-4 text-accent-500 focus:ring-accent-500"
                />
                <span className="ml-2">Published</span>
              </label>
            </div>
          </div>

          {/* SEO Preview */}
          <div className="adventure-card">
            <h3 className="text-sm font-medium text-gray-700 mb-3">SEO Preview</h3>
            <div className="space-y-2">
              <div className="text-xs font-medium text-accent-700 truncate">
                istc.co.ke › blog › {title.toLowerCase().replace(/\s+/g, '-')}
              </div>
              <div className="text-lg text-blue-600 font-medium truncate">
                {title || 'Your title will appear here'}
              </div>
              <div className="text-sm text-gray-600 line-clamp-2">
                {content.slice(0, 150) || 'Your description will appear here...'}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}