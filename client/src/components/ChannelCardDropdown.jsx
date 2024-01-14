import { CiMenuKebab as MenuIcon } from 'react-icons/ci';
import DropdownBox from './DropdownBox';
import { useEffect, useRef, useState } from 'react';
import ConfirmDeleteChannel from './ConfirmDeleteChannel';
import { useNavigate } from 'react-router-dom';

const ChannelCardDropdown = ({ id }) => {


    // Hooks
    const containerRef = useRef();
    const [open, setOpen] = useState(false);
    const [deleteBox, setDeleteBox] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleDropdown = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setOpen(false);
            }
        }

        window.addEventListener('click', handleDropdown);

        return () => {
            window.removeEventListener('click', handleDropdown);
        }
    }, []);

    // Functions
    const toggleOpen = () => {
        setOpen(!open);
    };

    const toggleDeleteModal = () => {
        setDeleteBox(!deleteBox);
    }

    return (
        <div ref={containerRef} className='relative'>
            <MenuIcon onClick={toggleOpen} className='hover:bg-gray-500/30 cursor-pointer rounded-full p-2 flex items-center' />

            {open && <DropdownBox>
                <h3 className='text-base font-normal cursor-pointer hover:underline'>Edit channel</h3>
                <h3 onClick={toggleDeleteModal} className='text-base font-normal cursor-pointer hover:underline'>Delete channel</h3>
                <h3 onClick={() => { navigate(`/upload/${id}`) }} className='text-base font-normal cursor-pointer hover:underline'>Upload a podcast</h3>
            </DropdownBox>}

            {deleteBox && <ConfirmDeleteChannel toggleModal={toggleDeleteModal} id={id} />}
        </div>
    )
}

export default ChannelCardDropdown