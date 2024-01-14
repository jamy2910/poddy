import React, { useEffect, useState } from 'react'
import { customFetch } from '../utils/customFetch'
import { useNavigate } from 'react-router-dom'
import PodcastLoadingSpinner from '../components/PodcastLoadingSpinner';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const { isAuthenticated } = useAuth();

    useEffect(() => {
        setLoading(true);
        if (!isAuthenticated) {
            navigate('/login')
        }
        setLoading(false)
    }, [])

    return (
        <div>
            {loading ? <PodcastLoadingSpinner /> : children}
        </div>
    )
}

export default ProtectedRoute