import React from 'react'
import EventCards from '@/app/components/EventCards'
import {IEvent} from '@/Database/event_model'
import Link from 'next/link'
import Image from 'next/image'
const base_url=process.env.base_url;
const EventPage=async()=> {
  const response=await fetch (`${base_url}/api/events`)
  const {events}=await response.json();
  return (
    <section className="min-h-screen px-6 py-12">
      <h1 className="text-4xl font-bold text-white mb-10">All Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events && events.map((event: IEvent) => (
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
                  <span className="text-xs px-2 py-0.5 rounded-full border border-white/20 text-white/60">
                    {event.mode}
                  </span>
                </div>
                <h3 className="font-semibold text-white text-lg leading-tight">
                  {event.title}
                </h3>
                <p className="text-white/50 text-sm line-clamp-2">
                  {event.overview}
                </p>
                <p className="text-xs text-white/40">📍 {event.location}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default EventPage;