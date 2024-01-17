import { useState, useEffect } from "react";
import { customFetch } from "../utils/customFetch";
import { toast } from 'react-toastify';

export const usePodcast = (id) => {
    // Hooks
    const [podcast, setPodcast] = useState({});
    useEffect(() => {
        getPodcast();
    }, []);


    // Functions
    const getPodcast = async () => {
        const { data } = await customFetch.get(`/podcast/${id}`);
        setPodcast(data);
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