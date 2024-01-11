import React from 'react'

const InlineInput = ({name, title}) => {
  return (
    <div className='flex justify-between border-0 px-4 border-b border-solid border-emerald-700 mb-4 pb-4 items-center'>
        <label className='font-medium text-lg' htmlFor={name}>{title}</label>
        <input size='30' type="text" id={name} className='focus:outline-0 border-2 border-solid border-emerald-700 font-main font-normal text-lg' />
    </div>
  )
}

export default InlineInput