import { useEffect, useRef, useState } from 'react'
import DropdownBox from './DropdownBox';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import StandardButton from './StandardButton';
import { toast } from 'react-toastify';

const AccountButton = () => {

    // Hooks
    const [open, setOpen] = useState(false);
    const containerRef = useRef();
    const { user, logoutAuth } = useAuth();
    const navigate = useNavigate();

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

    const logoutUser = async () => {
        try {
            await logoutAuth();
            toast('logged out');
            navigate('/');
        } catch (error) {
            toast.error('Error logging out')
        }
    }

    // JSX
    return (
        <div ref={containerRef} className='relative'>
            <span onClick={toggleOpen} className='cursor-pointer hover:underline'>{user.username ? user?.username : 'Account'}</span>

            {open && <DropdownBox>
                <NavLink onClick={toggleOpen} to={'/myprofile'} className='no-underline text-black hover:underline cursor-pointer'>My Profile</NavLink>
                <StandardButton onClick={() => { logoutUser(); toggleOpen() }}>Logout</StandardButton>
            </DropdownBox>}
        </div>
    )
}

export default AccountButton