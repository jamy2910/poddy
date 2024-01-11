import React, { useRef, useState } from 'react'
import TextArea from 'react-textarea-autosize';

const CommentInput = () => {

    return (
        <div className='mx-auto'>
            <label className='block' htmlFor="comment">Write a comment</label>
            <TextArea minRows={5} className='resize-none text-base font-main w-commentBox outline-none border-2 border-emerald-700' />
            <button className='block px-4 mb-8 bg-emerald-700 border-0 text-white py-1 cursor-pointer text-base rounded'>Post</button>
        </div>
    )
}

export default CommentInput