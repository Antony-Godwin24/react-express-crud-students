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
    const handleSignup=async(e)=>{
        e.preventDefault();
        const res=await axios.post('http://localhost:3500/signup', {user,email,pass,repass})
        if(res.data.message.includes('successfully')){
            toast.success(res.data.message || 'Signup Successful!')
            setUser('')
            setEmail('')
            setPass('')
            setRePass('')
            Navigate('/login')
        }
        else{
            toast.error(res.data.message || 'Signup Failed! Please try again.')
        }
    }
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
                <p>Already a User? <a href="/login">Login</a></p>
            </div>
        </>
    )
}

export default Signup