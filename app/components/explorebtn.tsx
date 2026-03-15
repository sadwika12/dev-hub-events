'use client'
import React from 'react'
import Image from 'next/image'
const ExploreBtn = () => {
  return (
    <button onClick={()=>console.log("button is clicked")} id="explore-btn" className="mt-7 mx-auto flex items-center gap-2 rounded-full px-13 py-3 text-white hover:bg-gray-700 bg-gray-800">
      <a href="#events">
        Explore Events
        <Image src="/icons/arrow-down.svg" alt="arrow-down" width={20} height={20}/>
      </a>
    </button>
  )
}

export default ExploreBtn