import React from 'react'

const ReplyCard = ({ username, body }) => {
    return (
        <div className='w-3/4 ml-auto p-4 box-border mt-1'>
            <h3 className='m-0'>{username}</h3>
            <p className='m-0 mb-3 break-words'>{body}</p>

            <span className='text-emerald-700 hover:underline cursor-pointer'>Like</span>
        </div>
    )
}

export default ReplyCard