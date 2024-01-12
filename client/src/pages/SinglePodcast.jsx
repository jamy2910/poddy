import PodcastInteractButton from '../components/PodcastInteractButton'
import CommentInput from '../components/CommentInput'
import CommentCard from '../components/CommentCard'
import demoSound from '/demo-sound.mp3'


const SinglePodcast = () => {

  return (
    <>
      <div className='w-3/4 mx-auto'>
        <img src="https://hyperight.com/wp-content/uploads/2023/01/Josef-Lindman-Hornlund-and-Viktor-Oberg-AI-AW-thumbnail-template.png" alt="" className='object-contain w-full' />
        <audio onContextMenu={(e) => { e.preventDefault() }} src={demoSound} controlsList='nodownload' controls className='mt-4 w-full mx-auto block' ></audio>

        <div className='flex justify-between items-center mt-4'>
          <PodcastInteractButton on={false}>Like</PodcastInteractButton>
          <PodcastInteractButton on={true}>Subscribed</PodcastInteractButton>
        </div>

        <div className='flex justify-between items-center mt-4'>
          <span className='text-gray-500'>53k likes</span>
          <span className='text-gray-500'>126, 412 views</span>
        </div>



        <h2>Podcast title featuring Theo Von</h2>
        <p className='text-lg'>This is a basic description placeholder. Eventually users will upload their descriptions and they will be displayed here</p>
      </div>

      <div className='mx-auto mt-24'>
        <h2 className='border-0 border-solid border-b border-emerald-700'>Comments</h2>

        <div className='flex flex-col'>
          <CommentInput />
        </div>

        <div className='flex flex-col gap-y-4'>
          <CommentCard />
          <CommentCard />
          <CommentCard />
          <CommentCard />
          <CommentCard />
        </div>
      </div>
    </>


  )
}

export default SinglePodcast