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
  Upload,
  X,
  Check,
  AlertCircle
} from 'lucide-react'

interface TrainingSession {
  startDate: string;
  endDate: string;
  seats: {
    total: number;
  };
  venue: string;
  instructor?: string;
}

export default function CreateTrainingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetGroup: '',
    duration: {
      value: 1,
      unit: 'days',
      display: '1 day'
    },
    cost: {
      amount: 0,
      currency: 'KSH',
      display: '0 KSH',
      taxInclusive: false
    },
    sessions: [] as TrainingSession[],
    category: 'safety',
    modeOfStudy: [] as string[],
    prerequisites: [] as string[],
    learningOutcomes: [] as string[],
    certification: '',
    isFeatured: false,
    registrationFee: 0,
    requirements: [] as string[]
  })

  const [newSession, setNewSession] = useState<TrainingSession>({
    startDate: '',
    endDate: '',
    seats: { total: 20 },
    venue: 'ISTC Main Campus',
    instructor: ''
  })

  const [newPrerequisite, setNewPrerequisite] = useState('')
  const [newOutcome, setNewOutcome] = useState('')
  const [newRequirement, setNewRequirement] = useState('')

  const categories = [
    'safety', 'environmental', 'construction', 'health', 
    'management', 'technical', 'first-aid', 'fire-safety'
  ]

  const modeOptions = ['full-time', 'part-time', 'weekend', 'online', 'hybrid']
  const durationUnits = ['hours', 'days', 'weeks', 'months']

  const handleAddSession = () => {
    if (!newSession.startDate || !newSession.endDate) {
      alert('Please provide start and end dates')
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

  const handleAddPrerequisite = () => {
    if (newPrerequisite.trim() && !formData.prerequisites.includes(newPrerequisite.trim())) {
      setFormData({
        ...formData,
        prerequisites: [...formData.prerequisites, newPrerequisite.trim()]
      })
      setNewPrerequisite('')
    }
  }

  const handleAddOutcome = () => {
    if (newOutcome.trim() && !formData.learningOutcomes.includes(newOutcome.trim())) {
      setFormData({
        ...formData,
        learningOutcomes: [...formData.learningOutcomes, newOutcome.trim()]
      })
      setNewOutcome('')
    }
  }

  const handleAddRequirement = () => {
    if (newRequirement.trim() && !formData.requirements.includes(newRequirement.trim())) {
      setFormData({
        ...formData,
        requirements: [...formData.requirements, newRequirement.trim()]
      })
      setNewRequirement('')
    }
  }

  const handleRemoveItem = (array: string[], index: number, field: keyof typeof formData) => {
    const updatedArray = array.filter((_, i) => i !== index)
    setFormData({ ...formData, [field]: updatedArray })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Validate form
      if (!formData.title || !formData.description) {
        throw new Error('Title and description are required')
      }

      if (formData.sessions.length === 0) {
        throw new Error('At least one training session is required')
      }

      // Calculate display strings
      const durationDisplay = `${formData.duration.value} ${formData.duration.unit}${formData.duration.value > 1 ? 's' : ''}`
      const costDisplay = `${formData.cost.amount.toLocaleString()} ${formData.cost.currency}`
      
      const finalData = {
        ...formData,
        duration: { ...formData.duration, display: durationDisplay },
        cost: { ...formData.cost, display: costDisplay }
      }

      // TODO: Replace with actual API call
      console.log('Creating training:', finalData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Redirect on success
      router.push('/admin/trainings')
      
    } catch (err: any) {
      setError(err.message || 'Failed to create training')
    } finally {
      setLoading(false)
    }
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
            className="btn-adventure flex items-center gap-2 disabled:opacity-50"
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
                  placeholder="e.g., First Aid & CPR Certification"
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
                  placeholder="e.g., Safety officers, Construction workers, All employees"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="1"
                      value={formData.duration.value}
                      onChange={(e) => setFormData({
                        ...formData, 
                        duration: {...formData.duration, value: parseInt(e.target.value)}
                      })}
                      className="w-24 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    />
                    <select
                      value={formData.duration.unit}
                      onChange={(e) => setFormData({
                        ...formData, 
                        duration: {...formData.duration, unit: e.target.value}
                      })}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    >
                      {durationUnits.map(unit => (
                        <option key={unit} value={unit}>{unit}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cost *
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="number"
                        min="0"
                        value={formData.cost.amount}
                        onChange={(e) => setFormData({
                          ...formData, 
                          cost: {...formData.cost, amount: parseFloat(e.target.value)}
                        })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <select
                      value={formData.cost.currency}
                      onChange={(e) => setFormData({
                        ...formData, 
                        cost: {...formData.cost, currency: e.target.value}
                      })}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    >
                      <option value="KSH">KSH</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.cost.taxInclusive}
                        onChange={(e) => setFormData({
                          ...formData, 
                          cost: {...formData.cost, taxInclusive: e.target.checked}
                        })}
                        className="h-4 w-4 text-accent-500 focus:ring-accent-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">Tax inclusive</span>
                    </label>
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
                      onChange={(e) => setNewSession({...newSession, startDate: e.target.value})}
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
                      onChange={(e) => setNewSession({...newSession, endDate: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Seats *
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={newSession.seats.total}
                      onChange={(e) => setNewSession({
                        ...newSession, 
                        seats: {...newSession.seats, total: parseInt(e.target.value)}
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Venue *
                    </label>
                    <input
                      type="text"
                      value={newSession.venue}
                      onChange={(e) => setNewSession({...newSession, venue: e.target.value})}
                      placeholder="e.g., ISTC Main Campus"
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
                      placeholder="e.g., John Safety Expert"
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
                  {formData.sessions.map((session, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Calendar className="h-5 w-5 text-gray-400" />
                          <span className="font-medium">
                            {new Date(session.startDate).toLocaleDateString()} - {new Date(session.endDate).toLocaleDateString()}
                          </span>
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
                  ))}
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
                placeholder="e.g., Certificate in First Aid & CPR"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Prerequisites */}
          <div className="adventure-card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Prerequisites</h3>
            
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newPrerequisite}
                  onChange={(e) => setNewPrerequisite(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddPrerequisite())}
                  placeholder="Add a prerequisite..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent text-sm"
                />
                <button
                  type="button"
                  onClick={handleAddPrerequisite}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              <div className="space-y-2">
                {formData.prerequisites.map((prereq, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                    <span className="text-sm">{prereq}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(formData.prerequisites, index, 'prerequisites')}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="adventure-card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Learning Outcomes</h3>
            
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newOutcome}
                  onChange={(e) => setNewOutcome(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddOutcome())}
                  placeholder="Add a learning outcome..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent text-sm"
                />
                <button
                  type="button"
                  onClick={handleAddOutcome}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              <div className="space-y-2">
                {formData.learningOutcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start gap-2 bg-green-50 rounded-lg px-3 py-2">
                    <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm flex-1">{outcome}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(formData.learningOutcomes, index, 'learningOutcomes')}
                      className="text-gray-400 hover:text-red-500 flex-shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
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
                <input
                  type="number"
                  min="0"
                  value={formData.registrationFee}
                  onChange={(e) => setFormData({...formData, registrationFee: parseFloat(e.target.value)})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                />
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