import PodcastInteractButton from '../components/PodcastInteractButton'
import demoSound from '/demo-sound.mp3'
import { useParams } from 'react-router-dom'
import Comments from '../components/Comments'
import { usePodcast } from '../hooks/usePodcast'
import { useScrollTop } from '../hooks/useScrollTop'


const SinglePodcast = () => {

  // Hooks
  useScrollTop();
  const { id } = useParams();
  const { podcast, handleLike } = usePodcast(id);

  // JSX
  return (
    <>
      <div className='w-3/4 mx-auto'>
        <img src={podcast.url} alt="" className='object-contain w-full' />
        <audio onContextMenu={(e) => { e.preventDefault() }} src={demoSound} controlsList='nodownload' controls className='mt-4 w-full mx-auto block' ></audio>

        <div className='flex justify-between items-center mt-4'>
          <PodcastInteractButton isLiked={podcast.isliked} onClick={handleLike}>{podcast.isliked ? 'Liked' : 'Like'}</PodcastInteractButton>
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

export default SinglePodcast;