import PodcastInteractButton from '../components/PodcastInteractButton'
import CommentInput from '../components/CommentInput'
import CommentCard from '../components/CommentCard'
import demoSound from '/demo-sound.mp3'
import { useEffect, useState } from 'react'
import { customFetch } from '../utils/customFetch'
import { useParams } from 'react-router-dom'
import { scrollTop } from '../utils/scrollToTop';
import Comments from '../components/Comments'


const SinglePodcast = () => {

  const [podcast, setPodcast] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getPodcast = async () => {
      const { data } = await customFetch.get(`/podcast/${id}`);
      setPodcast(data);
    }
    scrollTop();
    getPodcast();
  }, []);

  return (
    <>
      <div className='w-3/4 mx-auto'>
        <img src={podcast.url} alt="" className='object-contain w-full' />
        <audio onContextMenu={(e) => { e.preventDefault() }} src={demoSound} controlsList='nodownload' controls className='mt-4 w-full mx-auto block' ></audio>

        <div className='flex justify-between items-center mt-4'>
          <PodcastInteractButton on={false}>Like</PodcastInteractButton>
          <PodcastInteractButton on={true}>Subscribed</PodcastInteractButton>
        </div>

        <div className='flex justify-between items-center mt-4'>
          <span className='text-gray-500'>{podcast.likes} likes</span>
          <span className='text-gray-500'>126, 412 views</span>
        </div>

        <h2>{podcast.title}</h2>
        <p className='text-lg'>{podcast.description}</p>
      </div>

      <Comments />
    </>
  )
}

export default SinglePodcast