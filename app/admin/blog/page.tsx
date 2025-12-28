'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye, Calendar } from 'lucide-react'

const mockBlogPosts = [
  {
    id: 1,
    title: 'Fire Safety Regulations Update 2024',
    category: 'Safety Updates',
    author: 'John Doe',
    status: 'published',
    views: 1245,
    comments: 24,
    publishedAt: '2024-01-15',
  },
  {
    id: 2,
    title: 'Importance of First Aid Training in Workplace',
    category: 'Training',
    author: 'Jane Smith',
    status: 'published',
    views: 892,
    comments: 18,
    publishedAt: '2024-01-10',
  },
  {
    id: 3,
    title: 'New Environmental Safety Standards',
    category: 'Environmental',
    author: 'Mike Johnson',
    status: 'draft',
    views: 0,
    comments: 0,
    publishedAt: '2024-01-18',
  },
  {
    id: 4,
    title: '5 Essential Safety Equipment for Construction',
    category: 'Equipment',
    author: 'Sarah Williams',
    status: 'published',
    views: 1567,
    comments: 32,
    publishedAt: '2024-01-05',
  },
]

export default function BlogManagementPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')

  const filteredPosts = mockBlogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filter === 'all' || post.status === filter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6 p-4">
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

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search blog posts..."
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
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <button className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Blog Posts Table */}
      <div className="bg-white rounded-xl shadow-adventure border border-gray-200 overflow-hidden">
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
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{post.title}</p>
                      <p className="text-sm text-gray-500 mt-1">By {post.author}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-accent-50 text-accent-700">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                      post.status === 'published'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-yellow-50 text-yellow-700'
                    }`}>
                      {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{post.views.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/blog/edit/${post.id}`}
                        className="p-2 hover:bg-accent-50 rounded-lg transition-colors text-accent-600"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="adventure-card">
          <p className="text-sm text-gray-600">Total Posts</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">24</p>
        </div>
        <div className="adventure-card">
          <p className="text-sm text-gray-600">Published</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">18</p>
        </div>
        <div className="adventure-card">
          <p className="text-sm text-gray-600">Total Views</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">5,204</p>
        </div>
        <div className="adventure-card">
          <p className="text-sm text-gray-600">Avg. Engagement</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">84%</p>
        </div>
      </div>
    </div>
  )
}