import { useEffect, useState } from 'react'
import StandardButton from '../components/StandardButton';
import { useNavigate } from 'react-router-dom';
import { customFetch } from '../utils/customFetch';
import Podcasts from '../components/Podcasts';
import { useAuth } from '../auth/AuthContext';

const Landing = () => {

    // Hooks
    const navigate = useNavigate();
    const [trendingPodcasts, setTrendingPodcasts] = useState([]);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchPodcasts = async () => {
            const { data } = await customFetch.get('/podcast');
            setTrendingPodcasts(data);
        }

        fetchPodcasts()
    }, [])


    // JSX
    return (
        <>

            <div className='grid grid-cols-2 justify-items-center gap-10 items-center font-main font-bold text-3xl h-96'>
                <div className='bg-emerald-700 w-full h-full shadow-lg shadow-black/50 rounded'></div>
                <div>
                    <h2 className='text-emerald-700 text-center'>Welcome to <span className='2xl:bg-emerald-700 shadow-black/50 2xl:shadow 2xl:text-white 2xl:p-4 rounded'>Poddy</span></h2>
                    <h3 className='text-emerald-700 text-center'>The <span className='2xl:bg-emerald-700 2xl:text-white 2xl:p-2 rounded shadow-black/50 2xl:shadow'>better</span> way of podcasting</h3>

                    {!isAuthenticated && <div className='flex justify-center gap-10 mt-20'>
                        <StandardButton onClick={() => { navigate('/login') }}>Log In</StandardButton>
                        <StandardButton onClick={() => { navigate('/register') }}>Register</StandardButton>
                    </div>}
                </div>
            </div>

            <h2 className='mt-20 sm:text-left text-center'>Trending Podcasts</h2>

            <Podcasts podcastList={trendingPodcasts} />

            <div className='border-2 border-solid border-emerald-700 text-center mt-10'>
                <h1 className='bg-emerald-700 text-white w-full box-border m-0 p-4'>Get premium</h1>
                <div className='grid grid-cols-2 items-center'>
                    <div className='text-center w-full'>
                        <h2 className='text-black p-4 m-0'>Get access to advanced features</h2>
                        <p className='text-lg text-black'>Monetization, no more ads and more with premium</p>
                    </div>
                    <div>
                        <StandardButton>Get it now!</StandardButton>
                    </div>
                </div>
            </div>

            <h2 className='mt-10 text-center sm:text-left'>Live Now</h2>

            <Podcasts podcastList={trendingPodcasts} />

        </>
    )
}

export default Landing;