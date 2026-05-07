'use server';
import Booking from '@/Database/booking_model';
import Event from '@/Database/event_model';
import connectDB from "@/lib/mongoose";

export const getSimilarEventsBySlug = async (slug: string) => {
    try {
        await connectDB();
        const event = await Event.findOne({ slug });

        return await Event.find({ _id: { $ne: event._id }, tags: { $in: event.tags } }).lean();
    } catch {
        return [];
    }
}


export const getBookingCount = async (eventId: string) => {
  try {
    await connectDB()
    return await Booking.countDocuments({ eventId })
  } catch {
    return 0
  }
}

export const getMyEvents = async (userId: string) => {
  await connectDB();
  const events = await Event.find({ createdBy: userId })
    .sort({ createdAt: -1 })
    .lean();
    
  return JSON.parse(JSON.stringify(events)); 
};


// lib/actions/event_actions.ts
export const getFilteredEvents = async ({
  search = '',
  mode = '',
  tag = ''
}: {
  search?: string
  mode?: string
  tag?: string
}) => {
  try {
    await connectDB()

    const query: Record<string, unknown> = {}

    if (search) {
      query.title = { $regex: search, $options: 'i' }
    }

    if (mode) {
      query.mode = mode
    }

    if (tag) {
      query.tags = { $in: [tag] }
    }

    const events = await Event.find(query)
      .sort({ createdAt: -1 })
      .lean()

    return JSON.parse(JSON.stringify(events))
  } catch {
    return []
  }
}