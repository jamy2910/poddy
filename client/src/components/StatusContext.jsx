import { createContext, useContext, useState } from "react"
import PodcastLoadingSpinner from '../components/PodcastLoadingSpinner';

const Status = createContext();

const StatusContext = ({ children }) => {

    const [status, setStatus] = useState('idle');

    const setLoading = () => {
        setStatus('loading');
    }

    const setIdle = () => {
        setStatus('idle');
    }

    return (
        <Status.Provider value={{ status, setIdle, setLoading }}>
            {status === 'loading' && <PodcastLoadingSpinner />}
            {status === 'idle' && children}
        </Status.Provider>
    )
}

export const useStatus = () => {
    return useContext(Status);
}

export default StatusContext