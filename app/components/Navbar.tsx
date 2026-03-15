import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-3 px-6 mx-10 my-10 mt-6 max-w-full rounded-full border border-white/20 bg-white/5 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <img src="/favicon.ico" alt="logo" className="w-6 h-6"/>
        <span className="font-bold text-lg text-white tracking-tight">
          DevEvent
        </span>
      </div>
      <ul className="flex items-center gap-6 list-none">
        <li>
          <a href="#home" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
            Home
          </a>
        </li>
        <li>
          <a href="#events" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
            Events
          </a>
        </li>
        <li>
          <a href="#create" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
            Create Event
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar