import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Update = () => {
    const [form,setForm]=useState({roll:'',name:'',dept:'',city:'',pin:''})
    const navigate=useNavigate()
    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        await axios.put(`http://localhost:3500/students/${form.roll}`,{
            name:form.name,
            dept:form.dept,
            city:form.city,
            pin:form.pin
        })
        setForm({roll:'',name:'',dept:'',city:'',pin:''})
        toast.success('student updated successfully!')
        navigate('/show')
    }

    return (
        <div className='forms-div'>
            <h1 className='head-box'>Update a Student</h1>
            <form onSubmit={handleSubmit}>
                <input type="number" name='roll' value={form.roll} placeholder='Roll' onChange={handleChange} required />
                <input type="text" name='name' value={form.name} placeholder='name' onChange={handleChange} required />
                <input type="text" name='dept' value={form.dept} placeholder='dept' onChange={handleChange} required />
                <input type="text" name='city' value={form.city} placeholder='city' onChange={handleChange} required />
                <input type="number" name='pin' value={form.pin} placeholder='pin' onChange={handleChange} required />
                <button type='submit'>Update Student</button>
            </form>
            <p><Link to="/"><button class="btn btn-primary">Back to Home</button></Link></p>
        </div>
    )
}

export default Update