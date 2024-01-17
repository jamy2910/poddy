import { useState, useEffect } from "react";
import { customFetch } from "../utils/customFetch";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export const usePodcast = (id) => {
    // Hooks
    const [podcast, setPodcast] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        getPodcast();
    }, []);


    // Functions
    const getPodcast = async () => {
        try {
            const { data } = await customFetch.get(`/podcast/${id}`);
            setPodcast(data);
        } catch (error) {
            navigate('/explore');
            toast.error("Couldn't find podcast");
        }

    }

    const handleLike = async () => {
        if (!podcast.isliked) {
            try {
                await customFetch.post(`/like/${id}`);
                setPodcast({ ...podcast, isliked: true })
            } catch (error) {
                toast.error('Unable to like post.')
            }
        } else if (podcast.isliked === true) {
            try {
                await customFetch.delete(`/like/${id}`);
                setPodcast({ ...podcast, isliked: false })
            } catch (error) {
                toast.error('Unable to unlike post.')
            }
        }
    }


    return { getPodcast, podcast, handleLike }
}