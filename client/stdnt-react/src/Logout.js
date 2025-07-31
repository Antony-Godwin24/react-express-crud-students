import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const Logout = ({userName,setUserName}) => {
    const Navigate = useNavigate();
    useEffect(()=>{
        const logout=()=>{
            localStorage.removeItem('userName');
            setUserName('');
            Navigate('/')
        }
        logout()
    })
    return (
        <div>
            <div className='Nav'>
                <h1 style={{ marginTop: '20px' }}>
                <a href="/">Students Record</a>
                </h1>
                <div className='links'>
                    <p><a href="/admin">Home</a></p>
                    <p><a href="/notice">Notice Board</a></p>
                    <p><a href="/register">Register</a></p>
                    <p><a href="/profile">My Profile</a></p>
                    <p><a href="/logout">Logout</a></p>
                </div>  
            </div>
            Logout Successfull!
        </div>
    )
}

export default Logout