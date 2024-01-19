import React from 'react'

const DropdownBox = ({ children }) => {
  return (
    <div className='absolute top-1/4 right-full min-w-40 sm:left-1/2 flex flex-col sm:-translate-x-1/2 z-30 sm:top-full p-2 m-1 shadow-md bg-white border border-solid border-emerald-700'>
      {children}
    </div>
  )
}

export default DropdownBox