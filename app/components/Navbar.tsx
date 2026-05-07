import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { auth, signOut } from '@/auth'
import { Home, Calendar, PlusCircle, Bookmark, LogOut } from 'lucide-react'

const Navbar = async () => {
  const session = await auth()
  const user = session?.user

  return (
    <nav className="flex items-center justify-between py-2 px-3 sm:px-6 mx-2 sm:mx-6 lg:mx-10 mt-4 sm:mt-6 max-w-full rounded-full border border-white/20 bg-white/5 backdrop-blur-md shadow-2xl">
      
      <Link href="/" className="flex items-center gap-2 shrink-0 px-2">
        <Image src="/favicon.ico" alt="logo" width={20} height={20} className="sm:w-[24px] sm:h-[24px]" />
        <span className="font-bold text-sm sm:text-lg text-white tracking-tight hidden xs:block">
          DevEvent
        </span>
      </Link>

      <div className="flex items-center gap-1 sm:gap-4 md:gap-6">
        <ul className="flex items-center gap-1 sm:gap-4 list-none">
          <NavItem href="/" icon={<Home size={18} />} label="Home" />
          <NavItem href="/events" icon={<Calendar size={18} />} label="Events" />
          <NavItem href="/events/create" icon={<PlusCircle size={18} />} label="Create" />
          <NavItem href="/events/my-events" icon={<Bookmark size={18} />} label="My Events" />
        </ul>

        {user && <div className="hidden xs:block w-px h-4 bg-white/20 mx-1" />}

        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="shrink-0">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt="User"
                    width={28}
                    height={28}
                    className="rounded-full border border-white/20 sm:w-[32px] sm:h-[32px]"
                  />
                ) : (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                    <span className="text-white text-[12px] sm:text-xs font-semibold">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              
              <form
                action={async () => {
                  'use server'
                  await signOut({ redirectTo: '/auth/signin' })
                }}
              >
                <button
                  type="submit"
                  className="flex items-center gap-2 text-[10px] sm:text-sm font-medium text-white/40 hover:text-red-400 transition-colors border border-white/10 hover:border-red-400/30 rounded-full px-2 py-1 sm:px-3 sm:py-1.5"
                >
                  <LogOut size={14} className="sm:hidden" />
                  <span className="hidden sm:block">Logout</span>
                </button>
              </form>
            </div>
          ) : (
            <Link 
              href="/auth/signin" 
              className="text-[10px] sm:text-sm font-bold bg-white text-black px-3 py-1 sm:px-5 sm:py-2 rounded-full hover:scale-105 transition-transform"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}


function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <li>
      <Link 
        href={href} 
        className="flex items-center gap-2 p-2 sm:p-0 text-white/70 hover:text-white transition-colors group"
      >
        <span className="md:hidden group-hover:text-blue-400 transition-colors">
          {icon}
        </span>
        <span className="text-[10px] sm:text-xs md:text-sm font-medium hidden md:block">
          {label}
        </span>
      </Link>
    </li>
  )
}

export default Navbar