import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { IEvent } from '@/Database/event_model'

const base_url = process.env.base_url

const page = async () => {
  const response = await fetch(`${base_url}/api/events`, { 
    next: { revalidate: 30 }
  })
  const { events } = await response.json()
  const featuredEvents: IEvent[] = events?.slice(0, 3) || []

  return (
    <>
      <section className="flex flex-col min-h-screen">
        <div className="relative flex flex-col items-center justify-center text-center pt-24 pb-16 gap-8 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="w-[600px] h-[600px] rounded-full border border-white/5" />
            <div className="absolute w-[400px] h-[400px] rounded-full border border-white/5" />
            <div className="absolute w-[200px] h-[200px] rounded-full border border-white/10" />
          </div>

          <div className="relative flex flex-col items-center gap-6 max-w-4xl mx-auto">
          <h1 className="text-center text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.05]">
            The Global Calendar for <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
              Developer Culture.
              {/*This isn't just a boring list of meetings. This is where you find your people, 
              learn the newest tech, and see what the world of software engineering is doing right now."*/
              }
            </span>
          </h1>

          <p className="text-white/50 text-lg md:text-xl text-center max-w-2xl leading-relaxed">
            Stop searching across fragmented feeds. Discover the world’s most impactful 
            hackathons, meetups, and conferences—all in one curated place.
          </p>

          <div className="mt-4 flex items-center gap-4 text-white/20 text-xs font-medium uppercase tracking-widest">
            <span>Trusted by 2k+ Devs</span>
            <div className="w-1 h-1 rounded-full bg-white/10" />
            <span>Community Driven</span>
          </div>
        </div>

          <div className="flex items-center gap-3 mt-2 flex-wrap justify-center relative">
            <Link href="/events" className="bg-primary hover:bg-primary/80 text-black font-semibold px-8 py-3 rounded-full transition-all hover:scale-105 active:scale-95">
              Explore Events
            </Link>
            <Link href="/events/create" className="border border-white/20 text-white/60 hover:text-white hover:border-white/40 px-8 py-3 rounded-full transition-all">
              Host an Event →
            </Link>
          </div>

          <div className="relative flex items-center gap-10 mt-4 flex-wrap justify-center">
            {[
              { value: `${events?.length || 0}+`, label: 'Events' },
              { value: '3', label: 'Categories' },
              { value: '100%', label: 'Free' },
            ].map((stat, i) => (
              <React.Fragment key={stat.label}>
                {i > 0 && <div className="w-px h-6 bg-white/10" />}
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-xl font-bold text-white">{stat.value}</span>
                  <span className="text-white/30 text-xs tracking-widest uppercase">{stat.label}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div id="featured-events" className="flex flex-col gap-6 scroll-mt-20">
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-1">
              <h3>Featured Events</h3>
              <p className="text-white/40 text-sm">Handpicked from the community</p>
            </div>
            <Link href="/events" className="text-sm text-white/40 hover:text-primary transition-colors">
              View all {events?.length || 0} events →
            </Link>
          </div>

          {featuredEvents.length > 0 ? (
            <div className="events">
              {featuredEvents.map((e: IEvent, index: number) => (
                <Link key={e.slug} href={`/events/${e.slug}`}>
                  <div className="group rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5 cursor-pointer">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={e.image}
                        alt={e.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-3 left-3 bg-primary text-black text-xs font-bold px-2.5 py-0.5 rounded-full">
                        #{index + 1} Featured
                      </div>
                      <div className="absolute top-3 right-3 border border-white/20 bg-black/40 backdrop-blur-sm text-white/80 text-xs px-2 py-0.5 rounded-full capitalize">
                        {e.mode}
                      </div>
                    </div>
                    <div className="p-5 space-y-3">
                      <h3 className="font-semibold text-white text-lg leading-tight line-clamp-1 group-hover:text-primary transition-colors">
                        {e.title}
                      </h3>
                      <p className="text-white/50 text-sm line-clamp-2 leading-relaxed">{e.overview}</p>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs text-white/40">📅 {e.date}</span>
                        <span className="text-xs text-white/40">📍 {e.location}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {e.tags?.slice(0, 3).map(tag => (
                          <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary/70">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 gap-4 border border-white/10 rounded-2xl border-dashed">
              <p className="text-white/30 text-4xl">🎪</p>
              <p className="text-white/40">No events yet</p>
              <Link href="/events/create" className="text-sm text-primary hover:text-primary/80 transition-colors border border-primary/20 px-4 py-1.5 rounded-full">
                Create the first one →
              </Link>
            </div>
          )}
        </div>

      </section>
      

      
      <div className="px-6 mt-20">
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-zinc-950 p-8 md:p-16">
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
          />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-500/5 blur-[100px] rounded-full" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase">
                  Organizer Portal
                </span>
              </div>
              <h3 className="text-white text-3xl md:text-4xl font-semibold tracking-tight leading-[1.1]">
                Share your event with <br className="hidden md:block" />
                <span className="text-primary/90">thousands of developers.</span>
              </h3>
              <p className="mt-6 text-white/50 text-base md:text-lg leading-relaxed max-w-md">
                From weekend hackathons to global summits.
                Get your event in front of the right audience, instantly.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0">
              <Link
                href="/events/create"
                className="group relative bg-white text-black font-bold px-10 py-4 rounded-2xl transition-all hover:bg-primary hover:scale-[1.02] active:scale-[0.98] text-center"
              >
                Create Event
                <span className="block text-[10px] opacity-50 font-medium">
                  Takes less than 2 minutes
                </span>
              </Link>
              <p className="text-white/30 text-xs text-center lg:text-left pl-2">
                 Always free for community.
              </p>
            </div>
          </div>
        </div>
      </div>

      
      <footer className="mt-32 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
            <div className="md:col-span-4 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/[0.03] border border-white/10 rounded-lg flex items-center justify-center">
                  <Image src="/favicon.ico" alt="logo" width={18} height={18} />
                </div>
                <span className="font-bold text-white text-lg tracking-tighter">DevEvent</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                The central pulse for developer gatherings.
                Built by the community, for the community.
              </p>
            </div>
            <div className="md:col-span-2 flex flex-col gap-5">
              <h4 className="text-white text-xs font-bold uppercase tracking-widest">Platform</h4>
              <nav className="flex flex-col gap-3">
                {[
                  { label: 'All Events', href: '/events' },
                  { label: 'Hackathons', href: '/events?search=hackathon' },
                  { label: 'Conferences', href: '/events?search=conference' },
                  { label: 'Online', href: '/events?mode=online' },
                ].map(item => (
                  <Link key={item.label} href={item.href} className="text-white/30 hover:text-primary text-sm transition-all duration-200">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="md:col-span-2 flex flex-col gap-5">
              <h4 className="text-white text-xs font-bold uppercase tracking-widest">Organize</h4>
              <nav className="flex flex-col gap-3">
                {[
                  { label: 'Create Event', href: '/events/create' },
                  { label: 'My Events', href: '/dashboard/my-events' },
                ].map(item => (
                  <Link key={item.label} href={item.href} className="text-white/30 hover:text-primary text-sm transition-all duration-200">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="md:col-span-4 flex flex-col gap-5">
              <h4 className="text-white text-xs font-bold uppercase tracking-widest">Built With</h4>
              <div className="flex flex-wrap gap-2">
                {['Next.js 15', 'MongoDB', 'Tailwind', 'Cloudinary', 'NextAuth', 'Mongoose'].map(tech => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/30 text-[10px] font-medium hover:border-white/20 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6 text-[11px] font-medium uppercase tracking-tighter text-white/20">
              <span>© {new Date().getFullYear()}</span>
              <div className="w-1 h-1 rounded-full bg-white/10" />
              <Link href="https://github.com/sadwika12" className="hover:text-white/50 transition-colors">
                Crafted by sadwika12
              </Link>
            </div>

            <div className="flex items-center gap-8">
              <Link
                href="https://github.com/sadwika12/dev-hub-events"
                target="_blank"
                className="text-white/20 hover:text-white transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-white/20 text-[10px] font-bold uppercase tracking-widest">
                  All Systems Operational
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </>
  )
}

export default page