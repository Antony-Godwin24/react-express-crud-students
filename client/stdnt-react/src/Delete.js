import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Delete = () => {
    const [roll, setRoll] = useState('');
    const navigate = useNavigate();

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`http://localhost:3500/students/${roll}`);
            setRoll('');
            toast.success('Student deleted successfully!');
            navigate('/');
        } catch (err) {
            toast.error('Failed to delete student');
            console.error(err);
        }
    };

    const handleDeleteAll = async () => {
        try {
            const response = await axios({
            method: 'delete',
            url: 'http://localhost:3500/students/deleteAll',
            headers: { 'Content-Type': 'application/json' }
            });
            toast.success(response.data.message || 'All students deleted');
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Delete failed');
            console.error(err);
        }
    };
    return (
        <>
            <div className='Nav'>
                    <h1 style={{ marginTop: '20px' }}><a href="/">Students Record</a></h1>
                    <div className='links'>
                        <p><a href="/admin">Home</a></p>
                        <p><a href="/notice">Notice Board</a></p>
                        <p><a href="/register">Register</a></p>
                    </div>
            </div>
            <div className='forms-div'>
                <h1 className='head-box'>Delete a Student</h1>
                <form onSubmit={handleDelete}>
                    <input 
                        type="number" 
                        name='roll' 
                        value={roll} 
                        onChange={(e) => setRoll(e.target.value)} 
                        placeholder='roll' 
                        required 
                    />
                    <div className='btns-del'>  
                        <button type='submit'>Delete Student</button>
                        <button id='two' onClick={handleDeleteAll}>Delete All</button>
                    </div>
                </form>
                <p>
                    <Link to="/">
                        <button className="btn btn-primary">Back to Home</button>
                    </Link>
                </p>
            </div>
        </>
    );
};

export default Delete;