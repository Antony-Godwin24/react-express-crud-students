import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Nav from './Nav.js';
import { Link } from 'react-router-dom';
const Logout = ({userName,setUserName}) => {
    const Navigate = useNavigate();
    useEffect(()=>{
        const logout=()=>{
            localStorage.removeItem('token')
            localStorage.removeItem('userName');
            setUserName('');
            Navigate('/')
        }
        logout()
    })
    return (
        <div>
            <Nav />
            <h1 style={{ marginTop: '20px' }}>
            <a href="/">Students Record</a>
            </h1>
            <div className='links'>
                <p><Link to="/admin">Home</Link></p>
                <p><Link to="/notice">Notice Board</Link></p>
                <p><Link to="/register">Register</Link></p>
                <p><Link to="/profile">My Profile</Link></p>
                <p><Link to="/logout">Logout</Link></p>
            </div>
            Logout Successfull!
        </div>
    )
}

export default Logout