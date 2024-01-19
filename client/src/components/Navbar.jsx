import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import AccountButton from './AccountButton';
import { useAuth } from '../auth/AuthContext';
import StandardButton from './StandardButton';
import { FiMenu as MenuIcon } from 'react-icons/fi'
import MobileMenu from './MobileMenu';

const Navbar = () => {

  const navigate = useNavigate();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  return (
    <div className='flex items-center justify-between py-2 border-b-2 border-0 border-emerald-700 border-solid mb-10'>
      <h2 onClick={() => { navigate('/') }} className='bg-emerald-700 px-4 py-2 cursor-pointer font-main font-bold text-white inline-block rounded m-0'>Poddy</h2>

      <MenuIcon onClick={toggleMenu} className='md:hidden text-3xl cursor-pointer text-emerald-700' />

      {menuOpen && <MobileMenu toggleMenu={toggleMenu} />}

      <div className='md:flex justify-around w-3/4 items-center hidden'>
        <NavLink to={'/'} className='no-underline text-black hover:underline cursor-pointer'>Home</NavLink>
        <NavLink to={'/explore'} className='no-underline text-black hover:underline cursor-pointer'>Explore</NavLink>
        <NavLink to={'/trending'} className='no-underline text-black hover:underline cursor-pointer'>Trending</NavLink>
        {user.username ? <AccountButton /> : <StandardButton onClick={() => { navigate('/register') }}>Login/Register</StandardButton>}
      </div>
    </div>
  )
}

export default Navbar