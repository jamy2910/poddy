import React from 'react'

const PodcastGrid = ({ children }) => {
  return (
    <div className='grid grid-cols-1 w-full justify-items-center mt-4 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-10'>
      {children}
    </div>
  )
}

export default PodcastGrid