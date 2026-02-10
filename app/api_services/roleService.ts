import { api } from "../lib/api"

// Role interface matching the backend model
export interface Role {
  id: number
  name: string
  description?: string
  permissions?: string[]
  isActive: boolean
  isDefault: boolean
  createdBy?: number
  updatedBy?: number
  createdAt?: string
  updatedAt?: string
}

// Response interfaces
export interface RolesResponse {
  roles: Role[]
}

export interface RoleResponse {
  role: Role
}

// Create role request
export interface CreateRoleRequest {
  name: string
  description?: string
  permissions?: string[]
}

// Update role request
export interface UpdateRoleRequest {
  name?: string
  description?: string
  permissions?: string[]
  isActive?: boolean
}

export const roleService = {
  // Get all roles (admin only)
  getAllRoles: async (): Promise<RolesResponse | Role[]> => {
    try {
      return await api.admin.roles.getAll()
    } catch (error) {
      console.error('Error fetching roles:', error)
      throw error
    }
  },

  // Get single role by ID
  getRoleById: async (id: string): Promise<RoleResponse> => {
    try {
      // First check if api.admin.roles.getById exists, otherwise implement fallback
      if (typeof (api.admin.roles as any).getById === 'function') {
        return await (api.admin.roles as any).getById(id)
      }
      // Fallback: use getAll and filter
      const response = await api.admin.roles.getAll()
      const role = response.roles.find((r: Role) => r.id.toString() === id)
      if (!role) {
        throw new Error('Role not found')
      }
      return { role }
    } catch (error) {
      console.error(`Error fetching role ${id}:`, error)
      throw error
    }
  },

  // Create new role (admin only)
  createRole: async (data: CreateRoleRequest): Promise<RoleResponse> => {
    try {
      return await api.admin.roles.create(data)
    } catch (error) {
      console.error('Error creating role:', error)
      throw error
    }
  },

  // Update role
  updateRole: async (id: string, data: UpdateRoleRequest): Promise<RoleResponse> => {
    try {
      // Check if update method exists
      if (typeof (api.admin.roles as any).update === 'function') {
        return await (api.admin.roles as any).update(id, data)
      }
      throw new Error('Update method not implemented')
    } catch (error) {
      console.error(`Error updating role ${id}:`, error)
      throw error
    }
  },

  // Delete role (admin only)
  deleteRole: async (id: string): Promise<void> => {
    try {
      return await api.admin.roles.delete(id)
    } catch (error) {
      console.error(`Error deleting role ${id}:`, error)
      throw error
    }
  },

  // Format date for display
  formatDate: (dateString?: string): string => {
    if (!dateString) return 'N/A'
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    } catch {
      return 'Invalid date'
    }
  },

  // Get role display name
  getRoleDisplayName: (role: string): string => {
    const roleNames: Record<string, string> = {
      admin: 'Administrator',
      user: 'User',
      editor: 'Editor',
      viewer: 'Viewer',
      manager: 'Manager',
      supervisor: 'Supervisor'
    }
    return roleNames[role] || role.charAt(0).toUpperCase() + role.slice(1)
  },

  // Get role color for UI
  getRoleColor: (role: string): string => {
    switch (role) {
      case 'admin': return 'bg-purple-50 text-purple-700'
      case 'editor': return 'bg-blue-50 text-blue-700'
      case 'viewer': return 'bg-gray-50 text-gray-700'
      case 'manager': return 'bg-green-50 text-green-700'
      case 'supervisor': return 'bg-orange-50 text-orange-700'
      default: return 'bg-accent-50 text-accent-700'
    }
  },

  // Get role descriptions
  getRoleDescriptions: (): Record<string, string> => {
    return {
      admin: 'Full access to all features and settings',
      user: 'Standard access to the platform',
      editor: 'Can create and edit content',
      viewer: 'Read-only access',
      manager: 'Manage users and moderate content',
      supervisor: 'Oversee operations and team members'
    }
  },

  // Search roles locally
  searchRoles: (roles: Role[], query: string): Role[] => {
    const lowerQuery = query.toLowerCase()
    return roles.filter(role =>
      role.name.toLowerCase().includes(lowerQuery) ||
      (role.description && role.description.toLowerCase().includes(lowerQuery))
    )
  },

  // Filter roles by status
  filterByStatus: (roles: Role[], status: 'active' | 'inactive' | 'all'): Role[] => {
    if (status === 'all') return roles
    return roles.filter(role =>
      status === 'active' ? role.isActive : !role.isActive
    )
  },

  // Sort roles
  sortRoles: (
    roles: Role[],
    sortBy: 'name' | 'date' | 'status',
    sortOrder: 'asc' | 'desc'
  ): Role[] => {
    const sorted = [...roles].sort((a, b) => {
      let comparison = 0
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'date':
          comparison = new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()
          break
        case 'status':
          comparison = (a.isActive === b.isActive) ? 0 : a.isActive ? 1 : -1
          break
      }
      
      return sortOrder === 'asc' ? comparison : -comparison
    })
    
    return sorted
  }
}

