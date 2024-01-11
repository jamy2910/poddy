import React from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import AccountButton from './AccountButton';

const Navbar = () => {

  const navigate = useNavigate();

  return (
    <div className='flex items-center justify-between py-2 border-b-2 border-0 border-emerald-700 border-solid mb-10'>
        <h2 onClick={() => {navigate('/')}} className='bg-emerald-700 px-4 py-2 cursor-pointer font-main font-bold text-white inline-block rounded m-0'>Poddy</h2>

        <div className='flex justify-around w-1/2'>
            <NavLink to={'/'} className='no-underline text-black hover:underline cursor-pointer'>Home</NavLink>
            <NavLink to={'/explore'} className='no-underline text-black hover:underline cursor-pointer'>Explore</NavLink>
            <NavLink to={'/trending'} className='no-underline text-black hover:underline cursor-pointer'>Trending</NavLink>
            <NavLink to={'/live'} className='no-underline text-black hover:underline cursor-pointer'>Live Now</NavLink>
            <AccountButton />
        </div>
    </div>
  )
}

export default Navbar