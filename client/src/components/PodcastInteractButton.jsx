import React, { useState } from 'react'

const PodcastInteractButton = ({ children, isLiked, onClick }) => {


  return (
    <button onClick={onClick} className={`px-4 py-2 border-solid cursor-pointer border-emerald-700 text-base font-bold rounded ${isLiked ? 'bg-emerald-700 text-white' : 'bg-white text-emerald-700'}`}>{children}</button>
  )
}

export default PodcastInteractButton