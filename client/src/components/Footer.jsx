import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <div className='py-20 bg-emerald-700 rounded mt-4 relative'>
                <div className='flex flex-col sm:flex-row gap-x-2 justify-center'>
                    <NavLink className='text-white no-underline hover:underline'>Home</NavLink>
                    <NavLink className='text-white no-underline hover:underline'>Explore</NavLink>
                    <NavLink className='text-white no-underline hover:underline'>Trending</NavLink>
                    <NavLink className='text-white no-underline hover:underline'>About</NavLink>
                    <NavLink className='text-white no-underline hover:underline'>Privacy</NavLink>
                    <NavLink className='text-white no-underline hover:underline'>Contact</NavLink>
                </div>

                <h2 className='m-0 text-sm text-white absolute bottom-2 right-2'>@Copyright Poddy Ltd. 2023</h2>
            </div>
        </>

    )
}

export default Footer