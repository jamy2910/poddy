import { useEffect, useState } from 'react'
import { customFetch } from '../utils/customFetch';
import { useParams } from 'react-router-dom'
import PodcastGrid from '../components/PodcastGrid';
import Podcasts from '../components/Podcasts';
import PodcastLoadingSpinner from '../components/PodcastLoadingSpinner';

const SingleChannel = () => {


    // Hooks
    const { channelId } = useParams();
    const [channel, setChannel] = useState({});
    const [podcasts, setPodcasts] = useState([]);
    const [state, setState] = useState('idle');
    const [imageLoading, setImageLoading] = useState(true);

    useEffect(() => {
        const fetchChannels = async () => {
            try {
                const { data } = await customFetch.get(`/channel/${channelId}`);
                setChannel(data);
            } catch (error) {
                console.log(error);
            }
        }

        const fetchPodcasts = async () => {
            try {
                const { data } = await customFetch.get(`/podcast/channel/${channelId}`);
                setPodcasts(data);
            } catch ({ response }) {
                console.log(response);
            }

        }
        setState('loading')
        fetchChannels();
        fetchPodcasts();
        setState('idle');
    }, [])


    // JSX
    if (state === 'loading') return <PodcastLoadingSpinner />

    return (
        <div>
            {imageLoading && <PodcastLoadingSpinner />}
            <img onLoad={() => { setImageLoading(false) }} src={channel.url} alt="" className={`object-contain h-96 mx-auto block ${imageLoading && 'hidden'}`} />
            <h2 className=' text-center mb-0'>{channel.title}</h2>
            {channel.subheading && <h2 className='font-normal text-lg text-center m-0'>{channel.subheading}</h2>}


            {podcasts.length > 1 ? <PodcastGrid>
                <Podcasts podcastList={podcasts} />
            </PodcastGrid> : <h2>No podcasts yet</h2>}
        </div>
    )
}

export default SingleChannel