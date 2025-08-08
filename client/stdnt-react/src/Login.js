import React,{useState} from 'react'
import axios from "axios"
import {toast} from 'react-toastify'
import Nav from './Nav.js';
import { useNavigate} from 'react-router-dom';

const Login = ({userName,setUserName,roll,setRoll,dept,setDept,city,setCity,pin,setPin}) => {
    const [user,setUser]= useState('');
    const [email,setEmail]= useState('');
    const [pass,setPass]= useState('');
    const Navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3500/login", { user, email, pass });
            if (res.data.message.includes("successfully")) {
            localStorage.setItem("token", res.data.token);
            toast.success("Login Successful!");
            setUser("");
            setEmail("");
            setPass("");
            localStorage.setItem("userName", user);
            setUserName(user);
            if (res.data.message.includes("Admin")) {
                Navigate("/admin");
            } else {
                Navigate("/stdnts");
            }
            } else {
            toast.error(res.data.message || "Login Failed! Please try again.");
            }
        } catch (error) {
            // Catch errors like 429 or others
            if (error.response && error.response.data) {
            toast.error(error.response.data.message || "Error: " + error.response.status);
            } else {
            toast.error("Network or unexpected error occurred");
            }
        }
        };

    return (
        <>
            <Nav />
            <div className='forms-div'>
                <h1 className='head-box'>Login</h1>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder='Enter your UserName:' value={user} onChange={(e)=>setUser(e.target.value)} required />
                    <input type="email" placeholder='Enter your Email:' value={email} onChange={(e)=>setEmail(e.target.value)} required />
                    <input type="password" placeholder='Enter your Password:' value={pass} onChange={(e)=>setPass(e.target.value)} required />
                    <button type='submit'>Login</button>
                </form>
                <p>New User? <a href="/signup">Signup</a></p>
            </div>
        </>
    )
}

export default Login