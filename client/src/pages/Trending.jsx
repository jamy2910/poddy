import React from 'react'
import Navbar from '../components/Navbar'
import PodcastGrid from '../components/PodcastGrid'
import ChannelCard from '../components/PodcastCard'
import Footer from '../components/Footer'

const Trending = () => {
  return (
    <div className='xl:w-3/4 md:w-11/12 mx-auto font-main'>
        <Navbar />


        <h2>Trending podcasts</h2>
        <PodcastGrid>
            <ChannelCard />
            <ChannelCard />
            <ChannelCard />
            <ChannelCard />
            <ChannelCard />
            <ChannelCard />
            <ChannelCard />
            <ChannelCard />
            <ChannelCard />
            <ChannelCard />
        </PodcastGrid>

        <Footer />
    </div>
  )
}

export default Trending