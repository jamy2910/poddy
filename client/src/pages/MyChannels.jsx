import StandardButton from '../components/StandardButton'
import { useNavigate } from 'react-router-dom'

const MyChannels = () => {

  const navigate = useNavigate();

  return (

    <>
      <div className='text-center border-solid border-2 border-emerald-700 pb-4'>
        <h2 className='bg-emerald-700 p-4 text-white text-center m-0'>Create a new channel</h2>
        <h3 className='font-medium'>Create a channel to start uploading content, collecting subscribers and monetizing</h3>
        <StandardButton onClick={() => { navigate('/createchannel') }}>Create new channel</StandardButton>
      </div>

      <div className='mt-10'>
        <h2>My channels</h2>
        <h3 className='font-medium mb-72'>You have no channels to display. Create a channel here.</h3>
      </div>
    </>


  )
}

export default MyChannels