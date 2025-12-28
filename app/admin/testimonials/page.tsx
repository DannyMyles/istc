'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Plus, 
  Search, 
  Filter, 
  Star, 
  MessageSquare,
  User,
  Building,
  TrendingUp,
  Edit, 
  Trash2, 
  Eye,
  MoreVertical,
  Calendar,
  Award,
  CheckCircle,
  XCircle,
  ChevronUp,
  ChevronDown
} from 'lucide-react'

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
  avatarColor: string;
  featured: boolean;
  trainingId?: string;
  trainingName?: string;
  status: 'published' | 'pending' | 'draft' | 'archived';
  createdAt: string;
  approved: boolean;
  verified: boolean;
}

export default function TestimonialsManagementPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [ratingFilter, setRatingFilter] = useState('all')
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: '1',
      name: 'John Karish',
      role: 'HR Director',
      company: 'Precision Manufacturing Ltd',
      content: 'The certification process was smooth and professional. Our team is now better equipped to handle emergencies and compliance requirements.',
      rating: 5,
      avatarColor: '#10b981',
      featured: true,
      trainingId: '6950f329db84ee4a3d1b5820',
      trainingName: 'Occupational Safety & Health',
      status: 'published',
      createdAt: '2024-01-15',
      approved: true,
      verified: true
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      role: 'Safety Manager',
      company: 'BuildRight Construction',
      content: 'Outstanding training program! The instructors were knowledgeable and the hands-on exercises were invaluable for our field teams.',
      rating: 5,
      avatarColor: '#3b82f6',
      featured: true,
      trainingId: '6950f329db84ee4a3d1b5821',
      trainingName: 'Construction Safety',
      status: 'published',
      createdAt: '2024-01-20',
      approved: true,
      verified: true
    },
    {
      id: '3',
      name: 'Michael Chen',
      role: 'Operations Director',
      company: 'Tech Solutions Inc',
      content: 'Excellent fire safety training. Our team gained practical skills that have already proven valuable in our office environment.',
      rating: 4,
      avatarColor: '#8b5cf6',
      featured: false,
      trainingId: '6950f329db84ee4a3d1b5822',
      trainingName: 'Fire Safety Management',
      status: 'published',
      createdAt: '2024-01-25',
      approved: true,
      verified: true
    },
    {
      id: '4',
      name: 'Emily Rodriguez',
      role: 'Environmental Officer',
      company: 'Green Energy Solutions',
      content: 'The environmental safety course exceeded our expectations. Highly recommend for companies focused on sustainability.',
      rating: 5,
      avatarColor: '#f59e0b',
      featured: true,
      status: 'published',
      createdAt: '2024-02-01',
      approved: true,
      verified: false
    },
    {
      id: '5',
      name: 'David Wilson',
      role: 'Site Supervisor',
      company: 'Urban Developers Ltd',
      content: 'Comprehensive first aid training that gave our team confidence in emergency situations.',
      rating: 4,
      avatarColor: '#ef4444',
      featured: false,
      trainingId: '6950f329db84ee4a3d1b5823',
      trainingName: 'First Aid & CPR',
      status: 'pending',
      createdAt: '2024-02-05',
      approved: false,
      verified: false
    },
    {
      id: '6',
      name: 'Lisa Thompson',
      role: 'HR Manager',
      company: 'Financial Services Group',
      content: 'Professional training with excellent materials. Our employees found it very engaging and practical.',
      rating: 5,
      avatarColor: '#ec4899',
      featured: false,
      status: 'draft',
      createdAt: '2024-02-10',
      approved: false,
      verified: false
    },
    {
      id: '7',
      name: 'Robert Kimani',
      role: 'CEO',
      company: 'Kenya Logistics Ltd',
      content: 'Transformative experience for our leadership team. The risk management strategies are now part of our core operations.',
      rating: 5,
      avatarColor: '#14b8a6',
      featured: true,
      trainingId: '6950f329db84ee4a3d1b5824',
      trainingName: 'Risk Management',
      status: 'published',
      createdAt: '2024-02-12',
      approved: true,
      verified: true
    },
    {
      id: '8',
      name: 'Grace Omondi',
      role: 'Training Coordinator',
      company: 'Healthcare Services Ltd',
      content: 'Well-organized course with excellent follow-up support. Our nurses are better prepared for workplace safety.',
      rating: 4,
      avatarColor: '#6366f1',
      featured: false,
      trainingId: '6950f329db84ee4a3d1b5825',
      trainingName: 'Healthcare Safety',
      status: 'archived',
      createdAt: '2024-01-30',
      approved: true,
      verified: false
    }
  ])

  const [selectedTestimonials, setSelectedTestimonials] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<'date' | 'rating' | 'name'>('date')
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc')

  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = testimonial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         testimonial.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         testimonial.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         testimonial.trainingName?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = filter === 'all' || testimonial.status === filter
    const matchesRating = ratingFilter === 'all' || testimonial.rating === parseInt(ratingFilter)
    
    return matchesSearch && matchesStatus && matchesRating
  }).sort((a, b) => {
    let comparison = 0
    
    switch (sortBy) {
      case 'date':
        comparison = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        break
      case 'rating':
        comparison = b.rating - a.rating
        break
      case 'name':
        comparison = a.name.localeCompare(b.name)
        break
    }
    
    return sortOrder === 'asc' ? -comparison : comparison
  })

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTestimonials(filteredTestimonials.map(t => t.id))
    } else {
      setSelectedTestimonials([])
    }
  }

  const handleSelectTestimonial = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedTestimonials([...selectedTestimonials, id])
    } else {
      setSelectedTestimonials(selectedTestimonials.filter(testId => testId !== id))
    }
  }

  const handleDeleteTestimonial = (id: string) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      setTestimonials(testimonials.filter(t => t.id !== id))
      setSelectedTestimonials(selectedTestimonials.filter(testId => testId !== id))
    }
  }

  const handleDeleteSelected = () => {
    if (selectedTestimonials.length === 0) return
    if (confirm(`Are you sure you want to delete ${selectedTestimonials.length} selected testimonials?`)) {
      setTestimonials(testimonials.filter(t => !selectedTestimonials.includes(t.id)))
      setSelectedTestimonials([])
    }
  }

  const handleToggleFeatured = (id: string) => {
    setTestimonials(testimonials.map(t => 
      t.id === id ? { ...t, featured: !t.featured } : t
    ))
  }

  const handleToggleApproved = (id: string) => {
    setTestimonials(testimonials.map(t => 
      t.id === id ? { ...t, approved: !t.approved } : t
    ))
  }

  const handleUpdateStatus = (id: string, status: Testimonial['status']) => {
    setTestimonials(testimonials.map(t => 
      t.id === id ? { ...t, status } : t
    ))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-50 text-green-700'
      case 'pending': return 'bg-yellow-50 text-yellow-700'
      case 'draft': return 'bg-blue-50 text-blue-700'
      case 'archived': return 'bg-gray-50 text-gray-700'
      default: return 'bg-gray-50 text-gray-700'
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const stats = {
    total: testimonials.length,
    published: testimonials.filter(t => t.status === 'published').length,
    featured: testimonials.filter(t => t.featured).length,
    pending: testimonials.filter(t => t.status === 'pending').length,
    averageRating: (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1),
    topRating: testimonials.filter(t => t.rating === 5).length
  }

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Testimonials</h1>
          <p className="mt-1 text-gray-600">Manage and showcase customer feedback</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Import
          </button>
          <Link
            href="/admin/testimonials/create"
            className="btn-adventure flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Add Testimonial
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div className="adventure-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="adventure-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Published</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.published}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="adventure-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Featured</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.featured}</p>
            </div>
            <div className="p-3 bg-accent-50 rounded-lg">
              <Award className="h-6 w-6 text-accent-600" />
            </div>
          </div>
        </div>
        
        <div className="adventure-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Rating</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.averageRating}</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Star className="h-6 w-6 text-yellow-600 fill-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="adventure-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">5-Star</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.topRating}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="adventure-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.pending}</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedTestimonials.length > 0 && (
        <div className="adventure-card bg-accent-50 border-accent-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-accent-100 rounded-lg flex items-center justify-center">
                <span className="text-accent-700 font-medium">{selectedTestimonials.length}</span>
              </div>
              <p className="text-accent-700 font-medium">
                {selectedTestimonials.length} testimonial{selectedTestimonials.length > 1 ? 's' : ''} selected
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => selectedTestimonials.forEach(id => handleToggleFeatured(id))}
                className="px-3 py-1.5 bg-accent-50 text-accent-700 rounded-lg text-sm font-medium hover:bg-accent-100 transition-colors"
              >
                Toggle Featured
              </button>
              <button
                onClick={() => selectedTestimonials.forEach(id => handleUpdateStatus(id, 'published'))}
                className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors"
              >
                Publish
              </button>
              <button
                onClick={handleDeleteSelected}
                className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
              >
                Delete Selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search testimonials by name, company, or content..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="pending">Pending Review</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
          
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
          >
            <option value="all">All Ratings</option>
            <option value="5">★★★★★ (5)</option>
            <option value="4">★★★★☆ (4)</option>
            <option value="3">★★★☆☆ (3)</option>
            <option value="2">★★☆☆☆ (2)</option>
            <option value="1">★☆☆☆☆ (1)</option>
          </select>
          
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [sort, order] = e.target.value.split('-')
              setSortBy(sort as any)
              setSortOrder(order as any)
            }}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="rating-desc">Highest Rated</option>
            <option value="rating-asc">Lowest Rated</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
          </select>
          
          <button className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTestimonials.map((testimonial) => (
          <div key={testimonial.id} className="adventure-card group hover:shadow-adventure-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div 
                  className="h-12 w-12 rounded-full flex items-center justify-center text-white font-semibold"
                  style={{ backgroundColor: testimonial.avatarColor }}
                >
                  {getInitials(testimonial.name)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-900">{testimonial.name}</h3>
                    {testimonial.verified && (
                      <span className="inline-flex items-center text-xs text-blue-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </span>
                    )}
                    {testimonial.featured && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent-50 text-accent-700 rounded-full text-xs">
                        <Award className="h-3 w-3" />
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {testimonial.role}{testimonial.company && `, ${testimonial.company}`}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <input
                  type="checkbox"
                  checked={selectedTestimonials.includes(testimonial.id)}
                  onChange={(e) => handleSelectTestimonial(testimonial.id, e.target.checked)}
                  className="h-4 w-4 text-accent-500 focus:ring-accent-500"
                />
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleToggleFeatured(testimonial.id)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      testimonial.featured
                        ? 'bg-accent-50 text-accent-600 hover:bg-accent-100'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                    title={testimonial.featured ? 'Remove from featured' : 'Mark as featured'}
                  >
                    <Award className="h-4 w-4" />
                  </button>
                  
                  <Link
                    href={`/admin/testimonials/edit/${testimonial.id}`}
                    className="p-1.5 hover:bg-accent-50 rounded-lg transition-colors text-accent-600"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                  
                  <button
                    onClick={() => handleDeleteTestimonial(testimonial.id)}
                    className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="mb-4">
              <p className="text-gray-700 italic line-clamp-3">{testimonial.content}</p>
            </div>

            {/* Rating and Training */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {renderStars(testimonial.rating)}
                  <span className="text-sm text-gray-600 ml-2">{testimonial.rating}.0</span>
                </div>
                
                {testimonial.trainingName && (
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Award className="h-4 w-4" />
                    {testimonial.trainingName}
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(testimonial.status)}`}>
                  {testimonial.status.charAt(0).toUpperCase() + testimonial.status.slice(1)}
                </span>
                
                {!testimonial.approved && (
                  <button
                    onClick={() => handleToggleApproved(testimonial.id)}
                    className="text-xs px-2 py-1 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors"
                  >
                    Approve
                  </button>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
              <div className="text-xs text-gray-500 flex items-center gap-2">
                <Calendar className="h-3 w-3" />
                {new Date(testimonial.createdAt).toLocaleDateString()}
              </div>
              
              <div className="flex items-center gap-2">
                <select
                  value={testimonial.status}
                  onChange={(e) => handleUpdateStatus(testimonial.id, e.target.value as Testimonial['status'])}
                  className="text-xs border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-accent-500"
                >
                  <option value="published">Publish</option>
                  <option value="pending">Pending</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archive</option>
                </select>
                
                <Link
                  href={`/admin/testimonials/${testimonial.id}`}
                  className="text-xs text-accent-600 hover:text-accent-700 flex items-center gap-1"
                >
                  <Eye className="h-3 w-3" />
                  Preview
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTestimonials.length === 0 && (
        <div className="adventure-card">
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <MessageSquare className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No testimonials found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <Link
              href="/admin/testimonials/create"
              className="btn-adventure inline-flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add First Testimonial
            </Link>
          </div>
        </div>
      )}

      {/* Pagination */}
      {filteredTestimonials.length > 0 && (
        <div className="flex items-center justify-between border-t border-gray-200 pt-6">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{' '}
            <span className="font-medium">{filteredTestimonials.length}</span> of{' '}
            <span className="font-medium">{filteredTestimonials.length}</span> testimonials
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg bg-accent-50 text-accent-700 border-accent-200">
              1
            </button>
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}