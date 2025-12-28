import { getServerSession, Session } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

// Type for authenticated user
export interface AuthenticatedUser {
  id: string
  email: string
  name: string
  role: string
  accessToken: string
}

export async function getCurrentUser(): Promise<AuthenticatedUser | null> {
  const session = await getServerSession(authOptions)
  return session?.user as AuthenticatedUser || null
}

export async function requireAuth(): Promise<AuthenticatedUser> {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Unauthorized - Please sign in')
  }
  return user
}

export async function requireAdmin(): Promise<AuthenticatedUser> {
  const user = await requireAuth()
  if (user.role !== 'admin') {
    throw new Error('Forbidden - Admin access required')
  }
  return user
}