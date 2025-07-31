import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Add = () => {
    const navigate=useNavigate()
    const [form,setForm]=useState({roll:'',name:'',dept:'',city:'',pin:''})
    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    };

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const res=await axios.post('http://localhost:3500/students',form)
            if(res.data.message.includes('successfully')){
                toast.success('Student added successfully!')
                navigate('/show')
            }
            else if(res.data.message.includes('before')){
                toast.error(res.data.message)
                navigate('/signup')
            }
            else{
                toast.error(res.data.message || 'Something went wrong!')
            }
            setForm({roll:'',name:'',dept:'',city:'',pin:''})
        }
        catch(err){
            console.log('something went wrong!')
            toast.error('something went wrong!')
        }
    }

    return (
        <>
            <div className='Nav'>
                    <h1 style={{ marginTop: '20px' }}><a href="/">Students Record</a></h1>
                    <div className='links'>
                        <p><a href="/admin">Home</a></p>
                        <p><a href="/notice">Notice Board</a></p>
                        <p><a href="/register">Register</a></p>
                        <p><a href="/profile">My Profile</a></p>
                        <p><a href="/logout">Logout</a></p>
                    </div>
            </div>
            <div className='forms-div'>
                <h1 className='head-box'>Add a Student</h1>
                <form onSubmit={handleSubmit}>
                    <input type="number" name='roll' value={form.roll} placeholder='Roll' onChange={handleChange} required />
                    <input type="text" name='name' value={form.name} placeholder='name' onChange={handleChange} required />
                    <input type="text" name='dept' value={form.dept} placeholder='dept' onChange={handleChange} required />
                    <input type="text" name='city' value={form.city} placeholder='city' onChange={handleChange} required />
                    <input type="number" name='pin' value={form.pin} placeholder='pin' onChange={handleChange} required />
                    <button type='submit'>Add Student</button>
                </form>
                <p><Link to="/"><button class="btn btn-primary">Back to Home</button></Link></p>
            </div>
        </>
    )
}

export default Add