import React from 'react'
import { Navigate } from 'react-router';
import { useStore } from '../store'
import { isAdmin } from '../utils/auth';

const PrivateRoute = ({children, admin}) => {
    const { userState } = useStore();
    const { isUserLogin, user } = userState;

    if(!isUserLogin) return <Navigate to="/login"/>

    if(admin && !isAdmin(user.roles)) return <Navigate to="/not-authorized"/>

    return children;
    
}

export default PrivateRoute
