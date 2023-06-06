import React, { useContext } from 'react';
import { AuthContext } from '../Auth/AuthProvider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const { user, loading} = useContext(AuthContext)
    const location = useLocation()

    if(loading){
        return <p className='text-center text-3xl font-bebas'>Loading...</p>
    }
    if(user){
        return children;
    }

    return <Navigate to="/login" state={{from: location}} replace></Navigate>
    
};

export default PrivateRoute;