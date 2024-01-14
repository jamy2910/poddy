import React from 'react'

const DropdownBox = ({ children }) => {
  return (
    <div className='absolute min-w-40 left-1/2 flex flex-col -translate-x-1/2 z-30 top-full p-2 m-1 shadow-md bg-white border border-solid border-emerald-700'>
      {children}
    </div>
  )
}

export default DropdownBox