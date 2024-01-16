import React, { useEffect, useState } from 'react'
import { customFetch } from '../utils/customFetch'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {

    const navigate = useNavigate();

    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            toast.error('You must be logged in');
        };
    }, []);

    return (
        <Outlet />
    )
}

export default ProtectedRoute