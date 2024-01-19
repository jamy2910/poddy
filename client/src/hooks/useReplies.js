import { useState, useEffect } from 'react';
import { customFetch } from '../utils/customFetch';
import { toast } from 'react-toastify';

export const useReplies = (id) => {
    const [replies, setReplies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [replyInput, setReplyInput] = useState("");

    const updateReplyInput = (e) => {
        const { value } = e.target;
        setReplyInput(value);
    }

    const postReply = async () => {
        try {
            const response = await customFetch.post(`/reply/${id}`, { text: replyInput });
            await getReplies();
            setReplyInput("");
            toast.success('Reply posted')
        } catch (error) {
            toast.error("Couldn't reply to comment");
        }
    }

    const getReplies = async () => {
        setLoading(true);
        try {
            const response = await customFetch.get(`/reply/${id}`);
            setReplies(response.data);
        } catch (error) {

        }
        setLoading(false);
    }

    useEffect(() => {
        getReplies();
    }, []);

    return { loading, replies, replyInput, updateReplyInput, postReply };
}