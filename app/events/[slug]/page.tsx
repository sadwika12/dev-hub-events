// import React from 'react'
// import { notFound } from "next/navigation"
// import { IEvent } from "@/app/database/event_model"
// import { getSimilarEventsBySlug } from "@/lib/actions/event_actions"
// import Image from "next/image"
// import EventCards from "@/app/components/EventCards"
// import EventBooking from "@/app/components/BookEvent"

// const BASE_URL = process.env.base_url

// const EventDetailItem = ({
//   icon,
//   alt,
//   label
// }: {
//   icon: string
//   alt: string
//   label: string
// }) => (
//   <div className="flex-row-gap-2 items-center">
//     <Image src={icon} alt={alt} width={17} height={17} />
//     <p>{label}</p>
//   </div>
// )

// const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
//   <div className="agenda">
//     <h2>Agenda</h2>
//     <ul>
//       {agendaItems.map((item) => (
//         <li key={item}>{item}</li>
//       ))}
//     </ul>
//   </div>
// )

// const EventTags = ({ tags }: { tags: string[] }) => (
//   <div className="flex flex-row gap-1.5 flex-wrap">
//     {tags.map((tag) => (
//       <div className="pill" key={tag}>{tag}</div>
//     ))}
//   </div>
// )

// // ✅ Fix 1 — correct params type
// const EventDetails = async ({ params }: { params: Promise<{ slug: string }> }) => {
//   // ✅ Fix 2 — correct destructuring
//   const { slug } = await params

//   let event
//   try {
//     const request = await fetch(`${BASE_URL}/api/events/${slug}`, {
//       next: { revalidate: 60 }
//     })

//     if (!request.ok) {
//       if (request.status === 404) return notFound()
//       throw new Error(`Failed to fetch event: ${request.statusText}`)
//     }

//     const response = await request.json()
//     event = response.event

//     if (!event) return notFound()

//   } catch (error) {
//     console.error('Error fetching event:', error)
//     return notFound()
//   }

//   const {
//     description,
//     image,
//     overview,
//     date,
//     time,
//     location,
//     mode,
//     agenda,
//     audience,
//     tags,
//     organizer
//   } = event

//   if (!description) return notFound()

//   const bookings = 10

//   // ✅ Fix 4 — slug is now correctly a string
//   const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug)

//   return (
//     <section id="event">
//       <div className="header">
//         <h1>Event Description</h1>
//         <p>{description}</p>
//       </div>

//       <div className="details">
//         {/* Left Side - Event Content */}
//         <div className="content">
//           <Image
//             src={image}
//             alt="Event Banner"
//             width={800}
//             height={800}
//             className="banner"
//           />

//           <section className="flex-col-gap-2">
//             <h2>Overview</h2>
//             <p>{overview}</p>
//           </section>

//           <section className="flex-col-gap-2">
//             <h2>Event Details</h2>
//             <EventDetailItem icon="/icons/calendar.svg" alt="calendar" label={date} />
//             <EventDetailItem icon="/icons/clock.svg" alt="clock" label={time} />
//             <EventDetailItem icon="/icons/pin.svg" alt="pin" label={location} />
//             <EventDetailItem icon="/icons/mode.svg" alt="mode" label={mode} />
//             <EventDetailItem icon="/icons/audience.svg" alt="audience" label={audience} />
//           </section>

//           <EventAgenda agendaItems={agenda} />

//           <section className="flex-col-gap-2">
//             <h2>About the Organizer</h2>
//             <p>{organizer}</p>
//           </section>

//           <EventTags tags={tags} />
//         </div>

//         {/* Right Side - Booking Form */}
//         <aside className="booking">
//           <div className="signup-card">
//             <h2>Book Your Spot</h2>
//             {bookings > 0 ? (
//               <p className="text-sm">
//                 Join {bookings} people who have already booked their spot!
//               </p>
//             ) : (
//               <p className="text-sm">Be the first to book your spot!</p>
//             )}
//             <EventBooking eventId={event._id} slug={event.slug} />
//           </div>
//         </aside>
//       </div>

