'use client';
import React,{useState} from 'react';
const EventBooking = () => {
  const [email,setEmail]=useState("");
  const [submitted,setSubmitted]=useState(false);
  const handleSubmit=(e:React.SyntheticEvent<HTMLFormElement>)=>{
      e.preventDefault();
      setTimeout(()=>{
        setSubmitted(true);
      },1000)
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