import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { customFetch } from '../utils/customFetch'
import Podcasts from '../components/Podcasts'
import PageWrapper from '../components/PageWrapper'

const Trending = () => {

    // Hooks
    const [podcasts, setPodcasts] = useState([]);

    useEffect(() => {
        const getPodcasts = async () => {
            try {
                const { data } = await customFetch.get('/podcast?sort=trending');
                console.log(data);
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