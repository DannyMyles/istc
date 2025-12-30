import { api } from "../lib/api"

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
  id: string
  code?: string
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
  duration: string
  cost: string
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
      return await api.public.trainings.getAll()
    } catch (error) {
      console.error('Error fetching trainings:', error)
      throw error
    }
  },

  // Get single training (public - no auth required)
  getTrainingById: async (id: string): Promise<Training> => {
    try {
      return await api.public.trainings.getOne(id)
    } catch (error) {
      console.error(`Error fetching training ${id}:`, error)
      throw error
    }
  },

  // Create training (admin only)
  createTraining: async (data: CreateTrainingRequest): Promise<Training> => {
    try {
      return await api.admin.training.create(data)
    } catch (error) {
      console.error('Error creating training:', error)
      throw error
    }
  },

  // Update training (admin only)
  updateTraining: async (id: string, data: Partial<CreateTrainingRequest>): Promise<Training> => {
    try {
      return await api.admin.training.update(id, data)
    } catch (error) {
      console.error(`Error updating training ${id}:`, error)
      throw error
    }
  },

  // Delete training (admin only)
  deleteTraining: async (id: string): Promise<void> => {
    try {
      return await api.admin.training.delete(id)
    } catch (error) {
      console.error(`Error deleting training ${id}:`, error)
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
      return {
        available: nextSession.seats.available || 0,
        total: nextSession.seats.total
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
    const cost = parseFloat(training.cost.replace(/[^0-9.]/g, '')) || 0
    return enrollments * cost
  }
}