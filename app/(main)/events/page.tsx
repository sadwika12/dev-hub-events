'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { IEvent } from '@/Database/event_model'
import { getFilteredEvents } from '@/lib/actions/event_actions'

const MODES = ['all', 'online', 'offline', 'hybrid']

const EventsPage = () => {
  const [events, setEvents] = useState<IEvent[]>([])
  const [search, setSearch] = useState('')
  const [mode, setMode] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      const result = await getFilteredEvents({ search, mode })
      setEvents(result)
      setLoading(false)
    }

    // debounce search
    const timer = setTimeout(fetchEvents, 300)
    return () => clearTimeout(timer)
  }, [search, mode])

  return (
    <section className="min-h-screen px-6 py-12">

   
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-white">All Events</h1>
        <Link
          href="/events/create"
          className="text-sm font-medium text-white/70 hover:text-white border border-white/20 rounded-full px-4 py-2 transition-colors"
        >
          + Create Event
        </Link>
      </div>

     
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search events..."
          className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/40"
        />
      </div>

      
      <div className="flex items-center gap-2 mb-8 flex-wrap">
        {MODES.map((m) => (
          <button
            key={m}
            onClick={() => setMode(m === 'all' ? '' : m)}
            className={`text-sm px-4 py-1.5 rounded-full border transition-all capitalize ${
              (m === 'all' && !mode) || mode === m
                ? 'bg-white text-black border-white'
                : 'border-white/20 text-white/60 hover:border-white/40 hover:text-white'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

     
      {loading && (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )}

    
      {!loading && events.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <p className="text-white/40 text-lg">No events found</p>
          <p className="text-white/20 text-sm">Try a different search or filter</p>
        </div>
      )}

      {!loading && events.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event: IEvent) => (
            <Link key={event.slug} href={`/events/${event.slug}`}>
              <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-white/30 transition-all hover:scale-[1.02] cursor-pointer">
                <div className="relative h-48 w-full">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/50">{event.date}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full border border-white/20 text-white/60 capitalize">
                      {event.mode}
                    </span>
                  </div>
                  <h3 className="font-semibold text-white text-lg leading-tight">
                    {event.title}
                  </h3>
                  <p className="text-white/50 text-sm line-clamp-2">
                    {event.overview}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {event.tags?.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/40"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-white/40">📍 {event.location}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

    </section>
  )
}

export default EventsPage