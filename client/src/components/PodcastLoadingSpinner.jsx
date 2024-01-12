import React from 'react'

const PodcastLoadingSpinner = () => {
    return (
        <div className=' box-border h-40 flex justify-center items-center'>
            <div className=' box-border aspect-square h-1/2 border-solid animate-spin border-gray-500 border-8 border-t-transparent rounded-full'></div>
        </div>
    )
}

export default PodcastLoadingSpinner