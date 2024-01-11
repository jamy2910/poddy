import React, { useState } from 'react'

const AccountDetailsSwitch = ({title, description, value, changeValue, name}) => {

  return (
    <div className='flex justify-between items-center border-0 border-solid border-b-2 px-2 border-emerald-700'>
        <div>
            <h2 className='text-xl m-0 mt-4 font-medium'>{title}</h2>
            <h3 className='font-normal w-1/2 text-base m-0'>{description}</h3>
        </div>

        <div className='text-center'>
        <div onClick={() => {changeValue(value, name)}} className={`w-8 h-4 rounded-full cursor-pointer border-2 border-solid p-1 ${value ? 'border-emerald-700' : 'border-gray-500'}`}>
            <div className={`w-1/2 h-full transition-all rounded-full ${value ? 'translate-x-full bg-emerald-700' : 'bg-gray-400'}`}></div>
        </div>
        <span>{value ? 'On' : 'Off'}</span>
        </div>


    </div>
  )
}

export default AccountDetailsSwitch