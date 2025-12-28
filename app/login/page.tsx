'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Shield, 
  Mail, 
  Lock, 
  AlertCircle,
  Loader2 
} from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/admin'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl,
      })

      if (result?.error) {
        setError('Invalid email or password. Please try again.')
      } else {
        // Success - redirect to admin or callbackUrl
        router.push(callbackUrl)
        router.refresh()
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('An error occurred. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-accent-50/30 py-12 px-4">
      <div className="max-w-md w-full">
        {/* Back to Home Link */}
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-600 hover:text-accent-700 mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to home
        </Link>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-adventure-lg p-8">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-500 rounded-xl mb-4 shadow-adventure">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Admin Portal Login
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              International Safety Training Centre
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg animate-in slide-in-from-top duration-200">
              <div className="flex items-center gap-2 text-red-700">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition"
                  placeholder="admin@istc.co.ke"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition"
                  placeholder="••••••••"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-accent-500 focus:ring-accent-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                className="text-sm font-medium text-accent-600 hover:text-accent-500 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="btn-adventure w-full flex items-center justify-center py-3.5 px-4 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign in to Admin Portal'
                )}
              </button>
            </div>
          </form>

          {/* Security Notice */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 bg-accent-50 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-accent-500" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Security Notice</p>
                <p className="text-sm text-gray-600 mt-1">
                  This portal is restricted to authorized personnel only. 
                  For training inquiries, please visit our{' '}
                  <Link href="/contact" className="text-accent-600 hover:text-accent-700 font-medium">
                    Contact page
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Support Information */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Need help accessing your account?{' '}
            <a 
              href="mailto:support@istc.co.ke" 
              className="font-medium text-accent-600 hover:text-accent-500 transition-colors"
            >
              Contact support
            </a>
          </p>
          <p className="mt-1 text-xs text-gray-500">
            © {new Date().getFullYear()} International Safety Training Centre. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}