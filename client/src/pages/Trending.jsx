import React, { useEffect, useState } from 'react'
import { customFetch } from '../utils/customFetch'
import Podcasts from '../components/Podcasts'

const Trending = () => {

    // Hooks
    const [podcasts, setPodcasts] = useState([]);

    useEffect(() => {
        const getPodcasts = async () => {
            try {
                const { data } = await customFetch.get('/podcast?sort=trending');
                setPodcasts(data);
            } catch (error) {
                console.log(error);
            }
        }

        getPodcasts();
    }, [])

    // JSX
    return (
        <>
            <h2>Trending podcasts</h2>
            <Podcasts podcastList={podcasts} />
        </>


    )
}

export default Trending