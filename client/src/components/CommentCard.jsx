import React, { useState } from 'react'
import CommentReplies from './CommentReplies';
import CommentDropdown from './CommentDropdown';
import { useAuth } from '../auth/AuthContext';

const CommentCard = ({ username, body, userid, commentId, getComments }) => {

    // Hooks
    const [showReplies, setShowReplies] = useState(false);
    const { user } = useAuth();

    // Functions
    const toggleReplies = () => {
        setShowReplies(!showReplies);
    }

    // JSX
    return (
        <div className='border-0 border-solid border-b-2 border-emerald-700 relative pb-0 p-4'>
            <div>
                <h3 className='m-0'>{username}</h3>
                <p className='break-words font-medium text-base'>{body}</p>
            </div>

            <div className='flex justify-between items-center'>
                <span className='text-emerald-700 hover:underline cursor-pointer'>Like</span>
                <span onClick={toggleReplies} className='cursor-pointer text-emerald-700 hover:underline'>Replies</span>
            </div>
            {showReplies && <CommentReplies commentId={commentId} />}

            {userid === user.id && <CommentDropdown getComments={getComments} commentId={commentId} />}
        </div>

    )
}

export default CommentCard