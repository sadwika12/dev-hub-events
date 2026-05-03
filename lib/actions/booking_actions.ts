'use server';
import connectDB from "@/lib/mongoose";
import Booking from "@/Database/booking_model";
const MAX_BOOKINGS_PER_EVENT = 100;

export const createBooking = async ({eventId,slug,email}:{eventId:string,slug: string,email: string}) => {
    try {
        await connectDB();
        const existingBookings = await Booking.countDocuments({ eventId });
        if (existingBookings >= MAX_BOOKINGS_PER_EVENT) {
            throw new Error('This event is fully booked');
        }
        const newBooking = await Booking.create({ eventId, slug, email });
        return {success:true,newBooking:JSON.parse(JSON.stringify(newBooking))};
    } catch (error) {
        return {success:false,error: error instanceof Error ? error.message : 'Unknown error'};
    }
}

export const getBookingsForEvent = async (eventId: string) => {
    try {
        await connectDB();
        return await Booking.find({ eventId }).lean();
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Unknown error');
    }
}

export const getBookingsByEmail = async (email: string) => {
    try {
        await connectDB();
        return await Booking.find({ email }).lean();
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Unknown error');
    }
}

export const cancelBooking = async (bookingId: string) => {
    try {
        await connectDB();
        const deletedBooking = await Booking.findByIdAndDelete(bookingId);
        if (!deletedBooking) {
            throw new Error('Booking not found');
        }
        return deletedBooking;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Unknown error');
    }
}

