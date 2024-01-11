import React, { useState } from 'react'
import CommentReplies from './CommentReplies';

const CommentCard = () => {

    const [showReplies, setShowReplies] = useState(false);

    const toggleReplies = () => {
        setShowReplies(!showReplies);
    }

    return (
        <div className='border-0 border-solid border-b-2 border-emerald-700'>
            <div className='p-4'>
                <div>
                    <h3 className='m-0'>username1892</h3>
                    <p className='break-words font-medium text-base'>This is the comment body. ThisIsAveryLongWordTooLongForTheLine Just some lonely dummy text. I should probably add some more comments so it has friends</p>
                </div>

                <div className='flex justify-between items-center'>
                    <span className='text-emerald-700 hover:underline cursor-pointer'>Like</span>
                    <span onClick={toggleReplies} className='cursor-pointer text-emerald-700 hover:underline'>Replies</span>
                </div>


            </div>
            {showReplies && <CommentReplies />}
        </div>

    )
}

export default CommentCard