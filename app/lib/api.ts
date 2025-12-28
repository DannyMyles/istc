'use client'

import { getSession } from "next-auth/react"

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080'

interface ApiOptions extends RequestInit {
  requiresAuth?: boolean
}

class ApiClient {
  private async request<T = any>(
    endpoint: string, 
    options: ApiOptions = {}
  ): Promise<T> {
    const { requiresAuth = true, ...fetchOptions } = options
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(fetchOptions.headers as Record<string, string> || {}),
    }

    // Add authorization header if required
    if (requiresAuth) {
      const session = await getSession()
      const accessToken = (session?.user as any)?.accessToken
      
      if (!accessToken) {
        throw new Error('No authentication token found')
      }
      
      headers['Authorization'] = `Bearer ${accessToken}`
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...fetchOptions,
      headers,
    })

    if (!response.ok) {
      // Handle specific HTTP errors
      if (response.status === 401) {
        // Token expired or invalid
        throw new Error('Session expired. Please sign in again.')
      }
      
      if (response.status === 403) {
        throw new Error('You do not have permission to perform this action.')
      }
      
      let errorMessage = `Request failed with status ${response.status}`
      try {
        const errorData = await response.json()
        errorMessage = errorData.message || errorData.error || errorMessage
      } catch {
        // Not JSON response
      }
      
      throw new Error(errorMessage)
    }

    // Handle empty responses
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      return response.json()
    }
    
    return {} as T
  }

  // Public endpoints (no auth required)
  public = {
    auth: {
      login: (email: string, password: string) => 
        this.request('/api/v1/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          requiresAuth: false,
        }),
      
      register: (data: any) =>
        this.request('/api/v1/auth/register', {
          method: 'POST',
          body: JSON.stringify(data),
          requiresAuth: false,
        }),
    },
    
    blog: {
      getAll: () => 
        this.request('/api/v1/blogs', { requiresAuth: false }),
      
      getOne: (id: string) => 
        this.request(`/api/v1/blogs/${id}`, { requiresAuth: false }),
    },
    
    trainings: {
      getAll: () => 
        this.request('/api/v1/trainings', { requiresAuth: false }),
      
      getOne: (id: string) => 
        this.request(`/api/v1/trainings/${id}`, { requiresAuth: false }),
    },
  }

  // Protected endpoints (requires auth)
  protected = {
    user: {
      getProfile: () => 
        this.request('/api/v1/users/profile'),
      
      updateProfile: (data: any) =>
        this.request('/api/v1/users/profile', {
          method: 'PUT',
          body: JSON.stringify(data),
        }),
    },
  }

  // Admin endpoints (requires admin role)
  admin = {
    users: {
      getAll: () => 
        this.request('/api/v1/admin/users'),
      
      updateRole: (userId: string, role: string) =>
        this.request(`/api/v1/admin/users/${userId}/role`, {
          method: 'PUT',
          body: JSON.stringify({ role }),
        }),
    },
    
    blog: {
      create: (data: any) =>
        this.request('/api/v1/admin/blogs', {
          method: 'POST',
          body: JSON.stringify(data),
        }),
      
      update: (id: string, data: any) =>
        this.request(`/api/v1/admin/blogs/${id}`, {
          method: 'PUT',
          body: JSON.stringify(data),
        }),
      
      delete: (id: string) =>
        this.request(`/api/v1/admin/blogs/${id}`, {
          method: 'DELETE',
        }),
    },
  }
}

export const api = new ApiClient()