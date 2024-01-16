import { useParams } from "react-router-dom";
import { customFetch } from "../utils/customFetch";
import CommentCard from "./CommentCard"
import CommentInput from "./CommentInput"
import { useState, useEffect } from "react";

const Comments = () => {

    // Hooks
    const [comments, setComments] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        getComments();
    }, []);

    // Functions
    const getComments = async () => {
        const { data } = await customFetch.get(`/comment/${id}`);
        setComments(data);
    }

    return (
        <div className='mx-auto mt-24'>
            <h2 className='border-0 border-solid border-b border-emerald-700'>Comments</h2>

            <CommentInput getComments={getComments} />

            <div className='flex flex-col gap-y-4'>
                {comments.map((comment) => {
                    const { id: commentId, username, body, userid } = comment;
                    return <CommentCard getComments={getComments} commentId={commentId} userid={userid} username={username} body={body} />
                })}
            </div>
        </div>
    )
}

export default Comments