'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Plus, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  User,
  Shield,
  CheckCircle,
  XCircle,
  Edit, 
  Trash2, 
  Eye,
  MoreVertical,
  Calendar,
  Building,
  ChevronDown,
  ChevronUp,
  Download
} from 'lucide-react'

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: 'admin' | 'user' | 'instructor' | 'student';
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  createdAt: string;
  lastLogin?: string;
  company?: string;
  position?: string;
  trainingCount: number;
  isVerified: boolean;
  profileImage?: string;
}

export default function UsersManagementPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [roleFilter, setRoleFilter] = useState('all')
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+254 712 345 678',
      role: 'admin',
      status: 'active',
      createdAt: '2024-01-15',
      lastLogin: '2024-02-15T10:30:00',
      company: 'ABC Corporation',
      position: 'Safety Manager',
      trainingCount: 5,
      isVerified: true,
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      role: 'instructor',
      status: 'active',
      createdAt: '2024-01-20',
      lastLogin: '2024-02-14T14:20:00',
      company: 'ISTC',
      position: 'Lead Instructor',
      trainingCount: 12,
      isVerified: true,
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane'
    },
    {
      id: '3',
      firstName: 'Mike',
      lastName: 'Johnson',
      email: 'mike.j@construction.co.ke',
      phone: '+254 723 456 789',
      role: 'user',
      status: 'active',
      createdAt: '2024-02-01',
      lastLogin: '2024-02-14T09:15:00',
      company: 'BuildRight Ltd',
      position: 'Site Supervisor',
      trainingCount: 3,
      isVerified: true,
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike'
    },
    {
      id: '4',
      firstName: 'Sarah',
      lastName: 'Williams',
      email: 'sarah.w@example.com',
      role: 'student',
      status: 'pending',
      createdAt: '2024-02-10',
      company: 'Tech Solutions',
      position: 'Intern',
      trainingCount: 1,
      isVerified: false,
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    },
    {
      id: '5',
      firstName: 'David',
      lastName: 'Brown',
      email: 'david.b@example.com',
      phone: '+254 734 567 890',
      role: 'user',
      status: 'inactive',
      createdAt: '2023-12-15',
      lastLogin: '2024-01-20T16:45:00',
      company: 'Safety First Inc',
      position: 'Safety Officer',
      trainingCount: 2,
      isVerified: true,
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David'
    },
    {
      id: '6',
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily.d@example.com',
      role: 'student',
      status: 'suspended',
      createdAt: '2024-01-25',
      lastLogin: '2024-02-05T11:20:00',
      company: 'University of Nairobi',
      position: 'Student',
      trainingCount: 0,
      isVerified: false,
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily'
    },
    {
      id: '7',
      firstName: 'Robert',
      lastName: 'Wilson',
      email: 'robert.w@example.com',
      phone: '+254 745 678 901',
      role: 'instructor',
      status: 'active',
      createdAt: '2024-01-05',
      lastLogin: '2024-02-15T08:45:00',
      company: 'ISTC',
      position: 'Fire Safety Instructor',
      trainingCount: 8,
      isVerified: true,
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert'
    },
    {
      id: '8',
      firstName: 'Lisa',
      lastName: 'Taylor',
      email: 'lisa.t@example.com',
      role: 'admin',
      status: 'active',
      createdAt: '2024-01-30',
      lastLogin: '2024-02-15T15:30:00',
      company: 'ISTC',
      position: 'Operations Manager',
      trainingCount: 6,
      isVerified: true,
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa'
    }
  ])

  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'role' | 'status'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const filteredUsers = users.filter(user => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase()
    const matchesSearch = fullName.includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.position?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = filter === 'all' || user.status === filter
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    
    return matchesSearch && matchesStatus && matchesRole
  }).sort((a, b) => {
    let comparison = 0
    
    switch (sortBy) {
      case 'name':
        const nameA = `${a.firstName} ${a.lastName}`.toLowerCase()
        const nameB = `${b.firstName} ${b.lastName}`.toLowerCase()
        comparison = nameA.localeCompare(nameB)
        break
      case 'date':
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        break
      case 'role':
        comparison = a.role.localeCompare(b.role)
        break
      case 'status':
        comparison = a.status.localeCompare(b.status)
        break
    }
    
    return sortOrder === 'asc' ? comparison : -comparison
  })

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(filteredUsers.map(user => user.id))
    } else {
      setSelectedUsers([])
    }
  }

  const handleSelectUser = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, id])
    } else {
      setSelectedUsers(selectedUsers.filter(userId => userId !== id))
    }
  }

  const handleDeleteUser = (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id))
      setSelectedUsers(selectedUsers.filter(userId => userId !== id))
    }
  }

  const handleDeleteSelected = () => {
    if (selectedUsers.length === 0) return
    if (confirm(`Are you sure you want to delete ${selectedUsers.length} selected users?`)) {
      setUsers(users.filter(u => !selectedUsers.includes(u.id)))
      setSelectedUsers([])
    }
  }

  const handleUpdateStatus = (id: string, status: User['status']) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status } : user
    ))
  }

  const handleUpdateRole = (id: string, role: User['role']) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, role } : user
    ))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-50 text-green-700'
      case 'pending': return 'bg-yellow-50 text-yellow-700'
      case 'inactive': return 'bg-gray-50 text-gray-700'
      case 'suspended': return 'bg-red-50 text-red-700'
      default: return 'bg-gray-50 text-gray-700'
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-50 text-purple-700'
      case 'instructor': return 'bg-blue-50 text-blue-700'
      case 'user': return 'bg-accent-50 text-accent-700'
      case 'student': return 'bg-indigo-50 text-indigo-700'
      default: return 'bg-gray-50 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />
      case 'pending': return <Calendar className="h-4 w-4" />
      case 'inactive': return <XCircle className="h-4 w-4" />
      case 'suspended': return <XCircle className="h-4 w-4" />
      default: return null
    }
  }

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    pending: users.filter(u => u.status === 'pending').length,
    instructors: users.filter(u => u.role === 'instructor').length,
    admins: users.filter(u => u.role === 'admin').length,
    students: users.filter(u => u.role === 'student').length
  }

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="mt-1 text-gray-600">Manage and organize system users</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </button>
          <Link
            href="/admin/users/create"
            className="btn-adventure flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Add User
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="adventure-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <User className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="adventure-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.active}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="adventure-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Instructors</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.instructors}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="adventure-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Admins</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.admins}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <Shield className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
        
        <div className="adventure-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Students</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.students}</p>
            </div>
            <div className="p-3 bg-indigo-50 rounded-lg">
              <User className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
        </div>
        
        <div className="adventure-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.pending}</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="adventure-card bg-accent-50 border-accent-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-accent-100 rounded-lg flex items-center justify-center">
                <span className="text-accent-700 font-medium">{selectedUsers.length}</span>
              </div>
              <p className="text-accent-700 font-medium">
                {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleUpdateStatus(selectedUsers[0], 'active')}
                className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors"
              >
                Activate
              </button>
              <button
                onClick={() => handleUpdateStatus(selectedUsers[0], 'suspended')}
                className="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
              >
                Suspend
              </button>
              <button
                onClick={handleDeleteSelected}
                className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
              >
                Delete Selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users by name, email, or company..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
          
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="instructor">Instructor</option>
            <option value="user">User</option>
            <option value="student">Student</option>
          </select>
          
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [sort, order] = e.target.value.split('-')
              setSortBy(sort as any)
              setSortOrder(order as any)
            }}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
          >
            <option value="name-asc">Sort by Name (A-Z)</option>
            <option value="name-desc">Sort by Name (Z-A)</option>
            <option value="date-desc">Sort by Newest</option>
            <option value="date-asc">Sort by Oldest</option>
            <option value="role-asc">Sort by Role</option>
            <option value="status-asc">Sort by Status</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-adventure border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="h-4 w-4 text-accent-500 focus:ring-accent-500"
                    />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Role</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Joined</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={(e) => handleSelectUser(user.id, e.target.checked)}
                      className="h-4 w-4 text-accent-500 focus:ring-accent-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.profileImage}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="h-10 w-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                          {user.isVerified && (
                            <span className="ml-2 inline-flex items-center text-xs text-blue-600">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </span>
                          )}
                        </p>
                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                          {user.company && (
                            <span className="flex items-center gap-1">
                              <Building className="h-3 w-3" />
                              {user.company}
                            </span>
                          )}
                          {user.position && (
                            <span className="hidden md:inline">• {user.position}</span>
                          )}
                        </div>
                        <div className="mt-1">
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                            {user.trainingCount} training{user.trainingCount !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <a 
                          href={`mailto:${user.email}`}
                          className="text-sm text-gray-600 hover:text-accent-600 transition-colors"
                        >
                          {user.email}
                        </a>
                      </div>
                      {user.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <a 
                            href={`tel:${user.phone}`}
                            className="text-sm text-gray-600 hover:text-accent-600 transition-colors"
                          >
                            {user.phone}
                          </a>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        <select
                          value={user.role}
                          onChange={(e) => handleUpdateRole(user.id, e.target.value as User['role'])}
                          className="text-xs border-none bg-transparent focus:ring-0 p-0"
                        >
                          <option value="admin">Admin</option>
                          <option value="instructor">Instructor</option>
                          <option value="user">User</option>
                          <option value="student">Student</option>
                        </select>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {getStatusIcon(user.status)}
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        <select
                          value={user.status}
                          onChange={(e) => handleUpdateStatus(user.id, e.target.value as User['status'])}
                          className="text-xs border-none bg-transparent focus:ring-0 p-0"
                        >
                          <option value="active">Active</option>
                          <option value="pending">Pending</option>
                          <option value="inactive">Inactive</option>
                          <option value="suspended">Suspended</option>
                        </select>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="text-sm text-gray-900">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                      {user.lastLogin && (
                        <div className="text-xs text-gray-500">
                          Last: {new Date(user.lastLogin).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/users/${user.id}`}
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600"
                        title="View Profile"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      
                      <Link
                        href={`/admin/users/edit/${user.id}`}
                        className="p-2 hover:bg-accent-50 rounded-lg transition-colors text-accent-600"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <User className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Pagination */}
        {filteredUsers.length > 0 && (
          <div className="border-t border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredUsers.length}</span> of{' '}
                <span className="font-medium">{filteredUsers.length}</span> users
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  Previous
                </button>
                <button className="px-3 py-1.5 border border-gray-300 rounded-lg bg-accent-50 text-accent-700 border-accent-200">
                  1
                </button>
                <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  2
                </button>
                <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}