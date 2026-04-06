import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { NextAuthOptions } from 'next-auth'

// Re-export auth options to avoid import issues
const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id
        token.accessToken = user.accessToken
      }
      return token
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.accessToken = token.accessToken
      }
      return session
    },
  },
  session: {
    strategy: "jwt" as const,
  },
}

export async function POST() {
  try {
    // Get the current session to invalidate token on backend
    const session = await getServerSession(authOptions)
    
    // Call backend logout endpoint to invalidate the token
    const backendBaseUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'https://admin.istc.co.ke'
    
    try {
      if (session?.user?.accessToken) {
        await fetch(`${backendBaseUrl}/api/v1/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(session.user as any).accessToken}`,
          },
        })
      }
    } catch (backendError) {
      // Backend logout might fail, but we still want to clear the session
      console.error('Backend logout error:', backendError)
    }

    // Return success - NextAuth will handle session clearing
    return NextResponse.json({ 
      success: true, 
      message: 'Logged out successfully' 
    })
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { success: false, message: 'Logout failed' },
      { status: 500 }
    )
  }
}

