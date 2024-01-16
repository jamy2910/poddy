import { useEffect, useRef, useState } from "react"
import { CiMenuKebab as MenuIcon } from 'react-icons/ci';
import DropdownBox from "./DropdownBox";
import { customFetch } from "../utils/customFetch";
import { toast } from "react-toastify";

const CommentDropdown = ({ getComments, commentId }) => {

    // Hooks
    const [open, setOpen] = useState(false);
    const containerRef = useRef();
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
    })

    // Functions
    const toggleMenu = () => {
        setOpen(!open);
    }

    const deleteComment = async () => {
        try {
            const response = await customFetch.delete(`/comment/${commentId}`)
            await getComments();
            toast.success('Comment deleted')
        } catch (error) {
            toast.error("Couldn't delete comment");
        }
    }

    // JSX
    return (
        <div ref={containerRef} className="absolute top-0 right-0">
            <div className="relative">
                <MenuIcon onClick={toggleMenu} className="hover:bg-gray-500/30 cursor-pointer rounded-full p-2 flex items-center" />

                {open && <DropdownBox>
                    <h3 onClick={deleteComment} className='text-base font-normal cursor-pointer hover:underline'>Delete Comment</h3>
                </DropdownBox>}
            </div>
        </div>

    )
}

export default CommentDropdown