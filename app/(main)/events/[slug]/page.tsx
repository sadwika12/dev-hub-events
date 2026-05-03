import {Suspense} from "react";
import EventDetails from "@/app/components/EventDetails";

const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }>}) => {
    return (
        <main>
            <Suspense fallback={<LoadingSpinner />}>
                <EventDetails params={params} />
            </Suspense>
        </main>
    )
}
const LoadingSpinner = () => (
  <div className="flex  justify-center min-h-screen w-full">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      <p className="text-white/50 text-sm">Loading event...</p>
    </div>
  </div>
)
export default EventDetailsPage