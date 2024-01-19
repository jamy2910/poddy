import { createContext, useContext, useEffect, useState } from "react"
import { customFetch } from "../utils/customFetch";
import { useStatus } from "../components/StatusContext";
import PodcastLoadingSpinner from "../components/PodcastLoadingSpinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const AuthContext = ({ children }) => {

    const [user, setUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const loginAuth = async () => {
        setLoading(true);
        try {
            const { data } = await customFetch.get('/profile');
            setUser(data)
            setIsAuthenticated(true);
        } catch (error) {
            setUser({})
            setIsAuthenticated(false);
        }
        setLoading(false);
    };

    const logoutAuth = async () => {
        setLoading(true);
        try {
            const response = await customFetch.get('/auth/logout');
            setUser({})
            setIsAuthenticated(false);
        } catch (error) {

        }
        setLoading(false)
    };

    useEffect(() => {
        loginAuth();
    }, []);

    return (
        <>
            {loading ? <PodcastLoadingSpinner /> : <UserContext.Provider value={{ loginAuth, logoutAuth, user, isAuthenticated }}>
                {children}
            </UserContext.Provider>}
        </>

    )
}

export const useAuth = () => {
    return useContext(UserContext);
}

export default AuthContext

