import React from 'react'

const AccountDetails = ({ title, value }) => {
  return (
    <div className='flex justify-between items-center border-b border-solid border-0 border-emerald-700 px-2'>
      <h2 className='text-lg md:text-xl font-medium'>{title}:</h2>
      <h3 className='text-lg font-normal'>{value}</h3>
    </div>
  )
}

export default AccountDetails