import ReplyCard from './ReplyCard'
import { useReplies } from '../hooks/useReplies';
import PodcastLoadingSpinner from './PodcastLoadingSpinner';
import TextArea from 'react-textarea-autosize';


const CommentReplies = ({ commentId }) => {

  // Hooks
  const { loading, replies, postReply, replyInput, updateReplyInput } = useReplies(commentId);

  // JSX

  if (loading) {
    return <PodcastLoadingSpinner />
  }

  return (
    <div>

      <div className='ml-auto w-3/4 p-4 box-border'>
        <h4>Write a reply</h4>
        <TextArea value={replyInput} onChange={updateReplyInput} className='resize-none w-full font-main text-base block' />
        <button onClick={postReply} className='text-sm py-2 cursor-pointer bg-emerald-700 mt-4 text-white rounded border-none'>Post reply</button>

      </div>

      <div>
        {replies && replies.map((reply) => {
          return <ReplyCard key={reply.id} username={reply.username} body={reply.body} />
        })}
      </div>
    </div>
  )
}

export default CommentReplies