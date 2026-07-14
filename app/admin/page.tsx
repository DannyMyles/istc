import { requireAdmin } from '@/app/lib/auth'
import RecentActivity from '@/components/admin/RecentActivity'
import DashboardStats from '@/components/admin/DashboardStats'
import ContentOverview from '@/components/admin/ContentOverview'
import QuickActions from '@/components/admin/QuickActions'
import ContactSubmissions from '@/components/admin/ContactSubmissions'

export default async function AdminDashboard() {
  await requireAdmin()

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-600">Welcome back to your admin panel</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent-50 text-accent-700">
            <div className="w-2 h-2 rounded-full bg-accent-500 mr-2 animate-pulse"></div>
            Admin Mode
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <DashboardStats />

      {/* Content Overview */}
      <ContentOverview />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>

        {/* Quick Actions */}
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Contact Form Submissions */}
      <ContactSubmissions />
    </div>
  )
}