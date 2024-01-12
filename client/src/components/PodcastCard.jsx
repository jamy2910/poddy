import React, { useState } from 'react';
import ChannelCardDropdown from './PodcastCardDropdown';
import { useNavigate } from 'react-router-dom'
import PodcastLoadingSpinner from './PodcastLoadingSpinner';

const PodcastCard = ({ live, title, src, channel }) => {

  // Hooks
  const navigate = useNavigate();
  const [imageLoading, setImageLoading] = useState(true);

  // Funtions
  const onImageLoad = () => {
    setImageLoading(false);
  }


  // JSX
  return (
    <div className='w-full box-border font-main border-solid border-2 border-emerald-700 p-5 py-3 relative rounded'>

      {imageLoading && <PodcastLoadingSpinner />}
      <img onLoad={onImageLoad} onClick={() => { navigate('/podcast/1') }} className={`object-contain h-40 cursor-pointer w-full ${imageLoading ? 'hidden' : 'block'}`} src={src} alt="" />

      <h2 onClick={() => { navigate('/podcast/1') }} className='m-0 cursor-pointer hover:underline mt-2 text-lg line-clamp-2'>{title}</h2>
      <span className='block mb-5'>{channel}</span>

      {live && <span className='bg-red-600 text-white p-1 rounded absolute top-2 right-2'>Live</span>}

      <div className='flex justify-between items-center'>
        <span className='text-sm text-gray-500'>126k views</span>
        <ChannelCardDropdown />
      </div>
    </div>
  )
}

export default PodcastCard