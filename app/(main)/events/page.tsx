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
          <EventCards key={event.slug} {...event} />
        ))}
      </div>
    </section>
  )
}

export default EventPage;