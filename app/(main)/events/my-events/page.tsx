import { auth } from "@/auth";
import { getMyEvents } from "@/lib/actions/event_actions";
import EventCards from "@/app/components/EventCards";
import Link from "next/link";
import { PlusCircle } from "lucide-react"; 

export default async function MyEventsPage() {
  const session = await auth();
  
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <p className="text-white/60 mb-4">Please login to see your events.</p>
        <Link 
          href="/auth/signin" 
          className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gray-200 transition-colors"
        >
          Login
        </Link>
      </div>
    );
  }

  const events = await getMyEvents(session.user.id);

  if (!events || events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6 animate-in fade-in zoom-in duration-500">
        <div className="bg-white/5 p-6 rounded-full mb-6 border border-white/10">
          <PlusCircle size={48} className="text-white/20" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-3">No events yet</h2>
        <p className="text-white/50 max-w-sm mb-8">
          Your personal dashboard is looking a bit empty. Why not host an event and build the community?
        </p>
        <Link 
          href="/events/create" 
          className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg shadow-blue-500/20 transition-all active:scale-95"
        >
          <PlusCircle size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          Create Your First Event
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">My Events</h1>
        <Link 
          href="/events/create" 
          className="hidden sm:flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full border border-white/10 transition-colors text-sm"
        >
          <PlusCircle size={16} />
          New Event
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event: any) => (
          <EventCards key={event._id} {...event} />
        ))}
      </div>
    </div>
  );
}