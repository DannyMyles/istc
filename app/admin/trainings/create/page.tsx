'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Trash2, 
  Calendar,
  Users,
  DollarSign,
  Clock,
  Award,
  X,
  AlertCircle
} from 'lucide-react'
import toast from 'react-hot-toast'
import { trainingService, CreateTrainingRequest } from '@/app/api_services/trainingService'

interface TrainingSessionInput {
  startDate: string
  endDate: string
  seats: {
    total: number
  }
  venue: string
  instructor?: string
}

interface TrainingFormData {
  title: string
  description: string
  targetGroup: string
  duration: string
  cost: string
  category: string
  modeOfStudy: string[]
  isFeatured: boolean
  registrationFee: number
  certification: string
  sessions: TrainingSessionInput[]
}

export default function CreateTrainingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Form state
  const [formData, setFormData] = useState<TrainingFormData>({
    title: '',
    description: '',
    targetGroup: '',
    duration: '',
    cost: '',
    category: 'safety',
    modeOfStudy: ['full-time'],
    isFeatured: false,
    registrationFee: 0,
    certification: '',
    sessions: []
  })

  const [newSession, setNewSession] = useState<TrainingSessionInput>({
    startDate: '',
    endDate: '',
    seats: { total: 20 },
    venue: 'ISTC Main Campus',
    instructor: ''
  })

  const categories = [
    'safety', 'environmental', 'construction', 'health', 
    'management', 'technical', 'first-aid', 'fire-safety'
  ]

  const modeOptions = ['full-time', 'part-time', 'weekend', 'online', 'hybrid']

  const handleAddSession = () => {
    if (!newSession.startDate || !newSession.endDate) {
      toast.error('Please provide start and end dates')
      return
    }
    
    if (new Date(newSession.endDate) < new Date(newSession.startDate)) {
      toast.error('End date must be after start date')
      return
    }
    
    setFormData({
      ...formData,
      sessions: [...formData.sessions, { ...newSession }]
    })
    
    setNewSession({
      startDate: '',
      endDate: '',
      seats: { total: 20 },
      venue: 'ISTC Main Campus',
      instructor: ''
    })
  }

  const handleRemoveSession = (index: number) => {
    const updatedSessions = formData.sessions.filter((_, i) => i !== index)
    setFormData({ ...formData, sessions: updatedSessions })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Validate form
      if (!formData.title.trim() || !formData.description.trim()) {
        throw new Error('Title and description are required')
      }

      if (formData.sessions.length === 0) {
        throw new Error('At least one training session is required')
      }

      if (!formData.certification.trim()) {
        throw new Error('Certification name is required')
      }

      // Prepare data for API - Transform strings to nested objects required by backend
      const trainingData: CreateTrainingRequest = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        targetGroup: formData.targetGroup.trim(),
        certification: formData.certification.trim(),
        category: formData.category,
        modeOfStudy: formData.modeOfStudy,
        isFeatured: formData.isFeatured,
        sessions: formData.sessions,
        // Transform duration string to object structure
        duration: {
          value: parseInt(formData.duration) || 1,
          unit: 'days',
          display: formData.duration.includes('day') ? formData.duration : `${formData.duration} days`
        },
        // Transform cost string to object structure
        cost: {
          amount: parseFloat(formData.cost.replace(/[^0-9.]/g, '')) || 0,
          currency: 'KSH',
          display: formData.cost.includes('KSH') ? formData.cost : `${formData.cost} KSH`,
          taxInclusive: false
        },
        // Ensure registration fee is a number
        registrationFee: Number(formData.registrationFee) || 0
      }

      const response = await trainingService.createTraining(trainingData)
      toast.success('Training created successfully!')
      router.push('/admin/trainings')
      
    } catch (err: any) {
      console.error('Error creating training:', err)
      setError(err.message || 'Failed to create training. Please try again.')
      toast.error(err.message || 'Failed to create training')
    } finally {
      setLoading(false)
    }
  }

  const calculateDuration = (startDate: string, endDate: string): string => {
    if (!startDate || !endDate) return ''
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return `${diffDays} day${diffDays !== 1 ? 's' : ''}`
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
            <h1 className="text-3xl font-bold text-gray-900">Create Training Program</h1>
            <p className="mt-1 text-gray-600">Define a new training program with all details</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="btn-adventure flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Save className="h-5 w-5" />
            )}
            Create Training
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="adventure-card bg-red-50 border-red-200">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="adventure-card">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <span className="p-2 bg-accent-50 rounded-lg">
                <Award className="h-5 w-5 text-accent-600" />
              </span>
              Basic Information
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Training Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g., Occupational Safety & Health"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Provide a detailed description of the training program..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Group *
                </label>
                <input
                  type="text"
                  value={formData.targetGroup}
                  onChange={(e) => setFormData({...formData, targetGroup: e.target.value})}
                  placeholder="e.g., Members of Health & Safety Committees in organizations"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration *
                  </label>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      placeholder="e.g., 4 days"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cost *
                  </label>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.cost}
                      onChange={(e) => setFormData({...formData, cost: e.target.value})}
                      placeholder="e.g., 16,000 KSH"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Training Sessions */}
          <div className="adventure-card">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <span className="p-2 bg-blue-50 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
              </span>
              Training Sessions *
            </h3>
            
            <div className="space-y-6">
              {/* Add New Session Form */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-4">Add New Session</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      value={newSession.startDate}
                      onChange={(e) => {
                        setNewSession({...newSession, startDate: e.target.value})
                        if (newSession.endDate) {
                          const duration = calculateDuration(e.target.value, newSession.endDate)
                          if (duration && !formData.duration) {
                            setFormData({...formData, duration})
                          }
                        }
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date *
                    </label>
                    <input
                      type="date"
                      value={newSession.endDate}
                      onChange={(e) => {
                        setNewSession({...newSession, endDate: e.target.value})
                        if (newSession.startDate) {
                          const duration = calculateDuration(newSession.startDate, e.target.value)
                          if (duration && !formData.duration) {
                            setFormData({...formData, duration})
                          }
                        }
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Seats *
                    </label>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-gray-400" />
                      <input
                        type="number"
                        min="1"
                        value={newSession.seats.total}
                        onChange={(e) => setNewSession({
                          ...newSession, 
                          seats: {...newSession.seats, total: parseInt(e.target.value)}
                        })}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Venue *
                    </label>
                    <input
                      type="text"
                      value={newSession.venue}
                      onChange={(e) => setNewSession({...newSession, venue: e.target.value})}
                      placeholder="e.g., ISTC Conference Hall"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instructor (Optional)
                    </label>
                    <input
                      type="text"
                      value={newSession.instructor || ''}
                      onChange={(e) => setNewSession({...newSession, instructor: e.target.value})}
                      placeholder="e.g., Dr. Wafula Johnson"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAddSession}
                  className="mt-4 px-4 py-2 bg-accent-50 text-accent-700 rounded-lg font-medium hover:bg-accent-100 transition-colors flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Session
                </button>
              </div>

              {/* Sessions List */}
              {formData.sessions.length > 0 ? (
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Scheduled Sessions</h4>
                  {formData.sessions.map((session, index) => {
                    const duration = calculateDuration(session.startDate, session.endDate)
                    return (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-gray-400" />
                            <span className="font-medium">
                              {new Date(session.startDate).toLocaleDateString()} - {new Date(session.endDate).toLocaleDateString()}
                            </span>
                            {duration && (
                              <span className="text-sm text-gray-500">({duration})</span>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveSession(index)}
                            className="p-1 hover:bg-red-50 rounded text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span>{session.seats.total} seats</span>
                          </div>
                          <div>
                            <span className="font-medium">Venue:</span> {session.venue}
                          </div>
                          {session.instructor && (
                            <div className="md:col-span-2">
                              <span className="font-medium">Instructor:</span> {session.instructor}
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>No sessions added yet</p>
                  <p className="text-sm mt-1">Add at least one training session</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Category & Mode */}
          <div className="adventure-card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Category & Mode</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mode of Study *
                </label>
                <div className="space-y-2">
                  {modeOptions.map(mode => (
                    <label key={mode} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.modeOfStudy.includes(mode)}
                        onChange={(e) => {
                          const updatedModes = e.target.checked
                            ? [...formData.modeOfStudy, mode]
                            : formData.modeOfStudy.filter(m => m !== mode)
                          setFormData({...formData, modeOfStudy: updatedModes})
                        }}
                        className="h-4 w-4 text-accent-500 focus:ring-accent-500"
                      />
                      <span className="ml-2 capitalize">{mode.replace('-', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Certification */}
          <div className="adventure-card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Certification</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Certificate Name *
              </label>
              <input
                type="text"
                value={formData.certification}
                onChange={(e) => setFormData({...formData, certification: e.target.value})}
                placeholder="e.g., Certificate in Occupational Safety & Health"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Additional Settings */}
          <div className="adventure-card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Fee (KSH)
                </label>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    min="0"
                    value={formData.registrationFee || ''}
                    onChange={(e) => setFormData({...formData, registrationFee: parseFloat(e.target.value) || 0})}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                    className="h-4 w-4 text-accent-500 focus:ring-accent-500"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">Featured Training</span>
                </label>
                <p className="text-xs text-gray-500">Feature this training on the homepage</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}