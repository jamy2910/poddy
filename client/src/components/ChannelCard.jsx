import { useState } from 'react'
import PodcastLoadingSpinner from './PodcastLoadingSpinner'
import ChannelCardDropdown from './ChannelCardDropdown';
import { useNavigate } from 'react-router-dom';

const ChannelCard = ({ title, src, id }) => {

    // Hooks
    const [loadingImage, setLoadingImage] = useState(true);
    const navigate = useNavigate();

    // Functions
    const imageLoaded = () => {
        setLoadingImage(false);
    }

    // JSX
    return (
        <div className='w-full border-2 border-solid border-emerald-700 rounded box-border p-4'>
            {loadingImage && <PodcastLoadingSpinner />}
            <img onLoad={imageLoaded} onClick={() => { navigate(`/channel/${id}`) }} src={src} className={`h-40 w-full object-contain cursor-pointer ${loadingImage && 'hidden'}`} />
            <h2 onClick={() => { navigate(`/channel/${id}`) }} className='text-xl m-0 mt-2 cursor-pointer hover:underline line-clamp-1'>{title}</h2>

            <div className='flex justify-between items-center mt-5'>
                <span className='text-gray-500 text-sm'>103 subscribers</span>
                <ChannelCardDropdown id={id} />
            </div>
        </div>
    )
}

export default ChannelCard