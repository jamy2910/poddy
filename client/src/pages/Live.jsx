import React from 'react'
import FiltersDropdown from '../components/FiltersDropdown'
import PodcastGrid from '../components/PodcastGrid'
import ChannelCard from '../components/PodcastCard'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
import Footer from '../components/Footer'


const Live = () => {
  return (
    <div className='xl:w-3/4 md:w-11/12 mx-auto font-main'>
        <Navbar />

        <SearchBar />

        <FiltersDropdown live={true} />

        <h2>Live Now</h2>
        <PodcastGrid>
            <ChannelCard live={true} title={'This title is way longer than all the other, should still fit, hopefully anyway'} />
            <ChannelCard live={true} />
            <ChannelCard live={true} />
            <ChannelCard live={true} />
            <ChannelCard live={true} />
            <ChannelCard live={true} />
        </PodcastGrid>

        <Footer />
    </div>
  )
}

export default Live