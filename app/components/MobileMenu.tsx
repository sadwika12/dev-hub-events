"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, PlusCircle, Calendar, User, LogOut } from 'lucide-react'

export default function MobileMenu({ user }: { user: any }) {
  const [open, setOpen] = useState(false)

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
  }, [open])

  return (
    <>
      <button 
        onClick={() => setOpen(!open)} 
        className="text-white z-[60] relative p-2 active:scale-95 transition-transform"
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Full Screen Overlay */}
      <div className={`fixed inset-0 z-50 transition-all duration-500 ease-in-out ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Blurred Background */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-2xl" onClick={() => setOpen(false)} />
        
        {/* Menu Content */}
        <div className={`relative h-full flex flex-col justify-center items-center gap-8 transition-transform duration-500 ${
          open ? 'translate-y-0' : 'translate-y-10'
        }`}>
          
          <nav className="flex flex-col items-center gap-6">
            <NavLink href="/" icon={<Calendar size={20}/>} label="Home" onClick={() => setOpen(false)} />
            <NavLink href="/events" icon={<Calendar size={20}/>} label="All Events" onClick={() => setOpen(false)} />
            <NavLink href="/events/create" icon={<PlusCircle size={20}/>} label="Create Event" onClick={() => setOpen(false)} />
            <NavLink href="/events/my-events" icon={<User size={20}/>} label="My Activity" onClick={() => setOpen(false)} />
          </nav>

          <div className="w-12 h-px bg-white/20" />

          {user ? (
            <div className="flex flex-col items-center gap-4">
               <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                  <span className="text-white font-medium">{user.name}</span>
               </div>
               {/* Note: Logout here would usually require a small client-side wrapper or a simple link */}
               <Link href="/auth/signin" className="text-red-400 flex items-center gap-2 text-sm">
                 <LogOut size={16} /> Logout
               </Link>
            </div>
          ) : (
            <Link 
              href="/auth/signin" 
              className="bg-white text-black font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform"
              onClick={() => setOpen(false)}
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </>
  )
}

function NavLink({ href, icon, label, onClick }: { href: string, icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <Link 
      href={href} 
      onClick={onClick} 
      className="group flex items-center gap-4 text-3xl font-bold text-white/60 hover:text-white transition-all"
    >
      <span className="text-white/20 group-hover:text-white transition-colors">{icon}</span>
      {label}
    </Link>
  )
}