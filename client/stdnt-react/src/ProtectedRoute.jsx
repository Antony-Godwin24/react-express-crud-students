import React from 'react'
import {Navigate} from 'react-router-dom'

const ProtectedRoute = ({children,role}) => {
    const token=localStorage.getItem('token')
    const user=localStorage.getItem('userName')
    if(!token || !user){
        return <Navigate to='/login' />
    }
    if(role==='admin' && !user.toLowerCase().includes('admin')){
        return <Navigate to='/login' />
    }
    else if(role==='stdnt' && user.toLowerCase().includes('admin')){
        return <Navigate to='/login' />
    }
    else{
        return children;
    }
}

export default ProtectedRoute