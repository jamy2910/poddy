import React, { useEffect, useRef, useState } from 'react'
import DropdownBox from './DropdownBox';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const AccountButton = () => {

    // Hooks
    const [open, setOpen] = useState(false);
    const containerRef = useRef();
    const { user } = useAuth();

    useEffect(() => {
        const closeDropdown = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        window.addEventListener('click', closeDropdown);

        return () => {
            window.removeEventListener('click', closeDropdown);
        }
    })

    // Functions
    const toggleOpen = () => {
        setOpen(!open)
    }

    // JSX
    return (
        <div ref={containerRef} className='relative'>
            <span onClick={toggleOpen} className='cursor-pointer hover:underline'>{user.username || 'Account'}</span>

            {open && <DropdownBox>
                <NavLink onClick={toggleOpen} to={'/myprofile'} className='no-underline text-black hover:underline cursor-pointer'>My Profile</NavLink>
                <NavLink onClick={toggleOpen} className='no-underline text-black hover:underline cursor-pointer'>Another random link</NavLink>
            </DropdownBox>}
        </div>
    )
}

export default AccountButton