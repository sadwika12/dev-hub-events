
import type { NextAuthConfig } from 'next-auth'

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const { pathname } = nextUrl

      const publicRoutes = ['/auth/signin', '/auth/signup']
      const isPublicRoute = publicRoutes.some(route =>
        pathname.startsWith(route)
      )

      
      if (isLoggedIn && isPublicRoute) {
        return Response.redirect(new URL('/', nextUrl))
      }

      
      if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL('/auth/signin', nextUrl))
      }

      return true
    }
  },
  providers: []  
}