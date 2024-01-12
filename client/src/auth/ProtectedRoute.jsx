import React, { useEffect } from 'react'
import { customFetch } from '../utils/customFetch'
import { useNavigate } from 'react-router-dom'
import PodcastLoadingSpinner from '../components/PodcastLoadingSpinner';

const ProtectedRoute = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const { data } = await customFetch.get('/profile');
                console.log(data);
            } catch (error) {
                navigate('/');
            }
        }

        getCurrentUser();
    })

    return (
        <div>
            {loading ? <PodcastLoadingSpinner /> : { children }}
        </div>
    )
}

export default ProtectedRoute