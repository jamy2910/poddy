import React from 'react'
import ReplyCard from './ReplyCard'

const CommentReplies = () => {

    // This component will be for looping reply cards (fetch replies, loop, flex-styling and a loading spinner)

  return (
    <div className=' float-right'>
        <ReplyCard />
        <ReplyCard />
        <ReplyCard />
        <ReplyCard />
        <ReplyCard />
        <ReplyCard />
    </div>
  )
}

export default CommentReplies