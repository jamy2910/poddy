import React, { useState } from 'react';
import ChannelCardDropdown from './PodcastCardDropdown';
import { useNavigate } from 'react-router-dom'
import PodcastLoadingSpinner from './PodcastLoadingSpinner';
import ConfirmDeletePodcast from './ConfirmDeletePodcast';
import { customFetch } from '../utils/customFetch';

const PodcastCard = ({ id, live, title, url, channelname, likes, userid }) => {

  // Hooks
  const navigate = useNavigate();
  const [imageLoading, setImageLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  // Funtions
  const onImageLoad = () => {
    setImageLoading(false);
  }

  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  }

  const deletePodcast = async () => {
    try {
      const response = await customFetch.delete(`/podcast/${id}`);
      setIsDeleted(true);
    } catch (error) {
      toast.error('Unable to delete podcast');
    }
  }

  // JSX
  return (
    <div className={`w-full box-border font-main border-solid border-2 border-emerald-700 p-5 py-3 relative rounded ${isDeleted && 'hidden'}`}>

      {deleteModal && <ConfirmDeletePodcast deletePodcast={deletePodcast} toggleModal={toggleDeleteModal} id={id} />}

      {imageLoading && <PodcastLoadingSpinner />}
      <img onLoad={onImageLoad} onClick={() => { navigate(`/podcast/${id}`) }} className={`object-contain h-40 cursor-pointer w-full ${imageLoading ? 'hidden' : 'block'}`} src={url} alt="" />

      <h2 onClick={() => { navigate(`/podcast/${id}`) }} className='m-0 cursor-pointer hover:underline mt-2 text-lg line-clamp-2'>{title}</h2>
      <span className='block mb-5'>{channelname}</span>

      {live && <span className='bg-red-600 text-white p-1 rounded absolute top-2 right-2'>Live</span>}

      <div className='flex justify-between items-center'>
        <span className='text-sm text-gray-500'>126k views</span>
        <ChannelCardDropdown toggleModal={toggleDeleteModal} userid={userid} />
      </div>
      <span className='text-sm text-gray-500'>{likes} likes</span>
    </div>
  )
}

export default PodcastCard