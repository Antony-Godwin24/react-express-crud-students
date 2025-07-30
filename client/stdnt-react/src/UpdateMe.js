import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';


const UpdateMe = () => {
  const [form,setForm]=useState({roll:'',name:'',city:'',pin:''})
    const navigate=useNavigate()
    const { userName } = useParams();
    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        console.log("Updating:", `http://localhost:3500/students/updateMe/${userName}`);
        const res=await axios.put(`http://localhost:3500/students/updateMe/${userName}`,{
            roll:form.roll,
            name:form.name,
            city:form.city,
            pin:form.pin
        })
        if(res.data.message && res.data.message.includes('UnAuthorized')){
            toast.error(res.data.message)
        }
        else{
            toast.success('res.data.message' || 'Your Details are updated successfully!')
        }
        setForm({roll:'',name:'',dept:'',city:'',pin:''})
        toast.success('student updated successfully!')
        navigate('/show')
    }

    return (
        <>
            <div className='Nav'>
                    <h1 style={{ marginTop: '20px' }}><a href="/">Students Record</a></h1>
                    <div className='links'>
                        <p><a href="/stdnts">Home</a></p>
                        <p><a href="/notice">Notice Board</a></p>
                        <p><a href="/register">Register</a></p>
                    </div>
            </div>
            <div className='forms-div'>
                <h1 className='head-box'>Update My Details</h1>
                <form onSubmit={handleSubmit}>
                    <input type="number" name='roll' value={form.roll} placeholder='Roll' onChange={handleChange} required />
                    <input type="text" name='name' value={form.name} placeholder='name' onChange={handleChange} required />
                    <input type="text" name='city' value={form.city} placeholder='city' onChange={handleChange} required />
                    <input type="number" name='pin' value={form.pin} placeholder='pin' onChange={handleChange} required />
                    <button type='submit'>Update Me</button>
                </form>
                <p>Note: You cannot change your Roll No or Department! <br />
                If you want to change any of the above, contact admin@123</p>
                <p><Link to="/"><button class="btn btn-primary">Back to Home</button></Link></p>
            </div>
        </>
    )
}

export default UpdateMe