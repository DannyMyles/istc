import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Admin Panel | ISTC',
  description: 'International Safety Training Centre Admin Panel',
}

interface AuthenticatedUser {
  id?: string
  email?: string | null
  name?: string | null
  role?: string
  accessToken?: string
  image?: string | null
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/login?callbackUrl=/admin')
  }

  // Check if user has admin role
  const user = session.user as AuthenticatedUser
  if (user.role !== 'admin') {
    redirect('/unauthorized')
  }

  // Prepare user data for header
  const userData = {
    name: user.name,
    email: user.email,
    image: user.image,
    role: user.role,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <AdminSidebar />
      
      {/* Main Content Area */}
      <div className="lg:ml-64 transition-all duration-300">
        <AdminHeader user={userData} />
        
        <main className="p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Welcome back, {user.name || 'Admin'}
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your training center efficiently from the admin panel
              </p>
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl shadow-adventure border border-gray-200 overflow-hidden">
              {children}
            </div>

            {/* Stats Footer */}
            {/* <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-adventure border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Today&apos;s Visitors</p>
                    <p className="text-xl font-bold text-gray-900 mt-1">1,247</p>
                  </div>
                  <div className="h-10 w-10 bg-green-50 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 font-medium">↑12%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-adventure border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Trainings</p>
                    <p className="text-xl font-bold text-gray-900 mt-1">8</p>
                  </div>
                  <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-medium">↑5%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-adventure border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pending Reviews</p>
                    <p className="text-xl font-bold text-gray-900 mt-1">3</p>
                  </div>
                  <div className="h-10 w-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                    <span className="text-yellow-600 font-medium">↓2%</span>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </main>
        
        {/* Footer */}
        <footer className="border-t border-gray-200 px-6 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                <p>© {new Date().getFullYear()} International Safety Training Centre. All rights reserved.</p>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <a href="#" className="hover:text-[#008DB8] transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-[#008DB8] transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-[#008DB8] transition-colors">Support</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}