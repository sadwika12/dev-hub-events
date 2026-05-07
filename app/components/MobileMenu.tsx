"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function MobileMenu({ user }: { user: any }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(!open)} className="text-white z-50 relative">
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8">
          <Link href="/" onClick={() => setOpen(false)} className="text-2xl text-white">Home</Link>
          <Link href="/events" onClick={() => setOpen(false)} className="text-2xl text-white">Events</Link>
          <Link href="/events/create" onClick={() => setOpen(false)} className="text-2xl text-white">Create Event</Link>
          <Link href="/events/my-events" onClick={() => setOpen(false)} className="text-2xl text-white">My Events</Link>
          
          {user ? (
            <p className="text-white/50">Logged in as {user.name}</p>
          ) : (
            <Link href="/auth/signin" className="bg-white text-black px-6 py-2 rounded-full">Sign In</Link>
          )}
        </div>
      )}
    </>
  )
}