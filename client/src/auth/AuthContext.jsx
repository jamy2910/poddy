import { createContext, useContext, useState } from "react"

const UserContext = createContext();

const AuthContext = ({ children }) => {

    const [user, setUser] = useState({ username: 'jamy1892' });

    const loginAuth = (userData) => {
        setUser(userData)
    };

    const logoutAuth = () => {
        setUser({});
    };

    return (
        <UserContext.Provider value={{ loginAuth, logoutAuth, user }}>
            {children}
        </UserContext.Provider>
    )
}

export default AuthContext

export const useAuth = () => {
    return useContext(UserContext);
}