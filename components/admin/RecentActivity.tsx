'use client'

import { Clock, User, FileText, BookOpen, Calendar, CheckCircle, AlertCircle } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

const recentActivities = [
  {
    id: 1,
    type: 'blog',
    title: 'New blog post published',
    description: 'Fire Safety Regulations Update 2024',
    user: 'John Doe',
    time: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    icon: FileText,
    color: 'text-accent-500',
    bgColor: 'bg-accent-50',
  },
  {
    id: 2,
    type: 'course',
    title: 'Course created',
    description: 'Advanced Occupational Safety Diploma',
    user: 'Jane Smith',
    time: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    icon: BookOpen,
    color: 'text-secondary-500',
    bgColor: 'bg-secondary-50',
  },
  {
    id: 3,
    type: 'training',
    title: 'Training scheduled',
    description: 'Fire Safety Course - Jan 25, 2024',
    user: 'Mike Johnson',
    time: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    icon: Calendar,
    color: 'text-adventure-sky',
    bgColor: 'bg-blue-50',
  },
  {
    id: 4,
    type: 'user',
    title: 'New user registration',
    description: 'Sarah Williams registered for course',
    user: 'System',
    time: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    icon: User,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    id: 5,
    type: 'update',
    title: 'Content updated',
    description: 'First Aid Training course materials',
    user: 'Admin',
    time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    icon: CheckCircle,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
]

export default function RecentActivity() {
  return (
    <div className="adventure-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
          <p className="text-sm text-gray-600 mt-1">Latest actions in your admin panel</p>
        </div>
        <Clock className="h-6 w-6 text-accent-500" />
      </div>

      <div className="space-y-4">
        {recentActivities.map((activity) => {
          const Icon = activity.icon
          return (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className={`${activity.bgColor} p-2 rounded-lg group-hover:scale-110 transition-transform`}>
                <Icon className={`h-5 w-5 ${activity.color}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-600 mt-1 truncate">{activity.description}</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {formatDistanceToNow(activity.time, { addSuffix: true })}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 mt-2">
                  <User className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{activity.user}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <button className="w-full text-center text-accent-600 hover:text-accent-700 font-medium py-2 hover:bg-accent-50 rounded-lg transition-colors">
          View All Activity
        </button>
      </div>
    </div>
  )
}