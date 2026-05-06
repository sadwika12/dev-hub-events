import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IEvent } from "@/Database/event_model"
const EventCards = (event: Partial<IEvent>) => {
  const { title, image, date, location, slug, mode, overview } = event;

  return (
    <Link href={`/events/${slug}`}>
      <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-white/30 transition-all hover:scale-[1.02] cursor-pointer h-full">
        <div className="relative h-48 w-full">
          <Image
            src={image || '/placeholder-event.jpg'}
            alt={title || 'Event'}
            fill
            className="object-cover"
          />
        </div>

        
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/50">{date}</span>
            <span className="text-xs px-2 py-0.5 rounded-full border border-white/20 text-white/60">
              {mode}
            </span>
          </div>

          <h3 className="font-semibold text-white text-lg leading-tight line-clamp-1">
            {title}
          </h3>

          <p className="text-white/50 text-sm line-clamp-2">
            {overview}
          </p>

          <p className="text-xs text-white/40">
            📍 {location}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default EventCards
