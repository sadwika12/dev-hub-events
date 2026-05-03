import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { auth, signOut } from '@/auth'

const Navbar = async () => {
  const session = await auth()
  const user = session?.user

  return (
    <nav className="flex items-center justify-between py-3 px-6 mx-10 mt-6 max-w-full rounded-full border border-white/20 bg-white/5 backdrop-blur-md">

      
      <div className="flex items-center gap-2">
        <Image src="/favicon.ico" alt="logo" width={24} height={24} />
        <span className="font-bold text-lg text-white tracking-tight">
          DevEvent
        </span>
      </div>

      
      <div className="flex items-center gap-6">

        
        <ul className="flex items-center gap-6 list-none">
          <li>
            <Link href="/" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="/events" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              Events
            </Link>
          </li>
          <li>
            <Link href="/events/create" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              Create Event
            </Link>
          </li>
        </ul>

        
        {user && <div className="w-px h-4 bg-white/20" />}

       
        {user && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || 'User'}
                  width={32}
                  height={32}
                  className="rounded-full border border-white/20"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <span className="text-sm text-white/70 hidden md:block">
                {user.name}
              </span>
            </div>

            <form
              action={async () => {
                'use server'
                await signOut({ redirectTo: '/auth/signin' })
              }}
            >
              <button
                type="submit"
                className="text-sm font-medium text-white/40 hover:text-white transition-colors border border-white/10 hover:border-white/30 rounded-full px-3 py-1"
              >
                Logout
              </button>
            </form>
          </div>
        )}
      </div>

    </nav>
  )
}

export default Navbar