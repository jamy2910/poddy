import React from 'react';
import ChannelCardDropdown from './PodcastCardDropdown';
import {useNavigate} from 'react-router-dom'

const ChannelCard = ({live, title}) => {

  const navigate = useNavigate();
  

  return (
    <div className='w-full box-border font-main border-solid border-2 border-emerald-700 p-5 pb-3 relative rounded'>
        <img onClick={() => {navigate('/podcast/1')}} className='object-contain h-40 cursor-pointer w-full' src="https://hyperight.com/wp-content/uploads/2023/01/Josef-Lindman-Hornlund-and-Viktor-Oberg-AI-AW-thumbnail-template.png" alt="" />
        <h2 onClick={() => {navigate('/podcast/1')}} className='m-0 cursor-pointer hover:underline mt-2 text-lg line-clamp-2'>{title || 'Podcast title featuring Theo Von'}</h2>
        <span className='block mb-5'>The Joe Rogan Experience</span>

        {live && <span className='bg-red-600 text-white p-1 rounded absolute top-2 right-2'>Live</span>}

        <div className='flex justify-between items-center'>
            <span className='text-sm text-gray-500'>126k views</span>
            <ChannelCardDropdown />
        </div>
    </div>
  )
}

export default ChannelCard