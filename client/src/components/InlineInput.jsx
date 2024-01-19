import React from 'react'

const InlineInput = ({ name, title, onChange, value, max }) => {
  return (
    <div className='flex justify-between flex-col sm:flex-row border-0 px-4 border-b border-solid border-emerald-700 mb-4 pb-4 items-center'>
      <label className='font-medium text-lg' htmlFor={name}>{title}</label>
      <input onChange={onChange} size='30' maxLength={max} name={name} type="text" value={value} id={name} className='focus:outline-0 border-2 border-solid border-emerald-700 font-main font-normal text-base sm:text-lg' />
    </div>
  )
}

export default InlineInput