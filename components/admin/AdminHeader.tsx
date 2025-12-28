'use client'

import { signOut } from 'next-auth/react'
import { Bell, User, LogOut, Search } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

interface AdminHeaderProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 border-accent-100 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Search */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search in admin panel..."
                className="w-full pl-10 pr-4 py-2.5 bg-accent-50/50 border border-accent-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-accent-50 rounded-lg transition-colors">
              <Bell className="h-5 w-5 text-accent-500" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent-500 rounded-full animate-pulse"></span>
            </button>

            <div className="relative group">
              <button className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent-50 transition-colors">
                <div className="w-10 h-10 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {user?.name?.[0]?.toUpperCase() || 'A'}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="font-semibold text-sm text-gray-900">{user?.name || 'Admin'}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </button>

              {/* Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-adventure-lg border border-accent-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 origin-top-right z-50">
                <div className="p-2">
                  <div className="px-4 py-3 border-b border-accent-100">
                    <p className="font-semibold text-gray-900">Signed in as</p>
                    <p className="text-sm text-gray-600 truncate">{user?.email}</p>
                  </div>
                  <div className="py-2">
                    <Link
                      href="/admin/profile"
                      className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent-50 transition-colors"
                    >
                      <User className="h-4 w-4 text-accent-500" />
                      <span>Your Profile</span>
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent-50 transition-colors w-full text-left"
                    >
                      <LogOut className="h-4 w-4 text-accent-500" />
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}