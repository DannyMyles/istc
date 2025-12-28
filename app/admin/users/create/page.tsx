'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  Save, 
  User,
  Mail, 
  Phone, 
  Building,
  Briefcase,
  Shield,
  CheckCircle,
  XCircle,
  Upload,
  Eye,
  EyeOff,
  AlertCircle
} from 'lucide-react'

export default function CreateUserPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'user' as 'admin' | 'user' | 'instructor' | 'student',
    status: 'active' as 'active' | 'inactive' | 'pending' | 'suspended',
    company: '',
    position: '',
    department: '',
    address: '',
    city: '',
    country: 'Kenya',
    bio: '',
    sendWelcomeEmail: true,
    requirePasswordChange: false,
    profileImage: '',
    permissions: {
      canCreateContent: false,
      canManageUsers: false,
      canViewReports: false,
      canManageTrainings: false
    }
  })

  const rolePermissions = {
    admin: {
      canCreateContent: true,
      canManageUsers: true,
      canViewReports: true,
      canManageTrainings: true
    },
    instructor: {
      canCreateContent: true,
      canManageUsers: false,
      canViewReports: true,
      canManageTrainings: false
    },
    user: {
      canCreateContent: false,
      canManageUsers: false,
      canViewReports: false,
      canManageTrainings: false
    },
    student: {
      canCreateContent: false,
      canManageUsers: false,
      canViewReports: false,
      canManageTrainings: false
    }
  }

  const handleRoleChange = (role: typeof formData.role) => {
    setFormData({
      ...formData,
      role,
      permissions: rolePermissions[role]
    })
  }

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName) {
      throw new Error('First name and last name are required')
    }
    if (!formData.email) {
      throw new Error('Email is required')
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new Error('Please enter a valid email address')
    }
    if (!formData.password) {
      throw new Error('Password is required')
    }
    if (formData.password.length < 8) {
      throw new Error('Password must be at least 8 characters long')
    }
    if (formData.password !== formData.confirmPassword) {
      throw new Error('Passwords do not match')
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      validateForm()

      // Prepare data for API
      const userData = {
        ...formData,
        // Remove confirmPassword from API data
        confirmPassword: undefined
      }

      // TODO: Replace with actual API call
      console.log('Creating user:', userData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Redirect on success
      router.push('/admin/users')
      
    } catch (err: any) {
      setError(err.message || 'Failed to create user')
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
            <h1 className="text-3xl font-bold text-gray-900">Create New User</h1>
            <p className="mt-1 text-gray-600">Add a new user to the system</p>
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
            Create User
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
                <User className="h-5 w-5 text-accent-600" />
              </span>
              Basic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  placeholder="John"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  placeholder="Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="adventure-card">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <span className="p-2 bg-blue-50 rounded-lg">
                <Mail className="h-5 w-5 text-blue-600" />
              </span>
              Contact Information
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="john.doe@example.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+254 712 345 678"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="adventure-card">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <span className="p-2 bg-purple-50 rounded-lg">
                <Briefcase className="h-5 w-5 text-purple-600" />
              </span>
              Professional Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    placeholder="ABC Corporation"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({...formData, position: e.target.value})}
                    placeholder="Safety Manager"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  placeholder="Health & Safety"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({...formData, country: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                >
                  <option value="Kenya">Kenya</option>
                  <option value="Uganda">Uganda</option>
                  <option value="Tanzania">Tanzania</option>
                  <option value="Rwanda">Rwanda</option>
                  <option value="Ethiopia">Ethiopia</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                placeholder="Brief description about the user..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent resize-none"
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Account Security */}
          <div className="adventure-card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Account Security</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters long</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Role & Status */}
          <div className="adventure-card">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-gray-400" />
              Role & Status
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  User Role *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['admin', 'instructor', 'user', 'student'] as const).map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => handleRoleChange(role)}
                      className={`p-3 rounded-lg border transition-colors flex flex-col items-center gap-1 ${
                        formData.role === role
                          ? 'border-accent-500 bg-accent-50 text-accent-700'
                          : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <Shield className={`h-5 w-5 ${
                        formData.role === role ? 'text-accent-600' : 'text-gray-400'
                      }`} />
                      <span className="text-sm font-medium capitalize">{role}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Status
                </label>
                <div className="space-y-2">
                  {(['active', 'pending', 'inactive', 'suspended'] as const).map((status) => (
                    <label key={status} className="flex items-center">
                      <input
                        type="radio"
                        name="status"
                        value={status}
                        checked={formData.status === status}
                        onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                        className="h-4 w-4 text-accent-500 focus:ring-accent-500"
                      />
                      <span className="ml-2 capitalize">{status}</span>
                      <span className="ml-auto">
                        {status === 'active' && <CheckCircle className="h-4 w-4 text-green-500" />}
                        {status === 'suspended' && <XCircle className="h-4 w-4 text-red-500" />}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Permissions */}
          <div className="adventure-card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Permissions</h3>
            
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.permissions.canCreateContent}
                    onChange={(e) => setFormData({
                      ...formData,
                      permissions: {...formData.permissions, canCreateContent: e.target.checked}
                    })}
                    className="h-4 w-4 text-accent-500 focus:ring-accent-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Create Content</span>
                </div>
                <span className="text-xs text-gray-500">Blog, Trainings</span>
              </label>

              <label className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.permissions.canManageUsers}
                    onChange={(e) => setFormData({
                      ...formData,
                      permissions: {...formData.permissions, canManageUsers: e.target.checked}
                    })}
                    className="h-4 w-4 text-accent-500 focus:ring-accent-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Manage Users</span>
                </div>
                <span className="text-xs text-gray-500">Add/Edit users</span>
              </label>

              <label className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.permissions.canViewReports}
                    onChange={(e) => setFormData({
                      ...formData,
                      permissions: {...formData.permissions, canViewReports: e.target.checked}
                    })}
                    className="h-4 w-4 text-accent-500 focus:ring-accent-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">View Reports</span>
                </div>
                <span className="text-xs text-gray-500">Analytics, Statistics</span>
              </label>

              <label className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.permissions.canManageTrainings}
                    onChange={(e) => setFormData({
                      ...formData,
                      permissions: {...formData.permissions, canManageTrainings: e.target.checked}
                    })}
                    className="h-4 w-4 text-accent-500 focus:ring-accent-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Manage Trainings</span>
                </div>
                <span className="text-xs text-gray-500">Create/Edit trainings</span>
              </label>
            </div>
          </div>

          {/* Additional Settings */}
          <div className="adventure-card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Settings</h3>
            
            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.sendWelcomeEmail}
                    onChange={(e) => setFormData({...formData, sendWelcomeEmail: e.target.checked})}
                    className="h-4 w-4 text-accent-500 focus:ring-accent-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Send welcome email</span>
                </div>
              </label>

              <label className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.requirePasswordChange}
                    onChange={(e) => setFormData({...formData, requirePasswordChange: e.target.checked})}
                    className="h-4 w-4 text-accent-500 focus:ring-accent-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Require password change</span>
                </div>
                <span className="text-xs text-gray-500">On first login</span>
              </label>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-accent-500 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Upload profile image</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 2MB</p>
                </div>
              </div>
            </div>
          </div>

          {/* User Preview */}
          <div className="adventure-card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">User Preview</h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {formData.firstName || 'First'} {formData.lastName || 'Last'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formData.email || 'email@example.com'}
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <div className="flex justify-between">
                  <span>Role:</span>
                  <span className="font-medium capitalize">{formData.role}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className={`font-medium capitalize ${
                    formData.status === 'active' ? 'text-green-600' :
                    formData.status === 'pending' ? 'text-yellow-600' :
                    formData.status === 'inactive' ? 'text-gray-600' : 'text-red-600'
                  }`}>
                    {formData.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}