//       <div className="flex w-full flex-col gap-4 pt-20">
//         <h2>Similar Events</h2>
//         <div className="events">
//           {/* ✅ Fix 3 — use EventCards not EventCard */}
//           {similarEvents.length > 0 && similarEvents.map((similarEvent: IEvent) => (
//             <EventCards key={similarEvent.title} {...similarEvent} />
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

// export default EventDetails





import React from 'react'
import { notFound } from "next/navigation"
import { IEvent } from "@/app/Database/event_model"
import { getSimilarEventsBySlug } from "@/lib/actions/event_actions"
import Image from "next/image"
import EventCards from "@/app/components/EventCards"
import EventBooking from "@/app/components/BookEvent"
const BASE_URL = process.env.base_url;

const EventDetailItem = ({ icon, alt, label }: { icon: string; alt: string; label: string; }) => (
    <div className="flex-row-gap-2 items-center">
        <Image src={icon} alt={alt} width={17} height={17} />
        <p>{label}</p>
    </div>
)

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
    <div className="agenda">
        <h2>Agenda</h2>
        <ul>
            {agendaItems.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    </div>
)

const EventTags = ({ tags }: { tags: string[] }) => (
    <div className="flex flex-row gap-1.5 flex-wrap">
        {tags.map((tag) => (
            <div className="pill" key={tag}>{tag}</div>
        ))}
    </div>
)

const EventDetails = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    let event;
    try {
        const request = await fetch(`${BASE_URL}/api/events/${slug}`, {
            next: { revalidate: 60 }
        });

        if (!request.ok) {
            if (request.status === 404) {
                return notFound();
            }
            throw new Error(`Failed to fetch event: ${request.statusText}`);
        }

        const response = await request.json();
        event = response.event;

        if (!event) {
            return notFound();
        }
    } catch (error) {
        console.error('Error fetching event:', error);
        return notFound();
    }

    const { description, image, overview, date, time, location, mode, agenda, audience, tags, organizer } = event;

    if(!description) return notFound();

    const bookings = 10;

    const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);

    return (
        <section id="event">
            <div className="header">
                <h1>Event Description</h1>
                <p>{description}</p>
            </div>

            <div className="details">
                {/*    Left Side - Event Content */}
                <div className="content">
                    <Image src={image} alt="Event Banner" width={800} height={800} className="banner" />

                    <section className="flex-col-gap-2">
                        <h2>Overview</h2>
                        <p>{overview}</p>
                    </section>

                    <section className="flex-col-gap-2">
                        <h2>Event Details</h2>

                        <EventDetailItem icon="/icons/calendar.svg" alt="calendar" label={date} />
                        <EventDetailItem icon="/icons/clock.svg" alt="clock" label={time} />
                        <EventDetailItem icon="/icons/pin.svg" alt="pin" label={location} />
                        <EventDetailItem icon="/icons/mode.svg" alt="mode" label={mode} />
                        <EventDetailItem icon="/icons/audience.svg" alt="audience" label={audience} />
                    </section>

                    <EventAgenda agendaItems={JSON.parse(agenda[0])} />

                    <section className="flex-col-gap-2">
                        <h2>About the Organizer</h2>
                        <p>{organizer}</p>
                    </section>

                    <EventTags tags={JSON.parse(tags[0])} />
                </div>

                {/*    Right Side - Booking Form */}
                <aside className="booking">
                    <div className="signup-card">
                        <h2>Book Your Spot</h2>
                        {bookings > 0 ? (
                            <p className="text-sm">
                                Join {bookings} people who have already booked their spot!
                            </p>
                        ): (
                            <p className="text-sm">Be the first to book your spot!</p>
                        )}

                        <EventBooking eventId={event._id} slug={event.slug} />
                    </div>
                </aside>
            </div>

            <div className="flex w-full flex-col gap-4 pt-20">
                <h2>Similar Events</h2>
                <div className="events">
                    {similarEvents.length > 0 && similarEvents.map((similarEvent: IEvent) => (
                        <EventCards key={similarEvent.title} {...similarEvent} />
                    ))}
                </div>
            </div>
        </section>
    )
}
export default EventDetails