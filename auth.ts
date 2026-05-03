
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import connectDB from '@/lib/mongoose'
import User from '@/Database/user_model'
import { authConfig } from './auth.config'

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,  
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required')
        }
        try {
          await connectDB()
          const user = await User.findOne({
            email: (credentials.email as string).toLowerCase()
          })
          if (!user) {
            throw new Error('No account found with this email')
          }
          const isValid = await bcrypt.compare(
            credentials.password as string,
            user.password
          )
          if (!isValid) {
            throw new Error('Incorrect password')
          }
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
          }
        } catch (error) {
          throw new Error(
            error instanceof Error ? error.message : 'Login failed'
          )
        }
      }
    })
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.id as string
      return session
    }
  },
  session: { strategy: 'jwt' }
})