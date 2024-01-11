import React from 'react'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
import FiltersDropdown from '../components/FiltersDropdown'
import PodcastGrid from '../components/PodcastGrid'
import ChannelCard from '../components/PodcastCard'
import Footer from '../components/Footer'


const Explore = () => {

    return (
        <div className='xl:w-3/4 lg:w-5/6 mx-auto font-main'>
            <Navbar />
            <SearchBar />
            <FiltersDropdown />
            <PodcastGrid>
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

export default Explore