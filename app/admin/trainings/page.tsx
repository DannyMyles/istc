'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Users, 
  TrendingUp, 
  DollarSign,
  Edit, 
  Trash2, 
  Eye,
  MoreVertical,
  Award,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react'

interface TrainingSession {
  startDate: string;
  endDate: string;
  seats: {
    total: number;
    booked?: number;
    available?: number;
  };
  venue: string;
  instructor?: string;
}

interface Training {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: {
    value: number;
    unit: string;
    display: string;
  };
  cost: {
    amount: number;
    currency: string;
    display: string;
    taxInclusive: boolean;
  };
  sessions: TrainingSession[];
  targetGroup: string;
  modeOfStudy: string[];
  certification: string;
  isFeatured: boolean;
  status: 'active' | 'draft' | 'archived';
  createdAt: string;
  totalEnrollments: number;
  rating?: number;
}

export default function TrainingsManagementPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [trainings, setTrainings] = useState<Training[]>([
    {
      id: '1',
      title: 'First Aid & CPR Training',
      category: 'safety',
      description: 'Comprehensive first aid and CPR certification course',
      duration: { value: 2, unit: 'days', display: '2 days' },
      cost: { amount: 15000, currency: 'KSH', display: '15,000 KSH', taxInclusive: false },
      sessions: [
        {
          startDate: '2024-02-15',
          endDate: '2024-02-16',
          seats: { total: 25, booked: 18, available: 7 },
          venue: 'ISTC Main Campus',
          instructor: 'Dr. Jane Medical'
        }
      ],
      targetGroup: 'All employees',
      modeOfStudy: ['full-time', 'part-time'],
      certification: 'First Aid & CPR Certificate',
      isFeatured: true,
      status: 'active',
      createdAt: '2024-01-10',
      totalEnrollments: 156,
      rating: 4.8
    },
    {
      id: '2',
      title: 'Fire Safety Management',
      category: 'safety',
      description: 'Advanced fire safety and emergency response training',
      duration: { value: 3, unit: 'days', display: '3 days' },
      cost: { amount: 25000, currency: 'KSH', display: '25,000 KSH', taxInclusive: false },
      sessions: [
        {
          startDate: '2024-02-20',
          endDate: '2024-02-22',
          seats: { total: 20, booked: 15, available: 5 },
          venue: 'ISTC Fire Training Ground',
          instructor: 'Chief Fire Officer'
        }
      ],
      targetGroup: 'Safety officers and managers',
      modeOfStudy: ['full-time'],
      certification: 'Fire Safety Management Certificate',
      isFeatured: true,
      status: 'active',
      createdAt: '2024-01-05',
      totalEnrollments: 89,
      rating: 4.9
    },
    {
      id: '3',
      title: 'Environmental Safety',
      category: 'environmental',
      description: 'Environmental protection and safety regulations',
      duration: { value: 5, unit: 'days', display: '5 days' },
      cost: { amount: 35000, currency: 'KSH', display: '35,000 KSH', taxInclusive: false },
      sessions: [
        {
          startDate: '2024-03-10',
          endDate: '2024-03-14',
          seats: { total: 15, booked: 8, available: 7 },
          venue: 'ISTC Main Campus'
        }
      ],
      targetGroup: 'Environmental officers',
      modeOfStudy: ['full-time'],
      certification: 'Environmental Safety Certificate',
      isFeatured: false,
      status: 'draft',
      createdAt: '2024-01-15',
      totalEnrollments: 0,
      rating: 0
    },
    {
      id: '4',
      title: 'Construction Safety',
      category: 'construction',
      description: 'Site safety and hazard management for construction',
      duration: { value: 4, unit: 'days', display: '4 days' },
      cost: { amount: 28000, currency: 'KSH', display: '28,000 KSH', taxInclusive: false },
      sessions: [
        {
          startDate: '2024-02-25',
          endDate: '2024-02-28',
          seats: { total: 30, booked: 22, available: 8 },
          venue: 'ISTC Construction Yard',
          instructor: 'Eng. Safety Manager'
        }
      ],
      targetGroup: 'Construction workers and supervisors',
      modeOfStudy: ['full-time', 'weekend'],
      certification: 'Construction Safety Certificate',
      isFeatured: true,
      status: 'active',
      createdAt: '2024-01-08',
      totalEnrollments: 124,
      rating: 4.7
    },
  ])

  const [categories, setCategories] = useState<string[]>([
    'safety', 'environmental', 'construction', 'health', 'management', 'technical'
  ])

  const filteredTrainings = trainings.filter(training => {
    const matchesSearch = training.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         training.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         training.targetGroup.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = filter === 'all' || training.status === filter
    const matchesCategory = categoryFilter === 'all' || training.category === categoryFilter
    
    return matchesSearch && matchesStatus && matchesCategory
  })

  const handleDeleteTraining = (id: string) => {
    if (confirm('Are you sure you want to delete this training?')) {
      setTrainings(trainings.filter(t => t.id !== id))
    }
  }

  const handleToggleFeatured = (id: string) => {
    setTrainings(trainings.map(t => 
      t.id === id ? { ...t, isFeatured: !t.isFeatured } : t
    ))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-50 text-green-700'
      case 'draft': return 'bg-yellow-50 text-yellow-700'
      case 'archived': return 'bg-gray-50 text-gray-700'
      default: return 'bg-gray-50 text-gray-700'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'safety': return 'bg-red-50 text-red-700'
      case 'environmental': return 'bg-emerald-50 text-emerald-700'
      case 'construction': return 'bg-orange-50 text-orange-700'
      case 'health': return 'bg-blue-50 text-blue-700'
      default: return 'bg-accent-50 text-accent-700'
    }
  }

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Training Programs</h1>
          <p className="mt-1 text-gray-600">Manage and organize training programs</p>
        </div>
        <Link
          href="/admin/trainings/create"
          className="btn-adventure flex items-center gap-2 w-fit"
        >
          <Plus className="h-5 w-5" />
          New Training Program
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="adventure-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Trainings</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {trainings.filter(t => t.status === 'active').length}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="adventure-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Enrollments</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {trainings.reduce((sum, t) => sum + t.totalEnrollments, 0).toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="adventure-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Featured</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {trainings.filter(t => t.isFeatured).length}
              </p>
            </div>
            <div className="p-3 bg-accent-50 rounded-lg">
              <Award className="h-6 w-6 text-accent-600" />
            </div>
          </div>
        </div>
        
        <div className="adventure-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Upcoming Sessions</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {trainings.reduce((sum, t) => sum + t.sessions.length, 0)}
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search trainings by title, description, or target group..."
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
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
          
          <button className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Trainings Table */}
      <div className="bg-white rounded-xl shadow-adventure border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Training Program</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                <th className="px6 py-4 text-left text-sm font-semibold text-gray-900">Duration</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Cost</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Enrollments</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTrainings.map((training) => (
                <tr key={training.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900">{training.title}</p>
                        {training.isFeatured && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent-50 text-accent-700 rounded-full text-xs">
                            <Award className="h-3 w-3" />
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-1">{training.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Next: {new Date(training.sessions[0]?.startDate || '').toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          Seats: {training.sessions[0]?.seats?.available || 0}/{training.sessions[0]?.seats?.total || 0}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(training.category)}`}>
                      {training.category.charAt(0).toUpperCase() + training.category.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock className="h-4 w-4 text-gray-400" />
                      {training.duration.display}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 font-medium">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      {training.cost.display}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(training.status)}`}>
                      {training.status.charAt(0).toUpperCase() + training.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{training.totalEnrollments}</span>
                      {training.rating && (
                        <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
                          ⭐ {training.rating}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleFeatured(training.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          training.isFeatured
                            ? 'bg-accent-50 text-accent-600 hover:bg-accent-100'
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                        }`}
                        title={training.isFeatured ? 'Remove from featured' : 'Mark as featured'}
                      >
                        <Award className="h-4 w-4" />
                      </button>
                      
                      <Link
                        href={`/admin/trainings/edit/${training.id}`}
                        className="p-2 hover:bg-accent-50 rounded-lg transition-colors text-accent-600"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      
                      <button
                        onClick={() => handleDeleteTraining(training.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      
                      <Link
                        href={`/admin/trainings/${training.id}`}
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600"
                        title="View Details"
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
        
        {filteredTrainings.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No trainings found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}