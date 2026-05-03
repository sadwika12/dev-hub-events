import React from 'react'
import ExploreBtn from '@/app/components/explorebtn'
import EventCards from '@/app/components/EventCards'
import {IEvent} from '@/Database/event_model'
const base_url=process.env.base_url;
const page = async() => {
  const response=await fetch (`${base_url}/api/events`)
  const {events}=await response.json();
  return (
    <section>
      <h1 className="text-center">The Hub for every Dev <br/> Event you can't miss!</h1>
      <p className="text-center mt-5">Hackathon,Meetups,and Conferences,All in one Place</p>
      <ExploreBtn/>
      <div className="mt-20 space-y-7" >
        <h3 className="mx-2">Featured Events</h3>
        <ul className="events list-none">
          {events && events.length>0 && events.map((e:IEvent)=>(
            <li key={e.title}>
              <EventCards {...e} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
export default page