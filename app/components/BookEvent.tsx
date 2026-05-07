'use client';
import React,{useState,useEffect} from 'react';
import { getBookingCount } from '@/lib/actions/event_actions';
import {createBooking} from "@/lib/actions/booking_actions";
const EventBooking = ({eventId,slug}:{eventId:string,slug:string}) => {
  const [email,setEmail]=useState("");
  const [submitted,setSubmitted]=useState(false);
  const [bookingCount,setBookingCount]=useState(0);
  useEffect(() => {
    const interval = setInterval(async () => {
      const count = await getBookingCount(eventId)
      setBookingCount(count)
    }, 10000)  

    return () => clearInterval(interval)
  }, [eventId])
  const handleSubmit=async (e:React.SyntheticEvent<HTMLFormElement>)=>{
    e.preventDefault();
      const {success,error}=await createBooking({eventId,slug,email})
      if(success){
        setSubmitted(true);
        alert("Booking successful! A confirmation email has been sent to you.");
      }
      else{
        alert("Booking failed!"+ error ||"Please try again later");
      }
      
  }
  return(
    <div id="book-event">
      {submitted?(
        <p className="text-sm">Thank you for booking</p>
      ):
      (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input 
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              id="email"
              placeholder="Enter your email address"
            />
          </div>
          <button type="submit" className="button-submit">Submit</button>
        </form>
      )}
    </div>
  )
}
export default EventBooking;