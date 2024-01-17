import { useParams } from "react-router-dom";
import CommentCard from "./CommentCard"
import CommentInput from "./CommentInput"
import { useComments } from "../hooks/useComments";

const Comments = () => {

    // Hooks
    const { id } = useParams();
    const { comments, getComments } = useComments(id);

    return (
        <div className='mx-auto mt-24'>
            <h2 className='border-0 border-solid border-b border-emerald-700'>Comments</h2>
            <CommentInput getComments={getComments} />
            <div className='flex flex-col gap-y-4'>
                {comments.map((comment) => {
                    const { id: commentId, username, body, userid } = comment;
                    return <CommentCard key={commentId} getComments={getComments} commentId={commentId} userid={userid} username={username} body={body} />
                })}
            </div>
        </div>
    )
}

export default Comments