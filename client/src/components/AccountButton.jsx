import React, { useEffect, useRef, useState } from 'react'
import DropdownBox from './DropdownBox';
import { NavLink } from 'react-router-dom';

const AccountButton = () => {

    const [open, setOpen] = useState(false);
    const containerRef = useRef();

    const toggleOpen = () => {
        setOpen(!open)
    }

    useEffect(() => {
        const closeDropdown = (e) => {
            if(containerRef.current && !containerRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        window.addEventListener('click', closeDropdown);

        return () => {
            window.removeEventListener('click', closeDropdown);
        }
    })

  return (
    <div ref={containerRef} className='relative'>
        <span onClick={toggleOpen} className='cursor-pointer hover:underline'>Account</span>
        
        {open && <DropdownBox>
            <NavLink to={'/myprofile'} className='no-underline text-black hover:underline cursor-pointer'>My Profile</NavLink>
            <NavLink className='no-underline text-black hover:underline cursor-pointer'>Another random link</NavLink>
        </DropdownBox>}
    </div>
  )
}

export default AccountButton