import { useState, useEffect } from "react";
import { customFetch } from "../utils/customFetch";

export const useComments = (id) => {
    const [comments, setComments] = useState([]);

    const getComments = async () => {
        const { data } = await customFetch.get(`/comment/${id}`);
        setComments(data);
    }

    useEffect(() => {
        getComments();
    }, []);

    return { getComments: getComments, comments: comments }
}