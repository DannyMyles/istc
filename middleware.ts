import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    
    // Protect admin routes
    if (req.nextUrl.pathname.startsWith('/admin')) {
      if (!token) {
        return NextResponse.redirect(new URL('/login', req.url))
      }
      
      // Check for admin role
      if ((token as any)?.role !== 'admin') {
        return NextResponse.redirect(new URL('/unauthorized', req.url))
      }
    }
    
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow public routes
        const publicPaths = ['/', '/login', '/register', '/api/auth/.*']
        const isPublic = publicPaths.some(path => 
          new RegExp(path).test(req.nextUrl.pathname)
        )
        
        if (isPublic) return true
        
        // Require auth for protected routes
        return !!token
      },
    },
    pages: {
      signIn: '/login',
      error: '/error',
    },
  }
)

export const config = {
  matcher: [
    // Only protect admin routes
    '/admin/:path*',
  ],
}