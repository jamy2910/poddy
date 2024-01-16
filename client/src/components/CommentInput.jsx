import TextArea from 'react-textarea-autosize';
import { customFetch } from '../utils/customFetch';
import { toast } from 'react-toastify'
import { useState } from 'react';
import { useAuth } from '../auth/AuthContext'
import { useParams } from 'react-router-dom';

const CommentInput = ({ getComments }) => {

    const [input, setInput] = useState("");
    const { isAuthenticated } = useAuth();
    const { id } = useParams();

    const onChange = (e) => {
        const { value } = e.target;
        setInput(value);
    }

    const uploadComment = async () => {
        if (!input) {
            return toast.error('Please input a comment')
        } else if (!isAuthenticated) {
            return toast.error('You must be logged in to comment');
        }

        try {
            const response = await customFetch.post(`/comment/${id}`, { body: input });
            setInput("");
            await getComments();
            toast.success('Comment uploaded');
        } catch (error) {
            toast.error("Couldn't load comments");
        }
    }

    return (
        <div className='flex justify-center'>
            <div className='mx-auto'>
                <label className='block' htmlFor="comment">Write a comment</label>
                <TextArea minRows={5} value={input} onChange={onChange} className='resize-none text-base font-main w-commentBox outline-none border-2 border-emerald-700' />
                <button onClick={uploadComment} className='block px-4 mb-8 self-start mt-2 bg-emerald-700 border-0 text-white py-1 cursor-pointer text-base rounded'>Post</button>
            </div>
        </div>



    )
}

export default CommentInput