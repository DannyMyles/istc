'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye, Calendar, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { Blog, blogService } from '@/app/api_services/blogService'

interface BlogStats {
  totalPosts: number
  published: number
  totalViews: number
  avgEngagement: number
}

export default function BlogManagementPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<BlogStats>({
    totalPosts: 0,
    published: 0,
    totalViews: 0,
    avgEngagement: 0
  })
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null)
  const [deleting, setDeleting] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchBlogs()
  }, [])

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowDeleteModal(false)
      }
    }

    if (showDeleteModal) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showDeleteModal])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const response = await blogService.getAllBlogs()
      setBlogs(response.blogs)
      
      // Calculate stats
      const totalViews = response.blogs.reduce((sum, blog) => sum + blog.views, 0)
      const totalLikes = response.blogs.reduce((sum, blog) => sum + blog.likes, 0)
      const avgEngagement = response.blogs.length > 0 
        ? Math.round((totalLikes / response.blogs.length) * 100) / 100
        : 0
      
      setStats({
        totalPosts: response.pagination.totalBlogs,
        published: response.blogs.length,
        totalViews,
        avgEngagement
      })
    } catch (error: any) {
      console.error('Error fetching blogs:', error)
      toast.error(error.message || 'Failed to load blogs')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteClick = (blog: Blog) => {
    setBlogToDelete(blog)
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = async () => {
    if (!blogToDelete) return
    
    setDeleting(true)
    try {
      await blogService.deleteBlog(blogToDelete.id)
      toast.success('Blog deleted successfully')
      fetchBlogs() // Refresh the list
    } catch (error: any) {
      console.error('Error deleting blog:', error)
      toast.error(error.message || 'Failed to delete blog')
    } finally {
      setDeleting(false)
      setShowDeleteModal(false)
      setBlogToDelete(null)
    }
  }

  const handleDeleteCancel = () => {
    setShowDeleteModal(false)
    setBlogToDelete(null)
  }

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesFilter = filter === 'all' || 
                         (filter === 'published' && blogService.getBlogStatus(blog.date) === 'published') ||
                         (filter === 'featured' && blog.featured)
    return matchesSearch && matchesFilter
  })

  if (loading) {
    return (
      <div className="space-y-6 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
            <p className="mt-1 text-gray-600">Create and manage blog posts</p>
          </div>
          <div className="w-40 h-10 bg-gray-200 animate-pulse rounded-lg"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="adventure-card h-24 bg-gray-100 animate-pulse"></div>
          ))}
        </div>
        
        <div className="bg-white rounded-xl shadow-adventure border border-gray-200 p-8">
          <div className="flex justify-center items-center h-64">
            <div className="h-8 w-8 border-4 border-accent-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4">
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div 
            ref={modalRef}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Confirm Deletion</h3>
              <button
                onClick={handleDeleteCancel}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                disabled={deleting}
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                    <Trash2 className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-red-900">Warning: This action cannot be undone</p>
                    <p className="text-sm text-red-700 mt-1">
                      All data associated with this blog post will be permanently deleted.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleDeleteCancel}
                  disabled={deleting}
                  className="flex-1 px-4 py-3 border bg-[#039AC5]  text-white hover:bg-accent-50 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={deleting}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {deleting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
          <p className="mt-1 text-gray-600">Create and manage blog posts</p>
        </div>
        <Link
          href="/admin/blog/create"
          className="btn-adventure flex items-center gap-2 w-fit"
        >
          <Plus className="h-5 w-5" />
          New Blog Post
        </Link>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="adventure-card">
          <p className="text-sm text-gray-600">Total Posts</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{stats.totalPosts}</p>
        </div>
        <div className="adventure-card">
          <p className="text-sm text-gray-600">Published</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{stats.published}</p>
        </div>
        <div className="adventure-card">
          <p className="text-sm text-gray-600">Total Views</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {stats.totalViews.toLocaleString()}
          </p>
        </div>
        <div className="adventure-card">
          <p className="text-sm text-gray-600">Avg. Engagement</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{stats.avgEngagement}%</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search blog posts by title, category, or tags..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
          >
            <option value="all">All Posts</option>
            <option value="published">Published</option>
            <option value="featured">Featured</option>
          </select>
          <button className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Blog Posts Table */}
      <div className="bg-white rounded-xl shadow-adventure border border-gray-200 overflow-hidden">
        {filteredBlogs.length === 0 && blogs.length > 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No blog posts match your search criteria</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setFilter('all')
              }}
              className="mt-4 inline-flex items-center gap-2 text-accent-600 hover:text-accent-700"
            >
              Clear filters
            </button>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No blog posts found</p>
            <Link
              href="/admin/blog/create"
              className="mt-4 inline-flex items-center gap-2 text-accent-600 hover:text-accent-700"
            >
              <Plus className="h-4 w-4" />
              Create your first blog post
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Views</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Published</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{blog.title}</p>
                        <p className="text-sm text-gray-500 mt-1">By {blog.author}</p>
                        {blog.featured && (
                          <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-yellow-50 text-yellow-700 rounded">
                            Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-accent-50 text-accent-700">
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        blogService.getBlogStatus(blog.date) === 'published'
                          ? 'bg-green-50 text-green-700'
                          : 'bg-yellow-50 text-yellow-700'
                      }`}>
                        {blogService.getBlogStatus(blog.date).charAt(0).toUpperCase() + 
                         blogService.getBlogStatus(blog.date).slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">{blog.views.toLocaleString()}</span>
                        {blog.likes > 0 && (
                          <span className="text-sm text-gray-500">
                            ({blog.likes} likes)
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        {blogService.formatDate(blog.date)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/blog/edit/${blog.id}`}
                          className="p-2 hover:bg-accent-50 rounded-lg transition-colors text-accent-600"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(blog)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <Link
                          href={`/blog/${blog.slug}`}
                          target="_blank"
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
                          title="Preview"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}