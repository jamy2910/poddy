import { NavLink, useNavigate } from "react-router-dom"
import { FaTimes as CloseMenuIcon } from 'react-icons/fa'
import { customFetch } from "../utils/customFetch"
import { useAuth } from "../auth/AuthContext"
import { toast } from "react-toastify"

const MobileMenu = ({ toggleMenu }) => {

    const { logoutAuth } = useAuth();
    const navigate = useNavigate();

    const logoutUser = async () => {
        try {
            await logoutAuth();
            navigate('/')
            toast.success('Logged out')
        } catch (error) {
            toast.error('There was an error logging out')
        }
    }

    return (
        <div className="fixed top-0 bottom-0 right-0 left-0 z-50 md:hidden bg-black/50 flex justify-center items-center">
            <div className="bg-white flex flex-col p-14 text-3xl text-center gap-10 relative">
                <h2 className="m-0">Menu</h2>
                <NavLink to={'/'} className='no-underline hover:underline cursor-pointer text-black'>Home</NavLink>
                <NavLink to={'/explore'} className='no-underline hover:underline cursor-pointer text-black'>Explore</NavLink>
                <NavLink to={'/trending'} className='no-underline hover:underline cursor-pointer text-black'>Trending</NavLink>
                <NavLink to={'/myprofile'} className='no-underline hover:underline cursor-pointer text-black'>MyAccount</NavLink>
                <NavLink onClick={logoutUser} className='no-underline hover:underline cursor-pointer text-black'>Logout</NavLink>
                <CloseMenuIcon onClick={() => { toggleMenu(); }} className="absolute top-2 right-2 text-2xl cursor-pointer" />
            </div>
        </div>
    )
}

export default MobileMenu