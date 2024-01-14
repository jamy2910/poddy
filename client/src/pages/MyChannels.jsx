import StandardButton from '../components/StandardButton'
import PodcastGrid from '../components/PodcastGrid'
import { useNavigate } from 'react-router-dom'
import ChannelCard from '../components/ChannelCard';
import { customFetch } from '../utils/customFetch';
import { createContext, useEffect, useState } from 'react';

export const ChannelContext = createContext();

const MyChannels = () => {

  // Hooks
  const navigate = useNavigate();
  const [myChannels, setMyChannels] = useState([]);

  useEffect(() => {
    const getChannels = async () => {
      try {
        const { data } = await customFetch.get('/channel/user');
        setMyChannels(data)
      } catch (error) {
        console.log(error);
      }
    }
    getChannels();
  }, []);

  // Funcions
  const deleteChannel = async (id) => {
    try {
      const response = await customFetch.delete(`/channel/${id}`);
      const newChannels = myChannels.filter((channel) => {
        if (channel.id !== id) return channel
      })
      setMyChannels(newChannels);
    } catch (error) {
      console.log(error);
    }
  }

  return (

    <>
      <div className='text-center border-solid border-2 border-emerald-700 pb-4'>
        <h2 className='bg-emerald-700 p-4 text-white text-center m-0'>Create a new channel</h2>
        <h3 className='font-medium'>Create a channel to start uploading content, collecting subscribers and monetizing</h3>
        <StandardButton onClick={() => { navigate('/createchannel') }}>Create new channel</StandardButton>
      </div>

      <div className='mt-10'>
        <h2>My channels</h2>
        <ChannelContext.Provider value={{ deleteChannel }}>
          {myChannels.length > 0 && <PodcastGrid>
            {myChannels.map((channel) => {
              const { id, title, subheading, url } = channel;
              return <ChannelCard id={id} title={title} src={url} />
            })}
          </PodcastGrid>}
        </ChannelContext.Provider>


        {myChannels.length === 0 && <h3>You have no channels. Try creating one</h3>}


      </div>
    </>


  )
}

export default MyChannels