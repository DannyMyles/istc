import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required")
          }

          const backendBaseUrl = process.env.BACKEND_URL || 'https://istc-admin.onrender.com'
          const backendUrl = `${backendBaseUrl}/api/v1/auth/login`
          
          const response = await fetch(backendUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          })

          if (!response.ok) {
            const errorText = await response.text()
            let errorData
            try {
              errorData = JSON.parse(errorText)
            } catch {
              throw new Error(`Login failed: ${response.status}`)
            }
            throw new Error(errorData.message || "Authentication failed")
          }

          const data = await response.json()
          const userData = data.user || data

          return {
            id: userData.id || userData._id,
            email: userData.email || credentials.email,
            name: userData.name || userData.username || "User",
            role: userData.role || "user",
            accessToken: data.accessToken || data.token,
          }
        } catch (error: any) {
          console.error("Authorization error:", error.message)
          throw new Error(error.message || "Authentication failed")
        }
      },
    }),
  ],
  
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
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.role = token.role as string
        session.user.accessToken = token.accessToken as string
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
    maxAge: 24 * 60 * 60,
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }