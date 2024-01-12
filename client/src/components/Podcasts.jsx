import React from 'react'
import PodcastGrid from './PodcastGrid'
import ChannelCard from './PodcastCard'

const Podcasts = ({ podcastList }) => {
    return (
        <PodcastGrid>
            {podcastList && podcastList.map((podcast) => {
                const { id, title, channelname, url } = podcast;
                return <ChannelCard key={id} title={title} channel={channelname} src={url} />
            })}
        </PodcastGrid>
    )
}

export default Podcasts