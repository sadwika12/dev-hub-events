import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { auth, signOut } from '@/auth'
import MobileMenu from './MobileMenu'

const Navbar = async () => {
  const session = await auth()
  const user = session?.user

  return (
    <nav className="flex items-center justify-between py-3 px-6 mx-4 md:mx-10 mt-4 md:mt-6 max-w-full rounded-full border border-white/20 bg-white/5 backdrop-blur-md">
      
      {/* Logo Section */}
      <div className="flex items-center gap-2 z-50">
        <Image src="/favicon.ico" alt="logo" width={24} height={24} />
        <span className="font-bold text-lg text-white tracking-tight">
          DevEvent
        </span>
      </div>

      {/* Desktop Navigation - Hidden on Mobile */}
      <div className="hidden md:flex items-center gap-6">
        <ul className="flex items-center gap-6 list-none">
          <li><Link href="/" className="nav-link">Home</Link></li>
          <li><Link href="/events" className="nav-link">Events</Link></li>
          <li><Link href="/events/create" className="nav-link">Create</Link></li>
          <li><Link href="/events/my-events" className="nav-link">My Events</Link></li>
        </ul>

        {user && <div className="w-px h-4 bg-white/20" />}

        {user && (
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2">
                {user.image ? (
                  <Image src={user.image} alt="User" width={32} height={32} className="rounded-full border border-white/20" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                    <span className="text-white text-xs">{user.name?.charAt(0).toUpperCase()}</span>
                  </div>
                )}
             </div>
             <form action={async () => { 'use server'; await signOut({ redirectTo: '/auth/signin' }) }}>
                <button type="submit" className="logout-btn">Logout</button>
             </form>
          </div>
        )}
      </div>

      {/* Mobile Menu Button - Visible only on Mobile */}
      <div className="md:hidden">
        <MobileMenu user={user} />
      </div>

      <style jsx>{`
        .nav-link { @apply text-sm font-medium text-white/70 hover:text-white transition-colors; }
        .logout-btn { @apply text-sm font-medium text-white/40 hover:text-white transition-colors border border-white/10 hover:border-white/30 rounded-full px-3 py-1; }
      `}</style>
    </nav>
  )
}

export default Navbar