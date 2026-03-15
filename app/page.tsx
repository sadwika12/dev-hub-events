import React from 'react'
import ExploreBtn from './components/explorebtn'
import EventCards from './components/EventCards'
import {events} from '../lib/constants'
const page = () => {
  return (
    <section>
      <h1 className="text-center">The Hub for every Dev <br/> Event you can't miss!</h1>
      <p className="text-center mt-5">Hackathon,Meetups,and Conferences,All in one Place</p>
      <ExploreBtn/>
      <div className="mt-20 space-y-7" >
        <h3 className="mx-2">Featured Events</h3>
        <ul className="events list-none">
          {events.map((e)=>(
            <li key={e.id}>
              <EventCards {...e} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
export default page