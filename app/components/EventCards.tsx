import React from 'react'
import Image from 'next/image'
import Link from  'next/link'
interface EventCardProps{
  slug:string;
  title:string;
  image:string;
  location:string;
  date:string;
  time:string;
}
const EventCards = ({slug,title,image,location,date,time}:EventCardProps) => {
  return (
    <Link href={`/events/${slug}`} id="event-card">
      <Image src={image} alt={title} width={400} height={250} className="poster"/>
      <div className="flex flex-row gap-2">
        <Image src="/icons/pin.svg" alt="location" width={20} height={20}/>
        <p>{location}</p>
      </div>
      <p className="title">{title}</p>
      <div className="datetime">
        <div>
          <Image src="/icons/calendar.svg" alt="calendar" width={20} height={20}/>
          <p>{date}</p>
        </div>
        <div>
          <Image src="/icons/clock.svg" alt="clock" width={20} height={20}/>
          <p>{time}</p>
        </div>
      </div>
    </Link>
  )
}
export default EventCards;