import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "admin@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required")
          }

          // Use process.env.BACKEND_URL instead of NEXT_PUBLIC_BACKEND_URL
          const backendBaseUrl = process.env.BACKEND_URL || 'http://localhost:8080'
          const backendUrl = `${backendBaseUrl}/api/v1/auth/login`
          
          console.log('Attempting login to:', backendUrl) // For debugging

          const response = await fetch(backendUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          })

          if (!response.ok) {
            let errorData: any
            try {
              errorData = await response.json()
            } catch {
              console.error('Failed to parse error response')
              throw new Error(`Login failed with status: ${response.status}`)
            }
            throw new Error(
              errorData.message ||
              errorData.error ||
              "Authentication failed"
            )
          }

          const data = await response.json()
          console.log('Login response:', data) // For debugging
          
          const userData = data.user || data

          if (!userData.id && !userData._id) {
            throw new Error("Invalid user data received from server")
          }

          return {
            id: userData.id || userData._id,
            email: userData.email || credentials.email,
            name:
              userData.name ||
              userData.username ||
              userData.fullName ||
              "User",
            role: userData.role || userData.userType || "user",
            accessToken:
              data.accessToken ||
              data.token ||
              userData.accessToken ||
              userData.token,
          }
        } catch (error: any) {
          console.error("Authorization error:", error.message)
          throw new Error(error.message || "Authentication failed")
        }
      },
    }),
  ],
  
  // ... rest of your configuration remains the same
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.role = user.role
        token.accessToken = user.accessToken
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.email = token.email
        session.user.name = token.name
        session.user.role = token.role
        session.user.accessToken = token.accessToken
      }
      return session
    },
  },

  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }