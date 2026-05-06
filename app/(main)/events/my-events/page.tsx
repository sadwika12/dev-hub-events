// app/my-events/page.tsx
import { auth } from "@/auth";
import { getMyEvents } from "@/lib/actions/event_actions";
import EventCards from "@/app/components/EventCards";

export default async function MyEventsPage() {
  const session = await auth();
  if (!session) return <div>Please login to see your events.</div>;

  const events = await getMyEvents(session.user.id);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
      {events.map((event: any) => (
        <EventCards key={event._id} {...event} />
      ))}
    </div>
  );
}