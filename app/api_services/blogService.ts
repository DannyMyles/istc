import { api } from "../lib/api"

export interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  author: string
  date: string
  readTime: string
  image: string
  featured: boolean
  views: number
  likes: number
  tags: string[]
}

export interface BlogResponse {
  blogs: Blog[]
  pagination: {
    currentPage: number
    totalPages: number
    totalBlogs: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

export interface CreateBlogRequest {
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  image: string
  readTime: string
  featured: boolean
  tags: string[]
  metaTitle?: string
  metaDescription?: string
}

export const blogService = {
  // Get all blogs (public - no auth required)
  getAllBlogs: async (): Promise<BlogResponse> => {
    try {
      return await api.public.blog.getAll()
    } catch (error) {
      console.error('Error fetching blogs:', error)
      throw error
    }
  },

  // Get single blog (public - no auth required)
  getBlogById: async (id: string): Promise<Blog> => {
    try {
      return await api.public.blog.getOne(id)
    } catch (error) {
      console.error(`Error fetching blog ${id}:`, error)
      throw error
    }
  },

  // Create blog (admin only)
  createBlog: async (data: CreateBlogRequest): Promise<Blog> => {
    try {
      return await api.admin.blog.create(data)
    } catch (error) {
      console.error('Error creating blog:', error)
      throw error
    }
  },

  // Update blog (admin only)
  updateBlog: async (id: string, data: Partial<CreateBlogRequest>): Promise<Blog> => {
    try {
      return await api.admin.blog.update(id, data)
    } catch (error) {
      console.error(`Error updating blog ${id}:`, error)
      throw error
    }
  },

  // Delete blog (admin only)
  deleteBlog: async (id: string): Promise<void> => {
    try {
      return await api.admin.blog.delete(id)
    } catch (error) {
      console.error(`Error deleting blog ${id}:`, error)
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

  // Get blog status based on date (for display purposes)
  getBlogStatus: (dateString: string): 'published' | 'scheduled' | 'draft' => {
    try {
      const blogDate = new Date(dateString)
      const now = new Date()
      
      if (blogDate > now) return 'scheduled'
      return 'published'
    } catch {
      return 'published'
    }
  }
}

