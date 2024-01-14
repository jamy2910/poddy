import { createContext, useContext, useEffect, useState } from "react"
import { customFetch } from "../utils/customFetch";

const UserContext = createContext();

const AuthContext = ({ children }) => {


    const [user, setUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const loginAuth = async () => {
        try {
            const { data } = await customFetch.get('/profile');
            setUser(data)
            setIsAuthenticated(true);
        } catch (error) {
            setUser({})
            setIsAuthenticated(false);
        }
    };

    const logoutAuth = () => {
        setIsAuthenticated(false);
        setUser({});
    };

    useEffect(() => {
        loginAuth();
    }, []);

    return (
        <UserContext.Provider value={{ loginAuth, logoutAuth, user, isAuthenticated }}>
            {children}
        </UserContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(UserContext);
}

export default AuthContext

