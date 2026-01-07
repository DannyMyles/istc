'use client'

import { getSession, signOut } from "next-auth/react"

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://istc-admin.onrender.com'

interface ApiOptions extends RequestInit {
  requiresAuth?: boolean
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  category?: 'general' | 'support' | 'feedback' | 'complaint' | 'partnership' | 'other';
  company?: string;
}

interface ContactResponse {
  message: string;
  contactId: string;
}

interface ApiError {
  error: string;
  message?: string;
}

class ApiClient {
  private async request<T = any>(
    endpoint: string, 
    options: ApiOptions = {}
  ): Promise<T> {
    const { requiresAuth = true, ...fetchOptions } = options
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(fetchOptions.headers as Record<string, string> || {}),
    }

    // Add authorization header if required
    if (requiresAuth) {
      const session = await getSession()
      
      if (!session?.user?.accessToken) {
        // Try to get the token from session
        const accessToken = (session?.user as any)?.accessToken
        
        if (!accessToken) {
          // Redirect to login if not authenticated
          signOut({ callbackUrl: '/login' })
          throw new Error('No authentication token found')
        }
        
        headers['Authorization'] = `Bearer ${accessToken}`
      } else {
        headers['Authorization'] = `Bearer ${session.user.accessToken}`
      }
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...fetchOptions,
      headers,
      credentials: 'include',
    })

    let data: T | ApiError;
    try {
      data = await response.json();
    } catch (error) {
      throw new Error('Invalid JSON response from server');
    }

    if (!response.ok) {
      const errorData = data as ApiError;
      
      // Handle specific HTTP errors
      if (response.status === 401) {
        // Token expired or invalid
        signOut({ callbackUrl: '/login' })
        throw new Error('Session expired. Please sign in again.')
      }
      
      if (response.status === 403) {
        throw new Error('You do not have permission to perform this action.')
      }
      
      if (response.status === 429) {
        throw new Error('Too many requests. Please try again later.')
      }
      
      throw new Error(errorData.error || errorData.message || `Request failed with status ${response.status}`)
    }

    return data as T;
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
      
      register: (data: {
        name: string;
        username: string;
        email: string;
        password: string;
        roleName?: string;
      }) =>
        this.request('/api/v1/auth/register', {
          method: 'POST',
          body: JSON.stringify(data),
          requiresAuth: false,
        }),

      forgotPassword: (email: string) =>
        this.request('/api/v1/auth/forgot-password', {
          method: 'POST',
          body: JSON.stringify({ email }),
          requiresAuth: false,
        }),

      resetPassword: (data: {
        token: string;
        newPassword: string;
        confirmPassword: string;
      }) =>
        this.request('/api/v1/auth/reset-password', {
          method: 'POST',
          body: JSON.stringify(data),
          requiresAuth: false,
        }),

      verifyResetToken: (token: string) =>
        this.request(`/api/v1/auth/verify-reset-token/${token}`, {
          requiresAuth: false,
        }),
    },
    
    contact: {
      submit: (data: ContactFormData): Promise<ContactResponse> =>
        this.request('/api/v1/auth/contact', {
          method: 'POST',
          body: JSON.stringify(data),
          requiresAuth: false,
        }),
    },
    
    blog: {
      getAll: (params?: {
        page?: number;
        limit?: number;
        category?: string;
        featured?: boolean;
        search?: string;
        sort?: string;
      }) => {
        const queryParams = new URLSearchParams();
        if (params) {
          Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              queryParams.append(key, String(value));
            }
          });
        }
        const queryString = queryParams.toString();
        const url = `/api/v1/blogs${queryString ? `?${queryString}` : ''}`;
        return this.request(url, { requiresAuth: false });
      },
      
      getBySlug: (slug: string) => 
        this.request(`/api/v1/blogs/slug/${slug}`, { requiresAuth: false }),
      
      getById: (id: string) => 
        this.request(`/api/v1/blogs/${id}`, { requiresAuth: false }),
      
      getFeatured: () => 
        this.request('/api/v1/blogs/featured', { requiresAuth: false }),
      
      getCategories: () => 
        this.request('/api/v1/blogs/categories', { requiresAuth: false }),
      
      getStats: () => 
        this.request('/api/v1/blogs/stats', { requiresAuth: false }),
      
      like: (id: string) => 
        this.request(`/api/v1/blogs/${id}/like`, {
          method: 'POST',
          requiresAuth: false,
        }),
      
      getImage: (id: string) => 
        this.request(`/api/v1/blogs/${id}/image`, { requiresAuth: false }),
      
      getImageInfo: (id: string) => 
        this.request(`/api/v1/blogs/${id}/image-info`, { requiresAuth: false }),
    },
    
    trainings: {
      getAll: () => 
        this.request('/api/v1/trainings', { requiresAuth: false }),
      
      getOne: (id: string) => 
        this.request(`/api/v1/trainings/${id}`, { requiresAuth: false }),
    },

    testimonials: {
      getAll: () => 
        this.request('/api/v1/testimonials', { requiresAuth: false }),
      
      getOne: (id: string) => 
        this.request(`/api/v1/testimonials/${id}`, { requiresAuth: false }),
    },
  }

  // Protected endpoints (requires auth)
  protected = {
    auth: {
      logout: () => 
        this.request('/api/v1/auth/logout', {
          method: 'POST',
        }),

      getCurrentUser: () => 
        this.request('/api/v1/auth/me'),

      updateProfile: (data: {
        name?: string;
        username?: string;
        email?: string;
      }) =>
        this.request('/api/v1/auth/profile', {
          method: 'PUT',
          body: JSON.stringify(data),
        }),

      changePassword: (data: {
        currentPassword: string;
        newPassword: string;
        confirmPassword: string;
      }) =>
        this.request('/api/v1/auth/change-password', {
          method: 'POST',
          body: JSON.stringify(data),
        }),
    },

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
        this.request('/api/v1/users'),
      
      updateRole: (userId: string, role: string) =>
        this.request(`/api/v1/users/${userId}/role`, {
          method: 'PUT',
          body: JSON.stringify({ role }),
        }),
    },
    
      blog: {
      create: (data: FormData) => 
        this.request('/api/v1/blogs', {
          method: 'POST',
          body: data,
          headers: {},
        }),
      
      update: (id: string, data: FormData) =>
        this.request(`/api/v1/blogs/${id}`, {
          method: 'PUT',
          body: data,
          headers: {},
        }),
      
      delete: (id: string) =>
        this.request(`/api/v1/blogs/${id}`, {
          method: 'DELETE',
        }),
    },
    
    training: {
      create: (data: any) =>
        this.request('/api/v1/trainings', {
          method: 'POST',
          body: JSON.stringify(data),
        }),
      
      update: (id: string, data: any) =>
        this.request(`/api/v1/trainings/${id}`, {
          method: 'PUT',
          body: JSON.stringify(data),
        }),
      
      delete: (id: string) =>
        this.request(`/api/v1/trainings/${id}`, {
          method: 'DELETE',
        }),
    },
    
    testimonial: {
      create: (data: any) =>
        this.request('/api/v1/testimonials', {
          method: 'POST',
          body: JSON.stringify(data),
        }),
      
      update: (id: string, data: any) =>
        this.request(`/api/v1/testimonials/${id}`, {
          method: 'PUT',
          body: JSON.stringify(data),
        }),
      
      delete: (id: string) =>
        this.request(`/api/v1/testimonials/${id}`, {
          method: 'DELETE',
        }),
      
      updateStatus: (id: string, data: { isActive: boolean }) =>
        this.request(`/api/v1/testimonials/${id}/status`, {
          method: 'PATCH',
          body: JSON.stringify(data),
        }),
    },

    contacts: {
      getAll: () =>
        this.request('/api/v1/contacts'),
      
      getOne: (id: string) =>
        this.request(`/api/v1/contacts/${id}`),
      
      updateStatus: (id: string, data: {
        status: 'pending' | 'read' | 'replied' | 'resolved' | 'spam';
        response?: {
          message: string;
        };
      }) =>
        this.request(`/api/v1/contacts/${id}/status`, {
          method: 'PATCH',
          body: JSON.stringify(data),
        }),
      
      delete: (id: string) =>
        this.request(`/api/v1/contacts/${id}`, {
          method: 'DELETE',
        }),
    },
  }
}

export const api = new ApiClient();