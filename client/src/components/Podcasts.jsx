import React from 'react'
import PodcastGrid from './PodcastGrid'
import ChannelCard from './PodcastCard'

const Podcasts = ({ podcastList }) => {

    return (
        <PodcastGrid>
            {Array.isArray(podcastList) && podcastList.map((podcast) => {
                return <ChannelCard key={podcast.id} {...podcast} />
            })}
        </PodcastGrid>
    )
}

export default Podcasts