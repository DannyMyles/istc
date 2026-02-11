import { api } from "../lib/api"
import toast from 'react-hot-toast'

export interface TrainingSession {
  _id: string
  startDate: string
  endDate: string
  seats: {
    total: number
    booked?: number
    available?: number
  }
  venue: string
  instructor?: string
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled'
  formattedDates: string
  durationInDays: number
}

export interface Training {
  id: string | number
  code?: string
  title: string
  description: string
  targetGroup: string
  duration: string | {
    value: number
    unit: string
    display: string
  }
  cost: string | {
    amount: number
    currency: string
    display: string
    taxInclusive?: boolean
  }
  category: string
  modeOfStudy: string[]
  isFeatured: boolean
  registrationFee: number
  certification: string
  sessions: TrainingSession[]
  upcomingSessions: number
  slug?: string
  createdAt: string
}

export interface TrainingResponse {
  trainings: Training[]
  pagination: {
    currentPage: number
    totalPages: number
    totalTrainings: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

export interface CreateTrainingRequest {
  title: string
  description: string
  targetGroup: string
  duration: {
    value: number
    unit: 'days' | 'weeks' | 'months'
    display: string
  }
  cost: {
    amount: number
    currency: string
    display: string
    taxInclusive?: boolean
  }
  category: string
  modeOfStudy: string[]
  isFeatured: boolean
  registrationFee: number
  certification: string
  sessions: {
    startDate: string
    endDate: string
    seats: {
      total: number
    }
    venue: string
    instructor?: string
  }[]
}

export const trainingService = {
  // Get all trainings (public - no auth required)
  getAllTrainings: async (): Promise<TrainingResponse> => {
    try {
      const response = await api.public.trainings.getAll()
      console.log('Get all trainings response:', response)
      
      // Handle both wrapped ({ trainings: [...] }) and direct responses
      const trainingsData = (response as any).trainings || response
      
      // If trainings is an array, construct the proper response
      if (Array.isArray(trainingsData)) {
        return {
          trainings: trainingsData,
          pagination: {
            currentPage: 1,
            totalPages: 1,
            totalTrainings: trainingsData.length,
            hasNextPage: false,
            hasPrevPage: false
          }
        }
      }
      
      return response as TrainingResponse
    } catch (error: any) {
      console.error('Error fetching trainings:', error)
      toast.error(error.message || 'Failed to fetch trainings')
      throw error
    }
  },

  // Get single training (public - no auth required)
  getTrainingById: async (id: string): Promise<Training> => {
    try {
      const response = await api.public.trainings.getOne(id)
      console.log('Raw API response:', response)
      
      // Handle both wrapped ({ training: ... }) and direct training responses
      const trainingData = (response as any).training || response
      return trainingData as Training
    } catch (error: any) {
      console.error(`Error fetching training ${id}:`, error)
      toast.error(error.message || 'Failed to fetch training')
      throw error
    }
  },

  // Create training (admin only)
  createTraining: async (data: CreateTrainingRequest): Promise<Training> => {
    try {
      return await api.admin.training.create(data)
    } catch (error: any) {
      console.error('Error creating training:', error)
      toast.error(error.message || 'Failed to create training')
      throw error
    }
  },

  // Update training (admin only)
  updateTraining: async (id: string, data: Partial<CreateTrainingRequest>): Promise<Training> => {
    try {
      return await api.admin.training.update(id, data)
    } catch (error: any) {
      console.error(`Error updating training ${id}:`, error)
      toast.error(error.message || 'Failed to update training')
      throw error
    }
  },

  // Delete training (admin only)
  deleteTraining: async (id: string): Promise<void> => {
    try {
      return await api.admin.training.delete(id)
    } catch (error: any) {
      console.error(`Error deleting training ${id}:`, error)
      toast.error(error.message || 'Failed to delete training')
      throw error
    }
  },

  // Format date for display
  formatDate: (dateString: string): string => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    } catch {
      return dateString
    }
  },

  // Get upcoming sessions count
  getUpcomingSessionsCount: (training: Training): number => {
    try {
      const now = new Date()
      return training.sessions.filter(session => {
        const sessionDate = new Date(session.startDate)
        return sessionDate >= now
      }).length
    } catch {
      return 0
    }
  },

  // Calculate total enrollments (sum of booked seats)
  getTotalEnrollments: (training: Training): number => {
    try {
      return training.sessions.reduce((sum, session) => {
        return sum + (session.seats.booked || 0)
      }, 0)
    } catch {
      return 0
    }
  },

  // Calculate available seats for next session
  getNextSessionAvailability: (training: Training): { available: number; total: number } => {
    try {
      const now = new Date()
      const upcomingSessions = training.sessions
        .filter(session => new Date(session.startDate) >= now)
        .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      
      if (upcomingSessions.length === 0) {
        return { available: 0, total: 0 }
      }
      
      const nextSession = upcomingSessions[0]
      const total = nextSession.seats.total || 0
      const booked = nextSession.seats.booked || 0
      // If available is not set, calculate it as total - booked
      const available = nextSession.seats.available ?? (total - booked)
      
      return {
        available: available >= 0 ? available : 0,
        total: total
      }
    } catch {
      return { available: 0, total: 0 }
    }
  },

  // Get training status based on sessions
  getTrainingStatus: (training: Training): 'active' | 'upcoming' | 'completed' | 'draft' => {
    try {
      const now = new Date()
      const upcomingSessions = training.sessions.filter(session => 
        new Date(session.startDate) >= now
      )
      
      if (upcomingSessions.length > 0) {
        return 'active'
      }
      
      const pastSessions = training.sessions.filter(session => 
        new Date(session.endDate) < now
      )
      
      if (pastSessions.length === training.sessions.length) {
        return 'completed'
      }
      
      return 'draft'
    } catch {
      return 'draft'
    }
  },

  // Get unique categories from trainings
  getUniqueCategories: (trainings: Training[]): string[] => {
    const categories = trainings.map(t => t.category)
    return Array.from(new Set(categories)).sort()
  },

  // Calculate total revenue (placeholder - adjust based on your business logic)
  calculateRevenue: (training: Training): number => {
    const enrollments = trainingService.getTotalEnrollments(training)
    const cost = typeof training.cost === 'object' ? training.cost.amount : 0
    return enrollments * (cost || 0)
  }
}
