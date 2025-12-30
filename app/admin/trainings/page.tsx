'use client'

import { useState, useEffect, useRef } from 'react'
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
  XCircle,
  X
} from 'lucide-react'
import toast from 'react-hot-toast'
import { Training, trainingService } from '@/app/api_services/trainingService'

interface TrainingStats {
  totalTrainings: number
  activeTrainings: number
  totalEnrollments: number
  featuredTrainings: number
  upcomingSessions: number
  totalRevenue: number
}

export default function TrainingsManagementPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [trainings, setTrainings] = useState<Training[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<TrainingStats>({
    totalTrainings: 0,
    activeTrainings: 0,
    totalEnrollments: 0,
    featuredTrainings: 0,
    upcomingSessions: 0,
    totalRevenue: 0
  })
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [trainingToDelete, setTrainingToDelete] = useState<Training | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [categories, setCategories] = useState<string[]>([])
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchTrainings()
  }, [])

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

  const fetchTrainings = async () => {
    try {
      setLoading(true)
      const response = await trainingService.getAllTrainings()
      setTrainings(response.trainings)
      
      // Extract unique categories
      const uniqueCategories = trainingService.getUniqueCategories(response.trainings)
      setCategories(uniqueCategories)
      
      // Calculate stats
      const activeTrainings = response.trainings.filter(t => 
        trainingService.getTrainingStatus(t) === 'active'
      ).length
      
      const featuredTrainings = response.trainings.filter(t => t.isFeatured).length
      
      const totalEnrollments = response.trainings.reduce((sum, t) => {
        return sum + trainingService.getTotalEnrollments(t)
      }, 0)
      
      const upcomingSessions = response.trainings.reduce((sum, t) => {
        return sum + trainingService.getUpcomingSessionsCount(t)
      }, 0)
      
      const totalRevenue = response.trainings.reduce((sum, t) => {
        return sum + trainingService.calculateRevenue(t)
      }, 0)

      setStats({
        totalTrainings: response.pagination.totalTrainings,
        activeTrainings,
        totalEnrollments,
        featuredTrainings,
        upcomingSessions,
        totalRevenue
      })
      
    } catch (error: any) {
      console.error('Error fetching trainings:', error)
      toast.error(error.message || 'Failed to load trainings')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteClick = (training: Training) => {
    setTrainingToDelete(training)
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = async () => {
    if (!trainingToDelete) return
    
    setDeleting(true)
    try {
      await trainingService.deleteTraining(trainingToDelete.id)
      toast.success('Training deleted successfully')
      fetchTrainings() // Refresh the list
    } catch (error: any) {
      console.error('Error deleting training:', error)
      toast.error(error.message || 'Failed to delete training')
    } finally {
      setDeleting(false)
      setShowDeleteModal(false)
      setTrainingToDelete(null)
    }
  }

  const handleDeleteCancel = () => {
    setShowDeleteModal(false)
    setTrainingToDelete(null)
  }

  const handleToggleFeatured = async (training: Training) => {
    try {
      await trainingService.updateTraining(training.id, {
        ...training,
        isFeatured: !training.isFeatured
      })
      toast.success(`Training ${!training.isFeatured ? 'added to' : 'removed from'} featured`)
      fetchTrainings() // Refresh the list
    } catch (error: any) {
      console.error('Error updating training:', error)
      toast.error(error.message || 'Failed to update training')
    }
  }

  const filteredTrainings = trainings.filter(training => {
    const matchesSearch = training.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         training.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         training.targetGroup.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         training.code?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = filter === 'all' || trainingService.getTrainingStatus(training) === filter
    const matchesCategory = categoryFilter === 'all' || training.category === categoryFilter
    
    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusColor = (training: Training) => {
    const status = trainingService.getTrainingStatus(training)
    switch (status) {
      case 'active': return 'bg-green-50 text-green-700'
      case 'upcoming': return 'bg-blue-50 text-blue-700'
      case 'completed': return 'bg-gray-50 text-gray-700'
      case 'draft': return 'bg-yellow-50 text-yellow-700'
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

  if (loading) {
    return (
      <div className="space-y-6 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Training Programs</h1>
            <p className="mt-1 text-gray-600">Manage and organize training programs</p>
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
                      All data associated with this training program will be permanently deleted.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleDeleteCancel}
                  disabled={deleting}
                  className="flex-1 px-4 py-3 border bg-[#039AC5] text-white hover:bg-accent-50 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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
              <p className="text-sm text-gray-600">Total Trainings</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.totalTrainings}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Award className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="adventure-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Trainings</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.activeTrainings}</p>
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
                {stats.totalEnrollments.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="adventure-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Upcoming Sessions</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.upcomingSessions}</p>
            </div>
            <div className="p-3 bg-accent-50 rounded-lg">
              <Calendar className="h-6 w-6 text-accent-600" />
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
              placeholder="Search trainings by title, code, description, or target group..."
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
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
            <option value="draft">Draft</option>
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
              {filteredTrainings.map((training) => {
                const status = trainingService.getTrainingStatus(training)
                const enrollments = trainingService.getTotalEnrollments(training)
                const nextSession = trainingService.getNextSessionAvailability(training)
                const nextSessionDate = training.sessions.length > 0 
                  ? training.sessions[0].startDate 
                  : null

                return (
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
                          {training.code && (
                            <span className="px-2 py-0.5 bg-gray-100 rounded">Code: {training.code}</span>
                          )}
                          {nextSessionDate && (
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Next: {trainingService.formatDate(nextSessionDate)}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            Seats: {nextSession.available}/{nextSession.total}
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
                        {training.duration}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 font-medium">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                        {training.cost}
                      </div>
                      {training.registrationFee > 0 && (
                        <p className="text-xs text-gray-500 mt-1">
                          +{training.registrationFee.toLocaleString()} KSH registration
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(training)}`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">{enrollments}</span>
                        <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
                          {training.upcomingSessions} sessions
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleFeatured(training)}
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
                          onClick={() => handleDeleteClick(training)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        
                        <Link
                          href={`/trainings/${training.slug || training.id}`}
                          className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600"
                          title="View Details"
                          target="_blank"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                )
              })}
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
            {trainings.length > 0 && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setFilter('all')
                  setCategoryFilter('all')
                }}
                className="mt-4 text-accent-600 hover:text-accent-700 font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}