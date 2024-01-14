import React from 'react'

const AccountDescriptionInput = ({ title, name, onChange, value }) => {
    return (
        <div className='flex justify-between border-0 px-4 border-b border-solid border-emerald-700 mb-4 pb-4 items-center'>
            <label className='font-medium text-lg' htmlFor={name}>{title}</label>
            <textarea onChange={onChange} value={value} placeholder='Write a few sentences about your channel' className='resize-none focus:outline-0 border-2 border-solid border-emerald-700 text-base font-main' name={name} id="" cols="33" rows="10"></textarea>
        </div>
    )
}

export default AccountDescriptionInput