import React, { useEffect, useRef, useState } from 'react'
import { CiMenuKebab as MenuIcon } from 'react-icons/ci';
import DropdownBox from './DropdownBox';
import { useAuth } from '../auth/AuthContext';

const PodcastCardDropdown = ({ userid, toggleModal }) => {

    const [open, setOpen] = useState(false);
    const containerRef = useRef();
    const { user } = useAuth();

    const toggleMenu = () => {
        setOpen(!open);
    }

    useEffect(() => {
        const closeSidebar = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setOpen(false)
            }
        }

        window.addEventListener('click', closeSidebar);

        return () => {
            window.removeEventListener('click', closeSidebar);
        }
    })

    return (
        <div ref={containerRef} className='relative'>
            <MenuIcon className='hover:bg-gray-500/30 cursor-pointer rounded-full p-2 flex items-center' onClick={toggleMenu} />

            {open && <DropdownBox>
                <h3 className='hover:underline text-base font-normal inline-block cursor-pointer'>Report podcast</h3>
                <h3 className='hover:underline text-base font-normal inline-block cursor-pointer'>Add to watchlist</h3>
                <h3 className='hover:underline text-base font-normal inline-block cursor-pointer'>View channel</h3>
                {user.id === userid && <h3 onClick={toggleModal} className='hover:underline text-base font-normal inline-block cursor-pointer'>Delete Podcast</h3>}
            </DropdownBox>}
        </div >
    )
}

export default PodcastCardDropdown