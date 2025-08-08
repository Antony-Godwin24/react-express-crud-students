import React,{useState} from 'react'
import {toast} from 'react-toastify'
import axios from "axios"
import Nav from './Nav.js';
import { useNavigate, Link, Navigate } from 'react-router-dom';

const Signup = () => {
  const [user,setUser]= useState('');
    const [email,setEmail]= useState('');
    const [pass,setPass]= useState('');
    const [repass,setRePass]= useState('');
    const Navigate= useNavigate();
    const handleSignup = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:3500/signup', { user, email, pass, repass });
    if (res.data.message.toLowerCase().includes('successfully')) {
      toast.success(res.data.message || 'Signup Successful!');
      setUser('');
      setEmail('');
      setPass('');
      setRePass('');
      Navigate('/login');
    } else {
      // Any other success response without "successfully"
      toast.error(res.data.message || 'Signup Failed!');
    }
  } catch (err) {
    if (err.response && err.response.data && err.response.data.message) {
      // Display the exact error from backend
      toast.error(err.response.data.message);
    } else if (err.message) {
      // Network or axios errors
      toast.error(err.message);
    } else {
      toast.error('Signup Failed! Try Again!');
    }
    console.error("Signup error:", err);
  }
};


    return (
        <>
            <Nav />
            <div className='forms-div'>
                <h1 className='head-box'>Signup</h1>
                <form onSubmit={handleSignup}>
                    <input type="text" placeholder='Enter your UserName:' value={user} onChange={(e)=>setUser(e.target.value)} required />
                    <input type="email" placeholder='Enter your Email:' value={email} onChange={(e)=>setEmail(e.target.value)} required />
                    <input type="password" placeholder='Enter your Password:' value={pass} onChange={(e)=>setPass(e.target.value)} required />
                    <input type="password" placeholder='Re-Enter your password:'  value={repass} onChange={(e)=>setRePass(e.target.value)} required/>
                    <button type='submit'>SignUp</button>
                </form>
                <p style={{marginBottom:'0px',color:'HighlightText'}}>Password should contain atleast 8 Characters!</p>
                <p>Already a User? <a href="/login">Login</a></p>
            </div>
        </>
    )
}

export default Signup