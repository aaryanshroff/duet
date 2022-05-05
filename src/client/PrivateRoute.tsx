import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const TOKEN = localStorage.getItem('token');

    if (!TOKEN) {
        return <Navigate to='/login' replace />;
    } else {
        return children;
    }
}

export default PrivateRoute;
