import React from 'react'

const FooterContactInput = ({title, name, value, onChange}) => {
  return (
    <div className='flex flex-col mb-4'>
        <label className='text-white text-lg' htmlFor={name}>{title}</label>
        <input className='w-1/2 mx-auto focus:outline-0 text-base rounded border-0' type="text" />
    </div>
  )
}

export default FooterContactInput