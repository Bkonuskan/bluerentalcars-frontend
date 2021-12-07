import React from 'react'
import { Navigate } from 'react-router';
import { useStore } from '../store'

const PrivateRoute = ({children}) => {
    const { userState } = useStore();
    const { isUserLogin } = userState;

    if(!isUserLogin) return <Navigate to="/login"/>

    return children;
    
}

export default PrivateRoute
