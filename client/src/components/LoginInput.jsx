import React from 'react'

const LoginInput = ({title, name, value, onChange, type}) => {
  return (
    <div className='text-left'>
        <label className=' font-semibold text-lg block' htmlFor={name}>{title}</label>
        <input type={type} id={name} value={value} onChange={onChange} className=' w-72 border text-base rounded border-emerald-700 border-solid focus:outline-0' />
    </div>
  )
}

export default LoginInput